import { glob } from "glob";
import fs from "fs/promises";
import path from "path";
import { Document } from "langchain/document";
import { readText } from "./read";
import { metaFromData } from "./metaFromVideo";

export async function processMarkDownFiles(
  directoryPath: string
): Promise<Document[]> {
  try {
    const fileNames = await glob("**/*.md", { cwd: directoryPath });
    console.log("files", fileNames);

    const docs: Document[] = [];
    for (const fileName of fileNames) {
      const filePath = path.join(directoryPath, fileName);
      const text = await fs.readFile(filePath, {
        encoding: "utf-8",
      });
      let URL_REGEX =
        /\[\*\*(https?:\/\/(?:www\.|m\.)?youtube\.com\/watch\?v=[A-Za-z0-9_-]+(?:&[a-zA-Z0-9_=-]+)?)(?:&t=\d+s)?\*\*\]/;

      let url = text?.match(URL_REGEX)[0]?.slice(3, -3);
      const metadata = { title: fileName, source: url };
      docs.push(
        new Document({
          pageContent: text,
          metadata,
        })
      );
    }
    // console.log("docs", docs);
    return docs;
  } catch (error) {
    console.log("error", error);
    throw new Error(`Could not read directory path ${directoryPath} `);
  }
}

export async function processTextFiles(
  directoryPath: string
): Promise<Document[]> {
  try {
    const fileNames = await glob("**/*.txt", { cwd: directoryPath });
    console.log("files", fileNames);

    const docs: Document[] = [];
    for (const fileName of fileNames) {
      const filePath = path.join(directoryPath, fileName);
      const text = await readText(filePath);
      const vidId = fileName.split("_")[1].replace(".txt", "");
      const { title, thumbnails, channel } = await metaFromData(vidId);
      const abChannel = channel?.split(" ").join("");
      const youtubeUrl = `https://www.youtube.com/watch?v=${vidId}&ab_channel=${abChannel}`;
      const metadata = { id: vidId, source: youtubeUrl, title, thumbnails };
      docs.push(
        new Document({
          pageContent: text,
          metadata,
        })
      );
    }
    return docs;
  } catch (error) {
    console.log("error", error);
    throw new Error(`Could not read directory path ${directoryPath} `);
  }
}

export async function text2mdx(directoryPath) {
  try {
    const fileNames = await glob("**/*.txt", { cwd: directoryPath });
    console.log("files", fileNames);

    const videoList = [];

    for (const fileName of fileNames) {
      const filePath = path.join(directoryPath, fileName);
      const text = await readText(filePath);
      const vidId = fileName.split("_")[1].replace(".txt", "");
      const { title, thumbnails, channel } = await metaFromData(vidId);
      const abChannel = channel?.split(" ").join("");
      const youtubeUrl = `https://www.youtube.com/watch?v=${vidId}&ab_channel=${abChannel}`;
      videoList.push({
        title,
        url: youtubeUrl,
      });
    }
    convertToMarkdown(videoList, "output_dir/video-list.md");
    return videoList;
  } catch (error) {
    console.log("error", error);
    throw new Error(`Could not read directory path ${directoryPath} `);
  }
}

function convertToMarkdown(podcastData, outputPath) {
  // Create the Markdown content
  let markdownContent = "";

  for (const podcast of podcastData) {
    if (podcast.title) {
      markdownContent += `- [${podcast.title}](${podcast.url})\n`;
    }
  }

  // Save the Markdown content to a file
  fs.writeFile(outputPath, markdownContent, (err) => {
    if (err) {
      console.error("Error saving Markdown file:", err);
    } else {
      console.log(`Markdown file saved successfully at ${outputPath}`);
    }
  });
}


