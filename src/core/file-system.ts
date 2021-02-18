import request from "request";
import fs from "fs";
import https from "https";

export const download = (url: string, destination: string) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https
      .get(url, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      })
      .on("error", (error) => {
        fs.unlink(destination, () => {});

        reject(error.message);
      });
  });

export const getFileAsBase64 = (path: string) => {
  const contents = fs.readFileSync(path, {encoding: 'base64'});
  return contents
}