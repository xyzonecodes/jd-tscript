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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var zx_ts_common_1 = __importDefault(require("./zx_ts_common"));
var zx_ts_common_2 = require("./zx_ts_common");
var res = '';
zx_ts_common_1.default.init("财富岛提现", 'jxcfdtx', 10028);
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, zx_ts_common_1.default.requestAlgo()];
            case 1:
                _a.sent();
                zx_ts_common_1.default.dowork(function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _i, _a, b, token, money, h;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    console.log("\n******\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7" + zx_ts_common_1.default.index + "\u3011" + (zx_ts_common_1.default.nickName || zx_ts_common_1.default.userName) + "*********\n");
                                    if (!!zx_ts_common_1.default.isLogin) return [3 /*break*/, 2];
                                    console.log(zx_ts_common_1.default.name, "\u3010\u63D0\u793A\u3011cookie\u5DF2\u5931\u6548", "\u4EAC\u4E1C\u8D26\u53F7" + zx_ts_common_1.default.index + " " + (zx_ts_common_1.default.nickName || zx_ts_common_1.default.userName) + "\n\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6\nhttps://bean.m.jd.com/bean/signIndex.action", { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                                    return [4 /*yield*/, zx_ts_common_1.default.notify.sendNotify(zx_ts_common_1.default.name + "cookie\u5DF2\u5931\u6548 - " + zx_ts_common_1.default.userName, "\u4EAC\u4E1C\u8D26\u53F7" + zx_ts_common_1.default.index + " " + zx_ts_common_1.default.userName + "\n\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6cookie")];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                                case 2:
                                    if (!((new Date().getHours() === 0 || new Date().getHours() === 12) && new Date().getMinutes() === 0)) return [3 /*break*/, 7];
                                    _i = 0, _a = ['food', 'fun', 'shop', 'sea'];
                                    _b.label = 3;
                                case 3:
                                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                                    b = _a[_i];
                                    return [4 /*yield*/, api('user/GetBuildInfo', '_cfd_t,bizCode,dwEnv,dwType,ptag,source,strBuildIndex,strZone', { strBuildIndex: b })];
                                case 4:
                                    res = _b.sent();
                                    if (!(res.dwCanLvlUp === 1)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, api('user/BuildLvlUp', '_cfd_t,bizCode,ddwCostCoin,dwEnv,ptag,source,strBuildIndex,strZone', { ddwCostCoin: res.ddwNextLvlCostCoin, strBuildIndex: b })];
                                case 5:
                                    res = _b.sent();
                                    if (res.iRet === 0) {
                                        console.log(b + "\u5347\u7EA7\u6210\u529F");
                                        return [3 /*break*/, 7];
                                    }
                                    _b.label = 6;
                                case 6:
                                    _i++;
                                    return [3 /*break*/, 3];
                                case 7:
                                    // 提现
                                    console.log('解锁：', zx_ts_common_2.format(new Date(), 'hh:mm:ss:SSS'));
                                    return [4 /*yield*/, zx_ts_common_1.default.getJxToken()];
                                case 8:
                                    token = _b.sent();
                                    return [4 /*yield*/, api('user/CashOutQuali', '_cfd_t,bizCode,dwEnv,ptag,source,strPgUUNum,strPgtimestamp,strPhoneID,strZone', { strPgUUNum: token.strPgUUNum, strPgtimestamp: token.strPgtimestamp, strPhoneID: token.strPhoneID })];
                                case 9:
                                    res = _b.sent();
                                    console.log('资格:', res);
                                    if (res.iRet === 2036)
                                        return [2 /*return*/];
                                    return [4 /*yield*/, zx_ts_common_1.default.sleep(4000)];
                                case 10:
                                    _b.sent();
                                    console.log('提现：', zx_ts_common_2.format(new Date(), 'hh:mm:ss:SSS'));
                                    h = new Date().getHours();
                                    if (h === 0)
                                        money = 100;
                                    else if (h === 12)
                                        money = 50;
                                    else
                                        money = 10;
                                    money = process.env.CFD_CASHOUT_MONEY ? parseFloat(process.env.CFD_CASHOUT_MONEY) * 100 : money;
                                    console.log('本次计划提现：', money / 100);
                                    return [4 /*yield*/, api('user/CashOut', '_cfd_t,bizCode,ddwMoney,ddwPaperMoney,dwEnv,ptag,source,strPgUUNum,strPgtimestamp,strPhoneID,strZone', { ddwMoney: money, ddwPaperMoney: money * 10, strPgUUNum: token.strPgUUNum, strPgtimestamp: token.strPgtimestamp, strPhoneID: token.strPhoneID })];
                                case 11:
                                    res = _b.sent();
                                    console.log('提现:', res);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
        }
    });
}); })();
function api(fn, stk, params) {
    var _this = this;
    if (params === void 0) { params = {}; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var url, key, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://m.jingxi.com/jxbfd/" + fn + "?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=" + Date.now() + "&ptag=138631.26.55&_ste=1&_=" + Date.now() + "&sceneval=2&_stk=" + encodeURIComponent(stk);
                    if (['GetUserTaskStatusList', 'Award', 'DoTask'].includes(fn)) {
                        console.log('api2');
                        url = "https://m.jingxi.com/newtasksys/newtasksys_front/" + fn + "?strZone=jxbfd&bizCode=jxbfddch&source=jxbfd&dwEnv=7&_cfd_t=" + Date.now() + "&ptag=138631.26.55&_stk=" + encodeURIComponent(stk) + "&_ste=1&_=" + Date.now() + "&sceneval=2";
                    }
                    if (Object.keys(params).length !== 0) {
                        key = void 0;
                        for (key in params) {
                            if (params.hasOwnProperty(key))
                                url += "&" + key + "=" + params[key];
                        }
                    }
                    url += '&h5st=' + zx_ts_common_1.default.decrypt(stk, url);
                    return [4 /*yield*/, zx_ts_common_2.axios.get(url, {
                            headers: {
                                Cookie: zx_ts_common_1.default.cookie,
                                Referer: "https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
                                Host: "m.jingxi.com",
                                "User-Agent": "jdpingou",
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    resolve(data);
                    return [2 /*return*/];
            }
        });
    }); });
}
