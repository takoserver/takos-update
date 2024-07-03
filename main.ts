import $ from "@david/dax";

async function main() {
  const config = {
    virsion: "0.1.2.1"
  }
  const denoJson = await Deno.readTextFile("./deno.json");
  const denoJsonObj = JSON.parse(denoJson);
  const version = denoJsonObj.version;
  if(version > config.virsion) {
    console.log("This script is old, please use latest update script");
    return;
  }
  if(version === config.virsion) {
    console.log("This script is latest version");
    return;
  }
  //gitがインストールされているか確認
  const git = await $`git --version`;
  if(git.stderr) {
    console.log("Please install git");
    return;
  }
  //gitのリポジトリを取得
  const gitRemote = await $`git remote -v`;
  if(gitRemote.stderr) {
    console.log("Please set git remote");
    return;
  }
  //https://github.com/takoserver/takosかどうか確認
  if(!gitRemote.stdout.includes("https://github.com/takoserver/takos")) {
    console.log("This script is not takos script");
    return;
  }
}
export default main;