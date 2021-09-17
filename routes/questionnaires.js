var express = require("express");
var uunewid = require("uuid");
var router = express.Router();
const { ohana } = require("ohana-node-orm");

//创建问卷答案
router.post("/", async (req, res, next) => {
  // #swagger.tags = ['Questionnaire']
  // #swagger.summary = '创建questionnaire'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/questionnaire"
                    }  
                },
            }
    } */
  const { data } = req.body;
  data.uuid = uunewid.v4();
  console.log(data)
  const result = await insertJsonDoc(data);
  if (result == 1) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

//list问卷答案
/**
 * "USER_ID": "455bdad0-4cbb-4bc4-85b0-0c34c0e4d8c4"
 * 问卷id
 **/
router.get("/", async (req, res, next) => {
  // #swagger.tags = ['Questionnaire']
  // #swagger.summary = '获取questionnaire'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /* #swagger.parameters['USER_ID'] = {
        description: 'the USER_ID',
        required: true,
        type: 'integer',
} */

  const queryData = req.query;
  console.log(queryData);
  const result = await getJsonDoc(queryData);
  console.log(result);
  res.send(result);
});

//更新问卷 只能更新Answers
/**
{
	"data":{"ANSWERS": {"TEST": "132", "COOL": "it works"}, "UUID": "455bdad0-4cbb-4bc4-85b0-0c34c0e4d8c4"}
}
**/
router.put("/", async (req, res, next) => {
  // #swagger.tags = ['Questionnaire']
  // #swagger.summary = '更新questionnaire'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/questionnaire_update"
                    }  
                },
            }
    } */
  const { data } = req.body;
  const result = await updateJsonDoc(data);
  console.log(result);
  if (result == 1) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

router.post("/count", async (req, res, next) => {
  // #swagger.tags = ['Questionnaire']
  // #swagger.summary = '计数questionnaire'
  /*	#swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/definitions/questionnaire_countQuestionnaire"
                  }  
              },
          }
  } */
  const { data } = req.body;
  const result = await countQuestionnaire(data);
  res.send(result);
  // if (result == 1) {
  //   res.send(result)
  // } else {
  //   res.sendStatus(500)
  // }
});

/*
 *删除问卷id
 */

router.delete("/", async (req, res, next) => {
  // #swagger.tags = ['Questionnaire']
  // #swagger.summary = '删除questionnaire'
  /* #swagger.security = [{
               "JiangduJWT": []
  }] */
  /*	#swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/definitions/questionnaire_delete"
                  }  
              },
          }
  } */
  const { data } = req.body;
  const result = await deleteJsonDoc(data);

  if (result == 1) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

async function checkDuplicateDate(data,conn)
{
  console.log(data);
  const stringText = "delete from  QUESTIONNAIRES where USER_ID = '"+data.USER_ID +"' and ASSESSMENT_NAME= '"+data.ASSESSMENT_NAME + "'"
  const result = await conn.raw(stringText);
  console.log(result);

}
async function insertJsonDoc(data) {
  const histo = new ohana("SAP_JIANGDU_FREQUENTLY_USED_ENTERPRISES");
  const waitDelete= await checkDuplicateDate(data,histo);
  console.log(waitDelete)
  var json = JSON.stringify(data); // {"type":"Fiat","model":"500","color":"White"}为了去掉"符合HANA json 插入的格式
  var unquoted = json.replace(/"([^"]+)":/g, "$1:");
  let resultText = unquoted.replace(new RegExp('"', "g"), "'");
  var stringText = "insert into QUESTIONNAIRES values(" + resultText + ")";
  const result = await histo.raw(stringText);
  return result;
}
async function getJsonDoc(data) {
  const histo = new ohana("SAP_JIANGDU_FREQUENTLY_USED_ENTERPRISES");
  var stringText = "select * from  QUESTIONNAIRES where USER_ID = '" + data.USER_ID + "'";
  const result = await histo.raw(stringText);
  return {
    data: result,
  };
}

async function updateJsonDoc(data) {
  const histo = new ohana("SAP_JIANGDU_FREQUENTLY_USED_ENTERPRISES");
  var json = JSON.stringify(data.ANSWERS); // {"type":"Fiat","model":"500","color":"White"}为了去掉"符合HANA json 插入的格式
  var unquoted = json.replace(/"([^"]+)":/g, "$1:");
  let resultText = unquoted.replace(new RegExp('"', "g"), "'");
  var stringText =
    "update QUESTIONNAIRES SET ANSWERS = " +
    resultText +
    " where UUID = '" +
    data.UUID +
    "'";
  ///UPDATE  Questionnaires  SET  "ANSWERS" = {test:12312} where UUID = '455bdad0-4cbb-4bc4-85b0-0c34c0e4d8c4'

  console.log(stringText);
  const result = await histo.raw(stringText);
  return result;
}

async function deleteJsonDoc(data) {
  const histo = new ohana("SAP_JIANGDU_FREQUENTLY_USED_ENTERPRISES");
  var stringText =
    "delete from  QUESTIONNAIRES where UUID = '" + data.UUID + "'";
  console.log(stringText);
  const result = await histo.raw(stringText);
  return result;
}
async function countQuestionnaire(data) {
  const histo = new ohana("SAP_JIANGDU_FREQUENTLY_USED_ENTERPRISES");
  var stringText = "select count(*) as total from QUESTIONNAIRES where USER_ID = '" + data.USER_ID + "'";
  const result = await histo.raw(
    stringText
  );
  return result;
}
module.exports = router;
