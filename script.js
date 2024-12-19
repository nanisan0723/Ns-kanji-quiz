const kanjiData = [
    { kanji: "引", readings: ["イン・ひく・ひける", "カツ・いきる", "エン・その・そのけ", "ガン・いわ"] },
    { kanji: "羽", readings: ["ウ・は・はね", "ショウ・すくない", "コウ・ひかり", "カツ・いきる"] },
    { kanji: "雲", readings: ["ウン・くも・くもる", "コク・くに", "カイ・まわる", "キン・ちかい"] },
    { kanji: "園", readings: ["エン・その・そのけ", "カツ・いきる", "ガイ・そと", "セツ・きる"] },
    { kanji: "遠", readings: ["エン・とおい・とおく", "バイ・かう", "ガン・まるい", "ジョウ・ば"] },
    { kanji: "何", readings: ["カ・なに・なん", "エ・え", "サン・たしざん", "キュウ・ゆみ"] },
    { kanji: "科", readings: ["カ・くさばな・いん", "ソ・くみ", "ガン・かお", "コウ・ひかり"] },
    { kanji: "夏", readings: ["カ・なつ", "ケイ・かたち", "ガイ・そと", "シツ・むろ"] },
    { kanji: "家", readings: ["カ・いえ・や", "キョウ・おしえる", "セイ・ほし", "メイ・なく"] },
    { kanji: "歌", readings: ["カ・うた・うたう", "ケイ・あに", "リ・ことわり", "バク・むぎ"] },
    { kanji: "画", readings: ["ガ・カク・え", "カツ・いきる", "キ・しるす", "ドク・よむ"] },
    { kanji: "回", readings: ["カイ・まわる・まわす", "ソ・くみ", "シツ・むろ", "バン"] },
    { kanji: "会", readings: ["カイ・あう・あわせる", "ケイ・あに", "サン・たしざん", "ハン・なかば"] },
    { kanji: "海", readings: ["カイ・うみ", "リ・ことわり", "ケイ・ギョウ", "コウ・まじる"] },
    { kanji: "絵", readings: ["エ・え・えがく", "キン・ちかい", "キ・しるす", "ソウ・はしる"] },
    { kanji: "外", readings: ["ガイ・そと・はずす", "セツ・きる", "サン・たしざん", "チ・いけ"] },
    { kanji: "角", readings: ["カク・かど・つの", "カツ・いきる", "カイ・うみ", "ジョウ・ば"] },
    { kanji: "楽", readings: ["ガク・たのしい・たのしむ", "コク・くろ", "セイ・はれる", "エン・その"] },
    { kanji: "活", readings: ["カツ・いきる・いきいき", "ガイ・そと", "コン・いま", "リ・ことわり"] },
    { kanji: "間", readings: ["カン・あいだ・ま", "キュウ・ゆみ", "エン・とおい", "ケイ・あに"] },
    { kanji: "丸", readings: ["ガン・まる・まるい", "シ・あね", "バイ・かう", "フ・ちち"] },
    { kanji: "岩", readings: ["ガン・いわ", "ガイ・そと", "セイ・こえ", "カイ・まわる"] },
    { kanji: "顔", readings: ["ガン・かお", "カ・くさばな", "コン・キン", "トウ・かたな"] },
    { kanji: "汽", readings: ["キ・き", "ケイ・ギョウ", "タ・おおい", "チ・じ"] },
    { kanji: "記", readings: ["キ・しるす", "コウ・まじる", "セツ・きる", "コウ・ひかる"] },
    { kanji: "帰", readings: ["キ・かえる・かえす", "チュウ・ひる", "ハン・なかば", "セツ・ゆき"] },
    { kanji: "弓", readings: ["キュウ・ゆみ", "カツ・いきる", "コウ・おおやけ", "バン"] },
    { kanji: "牛", readings: ["ギュウ・うし", "ガイ・そと", "ケイ・ギョウ", "ソウ・はしる"] },
    { kanji: "魚", readings: ["ギョ・うお・さかな", "ソ・くみ", "チ・いけ", "メイ・なく"] },
    { kanji: "京", readings: ["キョウ・ケイ・みやこ", "バク・むぎ", "セツ・きる", "ガイ・そと"] },
    { kanji: "強", readings: ["キョウ・ゴウ・つよい・しなやか", "ハン・なかば", "リ・ことわり", "サイ・ざい"] },
    { kanji: "教", readings: ["キョウ・おしえる", "カイ・うみ", "ジョウ・ば", "セイ・ほし"] },
];

let score = 0;
let timeLeft = 60;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreElement.textContent = `得点: ${score}`;
    timerElement.textContent = `残り時間: ${timeLeft}秒`;
    nextQuestion();

    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `残り時間: ${timeLeft}秒`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`ゲーム終了! 最終得点: ${score}`);
        }
    }, 1000);
}

function nextQuestion() {
    const questionData = kanjiData[Math.floor(Math.random() * kanjiData.length)];
    const correctAnswer = questionData.readings[0];
    const allChoices = [...questionData.readings];
    shuffle(allChoices);

    questionElement.textContent = `問題: ${questionData.kanji}`;
    choicesElement.innerHTML = "";

    allChoices.forEach((choice) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => {
            if (choice === correctAnswer) {
                correctSound.play();
                score++;
                scoreElement.textContent = `得点: ${score}`;
                timeLeft += 1;
            } else {
                incorrectSound.play();
            }
            nextQuestion();
        };
        choicesElement.appendChild(button);
    });
}

startGame();
