const { authenticateUser, checkPassword } = require('./adminModel.js');
const db = require("../database/DB").pool;

afterAll(async () => {
    await db.end(); // Close the database connection pool
});

test('Grant authentication to Admin', async () => {
    const success = await checkPassword("admin", "test");
    expect(success).toBeTruthy();
});

test('Fail to grant authentication to non-admin (bad user)', async () => {
    const success = await checkPassword("admin1", "test");
    expect(success).toBeFalsy();
});

test('Fail to grant authentication to non-admin (bad pass)', async () => {
    const success = await checkPassword("admin", "test1");
    expect(success).toBeFalsy();
});