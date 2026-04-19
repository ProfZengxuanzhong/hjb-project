const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");

const report = path.join(__dirname, "..", "coverage", "lcov-report", "index.html");

if (!fs.existsSync(report)) {
  console.error("找不到覆盖率网页报告。请先运行: npm run test:coverage");
  console.error("期望文件:", report);
  process.exit(1);
}

const uri = path.resolve(report);
if (process.platform === "win32") {
  execFile("cmd", ["/c", "start", "", uri], () => {});
} else if (process.platform === "darwin") {
  execFile("open", [uri], () => {});
} else {
  execFile("xdg-open", [uri], () => {});
}

console.log("已在浏览器中打开:", uri);
