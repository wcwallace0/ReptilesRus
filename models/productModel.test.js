const { getProducts, findById, dropPurchased, updateProduct } = require('./productModel.js');
const db = require("../database/DB").pool;

afterAll(async () => { // Cleanup
    await db.end(); // Close the database connection pool
});

test('Get products', async () => {
    const withCond = await getProducts(true);
    const withoutCond = await getProducts(false);
    expect((withoutCond.length > 0) && (withCond.length <= withoutCond.length)).toBeTruthy();
});

test('Find by ID (existing)', async () => {
    const success = await findById(1);
    expect(success.ProdName === 'Terrarium').toBeTruthy();
});

test('Find by ID (non-existing)', async () => {
    const success = await findById(99999);
    expect(success).toBeFalsy();
});

test('Drop Purchased', async () => {
    const first = await findById(1);
    let initial = first.ProdQuantity
    let cart = [
        {
          ProdName: 'Terrarium',
          ProdPrice: 199.99000549316406,
          quantity: 1,
          ProductID: 1
        }
      ]
    await dropPurchased(cart);
    const success = await findById(1);
    expect(success.ProdQuantity === initial - 1).toBeTruthy();
});

test('Update Product', async () => {
    const success = await findById(1);
    let initial = success.ProdQuantity
    await updateProduct(success.ProductID, success.ProdName, success.ProdDesc, success.ProdPrice, success.ProdQuantity + 1);
    const res = await findById(1);
    expect(res.ProdQuantity === initial + 1).toBeTruthy();
});