var express = require("express");
var uunewid = require("uuid");
var router = express.Router();

const {
    ohana
} = require("ohana-node-orm");

/**
 *
 *
 */
function checkData(res, data) {
    if (data == null) {
        res.send(500);
    }
}

const tableName = "SAP_JIANGDU_JINRONGHUIQIS";
const tagTableName = "SAP_JIANGDU_TAG_FINS";
/* GET users listing. */
router.post("/", function (req, res, next) {
    // #swagger.tags = ['Fin']
    // #swagger.summary = '获取Fin'
    /* #swagger.security = [{
               "JiangduJWT": []
  }] */
    /*	#swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/definitions/fin_get"
                      }  
                  },
              }
      } */
    const {
        data
    } = req.body;
    const user = new ohana(tableName); // new ohana('table_name');
    if (!data||!data.NAME) {
        user.find().then((result) => {
            res.send(result);
        });
    } else {
        user.raw(
            "select * from " + tableName + " where NAME like '%" + data.NAME + "%'"
        ).then((result) => {
            res.send(result);
        });
    }

});

router.post("/add", function (req, res, next) {
    // #swagger.tags = ['Fin']
    // #swagger.summary = '新建Fin'
    /* #swagger.security = [{
               "JiangduJWT": []
  }] */
    /*	#swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/definitions/fin_add"
                      }  
                  },
              }
      } */
    const {
        data
    } = req.body;
    //console.log(uunewid.v4())
    data.FIN_ID = uunewid.v4();
    insertData(data)
        .then((result) => {
            if (result == 1) {
                res.sendStatus(200);
            } else {
                console.log(result);
                res.send(500);
            }
            //return res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

async function insertData(body) {
    const user = new ohana(tableName); // new ohana('table_name');
    const result = await user.insert(body);
    return result;
}

/**
 * Get the company by criterian
 */
router.post("/search", function (req, res, next) {
    // #swagger.tags = ['Fin']
    // #swagger.summary = '搜索Fin，query参数未知'
    /* #swagger.security = [{
               "JiangduJWT": []
  }] */
    const queryData = req.query;
    const user = new ohana(tableName); // new ohana('table_name');
    if (queryData == null) {
        user.find().then((result) => {
            res.send(result);
        });
    } else {
        user.find(queryData).then((result) => {
            res.send(result);
        });
    }
});

/**update fins  */
router.put("/", function (req, res, next) {
    // #swagger.tags = ['Fin']
    // #swagger.summary = '修改Fin'
    /* #swagger.security = [{
               "JiangduJWT": []
  }] */
    /*	#swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/definitions/fin_update"
                      }  
                  },
              }
      } */
    //   checkData(res, req.body.data)
    const {
        data
    } = req.body;
    //  console.log(data);
    updateFin(data)
        .then((result) => {
            if (result == 1) {
                res.sendStatus(200);
            } else {
                res.send(500);
            }
            //return res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

/*delete something*/
router.delete("/", function (req, res, next) {
    // #swagger.tags = ['Fin']
    // #swagger.summary = '删除Fin'
    /* #swagger.security = [{
               "JiangduJWT": []
  }] */
    /*	#swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/definitions/fin_delete"
                      }  
                  },
              }
      } */
    checkData(res, req.body.data);
    const {
        data
    } = req.body;
    deletePolicy(data)
        .then((result) => {
            console.log(result);
            if (result == 1) {
                res.sendStatus(200);
            } else {
                res.send(500);
            }
            //return res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

async function updateFin(body) {
    // console.log(body)
    const policy = new ohana(tableName); // new ohana('table_name');
    const result = await policy.update({
            FIN_ID: body.FIN_ID,
        },
        body
    );
    return result;
}
async function deletePolicy(body) {
    const policy = new ohana(tableName); // new ohana('table_name');
    const result = await policy.raw(
        'delete from "' + tableName + "\" where FIN_ID = '" + body.FIN_ID + "'"
    );
    return result;
}

/// fin tags

router.post("/finTags", function (req, res, next) {
    // #swagger.tags = ['Fin']
    // #swagger.summary = '获取标签'
    /* #swagger.security = [{
               "JiangduJWT": []
  }] */
    /*	#swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/definitions/fin_finTags"
                      }  
                  },
              }
      } */
    const {
        data
    } = req.body;
    getFinTag(data)
        .then((result) => {
            res.send(result);
            // if (result == 1) {
            //    res.send(result)
            // } else {
            //     res.send(500)
            // }
            //return res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/addTags", function (req, res, next) {
    // #swagger.tags = ['Fin']
    // #swagger.summary = '添加标签'
    /* #swagger.security = [{
               "JiangduJWT": []
  }] */
    /*	#swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/definitions/fin_addTags"
                      }  
                  },
              }
      } */
    const {
        data
    } = req.body;
    insertFinData(data)
        .then((result) => {
            //console.log(result);
            if (result == 1) {
                res.sendStatus(200);
            } else {
                res.send(500);
            }
            //return res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/deleteTags", function (req, res, next) {
    // #swagger.tags = ['Fin']
    // #swagger.summary = '删除标签'
    /* #swagger.security = [{
               "JiangduJWT": []
  }] */
    /*	#swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/definitions/fin_deleteTags"
                      }  
                  },
              }
      } */
    const {
        data
    } = req.body;
    deletaFinTag(data)
        .then((result) => {
            if (result == 1) {
                res.sendStatus(200);
            } else {
                res.send(500);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});
/**
 * Update COMMENTS, STATUS by USER_ID
 * @param {*} body
 * @returns
 */
router.put("/updateStatus", async (req, res, next) => {
    // #swagger.tags = ['Fin']
    // #swagger.summary = '？？？？？？？'
    /* #swagger.security = [{
               "JiangduJWT": []
  }] */
    /*	#swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/definitions/fin_updateStatus"
                      }  
                  },
              }
      } */
    const {
        data
    } = req.body;

    const user = new ohana(tableName);
    //console.log("UPDATE SAP_JIANGDU_USERS SET COMMENTS='"+ data.COMMENTS + "', STATUS='" + data.STATUS + "' WHERE USER_ID='"+data.USER_ID+"'")
    try {
        const result = await user.raw(
            "UPDATE SAP_JIANGDU_USERS SET COMMENTS='" +
            data.COMMENTS +
            "', STATUS='" +
            data.STATUS +
            "' WHERE USER_ID='" +
            data.USER_ID +
            "'"
        );
        if (result == 1) {
            res.sendStatus(200);
        } else {
            res.send(500);
        }
    } catch (err) {
        console.log(err);
    }
});

/**
 * 127.0.0.1:4000/api/users/getCompanyInfo
 * @param {*} body
 * @returns
 */
async function getFinTag(data) {
    const policyTag = new ohana(tagTableName); // new ohana('table_name');
    const result = await policyTag.raw(
        'select "TAG_ID", "TAG_NAME","TAG_VALUE" ,"TAG_CATEGORY" from "SAP_JIANGDU_TAGS" where "TAG_ID" in (Select "TAG_ID_TAG_ID" from "SAP_JIANGDU_TAG_FINS" where "FIN_ID_FIN_ID" = \'' +
        data.FIN_ID +
        "' )"
    );
    return result;
}
async function insertFinData(data) {
    const policyTag = new ohana(tagTableName); // new ohana('table_name');
    const result = await policyTag.insert(data);
    return result;
}
async function deletaFinTag(data) {
    const policyTag = new ohana(tagTableName); // new ohana('table_name');
    const result = await policyTag.raw(
        'delete from "' +
        tagTableName +
        "\" where FIN_ID_FIN_ID = '" +
        data.FIN_ID_FIN_ID +
        "' and TAG_ID_TAG_ID = '" +
        data.TAG_ID_TAG_ID +
        "'"
    );
    return result;
}

module.exports = router;