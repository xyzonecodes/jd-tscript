"use strict";
/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
//注：github action用户cookie填写到Settings-Secrets里面，新增JD_COOKIE，多个账号的cookie使用`&`隔开或者换行
var CookieJDs = [
    'pt_key=AAJhAgcGADAgaOrKrt7Y-gMIbbdETSwBrzEjja661gSp5NeqRrtCHfYV0y-FEcUe5_ZB9CMFj6c;pt_pin=1140909800;',
    'pt_key=AAJg_MamADDJYQhQMDZ7ZzpAMJG7LGS8lzmAd0bF8Uf9RGgIyfsLsARta7Mw-MRgo-f7A3_zSd0;pt_pin=jd_GEZPwktxlrFU;',
    'pt_key=AAJg_M1FADD8hytpye2JhLFyNHF8tblVje_Bx_8IBQyZgiBaSMajUijdAJ1_Y0fIizS6PuWFYVQ;pt_pin=jd_6cb766bb13c02;'
];
// 判断github action里面是否有京东ck
if (process.env.JD_COOKIE) {
    if (process.env.JD_COOKIE.indexOf('&') > -1) {
        console.log("\u60A8\u7684cookie\u9009\u62E9\u7684\u662F\u7528&\u9694\u5F00\n");
        CookieJDs = process.env.JD_COOKIE.split('&');
    }
    else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
        console.log("\u60A8\u7684cookie\u9009\u62E9\u7684\u662F\u7528\u6362\u884C\u9694\u5F00\n");
        CookieJDs = process.env.JD_COOKIE.split('\n');
    }
    else {
        CookieJDs = [process.env.JD_COOKIE];
    }
}
//CookieJDs = [...new Set(CookieJDs.filter(item => item !== "" && item !== null && item !== undefined))]
console.log("\n====================\u5171\u6709" + CookieJDs.length + "\u4E2A\u4EAC\u4E1C\u8D26\u53F7Cookie=========\n");
console.log("==================\u811A\u672C\u6267\u884C- \u5317\u4EAC\u65F6\u95F4(UTC+8)\uFF1A" + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString() + "=====================\n");
for (var i = 0; i < CookieJDs.length; i++) {
    var index = (i + 1 === 1) ? '' : (i + 1);
    exports['CookieJD' + index] = CookieJDs[i].trim();
}
