
const {
    connection,
  } = require('ohana-node-orm');

  
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
{
    "url": "jdbc:sap://zeus.hana.prod.us-east-1.whitney.dbaas.ondemand.com:21022?encrypt=true&validateCertificate=true&currentschema=0E9F476FC4CA4A75A50DA59CD73581FE",
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\nQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\nb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\nCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\nnh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\n43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\nT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\ngdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\nBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\nTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\nDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\nhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\n06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\nPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\nYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\nCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=\n-----END CERTIFICATE-----\n",
    "driver": "com.sap.db.jdbc.Driver",
    "hdi_password": "Os7-gBLuYm_i8OIUdUFLn3V2wHSJrdqiFosF6SHNapu0ML9tM.6Nk-Wvc0chS1zBR8fMhOHSudp0f1Etcwt9gaXiJB-SQrVZzw_mLwGu-cDKy05xtzy4MH5tS80f5euU",
    "hdi_user": "0E9F476FC4CA4A75A50DA59CD73581FE_C4PXJWLW9L9DCQKJJC3QZ03PU_DT",
    "host": "zeus.hana.prod.us-east-1.whitney.dbaas.ondemand.com",
    "password": "Oj1rtcwtg1ZUS1.gbX._OosrTd0VZL2wCjyMRQCGb..Arw-CTdkAAo96LWZvOo-dxEeCSCHdPLUvOgqu_jwzzr_k0_NLAkLr57nOhpOVuw50Hj64oCVBIjrq9hnsrlVb",
    "port": "21022",
    "schema": "0E9F476FC4CA4A75A50DA59CD73581FE",
    "user": "0E9F476FC4CA4A75A50DA59CD73581FE_C4PXJWLW9L9DCQKJJC3QZ03PU_RT"
}
 */
const connectionParams = {
    //serverNode :"zeus.hana.prod.us-east-1.whitney.dbaas.ondemand.com:21022?encrypt=true&validateCertificate=true&currentschema=3B460A731E5149CC840083ED52394A18",
    host: "zeus.hana.prod.us-east-1.whitney.dbaas.ondemand.com",
    port: "21022",
    uid: "0E9F476FC4CA4A75A50DA59CD73581FE_C4PXJWLW9L9DCQKJJC3QZ03PU_RT",
    pwd: "Oj1rtcwtg1ZUS1.gbX._OosrTd0VZL2wCjyMRQCGb..Arw-CTdkAAo96LWZvOo-dxEeCSCHdPLUvOgqu_jwzzr_k0_NLAkLr57nOhpOVuw50Hj64oCVBIjrq9hnsrlVb",
    databaseName: "H00",
    currentSchema: "0E9F476FC4CA4A75A50DA59CD73581FE",
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
