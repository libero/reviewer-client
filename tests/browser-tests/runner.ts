const createTestCafe = require('testcafe');
// console.log('createTestCafe', createTestCafe);

async function start() {
    const testCafe = await createTestCafe(null, 1337, 1338);
    console.log('__dirname', __dirname);
    const runner = testCafe.createRunner();
    const remoteConnection = await testCafe.createBrowserConnection();

    // Visit this URL from the remote device.
    console.log(remoteConnection.url);

    // Wait until the remote device's browser connects.
    await new Promise(resolve => remoteConnection.once('ready', resolve));

    await runner
        .browsers(remoteConnection)
        .src('./**/*.ts')
        .run();
}
start();
