(() => {
  "use strict";

  const questionBank = window.RED_QUADRANT_QUESTIONS;
  if (!Array.isArray(questionBank) || questionBank.length < 10) {
    throw new Error("The quiz question bank did not load correctly.");
  }

  const gradingRules = {
    rq001: { accepts: ["temporary regulations expired", "2020 regulations expired", "covid meeting regulations expired", "high court ruled physical attendance was required", "local government act 1972 required physical attendance"] },
    rq008: { accepts: ["webtag", "transport analysis guidance"] },
    rq010: { accepts: ["new municipal bus companies", "their own bus companies", "municipal bus companies"] },
    rq011: { accepts: ["quarterly", "every three months", "four times a year"] },
    rq012: { accepts: ["benefit cost ratio", "benefit-cost ratio", "benefit to cost ratio"] },
    rq014: { accepts: ["12p", "12 pence"] },
    rq016: { accepts: ["secretary of state for education", "education secretary"] },
    rq019: { accepts: ["none", "no id", "no identification", "nothing"] },
    rq020: { accepts: ["chief finance officer", "section 151 officer", "s151 officer", "chief financial officer"] },
    rq022: { accepts: ["loading restrictions", "a loading restriction", "no loading"] },
    rq023: { accepts: ["no charge", "nothing", "free", "zero"] },
    rq025: {
      groups: [["right to build"], ["right to bid"], ["right to challenge"], ["community led design"], ["right to reclaim land"], ["neighbourhood planning", "neighborhood planning"], ["our place"], ["barrier busting"]],
      minimumGroups: 4,
    },
    rq027: { accepts: ["sent it to landfill", "put it in landfill", "landfill"] },
    rq029: { accepts: ["held by the councillor on behalf of the council", "on behalf of the council", "in an official council role"] },
    rq030: {
      groups: [["register to vote"], ["carers allowance", "carer allowance"], ["lasting power of attorney"], ["prison visit"], ["patent renewal"], ["student finance"], ["paye"], ["view driving record", "driving record"]],
      minimumGroups: 5,
    },
    rq032: { accepts: ["individual electoral registration", "ier"] },
    rq035: { accepts: ["bvpi 157", "best value performance indicator 157"] },
    rq036: { accepts: ["42", "42 days", "six weeks"] },
    rq037: { accepts: ["90", "90 percent", "ninety percent"] },
    rq040: { accepts: ["no", "it did not", "no it did not"] },
    rq042: { groups: [["no loss", "neither a loss", "not make a loss"], ["no profit", "nor a profit", "not make a profit"]], minimumGroups: 2 },
    rq043: { accepts: ["sylvia beckingham", "sylvia diggory"] },
    rq050: { groups: [["offices"], ["supermarket"]], minimumGroups: 2 },
    rq054: { groups: [["controlled", "control"], ["secret cabal", "cabal"], ["enemies", "enemy"]], minimumGroups: 2 },
    rq056: { accepts: ["a candidate", "candidate", "an election agent", "election agent"] },
    rq057: { groups: [["serial number", "identifying mark", "unique mark"], ["not seen", "cannot be seen", "hidden"]], minimumGroups: 2 },
    rq058: { accepts: ["four hours", "4 hours"] },
    rq059: { accepts: ["sent to her majesty", "sent to the queen", "goes to the crown", "paid to the crown", "hm treasury", "the treasury"] },
    rq060: { accepts: ["one year", "1 year", "12 months"] },
    rq061: { accepts: ["35 days", "thirty five days"] },
    rq068: { accepts: ["bin man", "binman", "refuse collector", "waste collector"] },
    rq070: { accepts: ["it did not close", "it never closed", "24 hours", "24 7", "always open"] },
    rq073: { accepts: ["roll a joint", "rolling a joint", "make a joint"] },
    rq078: { accepts: ["xbox", "xbox controllers", "x box controllers"] },
    rq084: { groups: [["norway"], ["sweden"]], minimumGroups: 2 },
    rq085: { groups: [["pain au chocolat"], ["chocolatine"]], minimumGroups: 2 },
    rq087: { accepts: ["eswatini", "e swatini"] },
    rq094: { accepts: ["three minutes", "3 minutes"] },
    rq097: { accepts: ["croydon", "croydon council"] },
    rq098: { accepts: ["one in five", "1 in 5", "22 percent", "22%", "about 20 percent", "a fifth"] },
    rq099: { accepts: ["hackney", "hackney council"] },
    rq101: { groups: [["luton"], ["manchester"]], minimumGroups: 2 },
    rq102: { accepts: ["6.5 million", "£6.5 million", "6.5m", "6 and a half million"] },
    rq103: { accepts: ["13.4 billion", "£13.4 billion", "13.4bn"] },
    rq105: { accepts: ["new york city", "new york", "nyc"] },
    rq107: { accepts: ["chiltern hundreds", "crown steward and bailiff of the chiltern hundreds", "manor of northstead", "crown steward and bailiff of the manor of northstead"] },
    rq108: { groups: [["head of paid service"], ["chief finance officer", "section 151", "s151"], ["monitoring officer"]], minimumGroups: 3 },
    rq109: { accepts: ["five clear days", "5 clear days"] },
    rq110: { accepts: ["quarterly", "every three months", "four times a year"] },
    rq111: { accepts: ["ban on their own bus companies", "ban on establishing their own bus companies", "municipal bus company ban", "ban on municipal bus companies"] },
    rq112: { accepts: ["remote attendance", "remote meetings", "online attendance", "proxy voting", "voting by proxy"] },
    rq113: {
      groups: [["adult sized changing bench", "adult changing bench", "changing bench"], ["hoist"], ["privacy screen", "privacy curtain"], ["space for the user and carers", "room for carers", "extra space"]],
      minimumGroups: 3,
    },
    rq114: { accepts: ["£1", "1 pound", "one pound", "1"] },
    rq115: { groups: [["office for national statistics", "ons"], ["national records of scotland", "nrs"], ["northern ireland statistics and research agency", "nisra"]], minimumGroups: 3 },
    rq117: { groups: [["land transaction tax", "ltt"], ["landfill disposals tax", "ldt"]], minimumGroups: 2 },
    rq118: { accepts: ["community right to bid", "right to bid"] },
    rq119: { groups: [["england"], ["scotland"], ["northern ireland"], ["wales"]], minimumGroups: 4 },
    rq120: { accepts: ["20 working days", "twenty working days"] },
    rq121: { accepts: ["parliamentary and health service ombudsman", "phso"] },
    rq122: { accepts: ["comptroller and auditor general", "c and ag", "c&ag"] },
    rq124: { accepts: ["government digital service", "gds"] },
    rq127: { accepts: ["her majesty the queen", "the queen", "queen", "queen elizabeth ii", "elizabeth ii"] },
    rq129: { accepts: ["roman remains", "roman ruins", "roman archaeology"] },
  };

  const numberWords = {
    zero: "0", one: "1", two: "2", three: "3", four: "4", five: "5", six: "6",
    seven: "7", eight: "8", nine: "9", ten: "10", eleven: "11", twelve: "12",
    thirteen: "13", fourteen: "14", fifteen: "15", twenty: "20", thirty: "30",
    thirtyfive: "35", forty: "40", fortytwo: "42", fifty: "50", fiftyfour: "54",
    seventy: "70", ninety: "90", onehundredandseventyfour: "174",
  };

  const geekScale = [
    { min: 0, max: 1, title: "Lost in reception", detail: "You may have come in to ask where the toilets are." },
    { min: 2, max: 3, title: "Agenda-pack dabbler", detail: "You know there are appendices. You do not necessarily open them." },
    { min: 4, max: 5, title: "Committee-room regular", detail: "You can recognise a monitoring officer at twenty paces." },
    { min: 6, max: 7, title: "Municipal obsessive", detail: "You have said ‘statutory guidance’ in ordinary conversation." },
    { min: 8, max: 9, title: "Section 151 sorcerer", detail: "The constitution is bookmarked, annotated and worryingly close at hand." },
    { min: 10, max: 10, title: "Local government oracle", detail: "Councils may now be legally required to consult you." },
  ];

  const elements = {
    runner: document.getElementById("quiz-runner"),
    results: document.getElementById("results"),
    form: document.getElementById("question-form"),
    number: document.getElementById("question-number"),
    progress: document.getElementById("progress"),
    category: document.getElementById("question-category"),
    question: document.getElementById("question-text"),
    answer: document.getElementById("open-answer"),
    previous: document.getElementById("previous-button"),
    next: document.getElementById("next-button"),
    score: document.getElementById("score-number"),
    scoreTitle: document.getElementById("score-title"),
    scoreDetail: document.getElementById("score-detail"),
    scale: document.getElementById("scale-grid"),
    answers: document.getElementById("answer-list"),
    restart: document.getElementById("restart-button"),
  };

  let questions = [];
  let responses = {};
  let currentIndex = 0;

  function normalise(value) {
    const joinedNumbers = value
      .toLowerCase()
      .replace(/thirty[ -]five/g, "thirtyfive")
      .replace(/forty[ -]two/g, "fortytwo")
      .replace(/fifty[ -]four/g, "fiftyfour")
      .replace(/one hundred and seventy[ -]four/g, "onehundredandseventyfour");

    return joinedNumbers
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/£/g, " ")
      .replace(/%/g, " percent ")
      .replace(/&/g, " and ")
      .replace(/\bmillions?\b/g, "m")
      .replace(/\bbillions?\b/g, "bn")
      .replace(/\bper cent\b/g, "percent")
      .replace(/[a-z]+/g, (word) => numberWords[word] || word)
      .replace(/[^a-z0-9.]+/g, " ")
      .replace(/\b(the|a|an)\b/g, " ")
      .replace(/(\d+(?:\.\d+)?)\s+(m|bn|percent)\b/g, "$1$2")
      .replace(/(?<!\d)\.|\.(?!\d)/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function editDistance(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, (_, row) => [row]);
    for (let column = 0; column <= a.length; column += 1) matrix[0][column] = column;
    for (let row = 1; row <= b.length; row += 1) {
      for (let column = 1; column <= a.length; column += 1) {
        matrix[row][column] = b[row - 1] === a[column - 1]
          ? matrix[row - 1][column - 1]
          : Math.min(matrix[row - 1][column - 1], matrix[row][column - 1], matrix[row - 1][column]) + 1;
      }
    }
    return matrix[b.length][a.length];
  }

  function similarEnough(response, expected) {
    const actual = normalise(response);
    const target = normalise(expected);
    if (!actual || !target) return false;
    if (actual === target) return true;

    const shorter = actual.length < target.length ? actual : target;
    const longer = actual.length < target.length ? target : actual;
    if (shorter.length >= 5 && longer.includes(shorter) && shorter.length / longer.length >= 0.55) return true;

    const allowance = target.length >= 12 ? 2 : target.length >= 6 ? 1 : 0;
    return Math.abs(actual.length - target.length) <= allowance && editDistance(actual, target) <= allowance;
  }

  function officialCandidates(answer) {
    const firstSentence = answer.split(/\.\s+(?=[A-Z“])/)[0].replace(/[.]$/, "");
    const candidates = [firstSentence];
    const beforeAside = firstSentence.split(/,|\s+\(also|\s+\(commonly/)[0];
    if (beforeAside.length >= 3) candidates.push(beforeAside);
    return candidates;
  }

  function isCorrect(question, response) {
    const rule = gradingRules[question.id];
    const actual = normalise(response);
    if (!actual) return false;

    if (rule && rule.groups) {
      const matched = rule.groups.filter((group) => group.some((term) => actual.includes(normalise(term)))).length;
      if (matched >= (rule.minimumGroups || rule.groups.length)) return true;
    }

    const expected = [...((rule && rule.accepts) || []), ...officialCandidates(question.answer)];
    return expected.some((candidate) => similarEnough(response, candidate));
  }

  function drawQuestions() {
    const shuffled = [...questionBank];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapWith = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapWith]] = [shuffled[swapWith], shuffled[index]];
    }
    return shuffled.slice(0, 10);
  }

  function renderQuestion() {
    const current = questions[currentIndex];
    elements.number.textContent = String(currentIndex + 1);
    elements.progress.value = currentIndex + 1;
    elements.progress.textContent = `Question ${currentIndex + 1} of 10`;
    elements.category.textContent = current.category;
    elements.question.textContent = current.prompt;
    elements.answer.value = responses[current.id] || "";
    elements.previous.disabled = currentIndex === 0;
    elements.next.textContent = currentIndex === 9 ? "Mark my answers" : "Next question";
    window.setTimeout(() => elements.answer.focus(), 0);
  }

  function startQuiz() {
    questions = drawQuestions();
    responses = {};
    currentIndex = 0;
    elements.results.hidden = true;
    elements.runner.hidden = false;
    renderQuestion();
  }

  function paragraphWithLabel(label, value, className) {
    const paragraph = document.createElement("p");
    if (className) paragraph.className = className;
    const strong = document.createElement("strong");
    strong.textContent = label;
    paragraph.append(strong, document.createTextNode(` ${value}`));
    return paragraph;
  }

  function renderResults() {
    const score = questions.reduce((total, question) => total + (isCorrect(question, responses[question.id] || "") ? 1 : 0), 0);
    const resultBand = geekScale.find((band) => score >= band.min && score <= band.max) || geekScale[0];

    elements.score.textContent = String(score);
    elements.scoreTitle.textContent = resultBand.title;
    elements.scoreDetail.textContent = resultBand.detail;
    elements.scale.replaceChildren();
    geekScale.forEach((band) => {
      const item = document.createElement("div");
      item.className = band === resultBand ? "scale-band is-current" : "scale-band";
      const range = document.createElement("strong");
      range.textContent = band.min === band.max ? String(band.min) : `${band.min}–${band.max}`;
      const title = document.createElement("span");
      title.textContent = band.title;
      item.append(range, title);
      elements.scale.append(item);
    });

    elements.answers.replaceChildren();
    questions.forEach((question) => {
      const response = responses[question.id] || "";
      const correct = isCorrect(question, response);
      const item = document.createElement("li");
      item.className = correct ? "is-correct" : "is-wrong";

      const mark = document.createElement("span");
      mark.className = "answer-mark";
      mark.setAttribute("aria-label", correct ? "Correct" : "Incorrect");
      mark.textContent = correct ? "✓" : "×";

      const copy = document.createElement("div");
      const category = document.createElement("p");
      category.className = "answer-category";
      category.textContent = question.category;
      const heading = document.createElement("h3");
      heading.textContent = question.prompt;
      copy.append(category, heading, paragraphWithLabel("Your answer:", response));
      if (!correct) copy.append(paragraphWithLabel("Correct answer:", question.answer, "correct-answer"));

      item.append(mark, copy);
      elements.answers.append(item);
    });

    elements.runner.hidden = true;
    elements.results.hidden = false;
    elements.results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  elements.answer.addEventListener("input", () => {
    responses[questions[currentIndex].id] = elements.answer.value;
  });

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    responses[questions[currentIndex].id] = elements.answer.value.trim();
    if (currentIndex === 9) {
      renderResults();
      return;
    }
    currentIndex += 1;
    renderQuestion();
  });

  elements.previous.addEventListener("click", () => {
    responses[questions[currentIndex].id] = elements.answer.value.trim();
    currentIndex = Math.max(0, currentIndex - 1);
    renderQuestion();
  });

  elements.restart.addEventListener("click", () => {
    startQuiz();
    elements.runner.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  startQuiz();
})();
