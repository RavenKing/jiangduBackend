var express = require("express");
var uunewid = require("uuid");
var router = express.Router();
const { ohana } = require("ohana-node-orm");

/** */
function checkData(res, data) {
  if (data == null) {
    res.send(500);
  }
}

router.post("/latest/policy/companies", async (req, res, next) => {
  // #swagger.tags = ['Historical']
  console.log("working");
  //SELECT A1.COMPANY_NAME, A2.COUNT FROM "SAP_JIANGDU_FREQUENTLY_USED_ENTERPRISES" as A2 INNER JOIN "SAP_JIANGDU_USERS" as A1 ON A2.ENTERPRISE_ID_USER_ID = A1.USER_ID
  const histo = new ohana("SAP_JIANGDU_FREQUENTLY_USED_ENTERPRISES");
  const result = await histo.raw(
    'SELECT A1.USER_ID, A1.COMPANY_NAME, A1.COMPANY_CODE, A1.COMPANY_TYPE FROM "SAP_JIANGDU_FREQUENTLY_USED_ENTERPRISES" as A2 LEFT JOIN "SAP_JIANGDU_USERS" as A1 ON A2.ENTERPRISE_ID_USER_ID = A1.USER_ID ORDER BY COUNT DESC'
  );
  res.send(result);
});

module.exports = router;
