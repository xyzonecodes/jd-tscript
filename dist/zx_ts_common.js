"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = exports.axios = void 0;
var date_fns_1 = require("date-fns");
Object.defineProperty(exports, "format", { enumerable: true, get: function () { return date_fns_1.format; } });
var axios_1 = __importDefault(require("axios"));
exports.axios = axios_1.default;
var ts_md5_1 = require("ts-md5");
var zx_USER_AGENTS_1 = __importDefault(require("./zx_USER_AGENTS"));
var dotenv = __importStar(require("dotenv"));
var CryptoJS = require('crypto-js');
var jdCookieNode = require('./jdCookie');
var notify = require('./sendNotify');
var shareCodes = require('./zx_shareCodes');
var fingerprint, token = '', enCryptMethodJD;
dotenv.config();
var ZxObject = /** @class */ (function () {
    function ZxObject() {
        var _this = this;
        this.jsname = '';
        this.name = '';
        this.appId = 0;
        this.cookiesArr = []; //配置文件中的cookie列表
        this.cookie = ''; //当前执行的cookie
        this.printDetail = false; //打印详细
        this.helpAuthor = true;
        this.notify = notify;
        this.message = '';
        this.allMessage = '';
        this.isLogin = true;
        this.userName = '';
        this.nickName = '';
        this.shareCode = '';
        this.index = 0;
        //助力码  
        this.shareCodesArr = []; //当前配置的助力码列表
        this.dowork = function (fn) { return __awaiter(_this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.cookiesArr.length)) return [3 /*break*/, 5];
                        if (!this.cookiesArr[i]) return [3 /*break*/, 4];
                        this.replaceCookie(this.cookiesArr[i]);
                        this.index = i + 1;
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
        //处理sharecode
        this.formatShareCode = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //助力码待处理
                if (this.jsname) {
                    this.shareCode = shareCodes.shareCodes[this.jsname];
                }
                if (this.shareCode && this.shareCode.length > 0) {
                    if (this.shareCode[0].indexOf('@') > -1) {
                        this.shareCodesArr = this.shareCode[0].split('@');
                    }
                    else {
                        this.shareCodesArr.push(this.shareCode);
                    }
                }
                return [2 /*return*/];
            });
        }); };
        this.replaceCookie = function (cookie) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cookie = cookie;
                        this.userName = decodeURIComponent((this.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && this.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]) || '');
                        this.isLogin = true;
                        this.nickName = '';
                        return [4 /*yield*/, this.TotalBean()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getJxToken = function () { return __awaiter(_this, void 0, void 0, function () {
            function generateStr(input) {
                var src = 'abcdefghijklmnopqrstuvwxyz1234567890';
                var res = '';
                for (var i = 0; i < input; i++) {
                    res += src[Math.floor(src.length * Math.random())];
                }
                return res;
            }
            var phoneId, timestamp, nickname, jstoken;
            return __generator(this, function (_a) {
                phoneId = generateStr(40);
                timestamp = Date.now().toString();
                nickname = this.cookie.match(/pt_pin=([^;]*)/)[1];
                jstoken = ts_md5_1.Md5.hashStr('' + decodeURIComponent(nickname) + timestamp + phoneId + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy');
                return [2 /*return*/, {
                        'strPgtimestamp': timestamp,
                        'strPhoneID': phoneId,
                        'strPgUUNum': jstoken
                    }];
            });
        }); };
        this.TotalBean = function () { return __awaiter(_this, void 0, void 0, function () {
            var totalBean;
            var _this = this;
            return __generator(this, function (_a) {
                totalBean = {
                    isLogin: true,
                    nickName: ''
                };
                return [2 /*return*/, new Promise(function (resolve) {
                        axios_1.default.get('https://me-api.jd.com/user_new/info/GetJDUserInfoUnion', {
                            headers: {
                                Host: "me-api.jd.com",
                                Connection: "keep-alive",
                                Cookie: _this.cookie,
                                "User-Agent": zx_USER_AGENTS_1.default,
                                "Accept-Language": "zh-cn",
                                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                                "Accept-Encoding": "gzip, deflate, br"
                            }
                        }).then(function (res) {
                            if (res.data) {
                                var data = res.data;
                                if (data['retcode'] === "1001") {
                                    totalBean.isLogin = false; //cookie过期
                                }
                                if (data['retcode'] === "0" && data['data'] && data.data.hasOwnProperty("userInfo")) {
                                    totalBean.isLogin = true;
                                    totalBean.nickName = data.data.userInfo.baseInfo.nickname;
                                }
                                resolve(totalBean);
                            }
                            else {
                                console.log('京东服务器返回空数据');
                                resolve(totalBean);
                            }
                        }).catch(function (e) {
                            console.log('Error:', e);
                            resolve(totalBean);
                        });
                    })];
            });
        }); };
    }
    ZxObject.prototype.init = function (myname, jsname, appid) {
        this.name = myname;
        this.jsname = jsname;
        this.appId = appid;
        this.cookiesArr = [];
        this.shareCode = '';
        this.formatShareCode();
        this.requireConfig();
    };
    ZxObject.prototype.requestAlgo = function () {
        var _this = this;
        fingerprint = this.generateFp();
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var data, enCryptMethodJDString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post('https://cactus.jd.com/request_algo?g_ty=ajax', {
                            "version": "1.0",
                            "fp": fingerprint,
                            "appId": this.appId,
                            "timestamp": Date.now(),
                            "platform": "web",
                            "expandParams": ""
                        }, {
                            "headers": {
                                'Authority': 'cactus.jd.com',
                                'Pragma': 'no-cache',
                                'Cache-Control': 'no-cache',
                                'Accept': 'application/json',
                                'User-Agent': zx_USER_AGENTS_1.default,
                                'Content-Type': 'application/json',
                                'Origin': 'https://st.jingxi.com',
                                'Sec-Fetch-Site': 'cross-site',
                                'Sec-Fetch-Mode': 'cors',
                                'Sec-Fetch-Dest': 'empty',
                                'Referer': 'https://st.jingxi.com/',
                                'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'
                            },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        if (data['status'] === 200) {
                            token = data.data.result.tk;
                            console.log('token:', token);
                            enCryptMethodJDString = data.data.result.algo;
                            if (enCryptMethodJDString)
                                enCryptMethodJD = new Function("return " + enCryptMethodJDString)();
                        }
                        else {
                            console.log("fp: " + fingerprint);
                            console.log('request_algo 签名参数API请求失败:');
                        }
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ZxObject.prototype.decrypt = function (stk, url) {
        var _this = this;
        var timestamp = (date_fns_1.format(new Date(), 'yyyyMMddhhmmssSSS'));
        var hash1;
        if (fingerprint && token && enCryptMethodJD) {
            hash1 = enCryptMethodJD(token, fingerprint.toString(), timestamp.toString(), this.appId.toString(), CryptoJS).toString(CryptoJS.enc.Hex);
        }
        else {
            var random = '5gkjB6SpmC9s';
            token = "tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc";
            fingerprint = 9686767825751161;
            var str = "" + token + fingerprint + timestamp + this.appId + random;
            hash1 = CryptoJS.SHA512(str, token).toString(CryptoJS.enc.Hex);
        }
        var st = '';
        stk.split(',').map(function (item, index) {
            st += item + ":" + _this.getQueryString(url, item) + (index === stk.split(',').length - 1 ? '' : '&');
        });
        var hash2 = CryptoJS.HmacSHA256(st, hash1.toString()).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat(this.appId.toString()), "".concat(token), "".concat(hash2)].join(";"));
    };
    ZxObject.prototype.getQueryString = function (url, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = url.split('?')[1].match(reg);
        if (r != null)
            return unescape(r[2]);
        return '';
    };
    ZxObject.prototype.generateFp = function () {
        var e = "0123456789";
        var a = 13;
        var i = '';
        for (; a--;)
            i += e[Math.random() * e.length | 0];
        return (i + Date.now()).slice(0, 16);
    };
    ZxObject.prototype.requireConfig = function () {
        var _this = this;
        return new Promise(function (resolve) {
            console.log('开始获取配置文件\n');
            var jdCookieNode = require('./jdCookie.js');
            Object.keys(jdCookieNode).forEach(function (item) {
                if (jdCookieNode[item]) {
                    _this.cookiesArr.push(jdCookieNode[item]);
                }
            });
            console.log("\u5171" + _this.cookiesArr.length + "\u4E2A\u4EAC\u4E1C\u8D26\u53F7\n");
            resolve(_this.cookiesArr);
        });
    };
    ZxObject.prototype.sleep = function (t) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, t);
        });
    };
    ZxObject.prototype.get = function (opts, callback) {
        var _this = this;
        if (callback === void 0) { callback = function (err, resp, data) { }; }
        // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
        if (opts.body && opts.headers && !opts.headers['Content-Type']) {
            opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var data, status, statusCode, headers, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(opts.url, opts.headers)];
                    case 1:
                        data = (_a.sent()).data;
                        status = data.statusCode, statusCode = data.statusCode, headers = data.headers, body = data.body;
                        callback(null, {
                            status: status,
                            statusCode: statusCode,
                            headers: headers,
                            body: body
                        }, body);
                        resolve(data);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ZxObject.prototype.post = function (opts, callback) {
        if (callback === void 0) { callback = function (err, resp, data) { }; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
                if (opts.body && opts.headers && !opts.headers['Content-Type']) {
                    opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var data, status, statusCode, headers, body;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, axios_1.default.post(opts.url, opts.data, opts.headers)];
                                case 1:
                                    data = (_a.sent()).data;
                                    status = data.statusCode, statusCode = data.statusCode, headers = data.headers, body = data.body;
                                    callback(null, {
                                        status: status,
                                        statusCode: statusCode,
                                        headers: headers,
                                        body: body
                                    }, body);
                                    resolve(data);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ZxObject.prototype.msg = function (title, subt, desc) {
        if (title === void 0) { title = ''; }
        if (subt === void 0) { subt = ''; }
        if (desc === void 0) { desc = ''; }
        var logs = ['', '==============📣系统通知📣=============='];
        logs.push(title);
        subt ? logs.push(subt) : '';
        desc ? logs.push(desc) : '';
        this.log(logs);
    };
    ZxObject.prototype.log = function (logs) {
        console.log(logs.join('\n'));
    };
    return ZxObject;
}());
var $ = new ZxObject();
exports.default = $;
