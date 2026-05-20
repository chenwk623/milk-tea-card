const fs = require("fs");
const path = require("path");

const root = __dirname;
const dist = path.join(root, "dist");
fs.mkdirSync(dist, { recursive: true });

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
let css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const image = fs.readFileSync(path.join(root, "assets", "palace-tea-room.png")).toString("base64");

css = css.replace(
  /url\("assets\/palace-tea-room\.png"\)/g,
  `url("data:image/png;base64,${image}")`,
);

const singleFile = html
  .replace(
    /\s*<link rel="stylesheet" href="styles\.css" \/>/,
    `\n    <style>\n${css}\n    </style>`,
  )
  .replace(
    /\s*<script src="script\.js"><\/script>/,
    `\n    <script>\n${js.replace(/<\//g, "<\\/")}\n    </script>`,
  );

const out = path.join(dist, "今天奶茶喝哪家-单文件版.html");
fs.writeFileSync(out, singleFile, "utf8");

console.log(out);
console.log(fs.statSync(out).size);
