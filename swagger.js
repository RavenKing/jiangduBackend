const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./swagger_output.json";

let endpointsFiles = ["app.js"];
// const routesURL = "routes/";
// let fs = require("fs");
// let path = require("path");
// let myurl = "/Users/youhao/jiangduBackend/routes";

const doc = {
  info: {
    title: "江都 API",
    description: "小程序+管理后台共用接口api",
  },
  host: "localhost:4000",
  schemes: ["http"],
  definitions: {
    user_login: { data: { username: "admin", password: "123456" } },
    user_register: { data: { username: "admin1", password: "1234561" } },
    user_updateStatus: {
      data: {
        USER_ID: "aa303c63-0a25-11ec-8516-342eb7e2a2ec",
        COMMENTS: "评价6798",
        STATUS: "黑名单",
      },
    },
    talents_tags: {
      data: { TALENT_ID_TALENT_ID: "020d921e-0a36-11ec-82f5-90ccdf01187c" },
    },
    policy: { data: {}, token: "4836f6e1-2e8b-4b45-b903-9cf88d990901" },
    policy_add: {
      data: {
        POLICY_ID: "",
        POLICY_TITLE: "ddd",
        CDATA: "ddd",
        CREATED_AT: "2021-09-08T03:22:17.848Z",
        UPDATED_AT: "2021-09-08T03:22:17.848Z",
        POLICY_URL: " ",
        USER_USER_ID: "2200",
      },
      token: "4836f6e1-2e8b-4b45-b903-9cf88d990901",
    },
  },
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
