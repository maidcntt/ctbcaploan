const catchAsync = require('../utils/catchAsync');


const activate = (req, res) => {
    if (req.body.failed) {
        res.status(400).json({
            timestamp: "2022-06-28T07:08:51.944+00:00",
            status: 400,
            error: "Bad Request",
            message: "A201",
            path: 'activate'
        });
    } else {
        res.json({
            message: 'Activate successfully'
        });
    }
};


const auth = (req, res) => {
    if (req.body.failed) {
        res.status(400).json({
            timestamp: "2022-06-28T07:08:51.944+00:00",
            status: 400,
            error: "Bad Request",
            message: "A201",
            path: "/auth"
        });
    } else {
        res.json({
            token: `eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJDdGJjU2hhbWFuTWVuZXMiLCJzdWIiOiJ7e3Rva2VuSWR9f
            SIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2NTYzMDk3NjcsImV4cCI6MTY1NjMx
            MDA2N30.EI9d_sPX3UNdTljtvLjTGdLFXirwglhrLE0ikKsJCaIJPx8DbRfcjRRuAERxgfc5mK_oYQpOr4BSNz4ksbk8Q`
        });
    }
};


const createAp = (req, res) => {
    if (req.body.failed) {
        res.status(400).json({
            "timestamp": "2022-06-28T07:08:51.944+00:00",
            "status": 400,
            "error": "Bad Request",
            "message": "A201",
            "path": " /menes/createAp"
        });
    } else {
        res.json([
            {
                "sellerNumber": "16769858",
                "apNumber": "EW-26680656",
                "apDate": "1659474305",
                "currency": "TWD",
                "amount": "128500",
                "dueDate": "1661893505",
                "apStatus": "9",
                "txnId": "",
                "financingCurrency": "TWD",
                "financingAmount": "118500",
                "financingRate": "",
                "updateTime": "1666173907",
                "bankNote": "",
                "customerNote": "交易註記 1",
                "macValue": "string"
            },
            {
                "sellerNumber": "16769858",
                "apNumber": "EW-16690575",
                "apDate": "1659474305",
                "currency": "TWD",
                "amount": "376000",
                "dueDate": "1661893505",
                "apStatus": "9",
                "txnId": "",
                "financingCurrency": "TWD",
                "financingAmount": "336000",
                "financingRate": "",
                "updateTime": "1666173907",
                "bankNote": "",
                "customerNote": "交易註記 2",
                "macValue": "string"
            },
            {
                "sellerNumber": "16769858",
                "apNumber": "ED-44492921",
                "apDate": "1659474305",
                "currency": "TWD",
                "amount": "706650",
                "dueDate": "1661893505",
                "apStatus": "9",
                "txnId": "",
                "financingCurrency": "TWD",
                "financingAmount": "690650",
                "financingRate": "",
                "updateTime": "1666173907",
                "bankNote": "",
                "customerNote": "交易註記 3",
                "macValue": "string"
            }
        ]);
    }
};


const createCases = (req, res) => {
    if (req.body.failed) {
        res.status(400).json({
            "timestamp": "2022-06-28T07:08:51.944+00:00",
            "status": 400,
            "error": "Bad Request",
            "message": "A201",
            "path": "/menes/createCases"
           });
    } else {
        res.json({
            "casesNumber": "casenumber20220430001",
            "updateTime": "1656560618",
            "productId": "001",
            "applicationTime": "1654481116",
            "customerNote": "交易註記 999",
            "currency": "TWD",
            "amount": "120000",
            "caseStatus": "1",
            "caseResult": "",
            "closeTime": "",
            "bankReturnReason": "",
            "platformId": "",
            "platform": "",
            "bankComment": "",
            "txnTime": "",
            "txnId": "843029a30653d54c133a93ecf309a09e1b1d1f202c3a26ffb28ce2033c3d4320",
            "macValue": "string",
            "buyer": [
                {
                    "buyerNumber": "03077208"
                }
            ],
            "seller": [
                {
                    "sellerNumber": "12358901",
                    "caseDocument": "",
                    "currency": "TWD",
                    "amount": "50000",
                    "financingCurrency": "TWD",
                    "financingAmount": "20000",
                    "apNumber": "AA00000001"
                },
                {
                    "sellerNumber": "12358902",
                    "caseDocument": "",
                    "currency": "TWD",
                    "amount": "70000",
                    "financingCurrency": "TWD",
                    "financingAmount": "70000",
                    "apNumber": "AA00000002"
                }
            ]
        });
    }
};


const readApByNumber = (req, res) => {
    if (req.body.failed) {
        res.status(400).json({

        });
    } else {
        res.json({

        });
    }
};


const readCaseByCaseStatus = (req, res) => {
    if (req.body.failed) {
        res.status(400).json({

        });
    } else {
        res.json({

        });
    }
};


const readCaseByNumber = (req, res) => {
    if (req.body.failed) {
        res.status(400).json({

        });
    } else {
        res.json({

        });
    }
};


const readCaseByApplicationTime = (req, res) => {
    if (req.body.failed) {
        res.status(400).json({

        });
    } else {
        res.json({

        });
    }
};


const signDataByKms = (req, res) => {
    if (req.body.failed) {
        res.status(400).json({
            "timestamp": "2023-03-23T02:12:58.009+00:00",
            "status": 400,
            "error": "Bad Request",
            "message": "A405",
            "path": "/signData/signDataByKms"
           });
    } else {
        res.json({
            macValue: `MIII5wYJKoZIhvcNAQcCoIII2DCCCNQCAQExDTALBglghkgBZQMEAgEwGAYJKoZIhvcNAQcBoAsE
            CWphbWllVGVzdKCCBkQwggZAMIIEKKADAgECAhAffzIoYl1gXwYLTsZzLoFtMA0GCSqGSIb3DQE
            BCwUAMIGEMQswCQYDVQQGEwJUVzEjMCEGA1UEChMaQ2h1bmdod2EgVGVsZWNvbSBDby
            4sIEx0ZC4xJzAlBgNVBAsTHkZpbmFuY2lhbCBVQ0EgZm9yIFRlc3RpbmcgLSBHNTEnMCUGA1UE
            AxMeVGVzdCBVQ0Egb2YgRmluYW5jaWFsIFBLSSAtIEc1MB4XDTIzMDMxNTA3MDczNFoXDTI0
            MDMxNTA3MDczNFowgaoxCzAJBgNVBAYTAlRXMSMwIQYDVQQKDBpDaHVuZ2h3YSBUZWxlY
            29tIENvLiwgTHRkLjEvMC0GA1UECwwmRmluYW5jaWFsIFVzZXIgQ2VydGlmaWNhdGlvbiBBdXR
            ob3JpdHkxFjAUBgNVBAsMDTAzMDc3MjA4LUNUQ0IxDTALBgNVBAsMBEZYTUwxHjAcBgNVBA
            MMFTUxMDM1MTAzLS01MTAzNTEwM1NGQjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQ
            oCggEBAK5LpAz/fqS64TsNrTSci/zyvryQiaR3RoC+auBfLXB1KlOEuYDr/HYjtkmEBebxm8fxBPoo+
            hXVH84buMGq0YeaxFMVmzKPGWNYrToldwBQ1PypRyHA0SXFoqjeN55URRRb5SMfOwz+iCa9
            /KvGTiE8OsWFQlVi5qSHD5/PRlQpZXUnlnbe1toefKhkbU7hrsSO1XJN6QRPqD7lXKp75ImCHK21
            yiYL9apA0Srrsh9oyb9ZTXwdcuOQtHxLCgVQ4bHPT8LAqo4nBPTbUXyHu0Xoa1QUvDvU0o0BGH
            jxTeYgmyelxm5lQUiMFcQAfwmKqMoFdp18xRQqO4wiHwssMaMCAwEAAaOCAYQwggGAMCs
            GA1UdIwQkMCKAIMe9gL/DVVPT7bLsliw4tSdfGl0UfCgqp6yDVjia8/pGMCkGA1UdDgQiBCDnT9
            PJZtUnXz1fTW/mkrVVoUifgV5zbSM18pc4gTKqSzB/BgNVHR8EeDB2MDygOqA4hjZodHRwOi8v
            dGVzdGZjYS5oaW5ldC5uZXQvY3JsL0ZVQ0FHNS8yMDAtMS9jb21wbGV0ZS5jcmwwNqA0oDKG
            MGh0dHA6Ly90ZXN0ZmNhLmhpbmV0Lm5ldC9jcmwvRlVDQUc1L2NvbXBsZXRlLmNybDB/Bgg
            rBgEFBQcBAQRzMHEwPQYIKwYBBQUHMAKGMWh0dHA6Ly90ZXN0ZmNhLmhpbmV0Lm5ldC9
            jZXJ0cy9Jc3N1ZWRUb1RoaXNDQS5wN2IwMAYIKwYBBQUHMAGGJGh0dHA6Ly90ZXN0ZmNhL
            mhpbmV0Lm5ldC9PQ1NQL29jc3BHNTAUBgNVHSAEDTALMAkGB2CBHgMBAwUwDgYDVR0PA
            QH/BAQDAgbAMA0GCSqGSIb3DQEBCwUAA4ICAQAZgIwNXSodVLcAtCDZ5BbNSB2KjxR/UF+Xv
            TwSW6ZgDUzpwX3/um1CJpt9E+i1wrVw0lT23WVX4nkUq+INAc8Ky6NKqBrq9j2fojOAXP738Jg+
            ojHR3LlGeNshzAd/qMV8VSbJDZ98tJFbbBt58PYKGj5U+sxisrNlhr6auzdhYRLvtE8+UIHZOgAGMw
            6UxtlSDAUcfkj14lw/GsJfxEllb+EfoSa4upe30mC9VlqpoMxkFvzF2Wsh+uciubytDn/Rs5FfV/7v2YE
            BphjXH/aD2yEyzLAgY9+TXkSI3XEc8Q35kiuC4qLW3Mkj7Bg80nbRAejWmby32xFzD9PNefHY9sD
            8/GqAbZ6A6UBoF9x0PKZwoyGIr60OmCk2hpZhtMkvmYIQr0aoQht+6q36TOmMIy94yHpmOB
            HdXJkL7/KAsv4Bdu8z8FpRR6dGowZZeAbBNA8HF/ehxvabv1WyTCNJIpUDGBRFfVwNF+cPqyow
            NuatQJ9sF334INm5vUwOtilh5c9khz0BR8sQ0PuC0LxFbtNmRTWeiyPZ6r9U8Hakk6/hJN+IgtudJ
            KVXByURggeHcik6/nNfYAgCQqaIhhoLpzvikujuqnCitZR8+uq/bqrn9y1VkStywl5svw89vkq8R/j2r
            8ewPl1R5FvJn1xktuX9GCNYkpG+tgvtT0AurDGCAlwwggJYAgEBMIGZMIGEMQswCQYDVQQGE
            wJUVzEjMCEGA1UEChMaQ2h1bmdod2EgVGVsZWNvbSBDby4sIEx0ZC4xJzAlBgNVBAsTHkZpb
            mFuY2lhbCBVQ0EgZm9yIFRlc3RpbmcgLSBHNTEnMCUGA1UEAxMeVGVzdCBVQ0Egb2YgRmluY
            W5jaWFsIFBLSSAtIEc1AhAffzIoYl1gXwYLTsZzLoFtMAsGCWCGSAFlAwQCAaCBljAYBgkqhkiG9w0
            BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0yMzAzMjMwNjM0NTdaMCsGCSqGS
            Ib3DQEJNDEeMBwwCwYJYIZIAWUDBAIBoQ0GCSqGSIb3DQEBCwUAMC8GCSqGSIb3DQEJBDEi
            BCBCo0iafLU8TDQA23NeknBXIFVH7fNEqLbhnwvaB1iGijANBgkqhkiG9w0BAQsFAASCAQAaQx
            HAq0h9iZrnRHyy7Xd1uzeEeGR7usokFhc4bRpb87mh1YCoK3P6aHxwXEnikXs6fJT3ErXnJFY4Md
            zY7urGTZNnbrgfh+CfaOxZ/WxbGdkiCg1EYV+1T7wJXgDlXEoJyXZz06z5F+wU8MLZmKJXf8YGt+lf
            Tiu/yaSsdcfUHBpR64+k1b49oZvhozJtt2rWkoK6ibb6efmIAbQxIsegY9v7NqvMeNNH8mn0sWnE
            YSYcyMzUXjRtGqaztUr0BpkZFHnsV0e7Fv7Vbyum1YDzUZo2PA26FzWKGjYBIt1iz2KpBti4phVMd
            6vbzou1q8TqixuIczF20ijYoRcRRef7`
        });
    }
};

module.exports = {
    activate, auth,
    createAp, createCases, readApByNumber, readCaseByCaseStatus, readCaseByNumber, readCaseByApplicationTime,
    signDataByKms
};
