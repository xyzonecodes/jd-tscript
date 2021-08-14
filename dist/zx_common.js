"use strict";
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
var Md5 = require('./utils/md5');
var consts = require('./zx_consts.js');
function ZxObject(v, jsname) {
    var _this = this;
    //const printDetail = false  //是否显示出参详情
    var $ = new Env(v);
    ZxObject.prototype.$ = $;
    var jdCookieNode = $.isNode() ? require('./jdCookie') : '';
    var notify = $.isNode() ? require('./sendNotify') : '';
    var shareCodes = require('./zx_shareCodes');
    $.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
    //if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
    var cookiesArr = [];
    if ($.isNode()) {
        Object.keys(jdCookieNode).forEach(function (item) {
            cookiesArr.push(jdCookieNode[item]);
        });
    }
    else {
        cookiesArr.push($.getdata('CookieJD'));
        cookiesArr.push($.getdata('CookieJD2'));
    }
    $.jsname = jsname; //当前名称
    $.cookiesArr = cookiesArr; //配置文件中的cookie列表
    $.cookie = ''; //当前执行的cookie
    $.printDetail = false; //打印详细
    $.helpAuthor = true;
    $.notify = notify;
    $.shareCode = ''; //当前 配置的助力码
    $.message = '';
    $.allMessage = '';
    //助力码  
    $.shareCodesArr = []; //当前配置的助力码列表
    //助力码待处理
    if ($.jsname) {
        $.shareCode = shareCodes.shareCodes[$.jsname];
    }
    if ($.shareCode && $.shareCode.length > 0) {
        if ($.shareCode[0].indexOf('@') > -1) {
            $.shareCodesArr = $.shareCode[0].split('@');
        }
        else {
            $.shareCodesArr.push($.shareCode);
        }
    }
    $.dowork = function (fn) { return __awaiter(_this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < $.cookiesArr.length)) return [3 /*break*/, 5];
                    if (!$.cookiesArr[i]) return [3 /*break*/, 4];
                    $.replaceCookie($.cookiesArr[i]);
                    $.index = i + 1;
                    if (!(typeof fn === "function")) return [3 /*break*/, 3];
                    return [4 /*yield*/, fn()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    console.log(fn);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    $.replaceCookie = function (cookie) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                $.cookie = cookie;
                $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.isLogin = true;
                $.nickName = '';
                return [2 /*return*/];
            });
        });
    };
    $.sleep = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, timeout); })];
            });
        });
    };
    $.timeFormat = function (time) {
        var date;
        if (time) {
            date = new Date(time);
        }
        else {
            date = new Date();
        }
        return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
    };
    $.randomString = function (e) {
        e = e || 32;
        var t = "abcdefhijkmnprstwxyz2345678", a = t.length, n = "";
        for (i = 0; i < e; i++)
            n += t.charAt(Math.floor(Math.random() * a));
        return n;
    };
    $.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    $.safeGet = function (data) {
        try {
            if (typeof JSON.parse(data) == "object") {
                return true;
            }
        }
        catch (e) {
            console.log(e);
            console.log("\u4EAC\u4E1C\u670D\u52A1\u5668\u8BBF\u95EE\u6570\u636E\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u81EA\u8EAB\u8BBE\u5907\u7F51\u7EDC\u60C5\u51B5");
            return false;
        }
    };
    $.jsonParse = function (str) {
        if (typeof str == "string") {
            try {
                return JSON.parse(str);
            }
            catch (e) {
                console.log(e);
                $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
                return [];
            }
        }
    };
    /**
     * 获取url参数值
     * @param url
     * @param name
     * @returns {string}
     */
    $.getUrlData = function (url, name) {
        if (typeof URL !== "undefined") {
            var urls = new URL(url);
            var data = urls.searchParams.get(name);
            return data ? data : '';
        }
        else {
            var query = url.match(/\?.*/)[0].substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (pair[0] === name) {
                    // return pair[1];
                    return vars[i].substr(vars[i].indexOf('=') + 1);
                }
            }
            return '';
        }
    };
    /**
     * 模拟生成 fingerprint
     * @returns {string}
     */
    $.generateFp = function () {
        var e = "0123456789";
        var a = 13;
        var i = '';
        for (; a--;)
            i += e[Math.random() * e.length | 0];
        return (i + Date.now()).slice(0, 16);
    };
    function TotalBean() {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
                    "headers": {
                        "Accept": "application/json,text/plain, */*",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "zh-cn",
                        "Connection": "keep-alive",
                        "cookie": $.cookie,
                        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
                    }
                };
                $.get(options, function (err, resp, data) {
                    try {
                        if (err) {
                            console.log("" + JSON.stringify(err));
                            console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                        }
                        else {
                            if (data) {
                                data = JSON.parse(data);
                                if (data['retcode'] === 13) {
                                    $.isLogin = false; //cookie过期
                                    return;
                                }
                                if (data['retcode'] === 0) {
                                    $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
                                }
                                else {
                                    $.nickName = $.UserName;
                                }
                            }
                            else {
                                console.log("\u4EAC\u4E1C\u670D\u52A1\u5668\u8FD4\u56DE\u7A7A\u6570\u636E");
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
                return [2 /*return*/];
            });
        }); });
    }
    $.getJxToken = function () { return __awaiter(_this, void 0, void 0, function () {
        function generateStr(input) {
            var src = 'abcdefghijklmnopqrstuvwxyz1234567890';
            var res = '';
            for (var i = 0; i < input; i++) {
                res += src[Math.floor(src.length * Math.random())];
            }
            return res;
        }
        var phoneId, timestamp, jstoken;
        return __generator(this, function (_a) {
            phoneId = generateStr(40);
            timestamp = Date.now().toString();
            jstoken = Md5('' + decodeURIComponent($.nickname) + timestamp + phoneId + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy');
            return [2 /*return*/, {
                    'strPgtimestamp': timestamp,
                    'strPhoneID': phoneId,
                    'strPgUUNum': jstoken
                }];
        });
    }); };
    $.requestAlgo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, options;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = $;
                        return [4 /*yield*/, generateFp()];
                    case 1:
                        _a.fingerprint = _b.sent();
                        options = {
                            "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
                            "headers": {
                                'Authority': 'cactus.jd.com',
                                'Pragma': 'no-cache',
                                'Cache-Control': 'no-cache',
                                'Accept': 'application/json',
                                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                                'Content-Type': 'application/json',
                                'Origin': 'https://st.jingxi.com',
                                'Sec-Fetch-Site': 'cross-site',
                                'Sec-Fetch-Mode': 'cors',
                                'Sec-Fetch-Dest': 'empty',
                                'Referer': 'https://st.jingxi.com/',
                                'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'
                            },
                            'body': JSON.stringify({
                                "version": "1.0",
                                "fp": $.fingerprint,
                                "appId": $.appId.toString(),
                                "timestamp": Date.now(),
                                "platform": "web",
                                "expandParams": ""
                            })
                        };
                        new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                $.post(options, function (err, resp, data) {
                                    try {
                                        if (err) {
                                            console.log("" + JSON.stringify(err));
                                            console.log("request_algo \u7B7E\u540D\u53C2\u6570API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                                        }
                                        else {
                                            if (data) {
                                                // console.log(data);
                                                data = JSON.parse(data);
                                                if (data['status'] === 200) {
                                                    $.token = data.data.result.tk;
                                                    var enCryptMethodJDString = data.data.result.algo;
                                                    if (enCryptMethodJDString)
                                                        $.enCryptMethodJD = new Function("return " + enCryptMethodJDString)();
                                                    console.log("\u83B7\u53D6\u7B7E\u540D\u53C2\u6570\u6210\u529F\uFF01");
                                                    console.log("fp: " + $.fingerprint);
                                                    console.log("token: " + $.token);
                                                    console.log("enCryptMethodJD: " + enCryptMethodJDString);
                                                }
                                                else {
                                                    console.log("fp: " + $.fingerprint);
                                                    console.log('request_algo 签名参数API请求失败:');
                                                }
                                            }
                                            else {
                                                console.log("\u4EAC\u4E1C\u670D\u52A1\u5668\u8FD4\u56DE\u7A7A\u6570\u636E");
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
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    decrypt = function (time, stk, type, url) {
        stk = stk || (url ? getUrlData(url, '_stk') : '');
        if (stk) {
            var timestamp = new Date(time).Format("yyyyMMddhhmmssSSS");
            var hash1 = '';
            if ($.fingerprint && $.token && $.enCryptMethodJD) {
                hash1 = $.enCryptMethodJD($.token, $.fingerprint.toString(), timestamp.toString(), $.appId.toString(), $.CryptoJS).toString($.CryptoJS.enc.Hex);
            }
            else {
                var random = '5gkjB6SpmC9s';
                $.token = "tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc";
                $.fingerprint = 5287160221454703;
                var str = "" + $.token + $.fingerprint + timestamp + $.appId + random;
                hash1 = $.CryptoJS.SHA512(str, $.token).toString($.CryptoJS.enc.Hex);
            }
            var st_1 = '';
            stk.split(',').map(function (item, index) {
                st_1 += item + ":" + getUrlData(url, item) + (index === stk.split(',').length - 1 ? '' : '&');
            });
            var hash2 = $.CryptoJS.HmacSHA256(st_1, hash1.toString()).toString($.CryptoJS.enc.Hex);
            // console.log(`\nst:${st}`)
            // console.log(`h5st:${["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat($.appId.toString()), "".concat(token), "".concat(hash2)].join(";")}\n`)
            return encodeURIComponent(["".concat(timestamp.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.token), "".concat(hash2)].join(";"));
        }
        else {
            return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d';
        }
    };
    /**
     * 获取url参数值
     * @param url
     * @param name
     * @returns {string}
     */
    getUrlData = function (url, name) {
        if (typeof URL !== "undefined") {
            var urls = new URL(url);
            var data = urls.searchParams.get(name);
            return data ? data : '';
        }
        else {
            var query = url.match(/\?.*/)[0].substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (pair[0] === name) {
                    // return pair[1];
                    return vars[i].substr(vars[i].indexOf('=') + 1);
                }
            }
            return '';
        }
    };
    /**
     * 模拟生成 fingerprint
     * @returns {string}
     */
    generateFp = function () {
        var e = "0123456789";
        var a = 13;
        var i = '';
        for (; a--;)
            i += e[Math.random() * e.length | 0];
        return (i + Date.now()).slice(0, 16);
    };
    //获取昵称（直接用，勿删）
    $.queryJdUserInfo = function (timeout) {
        if (timeout === void 0) { timeout = 0; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            var url = {
                                url: "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
                                headers: {
                                    "Accept": "application/json,text/plain, */*",
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Accept-Encoding": "gzip, deflate, br",
                                    "Accept-Language": "zh-cn",
                                    "Connection": "keep-alive",
                                    "cookie": $.cookie,
                                    "Referer": "https://wqs.jd.com/my/iserinfo.html",
                                    "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
                                }
                            };
                            $.get(url, function (err, resp, data) {
                                try {
                                    if ($.printDetail)
                                        console.log(data);
                                    data = JSON.parse(data);
                                    if (data.retcode === 13) {
                                        return;
                                    }
                                    if (data.base)
                                        $.nickName = data.base.nickname;
                                }
                                catch (e) {
                                    $.logErr(e, resp);
                                }
                                finally {
                                    resolve();
                                }
                            });
                        }, timeout);
                    })];
            });
        });
    };
}
module.exports = {
    ZxObject: ZxObject
};
/*
修改时间戳转换函数，京喜工厂原版修改
 */
Date.prototype.Format = function (fmt) {
    var e, n = this, d = fmt, l = {
        "M+": n.getMonth() + 1,
        "d+": n.getDate(),
        "D+": n.getDate(),
        "h+": n.getHours(),
        "H+": n.getHours(),
        "m+": n.getMinutes(),
        "s+": n.getSeconds(),
        "w+": n.getDay(),
        "q+": Math.floor((n.getMonth() + 3) / 3),
        "S+": n.getMilliseconds()
    };
    /(y+)/i.test(d) && (d = d.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length)));
    for (var k in l) {
        if (new RegExp("(".concat(k, ")")).test(d)) {
            var t, a = "S+" === k ? "000" : "00";
            d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? l[k] : ("".concat(a) + l[k]).substr("".concat(l[k]).length));
        }
    }
    return d;
};
// 来自 @chavyleung 大佬
// https://raw.githubusercontent.com/chavyleung/scripts/master/Env.js
function Env(name, opts) {
    var Http = /** @class */ (function () {
        function Http(env) {
            this.env = env;
        }
        Http.prototype.send = function (opts, method) {
            var _this = this;
            if (method === void 0) { method = 'GET'; }
            opts = typeof opts === 'string' ? {
                url: opts
            } : opts;
            var sender = this.get;
            if (method === 'POST') {
                sender = this.post;
            }
            return new Promise(function (resolve, reject) {
                sender.call(_this, opts, function (err, resp, body) {
                    if (err)
                        reject(err);
                    else
                        resolve(resp);
                });
            });
        };
        Http.prototype.get = function (opts) {
            return this.send.call(this.env, opts);
        };
        Http.prototype.post = function (opts) {
            return this.send.call(this.env, opts, 'POST');
        };
        return Http;
    }());
    return new (/** @class */ (function () {
        function class_1(name, opts) {
            this.name = name;
            this.http = new Http(this);
            this.data = null;
            this.dataFile = 'box.dat';
            this.logs = [];
            this.isMute = false;
            this.isNeedRewrite = false;
            this.logSeparator = '\n';
            this.startTime = new Date().getTime();
            Object.assign(this, opts);
            this.log('', "\uD83D\uDD14" + this.name + ", \u5F00\u59CB!");
        }
        class_1.prototype.isNode = function () {
            return 'undefined' !== typeof module && !!module.exports;
        };
        class_1.prototype.isQuanX = function () {
            return 'undefined' !== typeof $task;
        };
        class_1.prototype.isSurge = function () {
            return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon;
        };
        class_1.prototype.isLoon = function () {
            return 'undefined' !== typeof $loon;
        };
        class_1.prototype.toObj = function (str, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            try {
                return JSON.parse(str);
            }
            catch (_a) {
                return defaultValue;
            }
        };
        class_1.prototype.toStr = function (obj, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            try {
                return JSON.stringify(obj);
            }
            catch (_a) {
                return defaultValue;
            }
        };
        class_1.prototype.getjson = function (key, defaultValue) {
            var json = defaultValue;
            var val = this.getdata(key);
            if (val) {
                try {
                    json = JSON.parse(this.getdata(key));
                }
                catch (_a) { }
            }
            return json;
        };
        class_1.prototype.setjson = function (val, key) {
            try {
                return this.setdata(JSON.stringify(val), key);
            }
            catch (_a) {
                return false;
            }
        };
        class_1.prototype.getScript = function (url) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.get({
                    url: url
                }, function (err, resp, body) { return resolve(body); });
            });
        };
        class_1.prototype.runScript = function (script, runOpts) {
            var _this = this;
            return new Promise(function (resolve) {
                var httpapi = _this.getdata('@chavy_boxjs_userCfgs.httpapi');
                httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi;
                var httpapi_timeout = _this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout');
                httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20;
                httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout;
                var _a = httpapi.split('@'), key = _a[0], addr = _a[1];
                var opts = {
                    url: "http://" + addr + "/v1/scripting/evaluate",
                    body: {
                        script_text: script,
                        mock_type: 'cron',
                        timeout: httpapi_timeout
                    },
                    headers: {
                        'X-Key': key,
                        'Accept': '*/*'
                    }
                };
                _this.post(opts, function (err, resp, body) { return resolve(body); });
            }).catch(function (e) { return _this.logErr(e); });
        };
        class_1.prototype.loaddata = function () {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs');
                this.path = this.path ? this.path : require('path');
                var curDirDataFilePath = this.path.resolve(this.dataFile);
                var rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile);
                var isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
                var isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
                if (isCurDirDataFile || isRootDirDataFile) {
                    var datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath;
                    try {
                        return JSON.parse(this.fs.readFileSync(datPath));
                    }
                    catch (e) {
                        return {};
                    }
                }
                else
                    return {};
            }
            else
                return {};
        };
        class_1.prototype.writedata = function () {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs');
                this.path = this.path ? this.path : require('path');
                var curDirDataFilePath = this.path.resolve(this.dataFile);
                var rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile);
                var isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
                var isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
                var jsondata = JSON.stringify(this.data);
                if (isCurDirDataFile) {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata);
                }
                else if (isRootDirDataFile) {
                    this.fs.writeFileSync(rootDirDataFilePath, jsondata);
                }
                else {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata);
                }
            }
        };
        class_1.prototype.lodash_get = function (source, path, defaultValue) {
            if (defaultValue === void 0) { defaultValue = undefined; }
            var paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
            var result = source;
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var p = paths_1[_i];
                result = Object(result)[p];
                if (result === undefined) {
                    return defaultValue;
                }
            }
            return result;
        };
        class_1.prototype.lodash_set = function (obj, path, value) {
            if (Object(obj) !== obj)
                return obj;
            if (!Array.isArray(path))
                path = path.toString().match(/[^.[\]]+/g) || [];
            path
                .slice(0, -1)
                .reduce(function (a, c, i) { return (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})); }, obj)[path[path.length - 1]] = value;
            return obj;
        };
        class_1.prototype.getdata = function (key) {
            var val = this.getval(key);
            // 如果以 @
            if (/^@/.test(key)) {
                var _a = /^@(.*?)\.(.*?)$/.exec(key), objkey = _a[1], paths = _a[2];
                var objval = objkey ? this.getval(objkey) : '';
                if (objval) {
                    try {
                        var objedval = JSON.parse(objval);
                        val = objedval ? this.lodash_get(objedval, paths, '') : val;
                    }
                    catch (e) {
                        val = '';
                    }
                }
            }
            return val;
        };
        class_1.prototype.setdata = function (val, key) {
            var issuc = false;
            if (/^@/.test(key)) {
                var _a = /^@(.*?)\.(.*?)$/.exec(key), objkey = _a[1], paths = _a[2];
                var objdat = this.getval(objkey);
                var objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}';
                try {
                    var objedval = JSON.parse(objval);
                    this.lodash_set(objedval, paths, val);
                    issuc = this.setval(JSON.stringify(objedval), objkey);
                }
                catch (e) {
                    var objedval = {};
                    this.lodash_set(objedval, paths, val);
                    issuc = this.setval(JSON.stringify(objedval), objkey);
                }
            }
            else {
                issuc = this.setval(val, key);
            }
            return issuc;
        };
        class_1.prototype.getval = function (key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.read(key);
            }
            else if (this.isQuanX()) {
                return $prefs.valueForKey(key);
            }
            else if (this.isNode()) {
                this.data = this.loaddata();
                return this.data[key];
            }
            else {
                return (this.data && this.data[key]) || null;
            }
        };
        class_1.prototype.setval = function (val, key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.write(val, key);
            }
            else if (this.isQuanX()) {
                return $prefs.setValueForKey(val, key);
            }
            else if (this.isNode()) {
                this.data = this.loaddata();
                this.data[key] = val;
                this.writedata();
                return true;
            }
            else {
                return (this.data && this.data[key]) || null;
            }
        };
        class_1.prototype.initGotEnv = function (opts) {
            this.got = this.got ? this.got : require('got');
            this.cktough = this.cktough ? this.cktough : require('tough-cookie');
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
            if (opts) {
                opts.headers = opts.headers ? opts.headers : {};
                if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
                    opts.cookieJar = this.ckjar;
                }
            }
        };
        class_1.prototype.get = function (opts, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            if (opts.headers) {
                delete opts.headers['Content-Type'];
                delete opts.headers['Content-Length'];
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {};
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    });
                }
                $httpClient.get(opts, function (err, resp, body) {
                    if (!err && resp) {
                        resp.body = body;
                        resp.statusCode = resp.status;
                    }
                    callback(err, resp, body);
                });
            }
            else if (this.isQuanX()) {
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {};
                    Object.assign(opts.opts, {
                        hints: false
                    });
                }
                $task.fetch(opts).then(function (resp) {
                    var status = resp.statusCode, statusCode = resp.statusCode, headers = resp.headers, body = resp.body;
                    callback(null, {
                        status: status,
                        statusCode: statusCode,
                        headers: headers,
                        body: body
                    }, body);
                }, function (err) { return callback(err); });
            }
            else if (this.isNode()) {
                this.initGotEnv(opts);
                this.got(opts)
                    .on('redirect', function (resp, nextOpts) {
                    try {
                        if (resp.headers['set-cookie']) {
                            var ck = resp.headers['set-cookie'].map(_this.cktough.Cookie.parse).toString();
                            if (ck) {
                                _this.ckjar.setCookieSync(ck, null);
                            }
                            nextOpts.cookieJar = _this.ckjar;
                        }
                    }
                    catch (e) {
                        _this.logErr(e);
                    }
                    // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
                })
                    .then(function (resp) {
                    var status = resp.statusCode, statusCode = resp.statusCode, headers = resp.headers, body = resp.body;
                    callback(null, {
                        status: status,
                        statusCode: statusCode,
                        headers: headers,
                        body: body
                    }, body);
                }, function (err) {
                    var error = err.message, resp = err.response;
                    callback(error, resp, resp && resp.body);
                });
            }
        };
        class_1.prototype.post = function (opts, callback) {
            if (callback === void 0) { callback = function () { }; }
            // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
            if (opts.body && opts.headers && !opts.headers['Content-Type']) {
                opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
            if (opts.headers)
                delete opts.headers['Content-Length'];
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {};
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    });
                }
                $httpClient.post(opts, function (err, resp, body) {
                    if (!err && resp) {
                        resp.body = body;
                        resp.statusCode = resp.status;
                    }
                    callback(err, resp, body);
                });
            }
            else if (this.isQuanX()) {
                opts.method = 'POST';
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {};
                    Object.assign(opts.opts, {
                        hints: false
                    });
                }
                $task.fetch(opts).then(function (resp) {
                    var status = resp.statusCode, statusCode = resp.statusCode, headers = resp.headers, body = resp.body;
                    callback(null, {
                        status: status,
                        statusCode: statusCode,
                        headers: headers,
                        body: body
                    }, body);
                }, function (err) { return callback(err); });
            }
            else if (this.isNode()) {
                this.initGotEnv(opts);
                var url = opts.url, _opts = __rest(opts, ["url"]);
                this.got.post(url, _opts).then(function (resp) {
                    var status = resp.statusCode, statusCode = resp.statusCode, headers = resp.headers, body = resp.body;
                    callback(null, {
                        status: status,
                        statusCode: statusCode,
                        headers: headers,
                        body: body
                    }, body);
                }, function (err) {
                    var error = err.message, resp = err.response;
                    callback(error, resp, resp && resp.body);
                });
            }
        };
        /**
         *
         * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
         *    :$.time('yyyyMMddHHmmssS')
         *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
         *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
         * @param {*} fmt 格式化参数
         *
         */
        class_1.prototype.time = function (fmt) {
            var o = {
                'M+': new Date().getMonth() + 1,
                'd+': new Date().getDate(),
                'H+': new Date().getHours(),
                'm+': new Date().getMinutes(),
                's+': new Date().getSeconds(),
                'q+': Math.floor((new Date().getMonth() + 3) / 3),
                'S': new Date().getMilliseconds()
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            return fmt;
        };
        /**
         * 系统通知
         *
         * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
         *
         * 示例:
         * $.msg(title, subt, desc, 'twitter://')
         * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         *
         * @param {*} title 标题
         * @param {*} subt 副标题
         * @param {*} desc 通知详情
         * @param {*} opts 通知参数
         *
         */
        class_1.prototype.msg = function (title, subt, desc, opts) {
            var _this = this;
            if (title === void 0) { title = name; }
            if (subt === void 0) { subt = ''; }
            if (desc === void 0) { desc = ''; }
            var toEnvOpts = function (rawopts) {
                if (!rawopts)
                    return rawopts;
                if (typeof rawopts === 'string') {
                    if (_this.isLoon())
                        return rawopts;
                    else if (_this.isQuanX())
                        return {
                            'open-url': rawopts
                        };
                    else if (_this.isSurge())
                        return {
                            url: rawopts
                        };
                    else
                        return undefined;
                }
                else if (typeof rawopts === 'object') {
                    if (_this.isLoon()) {
                        var openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url'];
                        var mediaUrl = rawopts.mediaUrl || rawopts['media-url'];
                        return {
                            openUrl: openUrl,
                            mediaUrl: mediaUrl
                        };
                    }
                    else if (_this.isQuanX()) {
                        var openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl;
                        var mediaUrl = rawopts['media-url'] || rawopts.mediaUrl;
                        return {
                            'open-url': openUrl,
                            'media-url': mediaUrl
                        };
                    }
                    else if (_this.isSurge()) {
                        var openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url'];
                        return {
                            url: openUrl
                        };
                    }
                }
                else {
                    return undefined;
                }
            };
            if (!this.isMute) {
                if (this.isSurge() || this.isLoon()) {
                    $notification.post(title, subt, desc, toEnvOpts(opts));
                }
                else if (this.isQuanX()) {
                    $notify(title, subt, desc, toEnvOpts(opts));
                }
            }
            if (!this.isMuteLog) {
                var logs = ['', '==============📣系统通知📣=============='];
                logs.push(title);
                subt ? logs.push(subt) : '';
                desc ? logs.push(desc) : '';
                console.log(logs.join('\n'));
                this.logs = this.logs.concat(logs);
            }
        };
        class_1.prototype.log = function () {
            var logs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                logs[_i] = arguments[_i];
            }
            if (logs.length > 0) {
                this.logs = __spreadArray(__spreadArray([], this.logs), logs);
            }
            console.log(logs.join(this.logSeparator));
        };
        class_1.prototype.logErr = function (err, msg) {
            var isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            if (!isPrintSack) {
                this.log('', "\u2757\uFE0F" + this.name + ", \u9519\u8BEF!", err);
            }
            else {
                this.log('', "\u2757\uFE0F" + this.name + ", \u9519\u8BEF!", err.stack);
            }
        };
        class_1.prototype.wait = function (time) {
            return new Promise(function (resolve) { return setTimeout(resolve, time); });
        };
        class_1.prototype.done = function (val) {
            if (val === void 0) { val = {}; }
            var endTime = new Date().getTime();
            var costTime = (endTime - this.startTime) / 1000;
            this.log('', "\uD83D\uDD14" + this.name + ", \u7ED3\u675F! \uD83D\uDD5B " + costTime + " \u79D2");
            this.log();
            if (this.isSurge() || this.isQuanX() || this.isLoon()) {
                $done(val);
            }
        };
        return class_1;
    }()))(name, opts);
}
