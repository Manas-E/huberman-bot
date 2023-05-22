import fs from "fs";

export function readText(fileName: string) {
  try {
    var data = fs.readFileSync(fileName, "utf8");
    return data.toString();
  } catch (e: any) {
    console.log("Error:", e.stack);
    return e.stack;
  }
}
