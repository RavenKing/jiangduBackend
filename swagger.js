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
    user_search: { data: {} },
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
    policy_update: {
      data: {
        POLICY_ID: "2cd0894c-0a25-11ec-a6b8-342eb7e2a2ec",
        POLICY_TITLE: "市政府关于印发《扬州市地方储备粮管理办法》的通知",
        CREATED_AT: "1970-01-01",
        UPDATED_AT: "1970-01-01",
        tags: [],
        CDATA: "ddd",
      },
    },
    policy_delete: {
      data: {
        text: "是否要删除市政府关于印发《扬州市公共安全视频图像信息系统管理办法》的通知(ID: 2cd0894d-0a25-11ec-9af9-342eb7e2a2ec)?",
        id: "2cd0894d-0a25-11ec-9af9-342eb7e2a2ec",
        type: "policy",
        POLICY_ID: "2cd0894d-0a25-11ec-9af9-342eb7e2a2ec",
      },
    },
    policy_policyTags: {
      data: {
        POLICY_ID_POLICY_ID: "2cd03b48-0a25-11ec-96a4-342eb7e2a2ec",
        TAG_ID_TAG_ID: "3af9ddba-0a25-11ec-be60-90ccdf01187c",
      },
      token: "4836f6e1-2e8b-4b45-b903-9cf88d990901",
    },
    policy_deleteTags: {
      data: {
        POLICY_ID_POLICY_ID: "2cd03b48-0a25-11ec-96a4-342eb7e2a2ec",
        TAG_ID_TAG_ID: "3af9ddba-0a25-11ec-be60-90ccdf01187c",
      },
      token: "4836f6e1-2e8b-4b45-b903-9cf88d990901",
    },
    tag_add: {
      data: {
        TAG_ID: "",
        TAG_NAME: "dfd",
        TAG_VALUE: "fd",
        TYPE: "AS",
        DESCRIPTION: "fdfdfd",
        TAG_CATEGORY: "dfd",
        CREATED_AT: "2021-09-08T09:12:12.624Z",
        UPDATED_AT: "2021-09-08T09:12:12.624Z",
        USER_ID_USER_ID: "2200",
      },
      token: "4836f6e1-2e8b-4b45-b903-9cf88d990901",
    },
    tag_delete: {
      data: {
        text: "是否要删除dfd(ID: 8759ede4-5fa4-4d41-80f3-eaa2d0624cef)?",
        id: "8759ede4-5fa4-4d41-80f3-eaa2d0624cef",
        type: "tag",
        TAG_ID: "8759ede4-5fa4-4d41-80f3-eaa2d0624cef",
      },
    },
    tag_update: {
      data: {
        TAG_ID: "a694aa03-2a5e-4267-95cc-302921ddd21c",
        TAG_NAME: "efef",
        TAG_VALUE: "fefefddddd",
        TYPE: "FI",
        DESCRIPTION: "feefe",
        CREATED_AT: "2021-09-08",
        UPDATED_AT: "2021-09-08",
        USER_ID_USER_ID: "2200",
        USER_NAME: "null",
        TAG_CATEGORY: "ewfwff",
      },
    },
    talent_update: {
      data: {
        TALENT_ID: "fc235c0a-0a35-11ec-9974-90ccdf01187c",
        TALENT_NAME: "彭十",
        AGE: 2,
        SEX: "0",
        POSITION: "null",
        DEGREE: 4,
        TYPE: "null",
        UNIVERSITY: "null",
        CAREER_YEAR: "4",
        COMPANY_NAME: "null",
        SALARY: "15k",
        AREA: "null",
        RESUME_URL: "null",
        CREATED_AT: "1970-01-01",
        UPDATED_AT: "1970-01-01",
        HIGHEST_EDUCATION: 2,
        WORK_YEARS: 1,
        CDATA: "ssss",
      },
    },
    talents_tags: {
      data: { TALENT_ID_TALENT_ID: "020d921e-0a36-11ec-82f5-90ccdf01187c" },
    },
    talent_delete: {
      data: { text: "是否要删除undefined(ID: undefined)?", type: "policy" },
    },
    talent_addTags: {
      data: {
        TALENT_ID_TALENT_ID: "020d921e-0a36-11ec-82f5-90ccdf01187c",
        TAG_ID_TAG_ID: "",
      },
    },
    talent_deleteTags: {
      data: {
        TALENT_ID_TALENT_ID: "020d921e-0a36-11ec-82f5-90ccdf01187c",
        TAG_ID_TAG_ID: "",
      },
    },
    recommendList: {
      data: {},
    },
    historical: { token: "2c59a359-77a0-4b66-9d66-02089946a04c" },
    fin_add: {
      data: {
        FIN_ID: "",
        LOGO_URL: "1",
        FIN_CODE: "",
        NAME: "ddd",
        DESCRIPTION: "1",
        WORKFLOW_URL: "1",
        URL: "1",
        APPLY_URL: "1",
        BANK_NAME: "",
        BANK_ID: "",
        STATUS: "1",
        FIN_START_DATE: "",
        FIN_END_DATE: "",
        CREATED_AT: "2021-09-08T09:51:59.635Z",
        UPDATED_AT: "2021-09-08T09:51:59.635Z",
        USER_ID_USER_ID: "1",
        USER_NAME: "1",
        RATE_LOW: "",
        RATE_HIGH: "",
        LOAN_QUOTA: "",
        LOAN_DATE_LOW: 1,
        LOAN_DATE_HIGH: 5,
        CHARGE_METHOD: "",
        REPAY_METHOD: "",
        TARGET: "",
        FIN_TYPE: "1",
        PRODUCT_TYPE: "",
        LOAN_TYPE: "",
      },
      token: "2c59a359-77a0-4b66-9d66-02089946a04c",
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
