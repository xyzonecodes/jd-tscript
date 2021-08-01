/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
//注：github action用户cookie填写到Settings-Secrets里面，新增JD_COOKIE，多个账号的cookie使用`&`隔开或者换行
let CookieJDs = [
        'pt_key=AAJhAgcGADAgaOrKrt7Y-gMIbbdETSwBrzEjja661gSp5NeqRrtCHfYV0y-FEcUe5_ZB9CMFj6c;pt_pin=1140909800;', //账号一ck,例:pt_key=XXX;pt_pin=XXX;
        'pt_key=AAJg_MamADDJYQhQMDZ7ZzpAMJG7LGS8lzmAd0bF8Uf9RGgIyfsLsARta7Mw-MRgo-f7A3_zSd0;pt_pin=jd_GEZPwktxlrFU;', //账号二ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
        'pt_key=AAJg_M1FADD8hytpye2JhLFyNHF8tblVje_Bx_8IBQyZgiBaSMajUijdAJ1_Y0fIizS6PuWFYVQ;pt_pin=jd_6cb766bb13c02;'
    ]
    // 判断github action里面是否有京东ck
if (process.env.JD_COOKIE) {
    if (process.env.JD_COOKIE.indexOf('&') > -1) {
        console.log(`您的cookie选择的是用&隔开\n`)
        CookieJDs = process.env.JD_COOKIE.split('&');
    } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
        console.log(`您的cookie选择的是用换行隔开\n`)
        CookieJDs = process.env.JD_COOKIE.split('\n');
    } else {
        CookieJDs = [process.env.JD_COOKIE];
    }
}
CookieJDs = [...new Set(CookieJDs.filter(item => item !== "" && item !== null && item !== undefined))]
console.log(`\n====================共有${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
for (let i = 0; i < CookieJDs.length; i++) {
    const index = (i + 1 === 1) ? '' : (i + 1);
    exports['CookieJD' + index] = CookieJDs[i].trim();
}