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
    version: '1.1.0',
    description: "小程序+管理后台共用接口api",
  },
  host: "localhost:4000",
  schemes: ["http"],
  definitions: {
    user: {
      data: {
        USER_ID: "aa314dca-0a25-11ec-a9e3-342eb7e2a2ec",
        PASSWORD: "null",
        TOKEN: "null",
        LOG_DATE: "null",
        VALIDATEDATE: "null",
        STATUS: "null",
        COMMENTS: "null",
        PHONE: "null",
        LEVEL: "null",
        AREA: "null",
        USER_NAME: "null",
        COMPANY_NAME: "江苏金世缘乳胶制品股份有限公司",
        COMPANY_CODE: "91321000691310517U",
        COMPANY_ADDRESS: "扬州市江都区小纪镇高徐工业园区",
        LEGAL_REPRESENTATIVE: "null",
        REGISTERED_CAPITAL: "4710 万人民币",
        CONTACT_PERSON: "null",
        CONTACT_PHONE: "null",
        TERM_OF_OPERATION: "null",
        COMPANY_TYPE: "股份有限公司",
        REGISTER_STATUS: "null",
        HEZHUN_TIME: "null",
        REGISTER_NUMBER: "null",
        REGISTER_CURRENCY: "null",
        BUSINESS_SCOPE:
          "生产乳胶制品，床上用品及配件、床垫及配件、家具生产、销售，道路普通货物运输，货物专用运输（集装箱），自营和代理各类商品及技术的进出口业务（国家限定企业进出口的商品和技术除外）。（依法须经批准的项目，经相关部门批准后方可开展经营活动）",
        CERTIFICATE_URL: "null",
        CREATED_AT: "null",
        UPDATED_AT: "null",
        COUNTRY_CODE: "null",
        DENGJI_JIGUAN: "null",
        INDUSTRY: "制造业",
        CAP: "橡胶和塑料制品业",
        ESTABLISHED_DATE: "2009-06-24 00:00:00.000000000",
        COMPANY_SIZE: "1",
        HAS_DISHONEST_ACT: "0",
        HAS_DEFAULTER: "1",
        TAX_SCORE: 20,
      },
    },
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
    recommendList_toggleNotice: {
      data: {
        RECOMMENDED_LIST_ID: 111,
        STATUS: "",
      },
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
    fin_update: {
      data: {
        FIN_ID: "ac61b1b3-0c60-11ec-a492-90ccdf01187c",
        LOGO_URL: "null",
        FIN_CODE: "4080",
        NAME: "信用贷",
        DESCRIPTION: "这是一个介绍",
        WORKFLOW_URL: "null",
        URL: "null",
        APPLY_URL: "null",
        BANK_NAME: "中国银行",
        BANK_ID: "1234",
        STATUS: "启用",
        FIN_START_DATE: "2015-11-28 00:00:00.000000000",
        FIN_END_DATE: "2008-12-22 00:00:00.000000000",
        CREATED_AT: "2018-05-02",
        UPDATED_AT: "2003-12-13",
        USER_ID_USER_ID: "1234",
        USER_NAME: "null",
        RATE_LOW: "5%",
        RATE_HIGH: "9%",
        LOAN_QUOTA: "300w",
        LOAN_DATE_LOW: 6,
        LOAN_DATE_HIGH: 26,
        CHARGE_METHOD: "信用",
        REPAY_METHOD: "担保公司",
        TARGET: "小微企业",
        FIN_TYPE: "H",
        PRODUCT_TYPE: "线上审批",
        LOAN_TYPE: "流动资金贷款",
      },
    },
    fin_delete: {
      data: {
        text: "是否要删除启信宝(ID: ac61d8b6-0c60-11ec-aaff-90ccdf01187c)?",
        id: "ac61d8b6-0c60-11ec-aaff-90ccdf01187c",
        type: "fin",
        FIN_ID: "ac61d8b6-0c60-11ec-aaff-90ccdf01187c",
      },
    },
    fin_finTags: {
      data: {
        FIN_ID: "ac61b1b3-0c60-11ec-a492-90ccdf01187c",
      },
      token: "2c59a359-77a0-4b66-9d66-02089946a04c",
    },
    fin_addTags: {
      data: {
        FIN_ID_FIN_ID: "ac61b1b3-0c60-11ec-a492-90ccdf01187c",
        TAG_ID_TAG_ID: "15cefa4b-0c63-11ec-9ac5-342eb7e2a2ec",
      },
      token: "2c59a359-77a0-4b66-9d66-02089946a04c",
    },
    fin_deleteTags: {
      data: {
        FIN_ID_FIN_ID: "ac61b1b3-0c60-11ec-a492-90ccdf01187c",
        TAG_ID_TAG_ID: "15cefa4b-0c63-11ec-9ac5-342eb7e2a2ec",
      },
      token: "2c59a359-77a0-4b66-9d66-02089946a04c",
    },
    fin_updateStatus: {
      data: {
        COMMENTS: "",
        STATUS: "",
        USER_ID: "",
      },
    },
    asset: { data: {}, token: "2c59a359-77a0-4b66-9d66-02089946a04c" },
    asset_add_update: {
      data: {
        ASSET_ID: "ad52d74e-0ede-11ec-b9ca-342eb7e2a2ec",
        ASSET_NAME: "设备3",
        ASSET_COUNTRY: "日本",
        MAKER: "制造商3",
        ASSET_COUNT: 10,
        START_DATE: "2021-09-06 14:50:08.990637000",
        USER_ID_USER_ID: "aa38a206-0a25-11ec-9885-342eb7e2a2ec",
        USER_NAME: "admin",
        STATUS: "已下架",
        AREA: "邗江",
        FIN_TIME: "Invalid date - Invalid date",
        RATE_RANGE: "undefined - undefined",
        CREATED_AT: "Invalid date",
        UPDATED_AT: "Invalid date",
        vgt_id: 0,
        originalIndex: 0,
        tags: [],
      },
      token: "2c59a359-77a0-4b66-9d66-02089946a04c",
    },
    asset_tag: {
      data: {
        ASSET_ID: "ad52d74e-0ede-11ec-b9ca-342eb7e2a2ec",
      },
      token: "2c59a359-77a0-4b66-9d66-02089946a04c",
    },
    asset_delete: {
      data: {
        text: "是否要删除undefined(ID: ad52d74d-0ede-11ec-8613-342eb7e2a2ec)?",
        id: "ad52d74d-0ede-11ec-8613-342eb7e2a2ec",
        type: "fin",
        ASSET_ID: "ad52d74d-0ede-11ec-8613-342eb7e2a2ec",
      },
    },
    asset_tag_add_delete: {
      data: {
        ASSET_ID_ASSET_ID: "ad52d74e-0ede-11ec-b9ca-342eb7e2a2ec",
        TAG_ID_TAG_ID: "15cefa4b-0c63-11ec-9ac5-342eb7e2a2ec",
      },
      token: "2c59a359-77a0-4b66-9d66-02089946a04c",
    },
    tech: { data: {}, token: "2c59a359-77a0-4b66-9d66-02089946a04c" },
    tech_add_update: {
      data: {
        TECH_ID: "7544d13c-9aad-4e25-a41f-f70619262687",
        TECH_CODE: "2",
        NAME: "专利2",
        DESCRIPTION: "专利描述2",
        DESCRIPTION_PIC_URL: " ",
        TYPE: "专利",
        PATENT_APPLICATION_COUNTRY: "国内",
        PATENT_APPLICATION_CODE: " ",
        PATENT_APPLICATION_DATE: "",
        PATENT_AUTHORIZATION_STATE: " ",
        PATENT_AUTHORIZATION_CODE: " ",
        PATENT_AUTHORIZATION_DATE: "",
        PATENT_APPLICANT: " ",
        PATENT_INVENTOR: " ",
        TRADEMARK_AVATAR: " ",
        TRADEMARK_REGISTERATION_CODE: " ",
        TRADEMARK_REGISTERATION_DATE: "",
        TRADEMARK_REGISTERATION_EXPIRE_DATE: "",
        TRADEMARK_APPLICANT: " ",
        COPYRIGHT_TYPE: " ",
        COPYRIGHT_REGISTERATION_CODE: " ",
        COPYRIGHT_REGISTERATION_DATE: "",
        COPYRIGHT_FINISHED_DATE: "",
        COPYRIGHT_PUBLISHED_DATE: "",
        COPYRIGHT_VERSION_CODE: " ",
        COPYRIGHT_CLASSIFICATION_CODE: " ",
        COPYRIGHT_AUTHORIZATION_DATE: " ",
        QUALIFICATION_CODE: " ",
        QUALIFICATION_STATUS: " ",
        QUALIFICATION_DATE: "",
        QUALIFICATION_EXPIRE_DATE: "",
        CONTACT_NAME: " ",
        PHONE: " ",
        EMAIL: " ",
        DEPARTMENT: " ",
        COMPANY_CODE_COMPANY_CODE: " ",
        COMPANY_NAME: " ",
        STATUS: "启用",
        CREATED_AT: "2021-09-09",
        UPDATED_AT: "2021-09-09",
        USER_ID_USER_ID: " ",
        USER_NAME: "张三",
        AREA: " ",
        NEW_INDUSTRY: " ",
        TARGET_PRICE: " ",
        QUANSHU_AREA: " ",
        IPC_CATEGORY: " ",
        PATENT_CATEGORY: " ",
        PCT: true,
        HEZUO_TYPE: " ",
      },
    },
    tech_delete: {
      data: {
        text: "是否要删除?",
        id: "ad52d74d-0ede-11ec-8613-342eb7e2a2ec",
        type: "fin",
        TECH_ID: "ad52d74d-0ede-11ec-8613-342eb7e2a2ec",
      },
      token: "2c59a359-77a0-4b66-9d66-02089946a04c",
    },
    tech_tag: {
      data: {
        TECH_ID: "ad52d74e-0ede-11ec-b9ca-342eb7e2a2ec",
      },
      token: "2c59a359-77a0-4b66-9d66-02089946a04c",
    },
    tech_tag_add_delete: {
      data: {
        TECH_ID_TECH_ID: "ad52d74e-0ede-11ec-b9ca-342eb7e2a2ec",
        TAG_ID_TAG_ID: "15cefa4b-0c63-11ec-9ac5-342eb7e2a2ec",
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
