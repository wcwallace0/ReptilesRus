const { getUserByUsernameAndPassword, createUser, getAdmin } = require('./userModel.js');
const db = require("../database/DB").pool;

afterAll(async () => { // Cleanup
    await db.end(); // Close the database connection pool
});

test('Get User by Username and Password', async () => {
    const user = await getUserByUsernameAndPassword('ddokupil@trinity.edu', 'pass');
    expect(user).toBeTruthy();
});

test('Fail get User by Username and Bad Password', async () => {
    const user = await getUserByUsernameAndPassword('ddokupil@trinity.edu', 'pass1');
    expect(user).toBeFalsy();
});

test('Fail get User by Username and Bad Password', async () => {
    const user = await getUserByUsernameAndPassword('ddokupil@trinity.edu1', 'pass1');
    expect(user).toBeFalsy();
});

test('Get Admin by Bad Username and Password', async () => {
    const user = await getAdmin('admin', 'test');
    expect(user).toBeTruthy();
});

test('Fail get Admin by Username and Bad Password', async () => {
    const user = await getAdmin('admin', 'test1');
    expect(user).toBeFalsy();
});

test('Fail get Admin by Bad Username and Password', async () => {
    const user = await getAdmin('admin1', 'test');
    expect(user).toBeFalsy();
});

// We won't be testing CreateUser as users can't be deleted, thus actions can't be undone and cleaned up after testing