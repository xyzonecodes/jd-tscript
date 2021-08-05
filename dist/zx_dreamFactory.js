"use strict";
// prettier-ignore
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var zxCommon = require('./zx_common.js');
var zxObject = new zxCommon.ZxObject('京喜工厂');
var $ = zxObject.$;
$.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
var JD_API_HOST = 'https://m.jingxi.com';
var jdNotify = true; //是否关闭通知，false打开通知推送，true关闭通知推送
var tuanActiveId = "", hasSend = false;
var jxOpenUrl = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://wqsd.jd.com/pingou/dream_factory/index.html%22%20%7D";
$.Qswitch = true;
var inviteCodes = [
    //'T022v_13RxwZ91ffPR_wlPcNfACjVWnYaS5kRrbA@T0205KkcH1lQpB6qW3uX06FuCjVWnYaS5kRrbA@T0225KkcRR1K8wXXJxKiwaIIdACjVWnYaS5kRrbA@T018v_h6QBsa9VfeKByb1ACjVWnYaS5kRrbA@T016aGPImbWDIsNs9Zd1CjVWnYaS5kRrbA@T020anX1lb-5IPJt9JJyQH-MCjVWnYaS5kRrbA@T0225KkcRBoRp1SEJBP1nKIDdgCjVWnYaS5kRrbA@T0225KkcRBoRp1SEJBP1nKIDdgCjVWnYaS5kRrbA'
    'GQFaiFODayP3CFmn1GngIw==@htUVUcz88GkkaRpg8X59lg==@GoJPV0b29CFq7ww_565pnQ=='
];
$.SQSwitch = true;
$.SJSwitch = true;
$.tuanIds = [];
$.appId = 10001;
$.canHelp = true; //能否参团
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, requestAlgo()];
            case 1:
                _a.sent();
                return [4 /*yield*/, getTuanActiveId()];
            case 2:
                _a.sent();
                //await requireConfig();
                //await requireConfig();
                if (!$.cookiesArr[0]) {
                    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, $.dowork(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        $.ele = 0;
                                        $.pickEle = 0;
                                        $.pickFriendEle = 0;
                                        $.friendList = [];
                                        $.canHelpFlag = true; //能否助力朋友(招工)
                                        $.tuanNum = 0; //成团人数
                                        //await TotalBean();
                                        console.log("\n******\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + ($.nickName || $.UserName) + "*********\n");
                                        if (!!$.isLogin) return [3 /*break*/, 3];
                                        $.msg($.name, "\u3010\u63D0\u793A\u3011cookie\u5DF2\u5931\u6548", "\u4EAC\u4E1C\u8D26\u53F7" + $.index + " " + ($.nickName || $.UserName) + "\n\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6\nhttps://bean.m.jd.com/bean/signIndex.action", { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                                        if (!$.isNode()) return [3 /*break*/, 2];
                                        return [4 /*yield*/, $.notify.sendNotify($.name + "cookie\u5DF2\u5931\u6548 - " + $.UserName, "\u4EAC\u4E1C\u8D26\u53F7" + $.index + " " + $.UserName + "\n\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6cookie")];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                    case 3: return [4 /*yield*/, jdDreamFactory()];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, $.dowork(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _i, _a, item;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        console.log("\n\u8D26\u53F7" + $.UserName + " \u5185\u90E8\u76F8\u4E92\u8FDB\u56E2\n");
                                        $.canHelp = true;
                                        _i = 0, _a = $.tuanIds;
                                        _b.label = 1;
                                    case 1:
                                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                                        item = _a[_i];
                                        if (!$.canHelp)
                                            return [3 /*break*/, 5];
                                        console.log("\n" + $.UserName + " \u53BB\u53C2\u52A0\u56E2 " + item);
                                        return [4 /*yield*/, JoinTuan(item)];
                                    case 2:
                                        _b.sent();
                                        return [4 /*yield*/, $.wait(1000)];
                                    case 3:
                                        _b.sent();
                                        _b.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        });
                    })];
            case 4:
                _a.sent();
                if (!($.isNode() && $.allMessage)) return [3 /*break*/, 6];
                return [4 /*yield*/, $.notify.sendNotify("" + $.name, "" + $.allMessage, { url: jxOpenUrl })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); })()
    .catch(function (e) {
    $.log('', "\u274C " + $.name + ", \u5931\u8D25! \u539F\u56E0: " + e + "!", '');
})
    .finally(function () {
    $.done();
});
function jdDreamFactory() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 14, , 15]);
                    return [4 /*yield*/, userInfo()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, QueryFriendList()];
                case 2:
                    _a.sent(); //查询今日招工情况以及剩余助力次数
                    // await joinLeaderTuan();//参团
                    return [4 /*yield*/, helpFriends()];
                case 3:
                    // await joinLeaderTuan();//参团
                    _a.sent();
                    if (!$.unActive)
                        return [2 /*return*/];
                    // await collectElectricity()
                    return [4 /*yield*/, getUserElectricity()];
                case 4:
                    // await collectElectricity()
                    _a.sent();
                    return [4 /*yield*/, taskList()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, investElectric()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, QueryHireReward()];
                case 7:
                    _a.sent(); //收取招工电力
                    return [4 /*yield*/, PickUp()];
                case 8:
                    _a.sent(); //收取自家的地下零件
                    return [4 /*yield*/, stealFriend()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, tuanActivity()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, QueryAllTuan()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, exchangeProNotify()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, showMsg()];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 15];
                case 14:
                    e_1 = _a.sent();
                    $.logErr(e_1);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
// 收取发电机的电力
function collectElectricity(facId, help, master) {
    var _this = this;
    if (facId === void 0) { facId = $.factoryId; }
    if (help === void 0) { help = false; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            body = "factoryid=" + facId + "&apptoken=&pgtimestamp=&phoneID=&doubleflag=1";
            if (help && master) {
                body += "factoryid=" + facId + "&master=" + master;
            }
            $.get(taskurl("generator/CollectCurrentElectricity", body, "_time,apptoken,doubleflag,factoryid,pgtimestamp,phoneID,timeStamp,zone"), function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {
                                if (help) {
                                    $.ele += Number(data.data['loginPinCollectElectricity']);
                                    console.log("\u5E2E\u52A9\u597D\u53CB\u6536\u53D6 " + data.data['CollectElectricity'] + " \u7535\u529B\uFF0C\u83B7\u5F97 " + data.data['loginPinCollectElectricity'] + " \u7535\u529B");
                                    $.message += "\u3010\u5E2E\u52A9\u597D\u53CB\u3011\u5E2E\u52A9\u6210\u529F\uFF0C\u83B7\u5F97 " + data.data['loginPinCollectElectricity'] + " \u7535\u529B\n";
                                }
                                else {
                                    $.ele += Number(data.data['CollectElectricity']);
                                    console.log("\u6536\u53D6\u7535\u529B\u6210\u529F: \u5171" + data.data['CollectElectricity'] + " ");
                                    $.message += "\u3010\u6536\u53D6\u53D1\u7535\u7AD9\u3011\u6536\u53D6\u6210\u529F\uFF0C\u83B7\u5F97 " + data.data['CollectElectricity'] + " \u7535\u529B\n";
                                }
                            }
                            else {
                                if (help) {
                                    console.log("\u6536\u53D6\u597D\u53CB\u7535\u529B\u5931\u8D25:" + data.msg + "\n");
                                }
                                else {
                                    console.log("\u6536\u53D6\u7535\u529B\u5931\u8D25:" + data.msg + "\n");
                                }
                            }
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
// 投入电力
function investElectric() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // const url = `/dreamfactory/userinfo/InvestElectric?zone=dream_factory&productionId=${$.productionId}&sceneval=2&g_login_type=1`;
            $.get(taskurl('userinfo/InvestElectric', "productionId=" + $.productionId, "_time,productionId,zone"), function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data.ret === 0) {
                                console.log("\u6210\u529F\u6295\u5165\u7535\u529B" + data.data.investElectric + "\u7535\u529B");
                                $.message += "\u3010\u6295\u5165\u7535\u529B\u3011\u6295\u5165\u6210\u529F\uFF0C\u5171\u8BA1 " + data.data.investElectric + " \u7535\u529B\n";
                            }
                            else {
                                console.log("\u6295\u5165\u5931\u8D25\uFF0C" + data.msg);
                                $.message += "\u3010\u6295\u5165\u7535\u529B\u3011\u6295\u5165\u5931\u8D25\uFF0C" + data.msg + "\n";
                            }
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
// 初始化任务
function taskList() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // const url = `/newtasksys/newtasksys_front/GetUserTaskStatusList?source=dreamfactory&bizCode=dream_factory&sceneval=2&g_login_type=1`;
            $.get(newtasksysUrl('GetUserTaskStatusList', '', "_time,bizCode,source"), function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
                var userTaskStatusList, i, vo, _a, i_1, e_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 19, 20, 21]);
                            if (!err) return [3 /*break*/, 1];
                            console.log("" + JSON.stringify(err));
                            console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                            return [3 /*break*/, 18];
                        case 1:
                            if (!$.safeGet(data)) return [3 /*break*/, 18];
                            data = JSON.parse(data);
                            userTaskStatusList = data['data']['userTaskStatusList'];
                            i = 0;
                            _b.label = 2;
                        case 2:
                            if (!(i < userTaskStatusList.length)) return [3 /*break*/, 17];
                            vo = userTaskStatusList[i];
                            if (!(vo['awardStatus'] !== 1)) return [3 /*break*/, 16];
                            if (!(vo.completedTimes >= vo.targetTimes)) return [3 /*break*/, 5];
                            console.log("\u4EFB\u52A1\uFF1A" + vo.description + "\u53EF\u5B8C\u6210");
                            return [4 /*yield*/, completeTask(vo.taskId, vo.taskName)];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, $.wait(1000)];
                        case 4:
                            _b.sent(); //延迟等待一秒
                            return [3 /*break*/, 16];
                        case 5:
                            _a = vo.taskType;
                            switch (_a) {
                                case 2: return [3 /*break*/, 6];
                                case 6: return [3 /*break*/, 6];
                                case 9: return [3 /*break*/, 6];
                                case 4: return [3 /*break*/, 13];
                                case 5: return [3 /*break*/, 14];
                                case 1: return [3 /*break*/, 15];
                            }
                            return [3 /*break*/, 15];
                        case 6:
                            i_1 = vo.completedTimes;
                            _b.label = 7;
                        case 7:
                            if (!(i_1 <= vo.configTargetTimes)) return [3 /*break*/, 12];
                            console.log("\u53BB\u505A\u4EFB\u52A1\uFF1A" + vo.taskName);
                            return [4 /*yield*/, doTask(vo.taskId)];
                        case 8:
                            _b.sent();
                            return [4 /*yield*/, completeTask(vo.taskId, vo.taskName)];
                        case 9:
                            _b.sent();
                            return [4 /*yield*/, $.wait(1000)];
                        case 10:
                            _b.sent(); //延迟等待一秒
                            _b.label = 11;
                        case 11:
                            ++i_1;
                            return [3 /*break*/, 7];
                        case 12: return [3 /*break*/, 16];
                        case 13: // 招工
                        return [3 /*break*/, 16];
                        case 14: 
                        // 收集类
                        return [3 /*break*/, 16];
                        case 15: return [3 /*break*/, 16];
                        case 16:
                            i++;
                            return [3 /*break*/, 2];
                        case 17:
                            console.log("\u5B8C\u6210\u4EFB\u52A1\uFF1A\u5171\u9886\u53D6" + $.ele + "\u7535\u529B");
                            $.message += "\u3010\u6BCF\u65E5\u4EFB\u52A1\u3011\u9886\u5956\u6210\u529F\uFF0C\u5171\u8BA1 " + $.ele + " \u7535\u529B\n";
                            _b.label = 18;
                        case 18: return [3 /*break*/, 21];
                        case 19:
                            e_2 = _b.sent();
                            $.logErr(e_2, resp);
                            return [3 /*break*/, 21];
                        case 20:
                            resolve();
                            return [7 /*endfinally*/];
                        case 21: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
}
// 获得用户电力情况
function getUserElectricity() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // const url = `/dreamfactory/generator/QueryCurrentElectricityQuantity?zone=dream_factory&factoryid=${$.factoryId}&sceneval=2&g_login_type=1`
            $.get(taskurl("generator/QueryCurrentElectricityQuantity", "factoryid=" + $.factoryId, "_time,factoryid,zone"), function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
                var e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, 9, 10]);
                            if (!err) return [3 /*break*/, 1];
                            console.log("" + JSON.stringify(err));
                            console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                            return [3 /*break*/, 7];
                        case 1:
                            if (!$.safeGet(data)) return [3 /*break*/, 7];
                            data = JSON.parse(data);
                            if (!(data['ret'] === 0)) return [3 /*break*/, 7];
                            console.log("\u53D1\u7535\u673A\uFF1A\u5F53\u524D " + data.data.currentElectricityQuantity + " \u7535\u529B\uFF0C\u6700\u5927\u503C " + data.data.maxElectricityQuantity + " \u7535\u529B");
                            if (data.data.currentElectricityQuantity < data.data.maxElectricityQuantity) {
                                $.log("\n\u672C\u6B21\u53D1\u7535\u673A\u7535\u529B\u96C6\u6EE1\u5206\u4EAB\u540E" + (data.data.nextCollectDoubleFlag === 1 ? '可' : '不可') + "\u83B7\u5F97\u53CC\u500D\u7535\u529B\uFF0C" + (data.data.nextCollectDoubleFlag === 1 ? '故目前不收取电力' : '故现在收取电力') + "\n");
                            }
                            if (!(data.data.nextCollectDoubleFlag === 1)) return [3 /*break*/, 5];
                            if (!(data.data.currentElectricityQuantity === data.data.maxElectricityQuantity && data.data.doubleElectricityFlag)) return [3 /*break*/, 3];
                            console.log("\u53D1\u7535\u673A\uFF1A\u7535\u529B\u53EF\u7FFB\u500D\u5E76\u6536\u83B7");
                            // await shareReport();
                            return [4 /*yield*/, collectElectricity()];
                        case 2:
                            // await shareReport();
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            $.message += "\u3010\u53D1\u7535\u673A\u7535\u529B\u3011\u5F53\u524D " + data.data.currentElectricityQuantity + " \u7535\u529B\uFF0C\u672A\u8FBE\u5230\u6536\u83B7\u6807\u51C6\n";
                            _a.label = 4;
                        case 4: return [3 /*break*/, 7];
                        case 5: 
                        //再收取双倍电力达到上限时，直接收取，不再等到满级
                        return [4 /*yield*/, collectElectricity()];
                        case 6:
                            //再收取双倍电力达到上限时，直接收取，不再等到满级
                            _a.sent();
                            _a.label = 7;
                        case 7: return [3 /*break*/, 10];
                        case 8:
                            e_3 = _a.sent();
                            $.logErr(e_3, resp);
                            return [3 /*break*/, 10];
                        case 9:
                            resolve();
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
}
//查询有多少的招工电力可收取
function QueryHireReward() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // const url = `/dreamfactory/friend/HireAward?zone=dream_factory&date=${new Date().Format("yyyyMMdd")}&type=0&sceneval=2&g_login_type=1`
            $.get(taskurl('friend/QueryHireReward', "", "_time,zone"), function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
                var _i, _a, item, e_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 8, 9, 10]);
                            if (!err) return [3 /*break*/, 1];
                            console.log("" + JSON.stringify(err));
                            console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                            return [3 /*break*/, 7];
                        case 1:
                            if (!$.safeGet(data)) return [3 /*break*/, 7];
                            data = JSON.parse(data);
                            if (!(data['ret'] === 0)) return [3 /*break*/, 6];
                            _i = 0, _a = data['data']['hireReward'];
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            item = _a[_i];
                            if (!(item.date !== new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).Format("yyyyMMdd"))) return [3 /*break*/, 4];
                            return [4 /*yield*/, hireAward(item.date, item.type)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            console.log("\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                            _b.label = 7;
                        case 7: return [3 /*break*/, 10];
                        case 8:
                            e_4 = _b.sent();
                            $.logErr(e_4, resp);
                            return [3 /*break*/, 10];
                        case 9:
                            resolve();
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
}
// 收取招工/劳模电力
function hireAward(date, type) {
    var _this = this;
    if (type === void 0) { type = 0; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // const url = `/dreamfactory/friend/HireAward?zone=dream_factory&date=${new Date().Format("yyyyMMdd")}&type=0&sceneval=2&g_login_type=1`
            $.get(taskurl('friend/HireAward', "date=" + date + "&type=" + type, '_time,date,type,zone'), function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        if (err) {
                            console.log("" + JSON.stringify(err));
                            console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                        }
                        else {
                            if ($.safeGet(data)) {
                                data = JSON.parse(data);
                                if (data['ret'] === 0) {
                                    console.log("\u6253\u5DE5\u7535\u529B\uFF1A\u6536\u53D6\u6210\u529F");
                                    $.message += "\u3010\u6253\u5DE5\u7535\u529B\u3011\uFF1A\u6536\u53D6\u6210\u529F\n";
                                }
                                else {
                                    console.log("\u6253\u5DE5\u7535\u529B\uFF1A\u6536\u53D6\u5931\u8D25\uFF0C" + data.msg);
                                    $.message += "\u3010\u6253\u5DE5\u7535\u529B\u3011\u6536\u53D6\u5931\u8D25\uFF0C" + data.msg + "\n";
                                }
                            }
                        }
                    }
                    catch (e) {
                        $.logErr(e, resp);
                    }
                    finally {
                        resolve();
                    }
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    }); });
}
function helpFriends() {
    return __awaiter(this, void 0, void 0, function () {
        var Hours, _i, _a, code, assistFriendRes;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Hours = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getHours();
                    if (Hours < 6) {
                        console.log("\n\u672A\u5230\u62DB\u5DE5\u65F6\u95F4(\u6BCF\u65E56-24\u70B9\u4E4B\u95F4\u53EF\u62DB\u5DE5)\n");
                        return [2 /*return*/];
                    }
                    if (!$.canHelpFlag) return [3 /*break*/, 6];
                    return [4 /*yield*/, shareCodesFormat()];
                case 1:
                    _b.sent();
                    _i = 0, _a = $.newShareCodes;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    code = _a[_i];
                    if (!code) return [3 /*break*/, 4];
                    if ($.encryptPin === code) {
                        console.log("\u4E0D\u80FD\u4E3A\u81EA\u5DF1\u52A9\u529B,\u8DF3\u8FC7");
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, assistFriend(code)];
                case 3:
                    assistFriendRes = _b.sent();
                    if (assistFriendRes && assistFriendRes['ret'] === 0) {
                        console.log("\u52A9\u529B\u670B\u53CB\uFF1A" + code + "\u6210\u529F\uFF0C\u56E0\u4E00\u6B21\u53EA\u80FD\u52A9\u529B\u4E00\u4E2A\uFF0C\u6545\u8DF3\u51FA\u52A9\u529B");
                        return [3 /*break*/, 5];
                    }
                    else if (assistFriendRes && assistFriendRes['ret'] === 11009) {
                        console.log("\u52A9\u529B\u670B\u53CB[" + code + "]\u5931\u8D25\uFF1A" + assistFriendRes.msg + "\uFF0C\u8DF3\u51FA\u52A9\u529B");
                        return [3 /*break*/, 5];
                    }
                    else {
                        console.log("\u52A9\u529B\u670B\u53CB[" + code + "]\u5931\u8D25\uFF1A" + assistFriendRes.msg);
                    }
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    $.log("\n\u4ECA\u65E5\u52A9\u529B\u597D\u53CB\u673A\u4F1A\u5DF2\u8017\u5C3D\n");
                    _b.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
// 帮助用户,此处UA不可更换,否则助力功能会失效
function assistFriend(sharepin) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            options = taskurl('friend/AssistFriend', "sharepin=" + escape(sharepin), "_time,sharepin,zone");
            $.get(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            // if (data['ret'] === 0) {
                            //   console.log(`助力朋友：${sharepin}成功`)
                            // } else {
                            //   console.log(`助力朋友[${sharepin}]失败：${data.msg}`)
                            // }
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
            return [2 /*return*/];
        });
    }); });
}
//查询助力招工情况
function QueryFriendList() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            $.get(taskurl('friend/QueryFriendList', "", "_time,zone"), function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {
                                data = data['data'];
                                var _a = data.assistListToday, assistListToday = _a === void 0 ? [] : _a, assistNumMax = data.assistNumMax, _b = data.hireListToday, hireListToday = _b === void 0 ? [] : _b, hireNumMax = data.hireNumMax;
                                console.log("\n\n\u4F60\u4ECA\u65E5\u8FD8\u80FD\u5E2E\u597D\u53CB\u6253\u5DE5\uFF08" + (assistNumMax - assistListToday.length || 0) + "/" + assistNumMax + "\uFF09\u6B21\n\n");
                                if (assistListToday.length === assistNumMax) {
                                    $.canHelpFlag = false;
                                }
                                $.log("\u3010\u4ECA\u65E5\u62DB\u5DE5\u8FDB\u5EA6\u3011" + hireListToday.length + "/" + hireNumMax);
                                $.message += "\u3010\u62DB\u5DE5\u8FDB\u5EA6\u3011" + hireListToday.length + "/" + hireNumMax + "\n";
                            }
                            else {
                                console.log("QueryFriendList\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                            }
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
// 任务领奖
function completeTask(taskId, taskName) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // const url = `/newtasksys/newtasksys_front/Award?source=dreamfactory&bizCode=dream_factory&taskId=${taskId}&sceneval=2&g_login_type=1`;
            $.get(newtasksysUrl('Award', taskId, "_time,bizCode,source,taskId"), function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            switch (data['data']['awardStatus']) {
                                case 1:
                                    $.ele += Number(data['data']['prizeInfo'].replace('\\n', ''));
                                    console.log("\u9886\u53D6" + taskName + "\u4EFB\u52A1\u5956\u52B1\u6210\u529F\uFF0C\u6536\u83B7\uFF1A" + Number(data['data']['prizeInfo'].replace('\\n', '')) + "\u7535\u529B");
                                    break;
                                case 1013:
                                case 0:
                                    console.log("\u9886\u53D6" + taskName + "\u4EFB\u52A1\u5956\u52B1\u5931\u8D25\uFF0C\u4EFB\u52A1\u5DF2\u9886\u5956");
                                    break;
                                default:
                                    console.log("\u9886\u53D6" + taskName + "\u4EFB\u52A1\u5956\u52B1\u5931\u8D25\uFF0C" + data['msg']);
                                    break;
                            }
                            // if (data['ret'] === 0) {
                            //   console.log("做任务完成！")
                            // } else {
                            //   console.log(`异常：${JSON.stringify(data)}`)
                            // }
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
// 完成任务
function doTask(taskId) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // const url = `/newtasksys/newtasksys_front/DoTask?source=dreamfactory&bizCode=dream_factory&taskId=${taskId}&sceneval=2&g_login_type=1`;
            $.get(newtasksysUrl('DoTask', taskId, '_time,bizCode,configExtra,source,taskId'), function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {
                                console.log("做任务完成！");
                            }
                            else {
                                console.log("DoTask\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                            }
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
// 初始化个人信息
function userInfo() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            $.get(taskurl('userinfo/GetUserInfo', "pin=&sharePin=&shareType=&materialTuanPin=&materialTuanId=&source=", '_time,materialTuanId,materialTuanPin,pin,sharePin,shareType,source,zone'), function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
                var production, factory, productionStage, nowTimes, e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 10, 11, 12]);
                            if (!err) return [3 /*break*/, 1];
                            console.log("" + JSON.stringify(err));
                            console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                            return [3 /*break*/, 9];
                        case 1:
                            if (!$.safeGet(data)) return [3 /*break*/, 9];
                            data = JSON.parse(data);
                            if (!(data['ret'] === 0)) return [3 /*break*/, 8];
                            data = data['data'];
                            $.unActive = true; //标记是否开启了京喜活动或者选购了商品进行生产
                            $.encryptPin = '';
                            $.shelvesList = [];
                            if (!(data.factoryList && data.productionList)) return [3 /*break*/, 6];
                            production = data.productionList[0];
                            factory = data.factoryList[0];
                            productionStage = data.productionStage;
                            $.factoryId = factory.factoryId; //工厂ID
                            $.productionId = production.productionId; //商品ID
                            $.commodityDimId = production.commodityDimId;
                            $.encryptPin = data.user.encryptPin;
                            // subTitle = data.user.pin;
                            return [4 /*yield*/, GetCommodityDetails()];
                        case 2:
                            // subTitle = data.user.pin;
                            _a.sent(); //获取已选购的商品信息
                            if (!(productionStage['productionStageAwardStatus'] === 1)) return [3 /*break*/, 4];
                            $.log("\u53EF\u4EE5\u5F00\u7EA2\u5305\u4E86\n");
                            return [4 /*yield*/, DrawProductionStagePrize()];
                        case 3:
                            _a.sent(); //领取红包
                            return [3 /*break*/, 5];
                        case 4:
                            $.log("\u518D\u52A0" + productionStage['productionStageProgress'] + "\u7535\u529B\u53EF\u5F00\u7EA2\u5305\n");
                            _a.label = 5;
                        case 5:
                            console.log("\u5F53\u524D\u7535\u529B\uFF1A" + data.user.electric);
                            console.log("\u5F53\u524D\u7B49\u7EA7\uFF1A" + data.user.currentLevel);
                            console.log("\n\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\uFF08" + $.UserName + "\uFF09\u7684" + $.name + "\u597D\u53CB\u4E92\u52A9\u7801\u3011" + data.user.encryptPin);
                            console.log("\u5DF2\u6295\u5165\u7535\u529B\uFF1A" + production.investedElectric);
                            console.log("\u6240\u9700\u7535\u529B\uFF1A" + production.needElectric);
                            console.log("\u751F\u4EA7\u8FDB\u5EA6\uFF1A" + ((production.investedElectric / production.needElectric) * 100).toFixed(2) + "%");
                            $.message += "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n";
                            $.message += "\u3010\u751F\u4EA7\u5546\u54C1\u3011" + $.productName + "\n";
                            $.message += "\u3010\u5F53\u524D\u7B49\u7EA7\u3011" + data.user.userIdentity + " " + data.user.currentLevel + "\n";
                            $.message += "\u3010\u751F\u4EA7\u8FDB\u5EA6\u3011" + ((production.investedElectric / production.needElectric) * 100).toFixed(2) + "%\n";
                            if (production.investedElectric >= production.needElectric) {
                                if (production['exchangeStatus'] === 1)
                                    $.log("\n\n\u53EF\u4EE5\u5151\u6362\u5546\u54C1\u4E86");
                                if (production['exchangeStatus'] === 3) {
                                    $.log("\n\n\u5546\u54C1\u5151\u6362\u5DF2\u8D85\u65F6");
                                    if (new Date().getHours() === 9) {
                                        $.msg($.name, '', "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n\u3010\u751F\u4EA7\u5546\u54C1\u3011" + $.productName + "\u5151\u6362\u5DF2\u8D85\u65F6\uFF0C\u8BF7\u9009\u62E9\u65B0\u5546\u54C1\u8FDB\u884C\u5236\u9020");
                                        $.allMessage += "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n\u3010\u751F\u4EA7\u5546\u54C1\u3011" + $.productName + "\u5151\u6362\u5DF2\u8D85\u65F6\uFF0C\u8BF7\u9009\u62E9\u65B0\u5546\u54C1\u8FDB\u884C\u5236\u9020" + ($.index !== cookiesArr.length ? '\n\n' : '');
                                    }
                                }
                                // await exchangeProNotify()
                            }
                            else {
                                console.log("\n\n\u9884\u8BA1\u6700\u5FEB\u8FD8\u9700 \u3010" + ((production.needElectric - production.investedElectric) / (2 * 60 * 60 * 24)).toFixed(2) + "\u5929\u3011\u751F\u4EA7\u5B8C\u6BD5\n\n");
                            }
                            if (production.status === 3) {
                                $.log("\n\n\u5546\u54C1\u751F\u4EA7\u5DF2\u5931\u6548");
                                $.msg($.name, '', "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n\u3010\u751F\u4EA7\u5546\u54C1\u3011" + $.productName + "\n\u3010\u8D85\u65F6\u672A\u5B8C\u6210\u3011\u5DF2\u5931\u6548\uFF0C\u8BF7\u9009\u62E9\u65B0\u5546\u54C1\u8FDB\u884C\u5236\u9020");
                                $.allMessage += "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n\u3010\u751F\u4EA7\u5546\u54C1\u3011" + $.productName + "\n\u3010\u8D85\u65F6\u672A\u5B8C\u6210\u3011\u5DF2\u5931\u6548\uFF0C\u8BF7\u9009\u62E9\u65B0\u5546\u54C1\u8FDB\u884C\u5236\u9020" + ($.index !== cookiesArr.length ? '\n\n' : '');
                            }
                            return [3 /*break*/, 7];
                        case 6:
                            $.unActive = false; //标记是否开启了京喜活动或者选购了商品进行生产
                            if (!data.factoryList) {
                                console.log("\u3010\u63D0\u793A\u3011\u4EAC\u4E1C\u8D26\u53F7" + $.index + "[" + $.nickName + "]\u4EAC\u559C\u5DE5\u5382\u6D3B\u52A8\u672A\u5F00\u59CB\n\u8BF7\u624B\u52A8\u53BB\u4EAC\u4E1CAPP->\u6E38\u620F\u4E0E\u4E92\u52A8->\u67E5\u770B\u66F4\u591A->\u4EAC\u559C\u5DE5\u5382 \u5F00\u542F\u6D3B\u52A8\n");
                                // $.msg($.name, '【提示】', `京东账号${$.index}[${$.nickName}]京喜工厂活动未开始\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 开启活动`);
                            }
                            else if (data.factoryList && !data.productionList) {
                                console.log("\u3010\u63D0\u793A\u3011\u4EAC\u4E1C\u8D26\u53F7" + $.index + "[" + $.nickName + "]\u4EAC\u559C\u5DE5\u5382\u672A\u9009\u8D2D\u5546\u54C1\n\u8BF7\u624B\u52A8\u53BB\u4EAC\u4E1CAPP->\u6E38\u620F\u4E0E\u4E92\u52A8->\u67E5\u770B\u66F4\u591A->\u4EAC\u559C\u5DE5\u5382 \u9009\u8D2D\n");
                                nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
                                if (nowTimes.getHours() === 12) {
                                    //如按每小时运行一次，则此处将一天12点推送1次提醒
                                    $.msg($.name, '提醒⏰', "\u4EAC\u4E1C\u8D26\u53F7" + $.index + "[" + $.nickName + "]\u4EAC\u559C\u5DE5\u5382\u672A\u9009\u62E9\u5546\u54C1\n\u8BF7\u624B\u52A8\u53BB\u4EAC\u4E1CAPP->\u6E38\u620F\u4E0E\u4E92\u52A8->\u67E5\u770B\u66F4\u591A->\u4EAC\u559C\u5DE5\u5382 \u9009\u62E9\u5546\u54C1");
                                    // if ($.isNode()) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `京东账号${$.index}[${$.nickName}]京喜工厂未选择商品\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 选择商品`)
                                    if ($.isNode())
                                        $.allMessage += "\u4EAC\u4E1C\u8D26\u53F7" + $.index + "[" + $.nickName + "]\u4EAC\u559C\u5DE5\u5382\u672A\u9009\u62E9\u5546\u54C1\n\u8BF7\u624B\u52A8\u53BB\u4EAC\u4E1CAPP->\u6E38\u620F\u4E0E\u4E92\u52A8->\u67E5\u770B\u66F4\u591A->\u4EAC\u559C\u5DE5\u5382 \u9009\u62E9\u5546\u54C1" + ($.index !== cookiesArr.length ? '\n\n' : '');
                                }
                            }
                            _a.label = 7;
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            console.log("GetUserInfo\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                            _a.label = 9;
                        case 9: return [3 /*break*/, 12];
                        case 10:
                            e_5 = _a.sent();
                            $.logErr(e_5, resp);
                            return [3 /*break*/, 12];
                        case 11:
                            resolve();
                            return [7 /*endfinally*/];
                        case 12: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
}
//查询当前生产的商品名称
function GetCommodityDetails() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // const url = `/dreamfactory/diminfo/GetCommodityDetails?zone=dream_factory&sceneval=2&g_login_type=1&commodityId=${$.commodityDimId}`;
            $.get(taskurl('diminfo/GetCommodityDetails', "commodityId=" + $.commodityDimId, "_time,commodityId,zone"), function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {
                                data = data['data'];
                                $.productName = data['commodityList'][0].name;
                            }
                            else {
                                console.log("GetCommodityDetails\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                            }
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
// 查询已完成商品
function GetShelvesList(pageNo) {
    var _this = this;
    if (pageNo === void 0) { pageNo = 1; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            $.get(taskurl('userinfo/GetShelvesList', "pageNo=" + pageNo + "&pageSize=12", "_time,pageNo,pageSize,zone"), function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {
                                data = data['data'];
                                var shelvesList = data.shelvesList;
                                if (shelvesList) {
                                    $.shelvesList = __spreadArray(__spreadArray([], $.shelvesList), shelvesList);
                                    pageNo++;
                                    GetShelvesList(pageNo);
                                }
                            }
                            else {
                                console.log("GetShelvesList\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                            }
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
//领取红包
function DrawProductionStagePrize() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // const url = `/dreamfactory/userinfo/DrawProductionStagePrize?zone=dream_factory&sceneval=2&g_login_type=1&productionId=${$.productionId}`;
            $.get(taskurl('userinfo/DrawProductionStagePrize', "productionId=" + $.productionId, "_time,productionId,zone"), function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        console.log("\u5F00\u5E78\u8FD0\u7EA2\u5305\uFF1A" + data);
                        // if ($.safeGet(data)) {
                        //   data = JSON.parse(data);
                        //   if (data['ret'] === 0) {
                        //
                        //   } else {
                        //     console.log(`异常：${JSON.stringify(data)}`)
                        //   }
                        // }
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
function PickUp(encryptPin, help) {
    if (encryptPin === void 0) { encryptPin = $.encryptPin; }
    if (help === void 0) { help = false; }
    return __awaiter(this, void 0, void 0, function () {
        var GetUserComponentRes, componentList, _i, componentList_1, item, PickUpComponentRes, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $.pickUpMyselfComponent = true;
                    return [4 /*yield*/, GetUserComponent(encryptPin, 1500)];
                case 1:
                    GetUserComponentRes = _a.sent();
                    if (!(GetUserComponentRes && GetUserComponentRes['ret'] === 0 && GetUserComponentRes['data'])) return [3 /*break*/, 6];
                    componentList = GetUserComponentRes['data'].componentList;
                    if (componentList && componentList.length <= 0) {
                        if (help) {
                            $.log("\u597D\u53CB\u3010" + encryptPin + "\u3011\u5730\u4E0B\u6682\u65E0\u96F6\u4EF6\u53EF\u6536\n");
                        }
                        else {
                            $.log("\u81EA\u5BB6\u5730\u4E0B\u6682\u65E0\u96F6\u4EF6\u53EF\u6536\n");
                        }
                        $.pickUpMyselfComponent = false;
                    }
                    _i = 0, componentList_1 = componentList;
                    _a.label = 2;
                case 2:
                    if (!(_i < componentList_1.length)) return [3 /*break*/, 6];
                    item = componentList_1[_i];
                    return [4 /*yield*/, $.wait(1000)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, PickUpComponent(item['placeId'], encryptPin)];
                case 4:
                    PickUpComponentRes = _a.sent();
                    if (PickUpComponentRes) {
                        if (PickUpComponentRes['ret'] === 0) {
                            data = PickUpComponentRes['data'];
                            if (help) {
                                console.log("\u6536\u53D6\u597D\u53CB[" + encryptPin + "]\u96F6\u4EF6\u6210\u529F:\u83B7\u5F97" + data['increaseElectric'] + "\u7535\u529B\n");
                                $.pickFriendEle += data['increaseElectric'];
                            }
                            else {
                                console.log("\u6536\u53D6\u81EA\u5BB6\u96F6\u4EF6\u6210\u529F:\u83B7\u5F97" + data['increaseElectric'] + "\u7535\u529B\n");
                                $.pickEle += data['increaseElectric'];
                            }
                        }
                        else {
                            if (help) {
                                console.log("\u6536\u597D\u53CB[" + encryptPin + "]\u96F6\u4EF6\u5931\u8D25\uFF1A" + PickUpComponentRes.msg + ",\u76F4\u63A5\u8DF3\u51FA\n");
                            }
                            else {
                                console.log("\u6536\u81EA\u5DF1\u5730\u4E0B\u96F6\u4EF6\u5931\u8D25\uFF1A" + PickUpComponentRes.msg + ",\u76F4\u63A5\u8DF3\u51FA\n");
                                $.pickUpMyselfComponent = false;
                            }
                            return [3 /*break*/, 6];
                        }
                    }
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function GetUserComponent(pin, timeout) {
    if (pin === void 0) { pin = $.encryptPin; }
    if (timeout === void 0) { timeout = 0; }
    return new Promise(function (resolve) {
        setTimeout(function () {
            $.get(taskurl('usermaterial/GetUserComponent', "pin=" + pin, "_time,pin,zone"), function (err, resp, data) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {
                            }
                            else {
                                console.log("GetUserComponent\u5931\u8D25\uFF1A" + JSON.stringify(data));
                            }
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
        }, timeout);
    });
}
//收取地下随机零件电力API
function PickUpComponent(index, encryptPin) {
    return new Promise(function (resolve) {
        $.get(taskurl('usermaterial/PickUpComponent', "placeId=" + index + "&pin=" + encryptPin, "_time,pin,placeId,zone"), function (err, resp, data) {
            try {
                if (err) {
                    console.log("" + JSON.stringify(err));
                    console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                }
                else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        // if (data['ret'] === 0) {
                        //   data = data['data'];
                        //   if (help) {
                        //     console.log(`收取好友[${encryptPin}]零件成功:获得${data['increaseElectric']}电力\n`);
                        //     $.pickFriendEle += data['increaseElectric'];
                        //   } else {
                        //     console.log(`收取自家零件成功:获得${data['increaseElectric']}电力\n`);
                        //     $.pickEle += data['increaseElectric'];
                        //   }
                        // } else {
                        //   if (help) {
                        //     console.log(`收好友[${encryptPin}]零件失败：${JSON.stringify(data)}`)
                        //   } else {
                        //     console.log(`收零件失败：${JSON.stringify(data)}`)
                        //   }
                        // }
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
//偷好友的电力
function stealFriend() {
    return __awaiter(this, void 0, void 0, function () {
        var i, pin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // if (!$.pickUpMyselfComponent) {
                    //   $.log(`今日收取零件已达上限，偷好友零件也达到上限，故跳出`)
                    //   return
                    // }
                    //调整，只在每日1点，12点，19点尝试收取好友零件
                    if (new Date().getHours() !== 1 && new Date().getHours() !== 12 && new Date().getHours() !== 19)
                        return [2 /*return*/];
                    return [4 /*yield*/, getFriendList()];
                case 1:
                    _a.sent();
                    $.friendList = __spreadArray([], new Set($.friendList)).filter(function (vo) { return !!vo && vo['newFlag'] !== 1; });
                    console.log("\u67E5\u8BE2\u597D\u53CB\u5217\u8868\u5B8C\u6210\uFF0C\u5171" + $.friendList.length + "\u597D\u53CB\uFF0C\u4E0B\u9762\u5F00\u59CB\u62FE\u53D6\u597D\u53CB\u5730\u4E0B\u7684\u96F6\u4EF6\n");
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < $.friendList.length)) return [3 /*break*/, 5];
                    pin = $.friendList[i]['encryptPin'];
                    console.log("\n\u5F00\u59CB\u6536\u53D6\u7B2C " + (i + 1) + " \u4E2A\u597D\u53CB \u3010" + $.friendList[i]['nickName'] + "\u3011 \u5730\u4E0B\u96F6\u4EF6 collectFlag\uFF1A" + $.friendList[i]['collectFlag']);
                    return [4 /*yield*/, PickUp(pin, true)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getFriendList(sort) {
    var _this = this;
    if (sort === void 0) { sort = 0; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            $.get(taskurl('friend/QueryFactoryManagerList', "sort=" + sort, "_time,sort,zone"), function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
                var friendsEncryptPins, _i, _a, item, e_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, 6, 7]);
                            if (!err) return [3 /*break*/, 1];
                            console.log("" + JSON.stringify(err));
                            console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                            return [3 /*break*/, 4];
                        case 1:
                            if (!$.safeGet(data)) return [3 /*break*/, 4];
                            data = JSON.parse(data);
                            if (!(data['ret'] === 0)) return [3 /*break*/, 3];
                            data = data['data'];
                            if (data.list && data.list.length <= 0) {
                                // console.log(`查询好友列表完成，共${$.friendList.length}好友，下面开始拾取好友地下的零件\n`);
                                return [2 /*return*/];
                            }
                            friendsEncryptPins = [];
                            for (_i = 0, _a = data.list; _i < _a.length; _i++) {
                                item = _a[_i];
                                friendsEncryptPins.push(item);
                            }
                            $.friendList = __spreadArray(__spreadArray([], $.friendList), friendsEncryptPins);
                            // if (!$.isNode()) return
                            return [4 /*yield*/, getFriendList(data.sort)];
                        case 2:
                            // if (!$.isNode()) return
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            console.log("QueryFactoryManagerList\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                            _b.label = 4;
                        case 4: return [3 /*break*/, 7];
                        case 5:
                            e_6 = _b.sent();
                            $.logErr(e_6, resp);
                            return [3 /*break*/, 7];
                        case 6:
                            resolve();
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
}
function getFactoryIdByPin(pin) {
    return new Promise(function (resolve, reject) {
        // const url = `/dreamfactory/userinfo/GetUserInfoByPin?zone=dream_factory&pin=${pin}&sceneval=2`;
        $.get(taskurl('userinfo/GetUserInfoByPin', "pin=" + pin), function (err, resp, data) {
            try {
                if (err) {
                    console.log("" + JSON.stringify(err));
                    console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                }
                else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            if (data.data.factoryList) {
                                //做此判断,有时候返回factoryList为null
                                // resolve(data['data']['factoryList'][0]['factoryId'])
                                $.stealFactoryId = data['data']['factoryList'][0]['factoryId'];
                            }
                        }
                        else {
                            console.log("\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                        }
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
    });
}
function tuanActivity() {
    return __awaiter(this, void 0, void 0, function () {
        var tuanConfig, _a, activeId, surplusOpenTuanNum, tuanId, QueryTuanRes, tuanInfo, _i, tuanInfo_1, item, realTuanNum, tuanNum, userInfo_2, _b, userInfo_1, user;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, QueryActiveConfig()];
                case 1:
                    tuanConfig = _c.sent();
                    if (!(tuanConfig && tuanConfig.ret === 0)) return [3 /*break*/, 17];
                    _a = tuanConfig['data']['userTuanInfo'], activeId = _a.activeId, surplusOpenTuanNum = _a.surplusOpenTuanNum, tuanId = _a.tuanId;
                    console.log("\u4ECA\u65E5\u5269\u4F59\u5F00\u56E2\u6B21\u6570\uFF1A" + surplusOpenTuanNum + "\u6B21");
                    $.surplusOpenTuanNum = surplusOpenTuanNum;
                    if (!(!tuanId && surplusOpenTuanNum > 0)) return [3 /*break*/, 3];
                    //开团
                    $.log("\u51C6\u5907\u5F00\u56E2");
                    return [4 /*yield*/, CreateTuan()];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 17];
                case 3:
                    if (!tuanId) return [3 /*break*/, 17];
                    return [4 /*yield*/, QueryTuan(activeId, tuanId)];
                case 4:
                    QueryTuanRes = _c.sent();
                    if (!(QueryTuanRes && QueryTuanRes.ret === 0)) return [3 /*break*/, 17];
                    tuanInfo = QueryTuanRes.data.tuanInfo;
                    if (!((tuanInfo && tuanInfo[0]['endTime']) <= QueryTuanRes['nowTime'] && surplusOpenTuanNum > 0)) return [3 /*break*/, 6];
                    $.log("\u4E4B\u524D\u7684\u56E2\u5DF2\u8FC7\u671F\uFF0C\u51C6\u5907\u91CD\u65B0\u5F00\u56E2\n");
                    return [4 /*yield*/, CreateTuan()];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    _i = 0, tuanInfo_1 = tuanInfo;
                    _c.label = 7;
                case 7:
                    if (!(_i < tuanInfo_1.length)) return [3 /*break*/, 17];
                    item = tuanInfo_1[_i];
                    realTuanNum = item.realTuanNum, tuanNum = item.tuanNum, userInfo_2 = item.userInfo;
                    $.tuanNum = tuanNum || 0;
                    $.log("\n\u5F00\u56E2\u60C5\u51B5:" + realTuanNum + "/" + tuanNum + "\n");
                    if (!(realTuanNum === tuanNum)) return [3 /*break*/, 15];
                    _b = 0, userInfo_1 = userInfo_2;
                    _c.label = 8;
                case 8:
                    if (!(_b < userInfo_1.length)) return [3 /*break*/, 14];
                    user = userInfo_1[_b];
                    if (!(user.encryptPin === $.encryptPin)) return [3 /*break*/, 13];
                    if (!(user.receiveElectric && user.receiveElectric > 0)) return [3 /*break*/, 11];
                    console.log("\u60A8\u5728" + new Date(user.joinTime * 1000).toLocaleString() + "\u5F00\u56E2\u5956\u52B1\u5DF2\u7ECF\u9886\u53D6\u6210\u529F\n");
                    if (!($.surplusOpenTuanNum > 0)) return [3 /*break*/, 10];
                    return [4 /*yield*/, CreateTuan()];
                case 9:
                    _c.sent();
                    _c.label = 10;
                case 10: return [3 /*break*/, 13];
                case 11:
                    $.log("\u5F00\u59CB\u9886\u53D6\u5F00\u56E2\u5956\u52B1");
                    return [4 /*yield*/, tuanAward(item.tuanActiveId, item.tuanId)];
                case 12:
                    _c.sent(); //isTuanLeader
                    _c.label = 13;
                case 13:
                    _b++;
                    return [3 /*break*/, 8];
                case 14: return [3 /*break*/, 16];
                case 15:
                    $.tuanIds.push(tuanId);
                    $.log("\n\u6B64\u56E2\u672A\u8FBE\u9886\u53D6\u56E2\u5956\u52B1\u4EBA\u6570\uFF1A" + realTuanNum + "/" + tuanNum + "\u4EBA\n");
                    _c.label = 16;
                case 16:
                    _i++;
                    return [3 /*break*/, 7];
                case 17: return [2 /*return*/];
            }
        });
    });
}
/*
async function joinLeaderTuan() {
    let res = await updateTuanIdsCDN(),
        res2 = await updateTuanIdsCDN("http://cdn.annnibb.me/factory.json")
    if (!res) res = await updateTuanIdsCDN('https://cdn.jsdelivr.net/gh/gitupdate/updateTeam@master/shareCodes/jd_updateFactoryTuanId.json');
    $.authorTuanIds = [...(res && res.tuanIds || []), ...(res2 && res2.tuanIds || [])]
    if ($.authorTuanIds && $.authorTuanIds.length) {
        for (let tuanId of $.authorTuanIds) {
            if (!tuanId) continue
            if (!$.canHelp) break;
            console.log(`\n账号${$.UserName} 参加作者的团 【${tuanId}】`);
            await JoinTuan(tuanId);
            await $.wait(1000);
        }
    }
}
*/
//可获取开团后的团ID，如果团ID为空并且surplusOpenTuanNum>0，则可继续开团
//如果团ID不为空，则查询QueryTuan()
function QueryActiveConfig() {
    var _this = this;
    return new Promise(function (resolve) {
        var body = "activeId=" + escape(tuanActiveId) + "&tuanId=";
        var options = taskTuanUrl("QueryActiveConfig", body, "_time,activeId,tuanId");
        $.get(options, function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
            var userTuanInfo;
            return __generator(this, function (_a) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {
                                userTuanInfo = data['data'].userTuanInfo;
                                console.log("\n\u56E2\u6D3B\u52A8ID  " + userTuanInfo.activeId);
                                console.log("\u56E2ID  " + userTuanInfo.tuanId + "\n");
                            }
                            else {
                                console.log("QueryActiveConfig\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                            }
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve(data);
                }
                return [2 /*return*/];
            });
        }); });
    });
}
function QueryTuan(activeId, tuanId) {
    var _this = this;
    return new Promise(function (resolve) {
        var body = "activeId=" + escape(activeId) + "&tuanId=" + escape(tuanId);
        var options = taskTuanUrl("QueryTuan", body, "_time,activeId,tuanId");
        $.get(options, function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {
                                // $.log(`\n开团情况:${data.data.tuanInfo.realTuanNum}/${data.data.tuanInfo.tuanNum}\n`)
                            }
                            else {
                                console.log("\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                            }
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve(data);
                }
                return [2 /*return*/];
            });
        }); });
    });
}
//开团API
function CreateTuan() {
    var _this = this;
    return new Promise(function (resolve) {
        var body = "activeId=" + escape(tuanActiveId) + "&isOpenApp=1";
        var options = taskTuanUrl("CreateTuan", body, '_time,activeId,isOpenApp');
        $.get(options, function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, 7, 8]);
                        if (!err) return [3 /*break*/, 1];
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                        return [3 /*break*/, 5];
                    case 1:
                        if (!$.safeGet(data)) return [3 /*break*/, 5];
                        data = JSON.parse(data);
                        if (!(data['ret'] === 0)) return [3 /*break*/, 2];
                        console.log("\u3010\u5F00\u56E2\u6210\u529F\u3011tuanId\u4E3A " + data.data['tuanId']);
                        $.tuanIds.push(data.data['tuanId']);
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(data['ret'] === 10218 && !hasSend && (new Date().getHours() % 6 === 0))) return [3 /*break*/, 4];
                        hasSend = true;
                        $.msg($.name, '', "\u4EAC\u559C\u5DE5\u5382\u62FC\u56E2\u74DC\u5206\u7535\u529B\u6D3B\u52A8\u56E2ID\uFF08activeId\uFF09\u5DF2\u5931\u6548\n\u8BF7\u81EA\u884C\u6293\u5305\u66FF\u6362(Node\u73AF\u5883\u53D8\u91CF\u4E3ATUAN_ACTIVEID\uFF0CiOS\u7AEF\u5728BoxJx)\u6216\u8005\u8054\u7CFB\u4F5C\u8005\u7B49\u5F85\u66F4\u65B0");
                        if (!$.isNode()) return [3 /*break*/, 4];
                        return [4 /*yield*/, notify.sendNotify($.name, "\u4EAC\u559C\u5DE5\u5382\u62FC\u56E2\u74DC\u5206\u7535\u529B\u6D3B\u52A8\u56E2ID\uFF08activeId\uFF09\u5DF2\u5931\u6548\n\u8BF7\u81EA\u884C\u6293\u5305\u66FF\u6362(Node\u73AF\u5883\u53D8\u91CF\u4E3ATUAN_ACTIVEID\uFF0CiOS\u7AEF\u5728BoxJx)\u6216\u8005\u8054\u7CFB\u4F5C\u8005\u7B49\u5F85\u66F4\u65B0")];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        console.log("\u5F00\u56E2\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_7 = _a.sent();
                        $.logErr(e_7, resp);
                        return [3 /*break*/, 8];
                    case 7:
                        resolve();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
    });
}
function JoinTuan(tuanId, stk) {
    var _this = this;
    if (stk === void 0) { stk = '_time,activeId,tuanId'; }
    return new Promise(function (resolve) {
        var body = "activeId=" + escape(tuanActiveId) + "&tuanId=" + escape(tuanId);
        var options = taskTuanUrl("JoinTuan", body, '_time,activeId,tuanId');
        $.get(options, function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (err) {
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {
                                console.log("\u53C2\u56E2\u6210\u529F\uFF1A" + JSON.stringify(data) + "\n");
                            }
                            else if (data['ret'] === 10005 || data['ret'] === 10206) {
                                //火爆，或者今日参团机会已耗尽
                                console.log("\u53C2\u56E2\u5931\u8D25\uFF1A" + JSON.stringify(data) + "\n");
                                $.canHelp = false;
                            }
                            else {
                                console.log("\u53C2\u56E2\u5931\u8D25\uFF1A" + JSON.stringify(data) + "\n");
                            }
                        }
                    }
                }
                catch (e) {
                    $.logErr(e, resp);
                }
                finally {
                    resolve();
                }
                return [2 /*return*/];
            });
        }); });
    });
}
//查询所有的团情况(自己开团以及参加别人的团)
function QueryAllTuan() {
    var _this = this;
    return new Promise(function (resolve) {
        var body = "activeId=" + escape(tuanActiveId) + "&pageNo=1&pageSize=10";
        var options = taskTuanUrl("QueryAllTuan", body, '_time,activeId,pageNo,pageSize');
        $.get(options, function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
            var tuanInfo, _i, tuanInfo_2, item, userInfo_4, _a, userInfo_3, item2, e_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, 14, 15]);
                        if (!err) return [3 /*break*/, 1];
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                        return [3 /*break*/, 12];
                    case 1:
                        if (!$.safeGet(data)) return [3 /*break*/, 12];
                        data = JSON.parse(data);
                        if (!(data['ret'] === 0)) return [3 /*break*/, 11];
                        tuanInfo = data.tuanInfo;
                        _i = 0, tuanInfo_2 = tuanInfo;
                        _b.label = 2;
                    case 2:
                        if (!(_i < tuanInfo_2.length)) return [3 /*break*/, 10];
                        item = tuanInfo_2[_i];
                        if (!(item.tuanNum === item.realTuanNum)) return [3 /*break*/, 8];
                        userInfo_4 = item.userInfo;
                        _a = 0, userInfo_3 = userInfo_4;
                        _b.label = 3;
                    case 3:
                        if (!(_a < userInfo_3.length)) return [3 /*break*/, 7];
                        item2 = userInfo_3[_a];
                        if (!(item2.encryptPin === $.encryptPin)) return [3 /*break*/, 6];
                        if (!(item2.receiveElectric && item2.receiveElectric > 0)) return [3 /*break*/, 4];
                        console.log(new Date(item2.joinTime * 1000).toLocaleString() + "\u53C2\u52A0\u56E2\u4E3B\u3010" + item2.nickName + "\u3011\u7684\u5956\u52B1\u5DF2\u7ECF\u9886\u53D6\u6210\u529F");
                        return [3 /*break*/, 6];
                    case 4:
                        console.log("\u5F00\u59CB\u9886\u53D6" + new Date(item2.joinTime * 1000).toLocaleString() + "\u53C2\u52A0\u56E2\u4E3B\u3010" + item2.nickName + "\u3011\u7684\u5956\u52B1");
                        return [4 /*yield*/, tuanAward(item.tuanActiveId, item.tuanId, item.tuanLeader === $.encryptPin)];
                    case 5:
                        _b.sent(); //isTuanLeader
                        _b.label = 6;
                    case 6:
                        _a++;
                        return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        console.log(new Date(item.beginTime * 1000).toLocaleString() + "\u53C2\u52A0\u56E2\u4E3B\u3010" + item.tuanLeader + "\u3011\u5931\u8D25");
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        console.log("QueryAllTuan\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                        _b.label = 12;
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        e_8 = _b.sent();
                        $.logErr(e_8, resp);
                        return [3 /*break*/, 15];
                    case 14:
                        resolve(data);
                        return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        }); });
    });
}
//开团人的领取奖励API
function tuanAward(activeId, tuanId, isTuanLeader) {
    var _this = this;
    if (isTuanLeader === void 0) { isTuanLeader = true; }
    return new Promise(function (resolve) {
        var body = "activeId=" + escape(activeId) + "&tuanId=" + escape(tuanId);
        var options = taskTuanUrl("Award", body, '_time,activeId,tuanId');
        $.get(options, function (err, resp, data) { return __awaiter(_this, void 0, void 0, function () {
            var e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, 12, 13]);
                        if (!err) return [3 /*break*/, 1];
                        console.log("" + JSON.stringify(err));
                        console.log($.name + " API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                        return [3 /*break*/, 10];
                    case 1:
                        if (!$.safeGet(data)) return [3 /*break*/, 10];
                        data = JSON.parse(data);
                        if (!(data['ret'] === 0)) return [3 /*break*/, 6];
                        if (!isTuanLeader) return [3 /*break*/, 4];
                        console.log("\u5F00\u56E2\u5956\u52B1(\u56E2\u957F)" + data.data['electric'] + "\u9886\u53D6\u6210\u529F");
                        $.message += "\u3010\u5F00\u56E2(\u56E2\u957F)\u5956\u52B1\u3011" + data.data['electric'] + "\u9886\u53D6\u6210\u529F\n";
                        if (!($.surplusOpenTuanNum > 0)) return [3 /*break*/, 3];
                        $.log("\u5F00\u56E2\u5956\u52B1(\u56E2\u957F)\u5DF2\u9886\u53D6\uFF0C\u51C6\u5907\u5F00\u56E2");
                        return [4 /*yield*/, CreateTuan()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        console.log("\u53C2\u56E2\u5956\u52B1" + data.data['electric'] + "\u9886\u53D6\u6210\u529F");
                        $.message += "\u3010\u53C2\u56E2\u5956\u52B1\u3011" + data.data['electric'] + "\u9886\u53D6\u6210\u529F\n";
                        _a.label = 5;
                    case 5: return [3 /*break*/, 10];
                    case 6:
                        if (!(data['ret'] === 10212)) return [3 /*break*/, 9];
                        console.log("" + JSON.stringify(data));
                        if (!(isTuanLeader && $.surplusOpenTuanNum > 0)) return [3 /*break*/, 8];
                        $.log("\u56E2\u5956\u52B1\u5DF2\u9886\u53D6\uFF0C\u51C6\u5907\u5F00\u56E2");
                        return [4 /*yield*/, CreateTuan()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        console.log("\u5F02\u5E38\uFF1A" + JSON.stringify(data));
                        _a.label = 10;
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_9 = _a.sent();
                        $.logErr(e_9, resp);
                        return [3 /*break*/, 13];
                    case 12:
                        resolve();
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        }); });
    });
}
function updateTuanIdsCDN(url) {
    var _this = this;
    if (url === void 0) { url = 'https://raw.githubusercontent.com/gitupdate/updateTeam/master/shareCodes/jd_updateFactoryTuanId.json'; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var options, tunnel, agent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        url: url + "?" + new Date(),
                        "timeout": 10000,
                        headers: {
                            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
                        }
                    };
                    if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
                        tunnel = require("tunnel");
                        agent = {
                            https: tunnel.httpsOverHttp({
                                proxy: {
                                    host: process.env.TG_PROXY_HOST,
                                    port: process.env.TG_PROXY_PORT * 1
                                }
                            })
                        };
                        Object.assign(options, { agent: agent });
                    }
                    $.get(options, function (err, resp, data) {
                        try {
                            if (err) {
                                // console.log(`${JSON.stringify(err)}`)
                            }
                            else {
                                if ($.safeGet(data)) {
                                    $.tuanConfigs = data = JSON.parse(data);
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
                    return [4 /*yield*/, $.wait(20000)];
                case 1:
                    _a.sent();
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); });
}
//商品可兑换时的通知
function exchangeProNotify() {
    return __awaiter(this, void 0, void 0, function () {
        var exchangeEndTime, exchangeEndHours, nowHours, nowTimes, _i, _a, shel, flag, expiredTime;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, GetShelvesList()];
                case 1:
                    _b.sent();
                    nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
                    if ($.shelvesList && $.shelvesList.length > 0)
                        console.log("\n  \u5546\u54C1\u540D     \u5151\u6362\u72B6\u6001");
                    for (_i = 0, _a = $.shelvesList; _i < _a.length; _i++) {
                        shel = _a[_i];
                        console.log(shel['name'] + "    " + (shel['exchangeStatus'] === 1 ? '未兑换' : shel['exchangeStatus'] === 2 ? '已兑换' : '兑换超时'));
                        if (shel['exchangeStatus'] === 1) {
                            exchangeEndTime = shel['exchangeEndTime'] * 1000;
                            $.picture = shel['picture'];
                            // 兑换截止时间点
                            exchangeEndHours = new Date(exchangeEndTime + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getHours();
                            //兑换截止时间(年月日 时分秒)
                            $.exchangeEndTime = new Date(exchangeEndTime + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString('zh', { hour12: false });
                            //脚本运行此时的时间点
                            nowHours = nowTimes.getHours();
                        }
                        else if (shel['exchangeStatus'] === 3) {
                            //兑换超时
                        }
                    }
                    if (exchangeEndTime) {
                        //比如兑换(超时)截止时间是2020/12/8 09:20:04,现在时间是2020/12/6
                        if (nowTimes < exchangeEndTime) {
                            flag = true;
                            if ((exchangeEndTime - nowTimes.getTime()) <= 3600000 * 3) {
                                expiredTime = parseFloat(((exchangeEndTime - nowTimes.getTime()) / (60 * 60 * 1000)).toFixed(1));
                                $.msg($.name, "", "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n\u3010\u751F\u4EA7\u5546\u54C1\u3011" + $.productName + expiredTime + "\u5C0F\u65F6\u540E\u5151\u6362\u8D85\u65F6\n\u3010\u5151\u6362\u622A\u6B62\u65F6\u95F4\u3011" + $.exchangeEndTime + "\n\u8BF7\u901F\u53BB\u4EAC\u559CAPP->\u9996\u9875->\u597D\u72690\u5143\u9020\u8FDB\u884C\u5151\u6362", { 'open-url': jxOpenUrl, 'media-url': $.picture });
                                // if ($.isNode()) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}${(exchangeEndTime - nowTimes) / 60*60*1000}分钟后兑换超时\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, { url: jxOpenUrl })
                                if ($.isNode())
                                    $.allMessage += "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n\u3010\u751F\u4EA7\u5546\u54C1\u3011" + $.productName + expiredTime + "\u5C0F\u65F6\u540E\u5151\u6362\u8D85\u65F6\n\u3010\u5151\u6362\u622A\u6B62\u65F6\u95F4\u3011" + $.exchangeEndTime + "\n\u8BF7\u901F\u53BB\u4EAC\u559CAPP->\u9996\u9875->\u597D\u72690\u5143\u9020\u8FDB\u884C\u5151\u6362" + ($.index !== cookiesArr.length ? '\n\n' : '');
                                flag = false;
                            }
                            //二:在可兑换的时候，0,2,4等等小时通知一次
                            if (nowHours % 2 === 0 && flag) {
                                $.msg($.name, "", "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n\u3010\u751F\u4EA7\u5546\u54C1\u3011" + $.productName + "\u5DF2\u53EF\u5151\u6362\n\u3010\u5151\u6362\u622A\u6B62\u65F6\u95F4\u3011" + $.exchangeEndTime + "\n\u8BF7\u901F\u53BB\u4EAC\u559CAPP->\u9996\u9875->\u597D\u72690\u5143\u9020\u8FDB\u884C\u5151\u6362", { 'open-url': jxOpenUrl, 'media-url': $.picture });
                                // if ($.isNode()) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}已可兑换\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, { url: jxOpenUrl })
                                if ($.isNode())
                                    $.allMessage += "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n\u3010\u751F\u4EA7\u5546\u54C1\u3011" + $.productName + "\u5DF2\u53EF\u5151\u6362\n\u3010\u5151\u6362\u622A\u6B62\u65F6\u95F4\u3011" + $.exchangeEndTime + "\n\u8BF7\u901F\u53BB\u4EAC\u559CAPP->\u9996\u9875->\u597D\u72690\u5143\u9020\u8FDB\u884C\u5151\u6362" + ($.index !== cookiesArr.length ? '\n\n' : '');
                            }
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function showMsg() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        $.message += "\u3010\u6536\u53D6\u81EA\u5DF1\u96F6\u4EF6\u3011" + ($.pickUpMyselfComponent ? "\u83B7\u5F97" + $.pickEle + "\u7535\u529B" : "\u4ECA\u65E5\u5DF2\u8FBE\u4E0A\u9650") + "\n";
                        $.message += "\u3010\u6536\u53D6\u597D\u53CB\u96F6\u4EF6\u3011" + ($.pickUpMyselfComponent ? "\u83B7\u5F97" + $.pickFriendEle + "\u7535\u529B" : "\u4ECA\u65E5\u5DF2\u8FBE\u4E0A\u9650") + "\n";
                        if ($.isNode() && process.env.DREAMFACTORY_NOTIFY_CONTROL) {
                            $.ctrTemp = "" + process.env.DREAMFACTORY_NOTIFY_CONTROL === 'false';
                        }
                        else if ($.getdata('jdDreamFactory')) {
                            $.ctrTemp = $.getdata('jdDreamFactory') === 'false';
                        }
                        else {
                            $.ctrTemp = "" + jdNotify === 'false';
                        }
                        if (new Date().getHours() === 22) {
                            $.msg($.name, '', "" + $.message);
                            $.log("\n" + $.message);
                        }
                        else {
                            $.log("\n" + $.message);
                        }
                        resolve();
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
function getTuanActiveId() {
    return __awaiter(this, void 0, void 0, function () {
        var method, headers, myRequest;
        var _this = this;
        return __generator(this, function (_a) {
            method = "GET";
            headers = {};
            myRequest = { url: 'https://st.jingxi.com/pingou/dream_factory/index.html', method: method, headers: headers };
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        $.get(myRequest, function (err, resp, data) {
                            try {
                                data = data && data.match(/window\._CONFIG = (.*) ;var __getImgUrl/);
                                if (data) {
                                    data = JSON.parse(data[1]);
                                    var tuanConfigs = (data[0].skinConfig[0].adConfig || []).filter(function (vo) { return !!vo && vo['channel'] === 'h5'; });
                                    if (tuanConfigs && tuanConfigs.length) {
                                        for (var _i = 0, tuanConfigs_1 = tuanConfigs; _i < tuanConfigs_1.length; _i++) {
                                            var item = tuanConfigs_1[_i];
                                            var start = item.start;
                                            var end = item.end;
                                            var link = item.link;
                                            if (new Date(item.end).getTime() > Date.now()) {
                                                if (link && link.match(/activeId=(.*),/) && link.match(/activeId=(.*),/)[1]) {
                                                    console.log("\n\u83B7\u53D6\u56E2\u6D3B\u52A8ID\u6210\u529F: " + link.match(/activeId=(.*),/)[1] + "\n\u6709\u6548\u65F6\u6BB5\uFF1A" + start + " - " + end);
                                                    tuanActiveId = link.match(/activeId=(.*),/)[1];
                                                    break;
                                                }
                                            }
                                            else {
                                                tuanActiveId = '';
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e) {
                                console.log(data);
                                $.logErr(e, resp);
                            }
                            finally {
                                resolve();
                            }
                        });
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
/*
      function requireConfig() {
        return new Promise(async resolve => {
          tuanActiveId = $.isNode() ? (process.env.TUAN_ACTIVEID || tuanActiveId) : ($.getdata('tuanActiveId') || tuanActiveId);
          if (!tuanActiveId) {
            await updateTuanIdsCDN();
            if ($.tuanConfigs && $.tuanConfigs['tuanActiveId']) {
              tuanActiveId = $.tuanConfigs['tuanActiveId'];
              console.log(`拼团活动ID: 获取成功 ${tuanActiveId}\n`)
            } else {
              if (!$.tuanConfigs) {
                await updateTuanIdsCDN('https://cdn.jsdelivr.net/gh/gitupdate/updateTeam@master/shareCodes/jd_updateFactoryTuanId.json');
                if ($.tuanConfigs && $.tuanConfigs['tuanActiveId']) {
                  tuanActiveId = $.tuanConfigs['tuanActiveId'];
                  console.log(`拼团活动ID: 获取成功 ${tuanActiveId}\n`)
                } else {
                  console.log(`拼团活动ID：获取失败，将采取脚本内置活动ID\n`)
                }
              }
            }
          } else {
            console.log(`自定义拼团活动ID: 获取成功 ${tuanActiveId}`)
          }
          resolve()
        })
      }
*/
//格式化助力码
function shareCodesFormat() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var tempIndex, readShareCodeRes;
        return __generator(this, function (_a) {
            // console.log(`第${$.index}个京东账号的助力码:::${$.shareCodesArr[$.index - 1]}`)
            $.newShareCodes = [];
            if ($.shareCodesArr[$.index - 1]) {
                $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
            }
            else {
                console.log("\u7531\u4E8E\u60A8\u7B2C" + $.index + "\u4E2A\u4EAC\u4E1C\u8D26\u53F7\u672A\u63D0\u4F9BshareCode,\u5C06\u91C7\u7EB3\u672C\u811A\u672C\u81EA\u5E26\u7684\u52A9\u529B\u7801\n");
                tempIndex = $.index > inviteCodes.length ? (inviteCodes.length - 1) : ($.index - 1);
                $.newShareCodes = inviteCodes[tempIndex].split('@');
            }
            readShareCodeRes = null;
            if (readShareCodeRes && readShareCodeRes.code === 200) {
                $.newShareCodes = __spreadArray([], new Set(__spreadArray(__spreadArray([], $.newShareCodes), (readShareCodeRes.data || []))));
            }
            console.log("\u7B2C" + $.index + "\u4E2A\u4EAC\u4E1C\u8D26\u53F7\u5C06\u8981\u52A9\u529B\u7684\u597D\u53CB" + JSON.stringify($.newShareCodes));
            resolve();
            return [2 /*return*/];
        });
    }); });
}
function requireConfig() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tuanActiveId = $.isNode() ? (process.env.TUAN_ACTIVEID || tuanActiveId) : ($.getdata('tuanActiveId') || tuanActiveId);
                    if (!!tuanActiveId) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateTuanIdsCDN()];
                case 1:
                    _a.sent();
                    if (!($.tuanConfigs && $.tuanConfigs['tuanActiveId'])) return [3 /*break*/, 2];
                    tuanActiveId = $.tuanConfigs['tuanActiveId'];
                    console.log("\u62FC\u56E2\u6D3B\u52A8ID: \u83B7\u53D6\u6210\u529F " + tuanActiveId + "\n");
                    return [3 /*break*/, 4];
                case 2:
                    if (!!$.tuanConfigs) return [3 /*break*/, 4];
                    return [4 /*yield*/, updateTuanIdsCDN('https://cdn.jsdelivr.net/gh/gitupdate/updateTeam@master/shareCodes/jd_updateFactoryTuanId.json')];
                case 3:
                    _a.sent();
                    if ($.tuanConfigs && $.tuanConfigs['tuanActiveId']) {
                        tuanActiveId = $.tuanConfigs['tuanActiveId'];
                        console.log("\u62FC\u56E2\u6D3B\u52A8ID: \u83B7\u53D6\u6210\u529F " + tuanActiveId + "\n");
                    }
                    else {
                        console.log("\u62FC\u56E2\u6D3B\u52A8ID\uFF1A\u83B7\u53D6\u5931\u8D25\uFF0C\u5C06\u91C7\u53D6\u811A\u672C\u5185\u7F6E\u6D3B\u52A8ID\n");
                    }
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    console.log("\u81EA\u5B9A\u4E49\u62FC\u56E2\u6D3B\u52A8ID: \u83B7\u53D6\u6210\u529F " + tuanActiveId);
                    _a.label = 6;
                case 6:
                    /*
                    console.log(`开始获取${$.name}配置文件\n`);
                    //Node.js用户请在jdCookie.js处填写京东ck;
                    const shareCodes = $.isNode() ? require('./jdDreamFactoryShareCodes.js') : '';
                    console.log(`共${cookiesArr.length}个京东账号\n`);
                    $.shareCodesArr = [];
                    if ($.isNode()) {
                      Object.keys(shareCodes).forEach((item) => {
                        if (shareCodes[item]) {
                          $.shareCodesArr.push(shareCodes[item])
                        }
                      })
                    } else {
                      if ($.getdata('jd_jxFactory')) $.shareCodesArr = $.getdata('jd_jxFactory').split('\n').filter(item => item !== "" && item !== null && item !== undefined);
                      console.log(`\nBoxJs设置的${$.name}好友邀请码:${$.getdata('jd_jxFactory')}\n`);
                    }
                    // console.log(`\n种豆得豆助力码::${JSON.stringify($.shareCodesArr)}`);
                    console.log(`您提供了${$.shareCodesArr.length}个账号的${$.name}助力码\n`);
                    */
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); });
}
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
                    "Cookie": $.cookie,
                    "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
                }
            };
            $.post(options, function (err, resp, data) {
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
function taskTuanUrl(functionId, body, stk) {
    if (body === void 0) { body = ''; }
    var url = "https://m.jingxi.com/dreamfactory/tuan/" + functionId + "?" + body + "&_time=" + Date.now() + "&_=" + (Date.now() + 2) + "&sceneval=2&g_login_type=1&_ste=1";
    url += "&h5st=" + decrypt(Date.now(), stk || '', '', url);
    if (stk) {
        url += "&_stk=" + encodeURIComponent(stk);
    }
    return {
        url: url,
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Cookie": $.cookie,
            "Host": "m.jingxi.com",
            "Referer": "https://st.jingxi.com/pingou/dream_factory/divide.html",
            "User-Agent": "jdpingou"
        }
    };
}
function taskurl(functionId, body, stk) {
    if (body === void 0) { body = ''; }
    var url = JD_API_HOST + "/dreamfactory/" + functionId + "?zone=dream_factory&" + body + "&sceneval=2&g_login_type=1&_time=" + Date.now() + "&_=" + (Date.now() + 2) + "&_ste=1";
    url += "&h5st=" + decrypt(Date.now(), stk, '', url);
    if (stk) {
        url += "&_stk=" + encodeURIComponent(stk);
    }
    return {
        url: url,
        headers: {
            'Cookie': $.cookie,
            'Host': 'm.jingxi.com',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'User-Agent': functionId === 'AssistFriend' ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36" : 'jdpingou',
            'Accept-Language': 'zh-cn',
            'Referer': 'https://wqsd.jd.com/pingou/dream_factory/index.html',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    };
}
function newtasksysUrl(functionId, taskId, stk) {
    var url = JD_API_HOST + "/newtasksys/newtasksys_front/" + functionId + "?source=dreamfactory&bizCode=dream_factory&sceneval=2&g_login_type=1&_time=" + Date.now() + "&_=" + (Date.now() + 2) + "&_ste=1";
    if (taskId) {
        url += "&taskId=" + taskId;
    }
    if (stk) {
        url += "&_stk=" + stk;
    }
    //传入url进行签名
    url += "&h5st=" + decrypt(Date.now(), stk, '', url);
    return {
        url: url,
        "headers": {
            'Cookie': $.cookie,
            'Host': 'm.jingxi.com',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'User-Agent': "jdpingou;iPhone;3.15.2;13.5.1;90bab9217f465a83a99c0b554a946b0b0d5c2f7a;network/wifi;model/iPhone12,1;appBuild/100365;ADID/696F8BD2-0820-405C-AFC0-3C6D028040E5;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/14;pap/JA2015_311210;brand/apple;supportJDSHWK/1;",
            'Accept-Language': 'zh-cn',
            'Referer': 'https://wqsd.jd.com/pingou/dream_factory/index.html',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    };
}
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
function requestAlgo() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, options;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = $;
                    return [4 /*yield*/, $.generateFp()];
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
}
function decrypt(time, stk, type, url) {
    stk = stk || (url ? $.getUrlData(url, '_stk') : '');
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
            st_1 += item + ":" + $.getUrlData(url, item) + (index === stk.split(',').length - 1 ? '' : '&');
        });
        var hash2 = $.CryptoJS.HmacSHA256(st_1, hash1.toString()).toString($.CryptoJS.enc.Hex);
        // console.log(`\nst:${st}`)
        // console.log(`h5st:${["".concat(timestamp.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.token), "".concat(hash2)].join(";")}\n`)
        return encodeURIComponent(["".concat(timestamp.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.token), "".concat(hash2)].join(";"));
    }
    else {
        return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d';
    }
}
