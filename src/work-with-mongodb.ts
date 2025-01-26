// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library
import mongoose, { Schema, Document } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});
const User = mongoose.model<UserDocument>('User', userSchema);
type DuplicatedUsers = {
    email: string;
};
async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/usersdb', { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
async function addUsers(users: { name: string; email: string }[]) {
    try {
        // Insert new users into the database
        await User.insertMany(users);
        console.log('Users added successfully');
    } catch (error) {
        console.error('Error adding users:', error);
    }
}
async function findDuplicatedUsers(): Promise<DuplicatedUsers[]> {
    try {
        const duplicates = await User.aggregate([
            {
                $group: {
                    _id: "$email",  // Group by email
                    count: { $sum: 1 }  // Count the number of occurrences
                }
            },
            {
                $match: {
                    count: { $gt: 1 }  // Filter where count is greater than 1 (i.e., duplicates)
                }
            },
            {
                $project: { 
                    email: "$_id", 
                    _id: 0  // Exclude the _id field from the result
                }
            }
        ]);
        return duplicates;
    } catch (error) {
        console.error('Error finding duplicated users:', error);
        return [];
    }
}
async function manageUsers(): Promise<DuplicatedUsers[]> {
    await connectToDB();
    const users = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Doe', email: 'jane@example.com' },
        { name: 'John Smith', email: 'john@example.com' },  // Duplicate email
    ];
    await addUsers(users);
    const duplicatedUsers = await findDuplicatedUsers();
    return duplicatedUsers;
}
module.exports = { manageUsers };
