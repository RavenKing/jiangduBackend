var express = require('express');
var uunewid = require('uuid');
var router = express.Router();



const {
  ohana
} = require('ohana-node-orm');

/** 
 * 
 * 
*/
function checkData(res, data) {
  if (data == null) {
      res.send(500)
  }
}

const tableName="SAP_JIANGDU_ASSETS";
const tagTableName="SAP_JIANGDU_TAG_ASSETS";
/* GET users listing. */


/**
 * @swagger
 * /api/assets:
 *   post:
 *     description:  Endpoint for everything
 *   responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 */
router.post('/', function (req, res, next) {
  const user = new ohana(tableName); // new ohana('table_name');
  user.find().then((result) => {
    res.send(result)
  });
});

router.post('/add', function (req, res, next) {
  const {data} = req.body;
  //console.log(uunewid.v4())
  data.ASSET_ID=uunewid.v4();
  console.log(data); 
  insertData(data).then((result)=>{
     if(result ==1 )
     {
          res.sendStatus(200)
     }else{
       console.log(result)
         res.send(500)
     }
     //return res.send(result)
 }).catch((err)=>{
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
 router.post('/search', function (req, res, next) {

  const queryData = req.query;
  const user = new ohana(tableName); // new ohana('table_name');
  if (queryData == null) {
    user.find().then((result) => {
          res.send(result)
      });
  } else {
    user.find(queryData).then((result) => {
          res.send(result)
      });
  }
});

/**update Assets  */
router.put('/', function (req, res, next) {
 //   checkData(res, req.body.data)
    const {
        data
    } = req.body;
 //  console.log(data);
    updateAsset(data).then((result) => {
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

/*delete something*/
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

async function updateAsset(body) {
   // console.log(body)
    const policy = new ohana(tableName); // new ohana('table_name');
    const result = await policy.update({
        ASSET_ID: body.ASSET_ID
    }, body);
    return result;
}
async function deletePolicy(body) {
    const policy = new ohana(tableName); // new ohana('table_name');
    const result = await policy.raw("delete from \""+tableName+"\" where ASSET_ID = '" + body.ASSET_ID + "'");
    return result;
}


/// Asset tags 

router.post('/AssetTags', function (req, res, next) {
    const {
        data
    } = req.body; 
    getAssetTag(data).then((result) => {
        //console.log(result);
        console.log(result)
        res.send(result);
        // if (result == 1) {
        //    res.send(result)
        // } else {
        //     res.send(500)
        // }
        //return res.send(result)
    }).catch((err) => {
        console.log(err);
    })
});


router.post('/addTags', function (req, res, next) {
    const {
        data
    } = req.body;
    insertAssetData(data).then((result) => {
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

router.post('/deleteTags', function (req, res, next) {
    const {
        data
    } = req.body;
    deletaAssetTag(data).then((result) => {
        if (result == 1) {
            res.sendStatus(200)
        } else {
            res.send(500)
        }
    }).catch((err) => {
        console.log(err);
    })
});
/**
 * Update COMMENTS, STATUS by USER_ID
 * @param {*} body 
 * @returns 
 */
router.put('/updateStatus', async (req, res, next) =>{
  const {data} = req.body;

  const user = new ohana(tableName);
  //console.log("UPDATE SAP_JIANGDU_USERS SET COMMENTS='"+ data.COMMENTS + "', STATUS='" + data.STATUS + "' WHERE USER_ID='"+data.USER_ID+"'")
  try{
    const result = await user.raw(
      "UPDATE SAP_JIANGDU_USERS SET COMMENTS='"+ data.COMMENTS + "', STATUS='" + data.STATUS + "' WHERE USER_ID='"+data.USER_ID+"'"
    )
    if (result == 1) {
      res.sendStatus(200)
    } else {
        res.send(500)
    }
  } catch(err){
    console.log(err);
  }
})

/**
 * 127.0.0.1:4000/api/users/getCompanyInfo
 * @param {*} body 
 * @returns 
 */
async function getAssetTag(data)
{
    const policyTag = new ohana(tagTableName); // new ohana('table_name');
    const result = await policyTag.raw(
        "select \"TAG_ID\", \"TAG_NAME\",\"TAG_VALUE\" ,\"TAG_CATEGORY\" from \"SAP_JIANGDU_TAGS\" where \"TAG_ID\" in (Select \"TAG_ID_TAG_ID\" from \"SAP_JIANGDU_TAG_AssetS\" where \"ASSET_ID_ASSET_ID\" = '" +data.ASSET_ID + "' )"
    )
    return result; 

}
async function insertAssetData(data) {
    const policyTag = new ohana(tagTableName); // new ohana('table_name');
    const result = await policyTag.insert(data);
    return result;
}
async function deletaAssetTag(data) {
    const policyTag = new ohana(tagTableName); // new ohana('table_name');
    const result = await policyTag.raw("delete from \""+tagTableName+"\" where ASSET_ID_ASSET_ID = '" + data.ASSET_ID_ASSET_ID + "' and TAG_ID_TAG_ID = '" + data.TAG_ID_TAG_ID + "'");
    return result;
}

module.exports = router;