const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const routesURL = "routes/";
let endpointsFiles = ['app.js'];

let fs = require("fs");
let path = require("path");
let myurl = "/Users/youhao/jiangduBackend/routes";

const doc = {
  info: {
    title: "江都 API",
    description: "小程序+管理后台共用接口api",
  },
  host: "localhost:4000",
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);

// fs.readdir(myurl, (err, files) => {
//   if (err) throw err;
//   files.forEach((file) => {
//     let fPath = path.join(routesURL, file);
//     // console.log(fPath);
//     endpointsFiles.push(fPath);
//   });
//   console.log(endpointsFiles);
//   swaggerAutogen(outputFile, endpointsFiles, doc);
// });
