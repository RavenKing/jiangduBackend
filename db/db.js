
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

  [db]
dialect=hana
driver=hdbcli
host=97e2d91f-04c6-4cd1-a51f-4ba9ed343bfd.hana.trial-us10.hanacloud.ondemand.com
port=443
user=ED3823079C34467CA8872262EC61F4AE_4X3IVKV7DO0FNB12UPGUG4GWE_RT
password=Dm9w0MIcMvsTv9pHKMxrv19EN5VvKnhVEEHjUHRyRasZtpoZCvHY4pp6aceSY_cklNutYZl8ge0FZw_1QeI1HCAPdzGKBQWzmJLXtB0NNuUNDzIdB_SHXTMTpihyias0
schema=ED3823079C34467CA8872262EC61F4AE
  "host": "97e2d91f-04c6-4cd1-a51f-4ba9ed343bfd.hana.trial-us10.hanacloud.ondemand.com",
  "port": "443",
  "driver": "com.sap.db.jdbc.Driver",
  "url": "jdbc:sap://97e2d91f-04c6-4cd1-a51f-4ba9ed343bfd.hana.trial-us10.hanacloud.ondemand.com:443?encrypt=true&validateCertificate=true&currentschema=ED3823079C34467CA8872262EC61F4AE",
  "schema": "ED3823079C34467CA8872262EC61F4AE",
  "hdi_user": "ED3823079C34467CA8872262EC61F4AE_EV8TPDSQI4WH3C4E1OI57HFDM_DT",
  "hdi_password": "Mo5tr1OQ5HfgwLR0EDxPS6UMhR9ZOI.YoV8uoC3u4NxAX908C8EZn6m6hUmlIZWa.EJu_n_hKDR0IYqfiyJ9rqTR0OpArJHtHnMkjttblYHfqC49GU3ICZvyPkX0L53.",
  "user": "ED3823079C34467CA8872262EC61F4AE_EV8TPDSQI4WH3C4E1OI57HFDM_RT",
  "password": "Xg7c0_ttQ_D8T9IFUBvpiUBKshnfGJKFZJoNY2G-C7C1xNn8oGDx-Xu1PrU1ZycHs1v4.6LbiFn7FvgBBrsNyQuetpC0gL1Ay5DcTambshOOBa_JVLYU0mlos3qhDY8T",
  "certificate": "-----BEGIN CERTIFICATE-----\nMIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\nQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\nb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\nCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\nnh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\n43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\nT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\ngdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\nBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\nTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\nDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\nhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\n06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\nPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\nYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\nCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=\n-----END CERTIFICATE-----"
}
 */
const connectionParams = {
    //serverNode :"zeus.hana.prod.us-east-1.whitney.dbaas.ondemand.com:21022?encrypt=true&validateCertificate=true&currentschema=3B460A731E5149CC840083ED52394A18",
    host: "97e2d91f-04c6-4cd1-a51f-4ba9ed343bfd.hana.trial-us10.hanacloud.ondemand.com",
    port: "443",
    uid: "ED3823079C34467CA8872262EC61F4AE_4X3IVKV7DO0FNB12UPGUG4GWE_RT",
    pwd: "Dm9w0MIcMvsTv9pHKMxrv19EN5VvKnhVEEHjUHRyRasZtpoZCvHY4pp6aceSY_cklNutYZl8ge0FZw_1QeI1HCAPdzGKBQWzmJLXtB0NNuUNDzIdB_SHXTMTpihyias0",
    databaseName: "H00",
    currentSchema: "ED3823079C34467CA8872262EC61F4AE",
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
