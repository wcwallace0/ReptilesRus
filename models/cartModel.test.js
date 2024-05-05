const { getCart, addToCart, changeQuant, emptyCart } = require('./cartModel.js');
const db = require("../database/DB").pool;

afterAll(async () => { // Cleanup
    await addToCart("ddokupil@trinity.edu", 2);
    await addToCart("ddokupil@trinity.edu", 2);
    await db.end(); // Close the database connection pool
});

test('Get cart', async () => {
    const success = await getCart("ddokupil@trinity.edu");
    expect(success.length === 2).toBeTruthy();
});

test('Empty cart', async () => {
    await emptyCart("ddokupil@trinity.edu");
    const success = await getCart("ddokupil@trinity.edu");
    expect(success.length === 0).toBeTruthy();
});

test('Add to cart', async () => {
    await addToCart("ddokupil@trinity.edu", 1);
    await addToCart("ddokupil@trinity.edu", 2);
    await addToCart("ddokupil@trinity.edu", 2);
    await addToCart("ddokupil@trinity.edu", 2);
    await addToCart("ddokupil@trinity.edu", 2);
    const success = await getCart("ddokupil@trinity.edu");
    expect(success.length === 2).toBeTruthy();
});

test('Change Quantity (modify)', async () => {
    await changeQuant("ddokupil@trinity.edu", 2, 1);
    const success = await getCart("ddokupil@trinity.edu");
    expect(success[1].quantity === 1).toBeTruthy();
});

test('Change Quantity (new)', async () => {
    await changeQuant("ddokupil@trinity.edu", 3, 1);
    const success = await getCart("ddokupil@trinity.edu");
    expect(success.length === 3).toBeTruthy();
});

test('Change Quantity (remove)', async () => {
    await changeQuant("ddokupil@trinity.edu", 3, 0);
    const success = await getCart("ddokupil@trinity.edu");
    expect(success.length === 2).toBeTruthy();
});