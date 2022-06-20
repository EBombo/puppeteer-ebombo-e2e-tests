const { faker } = require("@faker-js/faker");
const { TEN_MINUTES, FIVE_MINUTES } = require("../utils");

// Type questions.
const TRUE_FALSE_QUESTION_TYPE = "trueFalse";
const ALTERNATIVES_QUESTION_TYPE = "quiz";
const OPEN_QUESTION_TYPE = "shortAnswer";

const TRUE_FALSE_QUESTION_LABEL = "Verdadero o Falso";
const ALTERNATIVES_QUESTION_LABEL = "Quiz";
const OPEN_QUESTION_LABEL = "Escribe tu respuesta";

async function answerOpenQuestionFlow(_s) {

  const inputXPath = "/html/body/div[1]/div/div[3]/div[2]/div/div/form/div[1]/div/div/input";

  await _s.page.waitForXPath(inputXPath, { timeout: FIVE_MINUTES });

  const inputEl =  await _s.findElementByFullXPath(inputXPath);

  const randomWord = faker.word.noun();

  await inputEl.type(randomWord);

  const buttonXPath = "/html/body/div[1]/div/div[3]/div[2]/div/div/form/div[2]/button";


  const buttonEl =  await _s.findElementByFullXPath(buttonXPath);

  buttonEl.click();
}

async function answerTrueFalseQuestionFlow(_s) {
  const randomAnswerSelection = Math.ceil(Math.random() * 2);

  const alternatives = {
    1: "/html/body/div[1]/div/div[3]/div[2]/div[1]",
    2: "/html/body/div[1]/div/div[3]/div[2]/div[2]",
  };

  const selectedAlternativeXPath = alternatives[randomAnswerSelection] ?? alternatives[1];

  await _s.page.waitForXPath(selectedAlternativeXPath, { timeout: FIVE_MINUTES });

  const selectedAlternativeEl =  await _s.findElementByFullXPath(selectedAlternativeXPath);
  await selectedAlternativeEl.click();
}

async function answerAlternativeQuestionFlow(_s) {
  const randomAnswerSelection = Math.ceil(Math.random() * 4);

  const alternatives = {
    1: "/html/body/div[1]/div/div[3]/div[2]/div[1]",
    2: "/html/body/div[1]/div/div[3]/div[2]/div[2]",
    3: "/html/body/div[1]/div/div[3]/div[2]/div[3]",
    4: "/html/body/div[1]/div/div[3]/div[2]/div[4]",
  };

  const selectedAlternativeXPath = alternatives[randomAnswerSelection] ?? alternatives[1];

  await _s.page.waitForXPath(selectedAlternativeXPath, { timeout: FIVE_MINUTES });

  const selectedAlternativeEl =  await _s.findElementByFullXPath(selectedAlternativeXPath);
  await selectedAlternativeEl.click();
}

const checkTypeOfQuestion = async (_s) => {

  const optionsContainerSelector = "#__next > div > div.grid.md\\:grid-cols-\\[1fr_3fr_1fr\\].bg-secondaryDark.bg-opacity-50.pb-2 > div.grid.md\\:grid-cols-2.md\\:col-start-2.md\\:col-end-3"
  const optionsSelector = "#__next > div > div.grid.md\\:grid-cols-\\[1fr_3fr_1fr\\].bg-secondaryDark.bg-opacity-50.pb-2 > div.grid.md\\:grid-cols-2.md\\:col-start-2.md\\:col-end-3 > div"

  await _s.page.waitForSelector(optionsContainerSelector, { timeout: FIVE_MINUTES });

  const alternativesNodes =  await _s.page.$$(optionsSelector);

  switch(alternativesNodes.length) {
    case 4:
      return ALTERNATIVES_QUESTION_TYPE
    case 2:
      return TRUE_FALSE_QUESTION_TYPE
    case 1:
      return OPEN_QUESTION_TYPE
  }
};

async function waitUntilScoreboardAppears(_s) {
  await _s.page.waitForXPath("/html/body/div[1]/div[2]/div/div/div[1]", { timeout: FIVE_MINUTES });
  return null;
}

async function answerQuestionAndWaitForScoreboardFlow(_s) {
  console.log(`>>> finding question type ...`);
  const typeQuestion = await checkTypeOfQuestion(_s); 

  console.log(`>>> Answering question type ${typeQuestion}...`);
  switch(typeQuestion) {
    case ALTERNATIVES_QUESTION_TYPE:
      await answerAlternativeQuestionFlow(_s);
      break;
    case TRUE_FALSE_QUESTION_TYPE:
      await answerTrueFalseQuestionFlow(_s);
      break;
    case OPEN_QUESTION_TYPE:
      await answerOpenQuestionFlow(_s);
      break;
  }
  console.log(`>>> Finish answering question type ${typeQuestion}...`);
  console.log(`>>> waiting for scoreboard...`);

  await waitUntilScoreboardAppears(_s);

  console.log(`>>> scoreboard finally appeared...`);
}

async function checkQuestionStepFlow(_s) {

  const questionStepFullXPath = "/html/body/div[1]/div/div[2]/div[1]/div[1]/div[2]";

  await _s.page.waitForXPath(questionStepFullXPath, { timeout: FIVE_MINUTES });

  const questionStepDivEl = await _s.findElementByFullXPath(questionStepFullXPath);

  let questionStep = await _s.page.evaluate(el => el.textContent, questionStepDivEl)

  const currentStep = questionStep[0];
  const finalStep = questionStep[questionStep.length - 1];

  console.log(`=> currentStep: ${currentStep}. finalStep ${finalStep} \n`);

  if (currentStep === finalStep) return { isLastQuestion: true };

  return { isLastQuestion: false };
}

async function playerAnsweringQuestionsFlow(_s) {

  const { isLastQuestion } = await checkQuestionStepFlow(_s);
  console.log(`=> isLastQuestion?: ${isLastQuestion}\n`);

  await answerQuestionAndWaitForScoreboardFlow(_s);

  if (!isLastQuestion) {
    return await playerAnsweringQuestionsFlow(_s);
  }

  return;
}

module.exports = {
  playerAnsweringQuestionsFlow,
}

