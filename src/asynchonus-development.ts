// Write a function that accepts an array of URLs,
// makes parallel queries for each of them, and returns an
// an array of results in the order in which the queries are completed.

// Example input data:
// const urls = ['https://jsonplaceholder.typicode.com/posts/1', 
// 'https://jsonplaceholder.typicode.com/posts/2'];

// Expected result:
// [
// { data: { ... }, status: 200 },
// { data: { ... }, status: 200 }
// ] 
type RequestsResult = {
    data: any;
    status: number;
};
async function fetchAll(urls: string[]): Promise<RequestsResult[]> {
    const promises = urls.map((url, index) => 
        fetch(url)
            .then(response => response.json())
            .then(data => ({
                data,
                status: 200,
                index // to keep track of the order
            }))
            .catch(() => ({
                data: null,
                status: 500,
                index
            }))
    );
    const results = await Promise.all(promises);
    const sortedResults = results.sort((a, b) => a.index - b.index);
    return sortedResults.map(({ index, ...result }) => result);
}

module.exports = { fetchAll };
