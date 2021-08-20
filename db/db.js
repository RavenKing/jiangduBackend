
const {
    connection,
  } = require('ohana-node-orm');

  
/**
 * 
 * 
 * {
    "url": "jdbc:sap://zeus.hana.prod.us-east-1.whitney.dbaas.ondemand.com:21022?encrypt=true&validateCertificate=true&currentschema=3B460A731E5149CC840083ED52394A18",
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\nQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\nb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\nCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\nnh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\n43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\nT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\ngdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\nBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\nTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\nDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\nhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\n06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\nPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\nYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\nCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=\n-----END CERTIFICATE-----\n",
    "driver": "com.sap.db.jdbc.Driver",
    "hdi_password": "Kw5Jq0UMYrq.VVMTBCEbvVu3qHedvVRtJBYPKuqvgu-aQZWamIGAKo7LOO_PE3l3uUfhR9a2zQUegmGb08Md4VRPsSnGn29AJ21czqeQoDOG7ant5_QLnBamCy9AcWMq",
    "hdi_user": "3B460A731E5149CC840083ED52394A18_BIHGD7IEZ1E1ZO62LJI1RM0QJ_DT",
    "host": "zeus.hana.prod.us-east-1.whitney.dbaas.ondemand.com",
    "password": "Yu5nPCQmd5I8wH7OqGzp7Uj4H4Vg71D44MjEkRxPScM_MGedpYf3jJ5kv90jOIV7nTAl7LkGZfe2ARPc5j93buaP9fnkYWAW0mtbx_8OtWn-7f7ItAsZ44BFRFoym7C_",
    "port": "21022",
    "schema": "3B460A731E5149CC840083ED52394A18",
    "user": "3B460A731E5149CC840083ED52394A18_BIHGD7IEZ1E1ZO62LJI1RM0QJ_RT"
}
 */
const connectionParams = {
    //serverNode :"zeus.hana.prod.us-east-1.whitney.dbaas.ondemand.com:21022?encrypt=true&validateCertificate=true&currentschema=3B460A731E5149CC840083ED52394A18",
    host: "zeus.hana.prod.us-east-1.whitney.dbaas.ondemand.com",
    port: "21022",
    uid: "3B460A731E5149CC840083ED52394A18_BIHGD7IEZ1E1ZO62LJI1RM0QJ_RT",
    pwd: "Yu5nPCQmd5I8wH7OqGzp7Uj4H4Vg71D44MjEkRxPScM_MGedpYf3jJ5kv90jOIV7nTAl7LkGZfe2ARPc5j93buaP9fnkYWAW0mtbx_8OtWn-7f7ItAsZ44BFRFoym7C_",
    databaseName: "H00",
    currentSchema: "3B460A731E5149CC840083ED52394A18",
    sslValidateCertificate: "false",
    encrypt: "true"
  }

  connection.connect(connectionParams)
    .then((success) => {
          console.log('Connected');
    })
    .catch((error) => {
      console.log('Error', error);
    })
    module.exports = connection;
