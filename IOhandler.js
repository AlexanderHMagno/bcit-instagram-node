/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const { Transform } = require("stream");

const AdmZip = require("adm-zip");
const unzipper = require("unzipper"),
  fs = require("fs/promises"),
  { createReadStream, createWriteStream } = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((res, reject) => {
    const zip = new AdmZip(pathIn);
    res(zip.extractAllTo(pathOut, true));
  }).then(() => console.log("Extraction operation complete"));
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return fs
    .readdir(dir)
    .then((data) => data.filter((file) => path.extname(file).includes("png")));
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    createReadStream(pathIn)
      .pipe(
        new PNG({
          filterType: 4,
        })
      )
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            const gray =
              (Math.min(
                this.data[idx],
                this.data[idx + 1],
                this.data[idx + 2]
              ) +
                Math.max(
                  this.data[idx],
                  this.data[idx + 1],
                  this.data[idx + 2]
                )) /
              2;
            // invert color
            this.data[idx] = gray;
            this.data[idx + 1] = gray;
            this.data[idx + 2] = gray;

            // and reduce opacity
            // this.data[idx + 3] = this.data[idx + 3] >> 1;
          }
        }

        this.pack()
          .pipe(createWriteStream(pathOut))
          .on("error", (e) => {
            console.log(reject);
            reject(e);
          });
      })
      .on("end", (data) => resolve())
      .on("error", (e) => reject(e));
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
