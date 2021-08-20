var express = require('express');
var router = express.Router();
const {
  ohana
} = require('ohana-node-orm');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const user = new ohana('SAP_JIANGDU_USERS'); // new ohana('table_name');
  user.find().then((result) => {
    res.send(result)
  });
});

module.exports = router;