const brandProfiles = [
  { name: "cui妃", line: "翠影入盏，清爽当先，宜解午后倦意。" },
  { name: "可贵妃", line: "香甜稳妥，贵气不张扬，今日宜宠自己。" },
  { name: "茉妃", line: "茉香轻盈，入口清雅，适合慢慢喝完。" },
  { name: "古妃", line: "古韵醇厚，茶底更沉，适合认真续命。" },
  { name: "点妃", line: "一点即中，灵感正盛，宜来杯开心局。" },
  { name: "喜贵人", line: "喜气盈杯，甜意刚好，今日万事可期。" },
  { name: "话贵人", line: "适合边喝边聊，茶香替你打开话匣。" },
  { name: "唐嫔", line: "浓淡相宜，风雅有余，适合犒赏这一刻。" },
];

const sugars = ["三分糖", "五分糖", "七分糖", "少糖", "标准甜"];
const ices = ["少冰", "正常冰", "去冰", "常温", "温热"];
const toppings = ["珍珠", "椰果", "芋圆", "奶盖", "茶冻", "不加小料"];

const brands = brandProfiles.map((profile) => profile.name);

const flipCard = document.querySelector("#flipCard");
const drawButton = document.querySelector("#drawButton");
const chosenName = document.querySelector("#chosenName");
const resultText = document.querySelector("#resultText");
const oracleLine = document.querySelector("#oracleLine");
const sugarText = document.querySelector("#sugarText");
const iceText = document.querySelector("#iceText");
const toppingText = document.querySelector("#toppingText");
const orderScroll = document.querySelector("#orderScroll");
const brandTokens = [...document.querySelectorAll(".brand-token")];

let lastPick = "";
let isDrawing = false;

window.addEventListener("load", () => {
  window.setTimeout(() => {
    document.body.classList.add("is-ready");
  }, 2600);
});

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function chooseProfile() {
  const candidates = brandProfiles.filter((profile) => profile.name !== lastPick);
  const pool = candidates.length > 0 ? candidates : brandProfiles;
  return pickRandom(pool);
}

function markPicked(brand) {
  brandTokens.forEach((token) => {
    token.classList.toggle("is-picked", token.textContent.trim() === brand);
  });
}

function showSparkles() {
  const burst = document.createElement("span");
  burst.className = "spark-burst";

  for (let index = 0; index < 18; index += 1) {
    const spark = document.createElement("span");
    const angle = (360 / 18) * index;
    const distance = 88 + Math.random() * 46;
    spark.className = "spark";
    spark.style.setProperty("--angle", `${angle}deg`);
    spark.style.setProperty("--distance", `${distance}px`);
    spark.style.setProperty("--delay", `${Math.random() * 90}ms`);
    burst.appendChild(spark);
  }

  flipCard.appendChild(burst);
  window.setTimeout(() => {
    burst.remove();
  }, 1100);
}

function revealOrder(profile) {
  chosenName.textContent = profile.name;
  resultText.textContent = `今日奉旨喝：${profile.name}`;
  oracleLine.textContent = profile.line;
  sugarText.textContent = pickRandom(sugars);
  iceText.textContent = pickRandom(ices);
  toppingText.textContent = pickRandom(toppings);
  orderScroll.classList.remove("is-revealed");
  window.requestAnimationFrame(() => {
    orderScroll.classList.add("is-revealed");
  });
}

function drawBrand() {
  if (isDrawing) {
    return;
  }

  isDrawing = true;
  flipCard.classList.remove("is-flipped");
  flipCard.classList.add("is-shuffling");
  drawButton.disabled = true;
  resultText.textContent = "宫灯已亮，正在传牌...";
  oracleLine.textContent = "茶令将出，稍候片刻";

  window.setTimeout(() => {
    const profile = chooseProfile();
    lastPick = profile.name;
    revealOrder(profile);
    markPicked(profile.name);
    flipCard.classList.remove("is-shuffling");
    flipCard.classList.add("is-flipped");
    showSparkles();
    drawButton.disabled = false;
    isDrawing = false;
  }, 760);
}

flipCard.addEventListener("click", drawBrand);
drawButton.addEventListener("click", drawBrand);
