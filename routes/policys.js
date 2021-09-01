var express = require('express');
var uunewid = require('uuid');
var router = express.Router();
const {
    ohana
} = require('ohana-node-orm');

/** */
function checkData(res, data) {
    if (data == null) {
        res.send(500)
    }
}
/* GET users listing. */
router.get('/', function (req, res, next) {
    getPolicy().then((result) => {
        //console.log(result);
        res.send(result);
        //return res.send(result)
    }).catch((err) => {
        console.log(err);
    })
});

/**update policy  */
router.put('/', function (req, res, next) {
    checkData(res, req.body.data)
    const {
        data
    } = req.body;
    updatePolicy(data).then((result) => {
        console.log(result);
        if (result == 1) {
            res.sendStatus(200)
        } else {
            res.send(500)
        }
        //return res.send(result)
    }).catch((err) => {
        console.log(err);
    })
});

router.post('/policyTags',function(req,res,next){
    const {
        data
    } = req.body;
    insertPolicyData(data).then((result) => {
        //console.log(result);
        if (result == 1) {
            res.sendStatus(200)
        } else {
            res.send(500)
        }
        //return res.send(result)
    }).catch((err) => {
        console.log(err);
    })
});

router.post('/deleteTags',function(req,res,next){
    const {
        data
    } = req.body;
    deletaPolicyTag(data).then((result) => {
        if (result == 1) {
            res.sendStatus(200)
        } else {
            res.send(500)
        }
    }).catch((err) => {
        console.log(err);
    })
});

/** insert policys */
router.post('/', function (req, res, next) {
    const {
        data
    } = req.body;
    console.log(data);
    //console.log(uunewid.v4())
    data.POLICY_ID = uunewid.v4();
    insertData(data).then((result) => {
        console.log(result);
        if (result == 1) {
            res.sendStatus(200)
        } else {
            res.send(500)
        }
        //return res.send(result)
    }).catch((err) => {
        console.log(err);
    })
});


async function insertData(body) {
    const policy = new ohana('SAP_JIANGDU_POLICYS'); // new ohana('table_name');
    const result = await policy.insert(body);
    return result;
}

/**delete policy  */
router.delete('/', function (req, res, next) {
    checkData(res, req.body.data);
    const {
        data
    } = req.body;
    deletePolicy(data).then((result) => {
        console.log(result);
        if (result == 1) {
            res.sendStatus(200)
        } else {
            res.send(500)
        }
        //return res.send(result)
    }).catch((err) => {
        console.log(err);
    })

})


async function getPolicy() {

    const policy = new ohana('SAP_JIANGDU_POLICYS'); // new ohana('table_name');
 //    const result = await policy.find(["POLICY_ID", "POLICY_TITLE", "CREATED_AT", "UPDATED_AT"]);
    const result = await policy.raw(
        "SELECT TOP 5      \"POLICY_ID\",  \"POLICY_TITLE\", \"CREATED_AT\", \"UPDATED_AT\" FROM \"SAP_JIANGDU_POLICYS\""
    )
    for (var i = 0; i < result.length; i++) {
        result[i].tags =
            await policy.raw(
                "select \"TAG_ID\", \"TAG_NAME\",\"TAG_VALUE\" from \"SAP_JIANGDU_TAGS\" where \"TAG_ID\" in (Select \"TAG_ID_TAG_ID\" from \"SAP_JIANGDU_TAG_POLICYS\" where \"POLICY_ID_POLICY_ID\" = '" + result[i].POLICY_ID + "' )"
            );
    }
    return result;

}

// async function getPolicyTags(policyTag) {
//     const policy = new ohana('SAP_JIANGDU_POLICYS'); // new ohana('table_name');
//     const result = await policy.raw(
//         "select * from \"SAP_JIANGDU_TAGS\" where \"TAG_ID\" in (Select \"TAG_ID_TAG_ID\" from \"SAP_JIANGDU_TAG_POLICYS\" where \"POLICY_ID_POLICY_ID\" = '" + policyTag + "' )"
//     );
//     return result;
//}
async function updatePolicy(body) {
    const policy = new ohana('SAP_JIANGDU_POLICYS'); // new ohana('table_name');
    const result = await policy.update({
        POLICY_ID: body.POLICY_ID
    }, body);
    return result;
}
async function deletePolicy(body) {
    const policy = new ohana('SAP_JIANGDU_POLICYS'); // new ohana('table_name');
    const result = await policy.raw("delete from \"SAP_JIANGDU_POLICYS\" where POLICY_ID = '" + body.POLICY_ID + "'");
    return result;
}

async function insertPolicyData(data)
{
    const policyTag = new ohana('SAP_JIANGDU_TAG_POLICYS'); // new ohana('table_name');
    const result = await policyTag.insert(data);
    return result;
}

async function deletaPolicyTag(data)
{
    const policyTag = new ohana('SAP_JIANGDU_TAG_POLICYS'); // new ohana('table_name');
    const result = await policyTag.raw("delete from \"SAP_JIANGDU_TAG_POLICYS\" where POLICY_ID_POLICY_ID = '" + data.POLICY_ID_POLICY_ID + "' and TAG_ID_TAG_ID = '"+data.TAG_ID_TAG_ID+"'");
    return result;
}


module.exports = router;