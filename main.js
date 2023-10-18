const path = require("path");
const { unzip, readDir, grayScale } = require("./IOhandler");

/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

// IOhandler.unzip(zipFilePath, pathUnzipped);
// IOhandler.readDir(pathUnzipped);

// IOhandler.grayScale(
//   path.join("unzipped", "in.png"),
//   path.join(pathProcessed, "in.png")
// );

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
