const {timeoutPromise} = require("../../utils");

const enterLobbyFlow = async (page, url, PIN_CODE, NICKNAME) => {

    // Load page.
    await page.goto(url, {waitUntil: "networkidle2"});
    console.log("Page loaded");

    // Set pin.
    await page.type('.test-pin', PIN_CODE);

    // Validate pin.
    const pinButton = await page.$('.test-btn-validate-pin');
    await pinButton.click();

    /** Waiting for the next step. **/
    console.log("Pin validation");
    await page.waitForSelector(".test-nickname")

    // Set nickname.
    await page.type('.test-nickname', NICKNAME);

    // Validate nickname.
    const nicknameButton = await page.$('.test-btn-validate-nickname');
    await nicknameButton.click();

    /** Waiting for the next step. **/
    console.log("Nickname validation");
    await page.waitForSelector('.notification-joint-user');

    /** Get user id. **/
    const user = await page.evaluate(() => {
        const userLocalStorageData = localStorage.getItem("user");
        return JSON.parse(userLocalStorageData);
    });

    /** Screenshot of the logged user. **/
    console.log("userId", user.id);
    await timeoutPromise(10000)
    await page.screenshot({path: `first_time_inside_lobby_${user.id}.png`});

    return user;
};
module.exports = {enterLobbyFlow}
