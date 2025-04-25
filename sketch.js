let question, radio, submitButton, result;
let questionData;
let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function preload() {
  questionData = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 設定漸層背景
  let gradient = drawingContext.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#dfe7fd");
  gradient.addColorStop(1, "#a1c4fd");
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height);

  // 設定問題文字
  question = createP('');
  question.style('font-size', '35px');
  question.style('color', '#000000');
  question.style('font-family', 'Arial, sans-serif');
  question.style('text-align', 'center');
  question.position(windowWidth / 2 - 200, windowHeight / 2 - 250);

  // 設定選項
  radio = createRadio();
  radio.style('font-size', '20px');
  radio.style('color', '#1b263b');
  radio.style('font-family', 'Arial, sans-serif');
  radio.position(windowWidth / 2 - 150, windowHeight / 2 - 150);

  // 設定送出按鈕
  submitButton = createButton('下一題');
  submitButton.style('font-size', '25px');
  submitButton.style('background-color', '#4CAF50');
  submitButton.style('color', 'white');
  submitButton.style('border', 'none');
  submitButton.style('border-radius', '12px');
  submitButton.style('padding', '10px 20px');
  submitButton.style('cursor', 'pointer');
  submitButton.position(windowWidth / 2 - 50, windowHeight / 2 + 50);
  submitButton.mousePressed(nextQuestion);

  // 設定結果顯示
  result = createP('');
  result.style('font-size', '25px');
  result.style('color', '#000000');
  result.style('font-family', 'Arial, sans-serif');
  result.style('text-align', 'center');
  result.position(windowWidth / 2 - 200, windowHeight / 2 + 150);

  loadQuestion();
}

function draw() {
  // 重繪漸層背景
  let gradient = drawingContext.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#dfe7fd");
  gradient.addColorStop(1, "#a1c4fd");
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height);

  // 繪製矩形框
  fill("#ffffff");
  stroke("#b8bedd");
  strokeWeight(4);
  rect(windowWidth / 4, windowHeight / 4, windowWidth / 2, windowHeight / 2, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  question.position(windowWidth / 2 - 200, windowHeight / 2 - 250);
  radio.position(windowWidth / 2 - 150, windowHeight / 2 - 150);
  submitButton.position(windowWidth / 2 - 50, windowHeight / 2 + 50);
  result.position(windowWidth / 2 - 200, windowHeight / 2 + 150);
}

function loadQuestion() {
  if (currentQuestion < questionData.getRowCount()) {
    let qText = questionData.getString(currentQuestion, 'question');
    let options = [
      questionData.getString(currentQuestion, 'option1'),
      questionData.getString(currentQuestion, 'option2'),
      questionData.getString(currentQuestion, 'option3'),
      questionData.getString(currentQuestion, 'option4')
    ];

    question.html(qText);
    radio.html('');
    options.forEach(option => radio.option(option));
    result.html('');
  } else {
    question.html('測驗結束');
    radio.hide();
    submitButton.html('再試一次');
    result.html(`答對了 ${correctAnswers} 題，答錯了 ${incorrectAnswers} 題`);
    submitButton.mousePressed(restartQuiz);
  }
}

function nextQuestion() {
  let correctAnswer = questionData.getString(currentQuestion, 'answer');
  if (radio.value() === correctAnswer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
  currentQuestion++;
  loadQuestion();
}

function restartQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  radio.show();
  submitButton.html('下一題');
  submitButton.mousePressed(nextQuestion);
  loadQuestion();
}
