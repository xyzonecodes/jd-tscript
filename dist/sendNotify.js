"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
/*
 * @Author: lxk0301 https://gitee.com/lxk0301
 * @Date: 2020-08-19 16:12:40
 * @Last Modified by: lxk0301
 * @Last Modified time: 2021-4-3 16:00:54
 */
/**
 * sendNotify ??????????????????
 * @param text ?????????
 * @param desp ?????????
 * @param params ?????????????????????????????????????????????, ??????{ url: 'https://abc.com' }
 * @param author ?????????????????????  ??????`????????????????????? By???https://gitee.com/lxk0301/jd_docker`
 * @returns {Promise<unknown>}
 */
var querystring = require("querystring");
var $ = new Env();
var timeout = 15000; //????????????(????????????)
// =======================================??????server?????????????????????===========================================
//?????????????????????SCKEY.
//(??????????????? PUSH_KEY)
var SCKEY = '';
// =======================================QMSG?????????????????????===========================================
//?????????????????????QMSG_KEY.
var QMSG_KEY = '';
// =======================================Bark App??????????????????===========================================
//????????????BarkAPP?????????(IP/?????????????????????https://api.day.app/XXXXXXXX)
var BARK_PUSH = '';
//BARK app????????????,???????????????APP??????????????????
var BARK_SOUND = '';
// =======================================telegram???????????????????????????===========================================
//????????????telegram bot ???Token???telegram??????????????????????????????.?????????1077xxx4424:AAFjv0FcqxxxxxxgEMGfi22B4yh15R5uw
//(??????????????? TG_BOT_TOKEN)
var TG_BOT_TOKEN = '';
//?????????????????????????????????telegram?????????id???telegram??????????????????????????????.?????????129xxx206
//(??????????????? TG_USER_ID)
var TG_USER_ID = '';
//tg??????HTTP????????????(???????????????,telegram???????????????????????????????????????)
var TG_PROXY_HOST = ''; //??????:127.0.0.1(???????????????:TG_PROXY_HOST)
var TG_PROXY_PORT = ''; //??????:1080(???????????????:TG_PROXY_PORT)
var TG_PROXY_AUTH = ''; //tg????????????????????????
//Telegram api???????????????????????????(???????????????,telegram???????????????????????????????????????),??????tg??????api(???????????????:TG_API_HOST)
var TG_API_HOST = 'api.telegram.org';
// =======================================?????????????????????????????????===========================================
//?????????????????? bot ???webhook????????????5a544165465465645d0f31dca676e7bd07415asdasd
//(??????????????? DD_BOT_TOKEN)
var DD_BOT_TOKEN = '';
//??????????????????????????????????????????????????????????????????SEC??????????????????
var DD_BOT_SECRET = '';
// =======================================???????????????????????????????????????===========================================
//???????????????????????????????????? webhook(???????????? https://work.weixin.qq.com/api/doc/90000/90136/91770)????????????693a91f6-7xxx-4bc4-97a0-0ec2sifa5aaa
//(??????????????? QYWX_KEY)
var QYWX_KEY = '';
// =======================================??????????????????????????????????????????===========================================
/*
??????????????????????????????????????????(???????????? https://work.weixin.qq.com/api/doc/90000/90135/90236)
??????????????? QYWX_AM???????????? corpid,corpsecret,touser(???:????????????ID??????|??????),agentid,????????????(??????,??????????????????????????????)
?????????,?????????(????????????????????????)????????????wwcff56746d9adwers,B-791548lnzXBE6_BWfxdf3kSTMJr9vFEPKAbh6WERQ,mingcheng,1000001,2COXgjH2UIfERF2zxrtUOKgQ9XklUqMdGSWLBoW_lSDAdafat
????????????????????????(???????????????????????????mpnews???):
- ??????????????????: 0 (?????????)
- ????????????: 1 (?????????)
- ???????????????mpnews???: ???????????????id, ??????????????????(http://note.youdao.com/s/HMiudGkb)??????(https://note.youdao.com/ynoteshare1/index.html?id=1a0c8aff284ad28cbd011b29b3ad0191&type=note)
*/
var QYWX_AM = '';
// =======================================iGot??????????????????????????????===========================================
//????????????iGot?????????(??????key????????????https://push.hellyw.com/XXXXXXXX)
var IGOT_PUSH_KEY = '';
// =======================================push+????????????=======================================
//???????????????http://www.pushplus.plus/
//PUSH_PLUS_TOKEN??????????????????????????????????????????????????????????????????token(??????Token)????????????PUSH_PLUS_USER???????????????????????????
//PUSH_PLUS_USER??? ????????????????????????????????????????????????????????????->????????????(???????????????)->????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
var PUSH_PLUS_TOKEN = '';
var PUSH_PLUS_USER = '';
//==========================????????????????????????????????????=========================
if (process.env.PUSH_KEY) {
    SCKEY = process.env.PUSH_KEY;
}
if (process.env.QMSG_KEY) {
    QMSG_KEY = process.env.QMSG_KEY;
}
if (process.env.QQ_SKEY) {
    QQ_SKEY = process.env.QQ_SKEY;
}
if (process.env.QQ_MODE) {
    QQ_MODE = process.env.QQ_MODE;
}
if (process.env.BARK_PUSH) {
    if (process.env.BARK_PUSH.indexOf('https') > -1 || process.env.BARK_PUSH.indexOf('http') > -1) {
        //??????BARK????????????
        BARK_PUSH = process.env.BARK_PUSH;
    }
    else {
        BARK_PUSH = "https://api.day.app/" + process.env.BARK_PUSH;
    }
    if (process.env.BARK_SOUND) {
        BARK_SOUND = process.env.BARK_SOUND;
    }
}
else {
    if (BARK_PUSH && BARK_PUSH.indexOf('https') === -1 && BARK_PUSH.indexOf('http') === -1) {
        //??????BARK???????????????????????????????????????
        BARK_PUSH = "https://api.day.app/" + BARK_PUSH;
    }
}
if (process.env.TG_BOT_TOKEN) {
    TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
}
if (process.env.TG_USER_ID) {
    TG_USER_ID = process.env.TG_USER_ID;
}
if (process.env.TG_PROXY_AUTH)
    TG_PROXY_AUTH = process.env.TG_PROXY_AUTH;
if (process.env.TG_PROXY_HOST)
    TG_PROXY_HOST = process.env.TG_PROXY_HOST;
if (process.env.TG_PROXY_PORT)
    TG_PROXY_PORT = process.env.TG_PROXY_PORT;
if (process.env.TG_API_HOST)
    TG_API_HOST = process.env.TG_API_HOST;
if (process.env.DD_BOT_TOKEN) {
    DD_BOT_TOKEN = process.env.DD_BOT_TOKEN;
    if (process.env.DD_BOT_SECRET) {
        DD_BOT_SECRET = process.env.DD_BOT_SECRET;
    }
}
if (process.env.QYWX_KEY) {
    QYWX_KEY = process.env.QYWX_KEY;
}
if (process.env.QYWX_AM) {
    QYWX_AM = process.env.QYWX_AM;
}
if (process.env.IGOT_PUSH_KEY) {
    IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY;
}
if (process.env.PUSH_PLUS_TOKEN) {
    PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN;
}
if (process.env.PUSH_PLUS_USER) {
    PUSH_PLUS_USER = process.env.PUSH_PLUS_USER;
}
//==========================????????????????????????????????????=========================
/**
 * sendNotify ??????????????????
 * @param text ?????????
 * @param desp ?????????
 * @param params ?????????????????????????????????????????????, ??????{ url: 'https://abc.com' }
 * @param author ?????????????????????
 * @returns {Promise<unknown>}
 */
function sendNotify(text, desp, params, author) {
    if (params === void 0) { params = {}; }
    if (author === void 0) { author = ''; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //??????6?????????
                    desp += author; //???????????????????????????????????????
                    return [4 /*yield*/, Promise.all([
                            serverNotify(text, desp),
                            pushPlusNotify(text, desp),
                            qmsgNotify(text + '\n' + desp)
                        ])
                        //????????????????????????????????????????????????????????????????????????text(????????????)????????????????????????????????????????????????????????????????????????????????????????????????
                    ];
                case 1:
                    _a.sent();
                    //????????????????????????????????????????????????????????????????????????text(????????????)????????????????????????????????????????????????????????????????????????????????????????????????
                    text = text.match(/.*?(?=\s?-)/g) ? text.match(/.*?(?=\s?-)/g)[0] : text;
                    return [4 /*yield*/, Promise.all([
                            BarkNotify(text, desp, params),
                            tgBotNotify(text, desp),
                            ddBotNotify(text, desp),
                            qywxBotNotify(text, desp),
                            qywxamNotify(text, desp),
                            iGotNotify(text, desp, params), //iGot
                            //CoolPush(text, desp)//QQ??????
                        ])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function serverNotify(text, desp, time) {
    if (time === void 0) { time = 2100; }
    return new Promise(function (resolve) {
        if (SCKEY) {
            //??????server?????????????????????\n???????????????????????????\n??????????????????????????????
            desp = desp.replace(/[\n\r]/g, '\n\n');
            var options_1 = {
                url: SCKEY.includes('SCT') ? "https://sctapi.ftqq.com/" + SCKEY + ".send" : "https://sc.ftqq.com/" + SCKEY + ".send",
                body: "text=" + text + "&desp=" + desp,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: timeout
            };
            setTimeout(function () {
                $.post(options_1, function (err, resp, data) {
                    try {
                        if (err) {
                            console.log('??????????????????API????????????\n');
                            console.log(err);
                        }
                        else {
                            data = JSON.parse(data);
                            //server??????Server?????Turbo????????????json??????????????????
                            if (data.errno === 0 || data.data.errno === 0) {
                                console.log('server???????????????????????????????\n');
                            }
                            else if (data.errno === 1024) {
                                // ??????????????????????????????????????????
                                console.log("server\u9171\u53D1\u9001\u901A\u77E5\u6D88\u606F\u5F02\u5E38: " + data.errmsg + "\n");
                            }
                            else {
                                console.log("server\u9171\u53D1\u9001\u901A\u77E5\u6D88\u606F\u5F02\u5E38\n" + JSON.stringify(data));
                            }
                        }
                    }
                    catch (e) {
                        $.logErr(e, resp);
                    }
                    finally {
                        resolve(data);
                    }
                });
            }, time);
        }
        else {
            console.log('\n\n????????????server??????SCKEY?????????????????????????????????????\n');
            resolve();
        }
    });
}
//396449673
function qmsgNotify(text, time) {
    if (time === void 0) { time = 2100; }
    return new Promise(function (resolve) {
        if (QMSG_KEY) {
            var options_2 = {
                url: "https://qmsg.zendee.cn/send/" + QMSG_KEY,
                body: "msg=" + text,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: timeout
            };
            setTimeout(function () {
                $.post(options_2, function (err, resp, data) {
                    try {
                        if (err) {
                            console.log('qmsg??????????????????API????????????\n');
                            console.log(err);
                        }
                        else {
                            data = JSON.parse(data);
                            if (data.code === 0) {
                                console.log('Qmsg???????????????????????????\n');
                            }
                        }
                    }
                    catch (e) {
                        $.logErr(e, resp);
                    }
                    finally {
                        resolve(data);
                    }
                });
            }, time);
        }
        else {
            console.log('\n\n????????????Qmsg??????KEY\n');
            resolve();
        }
    });
}
function CoolPush(text, desp) {
    return new Promise(function (resolve) {
        if (QQ_SKEY) {
            var options = {
                url: "https://push.xuthus.cc/" + QQ_MODE + "/" + QQ_SKEY,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // ???????????????
            text = text.replace(/??????/g, "??????");
            desp = desp.replace(/??????/g, "");
            desp = desp.replace(/????/g, "");
            desp = desp.replace(/??????/g, "H???");
            switch (QQ_MODE) {
                case "email":
                    options.json = {
                        "t": text,
                        "c": desp,
                    };
                    break;
                default:
                    options.body = text + "\n\n" + desp;
            }
            var pushMode_1 = function (t) {
                switch (t) {
                    case "send":
                        return "??????";
                    case "group":
                        return "QQ???";
                    case "wx":
                        return "??????";
                    case "ww":
                        return "????????????";
                    case "email":
                        return "??????";
                    default:
                        return "????????????";
                }
            };
            $.post(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log("\u53D1\u9001" + pushMode_1(QQ_MODE) + "\u901A\u77E5\u8C03\u7528API\u5931\u8D25\uFF01\uFF01\n");
                        console.log(err);
                    }
                    else {
                        data = JSON.parse(data);
                        if (data.code === 200) {
                            console.log("\u9177\u63A8\u53D1\u9001" + pushMode_1(QQ_MODE) + "\u901A\u77E5\u6D88\u606F\u6210\u529F\uD83C\uDF89\n");
                        }
                        else if (data.code === 400) {
                            console.log("QQ\u9177\u63A8(Cool Push)\u53D1\u9001" + pushMode_1(QQ_MODE) + "\u63A8\u9001\u5931\u8D25\uFF1A" + data.msg + "\n");
                        }
                        else if (data.code === 503) {
                            console.log("QQ\u9177\u63A8\u51FA\u9519\uFF0C" + data.message + "\uFF1A" + data.data + "\n");
                        }
                        else {
                            console.log("\u9177\u63A8\u63A8\u9001\u5F02\u5E38: " + JSON.stringify(data));
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve(data);
                }
            });
        }
        else {
            console.log('?????????????????????SKEY?????????QQ??????????????????????\n');
            resolve();
        }
    });
}
function BarkNotify(text, desp, params) {
    if (params === void 0) { params = {}; }
    return new Promise(function (resolve) {
        if (BARK_PUSH) {
            var options = {
                url: BARK_PUSH + "/" + encodeURIComponent(text) + "/" + encodeURIComponent(desp) + "?sound=" + BARK_SOUND + "&" + querystring.stringify(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: timeout
            };
            $.get(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log('Bark APP??????????????????API????????????\n');
                        console.log(err);
                    }
                    else {
                        data = JSON.parse(data);
                        if (data.code === 200) {
                            console.log('Bark APP????????????????????????????\n');
                        }
                        else {
                            console.log(data.message + "\n");
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve();
                }
            });
        }
        else {
            console.log('????????????Bark???APP??????BARK_PUSH?????????Bark??????????????????????\n');
            resolve();
        }
    });
}
function tgBotNotify(text, desp) {
    return new Promise(function (resolve) {
        if (TG_BOT_TOKEN && TG_USER_ID) {
            var options = {
                url: "https://" + TG_API_HOST + "/bot" + TG_BOT_TOKEN + "/sendMessage",
                body: "chat_id=" + TG_USER_ID + "&text=" + text + "\n\n" + desp + "&disable_web_page_preview=true",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: timeout
            };
            if (TG_PROXY_HOST && TG_PROXY_PORT) {
                var tunnel = require("tunnel");
                var agent = {
                    https: tunnel.httpsOverHttp({
                        proxy: {
                            host: TG_PROXY_HOST,
                            port: TG_PROXY_PORT * 1,
                            proxyAuth: TG_PROXY_AUTH
                        }
                    })
                };
                Object.assign(options, { agent: agent });
            }
            $.post(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log('telegram??????????????????????????????\n');
                        console.log(err);
                    }
                    else {
                        data = JSON.parse(data);
                        if (data.ok) {
                            console.log('Telegram???????????????????????????????\n');
                        }
                        else if (data.error_code === 400) {
                            console.log('????????????bot???????????????????????????????????????ID???????????????\n');
                        }
                        else if (data.error_code === 401) {
                            console.log('Telegram bot token ???????????????\n');
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve(data);
                }
            });
        }
        else {
            console.log('????????????telegram????????????????????????TG_BOT_TOKEN???TG_USER_ID?????????telegram??????????????????????\n');
            resolve();
        }
    });
}
function ddBotNotify(text, desp) {
    return new Promise(function (resolve) {
        var options = {
            url: "https://oapi.dingtalk.com/robot/send?access_token=" + DD_BOT_TOKEN,
            json: {
                "msgtype": "text",
                "text": {
                    "content": " " + text + "\n\n" + desp
                }
            },
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: timeout
        };
        if (DD_BOT_TOKEN && DD_BOT_SECRET) {
            var crypto = require('crypto');
            var dateNow = Date.now();
            var hmac = crypto.createHmac('sha256', DD_BOT_SECRET);
            hmac.update(dateNow + "\n" + DD_BOT_SECRET);
            var result = encodeURIComponent(hmac.digest('base64'));
            options.url = options.url + "&timestamp=" + dateNow + "&sign=" + result;
            $.post(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log('????????????????????????????????????\n');
                        console.log(err);
                    }
                    else {
                        data = JSON.parse(data);
                        if (data.errcode === 0) {
                            console.log('?????????????????????????????????????\n');
                        }
                        else {
                            console.log(data.errmsg + "\n");
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve(data);
                }
            });
        }
        else if (DD_BOT_TOKEN) {
            $.post(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log('????????????????????????????????????\n');
                        console.log(err);
                    }
                    else {
                        data = JSON.parse(data);
                        if (data.errcode === 0) {
                            console.log('?????????????????????????????????\n');
                        }
                        else {
                            console.log(data.errmsg + "\n");
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve(data);
                }
            });
        }
        else {
            console.log('??????????????????????????????????????????DD_BOT_TOKEN??????DD_BOT_SECRET?????????????????????????????????????\n');
            resolve();
        }
    });
}
function qywxBotNotify(text, desp) {
    return new Promise(function (resolve) {
        var options = {
            url: "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=" + QYWX_KEY,
            json: {
                msgtype: 'text',
                text: {
                    content: " " + text + "\n\n" + desp,
                },
            },
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: timeout
        };
        if (QYWX_KEY) {
            $.post(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log('??????????????????????????????????????????\n');
                        console.log(err);
                    }
                    else {
                        data = JSON.parse(data);
                        if (data.errcode === 0) {
                            console.log('???????????????????????????????????????????\n');
                        }
                        else {
                            console.log(data.errmsg + "\n");
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve(data);
                }
            });
        }
        else {
            console.log('????????????????????????????????????????????????QYWX_KEY???????????????????????????????????????????\n');
            resolve();
        }
    });
}
function ChangeUserId(desp) {
    var QYWX_AM_AY = QYWX_AM.split(',');
    if (QYWX_AM_AY[2]) {
        var userIdTmp = QYWX_AM_AY[2].split("|");
        var userId = "";
        for (var i = 0; i < userIdTmp.length; i++) {
            var count = "??????" + (i + 1);
            var count2 = "????????? " + (i + 1);
            if (desp.match(count2)) {
                userId = userIdTmp[i];
            }
        }
        if (!userId)
            userId = QYWX_AM_AY[2];
        return userId;
    }
    else {
        return "@all";
    }
}
function qywxamNotify(text, desp) {
    return new Promise(function (resolve) {
        if (QYWX_AM) {
            var QYWX_AM_AY_1 = QYWX_AM.split(',');
            var options_accesstoken = {
                url: "https://qyapi.weixin.qq.com/cgi-bin/gettoken",
                json: {
                    corpid: "" + QYWX_AM_AY_1[0],
                    corpsecret: "" + QYWX_AM_AY_1[1],
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: timeout
            };
            $.post(options_accesstoken, function (err, resp, data) {
                html = desp.replace(/\n/g, "<br/>");
                var json = JSON.parse(data);
                accesstoken = json.access_token;
                var options;
                switch (QYWX_AM_AY_1[4]) {
                    case '0':
                        options = {
                            msgtype: 'textcard',
                            textcard: {
                                title: "" + text,
                                description: "" + desp,
                                url: 'https://github.com/lxk0301/jd_scripts',
                                btntxt: '??????'
                            }
                        };
                        break;
                    case '1':
                        options = {
                            msgtype: 'text',
                            text: {
                                content: text + "\n\n" + desp
                            }
                        };
                        break;
                    default:
                        options = {
                            msgtype: 'mpnews',
                            mpnews: {
                                articles: [
                                    {
                                        title: "" + text,
                                        thumb_media_id: "" + QYWX_AM_AY_1[4],
                                        author: "\u667A\u80FD\u52A9\u624B",
                                        content_source_url: "",
                                        content: "" + html,
                                        digest: "" + desp
                                    }
                                ]
                            }
                        };
                }
                ;
                if (!QYWX_AM_AY_1[4]) {
                    //???????????????????????????,???????????????????????????????????????
                    options = {
                        msgtype: 'text',
                        text: {
                            content: text + "\n\n" + desp
                        }
                    };
                }
                options = {
                    url: "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + accesstoken,
                    json: __assign({ touser: "" + ChangeUserId(desp), agentid: "" + QYWX_AM_AY_1[3], safe: '0' }, options),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                $.post(options, function (err, resp, data) {
                    try {
                        if (err) {
                            console.log('??????ID:' + ChangeUserId(desp) + '??????????????????????????????????????????????????????\n');
                            console.log(err);
                        }
                        else {
                            data = JSON.parse(data);
                            if (data.errcode === 0) {
                                console.log('??????ID:' + ChangeUserId(desp) + '???????????????????????????????????????????????????????\n');
                            }
                            else {
                                console.log(data.errmsg + "\n");
                            }
                        }
                    }
                    catch (e) {
                        $.logErr(e, resp);
                    }
                    finally {
                        resolve(data);
                    }
                });
            });
        }
        else {
            console.log('???????????????????????????????????????????????????QYWX_AM???????????????????????????????????????????????????????\n');
            resolve();
        }
    });
}
function iGotNotify(text, desp, params) {
    if (params === void 0) { params = {}; }
    return new Promise(function (resolve) {
        if (IGOT_PUSH_KEY) {
            // ???????????????IGOT_PUSH_KEY????????????
            var IGOT_PUSH_KEY_REGX = new RegExp("^[a-zA-Z0-9]{24}$");
            if (!IGOT_PUSH_KEY_REGX.test(IGOT_PUSH_KEY)) {
                console.log('???????????????IGOT_PUSH_KEY??????\n');
                resolve();
                return;
            }
            var options = {
                url: "https://push.hellyw.com/" + IGOT_PUSH_KEY.toLowerCase(),
                body: "title=" + text + "&content=" + desp + "&" + querystring.stringify(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: timeout
            };
            $.post(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log('??????????????????API????????????\n');
                        console.log(err);
                    }
                    else {
                        if (typeof data === 'string')
                            data = JSON.parse(data);
                        if (data.ret === 0) {
                            console.log('iGot????????????????????????????\n');
                        }
                        else {
                            console.log("iGot\u53D1\u9001\u901A\u77E5\u6D88\u606F\u5931\u8D25\uFF1A" + data.errMsg + "\n");
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve(data);
                }
            });
        }
        else {
            console.log('????????????iGot?????????IGOT_PUSH_KEY?????????iGot??????????????????????\n');
            resolve();
        }
    });
}
function pushPlusNotify(text, desp) {
    return new Promise(function (resolve) {
        if (PUSH_PLUS_TOKEN) {
            desp = desp.replace(/[\n\r]/g, '<br>'); // ?????????html, ?????????plaintext
            var body = {
                token: "" + PUSH_PLUS_TOKEN,
                title: "" + text,
                content: "" + desp,
                topic: "" + PUSH_PLUS_USER
            };
            var options = {
                url: "http://www.pushplus.plus/send",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': ' application/json'
                },
                timeout: timeout
            };
            $.post(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log("push+\u53D1\u9001" + (PUSH_PLUS_USER ? '?????????' : '?????????') + "\u901A\u77E5\u6D88\u606F\u5931\u8D25\uFF01\uFF01\n");
                        console.log(err);
                    }
                    else {
                        data = JSON.parse(data);
                        if (data.code === 200) {
                            console.log("push+\u53D1\u9001" + (PUSH_PLUS_USER ? '?????????' : '?????????') + "\u901A\u77E5\u6D88\u606F\u5B8C\u6210\u3002\n");
                        }
                        else {
                            console.log("push+\u53D1\u9001" + (PUSH_PLUS_USER ? '?????????' : '?????????') + "\u901A\u77E5\u6D88\u606F\u5931\u8D25\uFF1A" + data.msg + "\n");
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve(data);
                }
            });
        }
        else {
            console.log('????????????push+???????????????PUSH_PLUS_TOKEN?????????push+??????????????????????\n');
            resolve();
        }
    });
}
module.exports = {
    sendNotify: sendNotify,
    BARK_PUSH: BARK_PUSH
};
// prettier-ignore
function Env(t, s) { return new /** @class */ (function () {
    function class_1(t, s) {
        this.name = t, this.data = null, this.dataFile = "box.dat", this.logs = [], this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, s), this.log("", "\uD83D\uDD14" + this.name + ", \u5F00\u59CB!");
    }
    class_1.prototype.isNode = function () { return "undefined" != typeof module && !!module.exports; };
    class_1.prototype.isQuanX = function () { return "undefined" != typeof $task; };
    class_1.prototype.isSurge = function () { return "undefined" != typeof $httpClient && "undefined" == typeof $loon; };
    class_1.prototype.isLoon = function () { return "undefined" != typeof $loon; };
    class_1.prototype.getScript = function (t) { return new Promise(function (s) { $.get({ url: t }, function (t, e, i) { return s(i); }); }); };
    class_1.prototype.runScript = function (t, s) {
        var _this = this;
        return new Promise(function (e) { var i = _this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; var o = _this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); o = o ? 1 * o : 20, o = s && s.timeout ? s.timeout : o; var _a = i.split("@"), h = _a[0], a = _a[1], r = { url: "http://" + a + "/v1/scripting/evaluate", body: { script_text: t, mock_type: "cron", timeout: o }, headers: { "X-Key": h, Accept: "*/*" } }; $.post(r, function (t, s, i) { return e(i); }); }).catch(function (t) { return _this.logErr(t); });
    };
    class_1.prototype.loaddata = function () { if (!this.isNode())
        return {}; {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        var t_1 = this.path.resolve(this.dataFile), s_1 = this.path.resolve(process.cwd(), this.dataFile), e = this.fs.existsSync(t_1), i = !e && this.fs.existsSync(s_1);
        if (!e && !i)
            return {};
        {
            var i_1 = e ? t_1 : s_1;
            try {
                return JSON.parse(this.fs.readFileSync(i_1));
            }
            catch (t) {
                return {};
            }
        }
    } };
    class_1.prototype.writedata = function () { if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        var t_2 = this.path.resolve(this.dataFile), s_2 = this.path.resolve(process.cwd(), this.dataFile), e = this.fs.existsSync(t_2), i = !e && this.fs.existsSync(s_2), o = JSON.stringify(this.data);
        e ? this.fs.writeFileSync(t_2, o) : i ? this.fs.writeFileSync(s_2, o) : this.fs.writeFileSync(t_2, o);
    } };
    class_1.prototype.lodash_get = function (t, s, e) { var i = s.replace(/\[(\d+)\]/g, ".$1").split("."); var o = t; for (var _i = 0, i_2 = i; _i < i_2.length; _i++) {
        var t_3 = i_2[_i];
        if (o = Object(o)[t_3], void 0 === o)
            return e;
    } return o; };
    class_1.prototype.lodash_set = function (t, s, e) { return Object(t) !== t ? t : (Array.isArray(s) || (s = s.toString().match(/[^.[\]]+/g) || []), s.slice(0, -1).reduce(function (t, e, i) { return Object(t[e]) === t[e] ? t[e] : t[e] = Math.abs(s[i + 1]) >> 0 == +s[i + 1] ? [] : {}; }, t)[s[s.length - 1]] = e, t); };
    class_1.prototype.getdata = function (t) { var s = this.getval(t); if (/^@/.test(t)) {
        var _a = /^@(.*?)\.(.*?)$/.exec(t), e = _a[1], i = _a[2], o = e ? this.getval(e) : "";
        if (o)
            try {
                var t_4 = JSON.parse(o);
                s = t_4 ? this.lodash_get(t_4, i, "") : s;
            }
            catch (t) {
                s = "";
            }
    } return s; };
    class_1.prototype.setdata = function (t, s) { var e = !1; if (/^@/.test(s)) {
        var _a = /^@(.*?)\.(.*?)$/.exec(s), i = _a[1], o = _a[2], h = this.getval(i), a = i ? "null" === h ? null : h || "{}" : "{}";
        try {
            var s_3 = JSON.parse(a);
            this.lodash_set(s_3, o, t), e = this.setval(JSON.stringify(s_3), i);
        }
        catch (s) {
            var h_1 = {};
            this.lodash_set(h_1, o, t), e = this.setval(JSON.stringify(h_1), i);
        }
    }
    else
        e = $.setval(t, s); return e; };
    class_1.prototype.getval = function (t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null; };
    class_1.prototype.setval = function (t, s) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, s) : this.isQuanX() ? $prefs.setValueForKey(t, s) : this.isNode() ? (this.data = this.loaddata(), this.data[s] = t, this.writedata(), !0) : this.data && this.data[s] || null; };
    class_1.prototype.initGotEnv = function (t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)); };
    class_1.prototype.get = function (t, s) {
        var _this = this;
        if (s === void 0) { s = (function () { }); }
        t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? $httpClient.get(t, function (t, e, i) { !t && e && (e.body = i, e.statusCode = e.status), s(t, e, i); }) : this.isQuanX() ? $task.fetch(t).then(function (t) { var e = t.statusCode, i = t.statusCode, o = t.headers, h = t.body; s(null, { status: e, statusCode: i, headers: o, body: h }, h); }, function (t) { return s(t); }) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", function (t, s) { try {
            var e = t.headers["set-cookie"].map(_this.cktough.Cookie.parse).toString();
            _this.ckjar.setCookieSync(e, null), s.cookieJar = _this.ckjar;
        }
        catch (t) {
            _this.logErr(t);
        } }).then(function (t) { var e = t.statusCode, i = t.statusCode, o = t.headers, h = t.body; s(null, { status: e, statusCode: i, headers: o, body: h }, h); }, function (t) { return s(t); }));
    };
    class_1.prototype.post = function (t, s) {
        if (s === void 0) { s = (function () { }); }
        if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), delete t.headers["Content-Length"], this.isSurge() || this.isLoon())
            $httpClient.post(t, function (t, e, i) { !t && e && (e.body = i, e.statusCode = e.status), s(t, e, i); });
        else if (this.isQuanX())
            t.method = "POST", $task.fetch(t).then(function (t) { var e = t.statusCode, i = t.statusCode, o = t.headers, h = t.body; s(null, { status: e, statusCode: i, headers: o, body: h }, h); }, function (t) { return s(t); });
        else if (this.isNode()) {
            this.initGotEnv(t);
            var e = t.url, i = __rest(t, ["url"]);
            this.got.post(e, i).then(function (t) { var e = t.statusCode, i = t.statusCode, o = t.headers, h = t.body; s(null, { status: e, statusCode: i, headers: o, body: h }, h); }, function (t) { return s(t); });
        }
    };
    class_1.prototype.time = function (t) { var s = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (var e in s)
        new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? s[e] : ("00" + s[e]).substr(("" + s[e]).length))); return t; };
    class_1.prototype.msg = function (s, e, i, o) {
        var _this = this;
        if (s === void 0) { s = t; }
        if (e === void 0) { e = ""; }
        if (i === void 0) { i = ""; }
        var h = function (t) { return !t || !_this.isLoon() && _this.isSurge() ? t : "string" == typeof t ? _this.isLoon() ? t : _this.isQuanX() ? { "open-url": t } : void 0 : "object" == typeof t && (t["open-url"] || t["media-url"]) ? _this.isLoon() ? t["open-url"] : _this.isQuanX() ? t : void 0 : void 0; };
        $.isMute || (this.isSurge() || this.isLoon() ? $notification.post(s, e, i, h(o)) : this.isQuanX() && $notify(s, e, i, h(o))), this.logs.push("", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="), this.logs.push(s), e && this.logs.push(e), i && this.logs.push(i);
    };
    class_1.prototype.log = function () {
        var t = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            t[_i] = arguments[_i];
        }
        t.length > 0 ? this.logs = __spreadArray(__spreadArray([], this.logs), t) : console.log(this.logs.join(this.logSeparator));
    };
    class_1.prototype.logErr = function (t, s) { var e = !this.isSurge() && !this.isQuanX() && !this.isLoon(); e ? $.log("", "\u2757\uFE0F" + this.name + ", \u9519\u8BEF!", t.stack) : $.log("", "\u2757\uFE0F" + this.name + ", \u9519\u8BEF!", t); };
    class_1.prototype.wait = function (t) { return new Promise(function (s) { return setTimeout(s, t); }); };
    class_1.prototype.done = function (t) {
        if (t === void 0) { t = {}; }
        var s = (new Date).getTime(), e = (s - this.startTime) / 1e3;
        this.log("", "\uD83D\uDD14" + this.name + ", \u7ED3\u675F! \uD83D\uDD5B " + e + " \u79D2"), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    };
    return class_1;
}())(t, s); }
