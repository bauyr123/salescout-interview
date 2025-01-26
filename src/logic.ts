// Implement a function which takes an array of Product and returns unique products sorted by price

type Product = {
    name: string;
    price: number;
};
function filterAndSortProducts(products: Product[]): Product[] {
    const uniqueProductsMap = new Map<string, Product>();
    products.forEach(product => {
        uniqueProductsMap.set(product.name, product);
    });
    const uniqueProducts = Array.from(uniqueProductsMap.values());
    uniqueProducts.sort((a, b) => a.price - b.price);
    return uniqueProducts;
}
module.exports = { filterAndSortProducts };
