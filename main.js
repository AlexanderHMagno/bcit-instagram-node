const path = require("path");
const { unzip, readDir, grayScale } = require("./IOhandler");

/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:October 17th
 * Author: Alexander Hortua
 *
 */

const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

Promise.resolve()
  .then(() => unzip(zipFilePath, pathUnzipped))
  .then(() => readDir(pathUnzipped))
  .then((files) => {
    const prom = [];
    files.forEach((element) => {
      prom.push(
        grayScale(
          path.join(pathUnzipped, element),
          path.join(pathProcessed, element)
        )
      );
    });
    return Promise.all(prom);
  })
  .catch(console.log);
