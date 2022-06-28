const triviaFlow = async (page, user) => {

    /** Waiting to start playing. **/
    console.log("Waiting to start playing");
    await page.waitForSelector(".test-question-for-trivia");

    let isPlaying = false

    do {
        /** Loop. **/
        /** Select one answer. **/
        console.log("get options to select");
        const [q1, q2, q3, q4, input1, btn1] = await getComponents(page);
        await page.screenshot({path: `first_time_inside_lobby_${user.id}.png`});

        console.log("Select | write answer.");
        await selectAnswerRandom(q1, q2, q3, q4, input1, btn1);

        /** Waiting to continue playing. **/
        console.log("Waiting to start playing");
        await page.waitForSelector(".test-question-for-trivia");

        console.log("Validate there are questions");
        const [isQ1, isQ2, isQ3, isQ4, isInput1, isBtn1] = await getComponents(page)
        isPlaying = isQ1 || isQ2 || isQ3 || isQ4 || isInput1 || isBtn1;

    } while (isPlaying);
};

const getComponents = async (page) => {
    /** "test-select-1" "test-select-2" "test-select-3" "test-select-4" **/
    /** "test-select-1" "test-select-2" **/
    const q1 = await page.$('.test-select-1');
    const q2 = await page.$('.test-select-2');
    const q3 = await page.$('.test-select-3');
    const q4 = await page.$('.test-select-4');

    /** "test-input-1" && "test-btn-1" **/
    const input1 = await page.$('.test-input-1');
    const btn1 = await page.$('.test-btn-1');

    return [q1, q2, q3, q4, input1, btn1];
};

const selectAnswerRandom = async (q1, q2, q3, q4, input1, btn1) => {
    if (q4?.click) {
        // Random for 4 question.
        const random = Math.floor(Math.random() * 4) + 1;

        if (random === 1) await q1.click();
        if (random === 2) await q2.click();
        if (random === 3) await q3.click();
        if (random === 4) await q4.click();
        return;
    }

    if (q2?.click) {
        // Random for 2 question.
        const random = Math.floor(Math.random() * 2) + 1;
        if (random === 1) await q1.click();
        if (random === 2) await q2.click();
        return;
    }

    // Write answer.
    await input1.type(`ESTO ES UNA RESPUESTA RANDOM ${Math.floor(Math.random() * 100) + 1}`);
    await btn1.click();
};

module.exports = {triviaFlow}
