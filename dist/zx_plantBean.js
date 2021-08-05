"use strict";
/*
种豆得豆 脚本更新地址：jd_plantBean.js
更新时间：2021-07-27
活动入口：京东APP我的-更多工具-种豆得豆
已支持IOS京东多账号,云端多京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注：会自动关注任务中的店铺跟商品，介意者勿使用。
互助码shareCode请先手动运行脚本查看打印可看到
每个京东账号每天只能帮助3个人。多出的助力码将会助力失败。
=====================================Quantumult X=================================
[task_local]
1 7-21/2 * * * jd_plantBean.js, tag=种豆得豆, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdzd.png, enabled=true

=====================================Loon================================
[Script]
cron "1 7-21/2 * * *" script-path=jd_plantBean.js,tag=京东种豆得豆

======================================Surge==========================
京东种豆得豆 = type=cron,cronexp="1 7-21/2 * * *",wake-system=1,timeout=3600,script-path=jd_plantBean.js

====================================小火箭=============================
京东种豆得豆 = type=cron,script-path=jd_plantBean.js, cronexpr="1 7-21/2 * * *", timeout=3600, enable=true

搬的https://github.com/uniqueque/QuantumultX/blob/4c1572d93d4d4f883f483f907120a75d925a693e/Script/jd_plantBean.js
*/
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
var zxCommon = require('./zx_common.js');
var zxObject = new zxCommon.ZxObject('京东种豆得豆');
var $ = zxObject.$;
//Node.js用户请在jdCookie.js处填写京东ck;
//const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//const zxCommon = $.isNode() ? require('./zx_common.js') : '';
var leaveList = $.getdata("CFG_DELCOUPON_LEAVE") || '';
//Node.js用户请在jdCookie.js处填写京东ck;
//ios等软件用户直接用NobyDa的jd cookie
var jdNotify = false; //是否开启静默运行。默认true开启
var jdPlantBeanShareArr = [], isBox = false, option, message, subTitle;
//京东接口地址
var JD_API_HOST = 'https://api.m.jd.com/client.action';
//助力好友分享码(最多3个,否则后面的助力失败)
//此此内容是IOS用户下载脚本到本地使用，填写互助码的地方，同一京东账号的好友互助码请使用@符号隔开。
//下面给出两个账号的填写示例（iOS只支持2个京东账号）
var allMessage = "";
var currentRoundId = null; //本期活动id
var lastRoundId = null; //上期id
var roundList = [];
var awardState = ''; //上期活动的京豆是否收取
var randomCount = $.isNode() ? 20 : 5;
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
                                        //await TotalBean();;
                                        console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + ($.nickName || $.UserName) + "\n");
                                        if (!!$.isLogin) return [3 /*break*/, 2];
                                        $.msg($.name, "\u3010\u63D0\u793A\u3011cookie\u5DF2\u5931\u6548", "\u4EAC\u4E1C\u8D26\u53F7" + $.index + " " + ($.nickName || $.UserName) + "\n\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6\nhttps://bean.m.jd.com/bean/signIndex.action", { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                                        if (!$.isNode()) return [3 /*break*/, 2];
                                        return [4 /*yield*/, notify.sendNotify($.name + "cookie\u5DF2\u5931\u6548 - " + $.UserName, "\u4EAC\u4E1C\u8D26\u53F7" + $.index + " " + $.UserName + "\n\u8BF7\u91CD\u65B0\u767B\u5F55\u83B7\u53D6cookie")];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        message = '';
                                        subTitle = '';
                                        option = {};
                                        return [4 /*yield*/, jdPlantBean()];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, showMsg()];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })];
            case 1:
                _a.sent();
                console.log("\u53D1\u9001\u901A\u77E5");
                if (!($.isNode() && allMessage)) return [3 /*break*/, 3];
                // 发送通知
                return [4 /*yield*/, $.notify.sendNotify("" + $.name, "" + allMessage)];
            case 2:
                // 发送通知
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); })().catch(function (e) {
    $.log('', "\u274C " + $.name + ", \u5931\u8D25! \u539F\u56E0: " + e + "!", '');
}).finally(function () {
    $.done();
});
function jdPlantBean() {
    return __awaiter(this, void 0, void 0, function () {
        var shareUrl, e_1, errMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 13, , 16]);
                    console.log("\u83B7\u53D6\u4EFB\u52A1\u53CA\u57FA\u672C\u4FE1\u606F");
                    return [4 /*yield*/, plantBeanIndex()];
                case 1:
                    _a.sent();
                    if (!($.plantBeanIndexResult && $.plantBeanIndexResult.code === '0' && $.plantBeanIndexResult.data)) return [3 /*break*/, 11];
                    shareUrl = $.plantBeanIndexResult.data.jwordShareInfo.shareUrl;
                    $.myPlantUuid = getParam(shareUrl, 'plantUuid');
                    console.log("\n\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\uFF08" + $.UserName + "\uFF09\u7684" + $.name + "\u597D\u53CB\u4E92\u52A9\u7801\u3011" + $.myPlantUuid + "\n");
                    roundList = $.plantBeanIndexResult.data.roundList;
                    currentRoundId = roundList[1].roundId; //本期的roundId
                    lastRoundId = roundList[0].roundId; //上期的roundId
                    awardState = roundList[0].awardState;
                    $.taskList = $.plantBeanIndexResult.data.taskList;
                    subTitle = "\u3010\u4EAC\u4E1C\u6635\u79F0\u3011" + $.plantBeanIndexResult.data.plantUserInfo.plantNickName;
                    message += "\u3010\u4E0A\u671F\u65F6\u95F4\u3011" + roundList[0].dateDesc.replace('上期 ', '') + "\n";
                    message += "\u3010\u4E0A\u671F\u6210\u957F\u503C\u3011" + roundList[0].growth + "\n";
                    $.shareCodesArr.push($.myPlantUuid);
                    return [4 /*yield*/, receiveNutrients()];
                case 2:
                    _a.sent(); //定时领取营养液
                    return [4 /*yield*/, doHelp()];
                case 3:
                    _a.sent(); //助力
                    return [4 /*yield*/, doTask()];
                case 4:
                    _a.sent(); //做日常任务
                    return [4 /*yield*/, doEgg()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, stealFriendWater()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, doCultureBean()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, doGetReward()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, showTaskProcess()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, plantShareSupportList()];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    console.log("\u79CD\u8C46\u5F97\u8C46-\u521D\u59CB\u5931\u8D25:  " + JSON.stringify($.plantBeanIndexResult));
                    _a.label = 12;
                case 12: return [3 /*break*/, 16];
                case 13:
                    e_1 = _a.sent();
                    $.logErr(e_1);
                    errMsg = "\u4EAC\u4E1C\u8D26\u53F7" + $.index + " " + ($.nickName || $.UserName) + "\n\u4EFB\u52A1\u6267\u884C\u5F02\u5E38\uFF0C\u8BF7\u68C0\u67E5\u6267\u884C\u65E5\u5FD7 \u203C\uFE0F\u203C\uFE0F";
                    if (!$.isNode()) return [3 /*break*/, 15];
                    return [4 /*yield*/, notify.sendNotify("" + $.name, errMsg)];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    $.msg($.name, '', "" + errMsg);
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
}
function doGetReward() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\u3010\u4E0A\u8F6E\u4EAC\u8C46\u3011" + (awardState === '4' ? '采摘中' : awardState === '5' ? '可收获了' : '已领取'));
                    if (!(awardState === '4')) return [3 /*break*/, 1];
                    //京豆采摘中...
                    message += "\u3010\u4E0A\u671F\u72B6\u6001\u3011" + roundList[0].tipBeanEndTitle + "\n";
                    return [3 /*break*/, 4];
                case 1:
                    if (!(awardState === '5')) return [3 /*break*/, 3];
                    //收获
                    return [4 /*yield*/, getReward()];
                case 2:
                    //收获
                    _a.sent();
                    console.log('开始领取京豆');
                    if ($.getReward && $.getReward.code === '0') {
                        console.log('京豆领取成功');
                        message += "\u3010\u4E0A\u671F\u5151\u6362\u4EAC\u8C46\u3011" + $.getReward.data.awardBean + "\u4E2A\n";
                        $.msg($.name, subTitle, message);
                        allMessage += "\u4EAC\u4E1C\u8D26\u53F7" + $.index + " " + $.nickName + "\n" + message + ($.index !== $.cookiesArr.length ? '\n\n' : '');
                        // if ($.isNode()) {
                        //   await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName || $.UserName}`, `京东账号${$.index} ${$.nickName}\n${message}`);
                        // }
                    }
                    else {
                        console.log("$.getReward \u5F02\u5E38\uFF1A" + JSON.stringify($.getReward));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    if (awardState === '6') {
                        //京豆已领取
                        message += "\u3010\u4E0A\u671F\u5151\u6362\u4EAC\u8C46\u3011" + roundList[0].awardBeans + "\u4E2A\n";
                    }
                    _a.label = 4;
                case 4:
                    if (roundList[1].dateDesc.indexOf('本期 ') > -1) {
                        roundList[1].dateDesc = roundList[1].dateDesc.substr(roundList[1].dateDesc.indexOf('本期 ') + 3, roundList[1].dateDesc.length);
                    }
                    message += "\u3010\u672C\u671F\u65F6\u95F4\u3011" + roundList[1].dateDesc + "\n";
                    message += "\u3010\u672C\u671F\u6210\u957F\u503C\u3011" + roundList[1].growth + "\n";
                    return [2 /*return*/];
            }
        });
    });
}
function doCultureBean() {
    return __awaiter(this, void 0, void 0, function () {
        var plantBeanRound, _i, _a, bubbleInfo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, plantBeanIndex()];
                case 1:
                    _b.sent();
                    if (!($.plantBeanIndexResult && $.plantBeanIndexResult.code === '0')) return [3 /*break*/, 6];
                    plantBeanRound = $.plantBeanIndexResult.data.roundList[1];
                    if (!(plantBeanRound.roundState === '2')) return [3 /*break*/, 5];
                    //收取营养液
                    if (plantBeanRound.bubbleInfos && plantBeanRound.bubbleInfos.length)
                        console.log("\u5F00\u59CB\u6536\u53D6\u8425\u517B\u6DB2");
                    _i = 0, _a = plantBeanRound.bubbleInfos;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    bubbleInfo = _a[_i];
                    console.log("\u6536\u53D6-" + bubbleInfo.name + "-\u7684\u8425\u517B\u6DB2");
                    return [4 /*yield*/, cultureBean(plantBeanRound.roundId, bubbleInfo.nutrientsType)];
                case 3:
                    _b.sent();
                    console.log("\u6536\u53D6\u8425\u517B\u6DB2\u7ED3\u679C:" + JSON.stringify($.cultureBeanRes));
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    console.log("plantBeanIndexResult:" + JSON.stringify($.plantBeanIndexResult));
                    _b.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function stealFriendWater() {
    return __awaiter(this, void 0, void 0, function () {
        var nowTimes, _i, _a, item;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, stealFriendList()];
                case 1:
                    _b.sent();
                    if (!($.stealFriendList && $.stealFriendList.code === '0')) return [3 /*break*/, 9];
                    if ($.stealFriendList.data && $.stealFriendList.data.tips) {
                        console.log('\n\n今日偷取好友营养液已达上限\n\n');
                        return [2 /*return*/];
                    }
                    if (!($.stealFriendList.data && $.stealFriendList.data.friendInfoList && $.stealFriendList.data.friendInfoList.length > 0)) return [3 /*break*/, 8];
                    nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
                    _i = 0, _a = $.stealFriendList.data.friendInfoList;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    item = _a[_i];
                    if (!(new Date(nowTimes).getHours() === 20)) return [3 /*break*/, 5];
                    if (!(item.nutrCount >= 2)) return [3 /*break*/, 4];
                    // console.log(`可以偷的好友的信息::${JSON.stringify(item)}`);
                    console.log("\u53EF\u4EE5\u5077\u7684\u597D\u53CB\u7684\u4FE1\u606FparadiseUuid::" + JSON.stringify(item.paradiseUuid));
                    return [4 /*yield*/, collectUserNutr(item.paradiseUuid)];
                case 3:
                    _b.sent();
                    console.log("\u5077\u53D6\u597D\u53CB\u8425\u517B\u6DB2\u60C5\u51B5:" + JSON.stringify($.stealFriendRes));
                    if ($.stealFriendRes && $.stealFriendRes.code === '0') {
                        console.log("\u5077\u53D6\u597D\u53CB\u8425\u517B\u6DB2\u6210\u529F");
                    }
                    _b.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    if (!(item.nutrCount >= 3)) return [3 /*break*/, 7];
                    // console.log(`可以偷的好友的信息::${JSON.stringify(item)}`);
                    console.log("\u53EF\u4EE5\u5077\u7684\u597D\u53CB\u7684\u4FE1\u606FparadiseUuid::" + JSON.stringify(item.paradiseUuid));
                    return [4 /*yield*/, collectUserNutr(item.paradiseUuid)];
                case 6:
                    _b.sent();
                    console.log("\u5077\u53D6\u597D\u53CB\u8425\u517B\u6DB2\u60C5\u51B5:" + JSON.stringify($.stealFriendRes));
                    if ($.stealFriendRes && $.stealFriendRes.code === '0') {
                        console.log("\u5077\u53D6\u597D\u53CB\u8425\u517B\u6DB2\u6210\u529F");
                    }
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 10];
                case 9:
                    console.log("$.stealFriendList \u5F02\u5E38\uFF1A " + JSON.stringify($.stealFriendList));
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
function doEgg() {
    return __awaiter(this, void 0, void 0, function () {
        var eggL, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, egg()];
                case 1:
                    _a.sent();
                    if (!($.plantEggLotteryRes && $.plantEggLotteryRes.code === '0')) return [3 /*break*/, 8];
                    if (!($.plantEggLotteryRes.data.restLotteryNum > 0)) return [3 /*break*/, 6];
                    eggL = new Array($.plantEggLotteryRes.data.restLotteryNum).fill('');
                    console.log("\u76EE\u524D\u5171\u6709" + eggL.length + "\u6B21\u626D\u86CB\u7684\u673A\u4F1A");
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < eggL.length)) return [3 /*break*/, 5];
                    console.log("\u5F00\u59CB\u7B2C" + (i + 1) + "\u6B21\u626D\u86CB");
                    return [4 /*yield*/, plantEggDoLottery()];
                case 3:
                    _a.sent();
                    console.log("\u5929\u5929\u626D\u86CB\u6210\u529F\uFF1A" + JSON.stringify($.plantEggDoLotteryResult));
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    console.log('暂无扭蛋机会');
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.log('查询天天扭蛋的机会失败' + JSON.stringify($.plantEggLotteryRes));
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function doTask() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, item, unFinishedShopNum, data, goodShopListARR, moreShopListARR, shopList, goodShopList, moreShopList, _b, goodShopList_1, i, _c, moreShopList_1, j, _d, shopList_1, shop, shopId, shopTaskId, body, shopRes, unFinishedProductNum, data, productListARR, productList, productInfoList, i, j, _e, productListARR_1, i, _f, productList_1, product, skuId, productTaskId, body, productRes, unFinishedChannelNum, data, goodChannelListARR, normalChannelListARR, channelList, goodChannelList, normalChannelList, _g, goodChannelList_1, i, _h, normalChannelList_1, j, _j, channelList_1, channelItem, channelId, channelTaskId, body, channelRes;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!($.taskList && $.taskList.length > 0)) return [3 /*break*/, 19];
                    _i = 0, _a = $.taskList;
                    _k.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 19];
                    item = _a[_i];
                    if (item.isFinished === 1) {
                        console.log(item.taskName + " \u4EFB\u52A1\u5DF2\u5B8C\u6210\n");
                        return [3 /*break*/, 18];
                    }
                    else {
                        if (item.taskType === 8) {
                            console.log("\n\u3010" + item.taskName + "\u3011\u4EFB\u52A1\u672A\u5B8C\u6210,\u9700\u81EA\u884C\u624B\u52A8\u53BB\u4EAC\u4E1CAPP\u5B8C\u6210\uFF0C" + item.desc + "\u8425\u517B\u6DB2\n");
                        }
                        else {
                            console.log("\n\u3010" + item.taskName + "\u3011\u4EFB\u52A1\u672A\u5B8C\u6210," + item.desc + "\u8425\u517B\u6DB2\n");
                        }
                    }
                    if (!(item.dailyTimes === 1 && item.taskType !== 8)) return [3 /*break*/, 3];
                    console.log("\n\u5F00\u59CB\u505A " + item.taskName + "\u4EFB\u52A1");
                    // $.receiveNutrientsTaskRes = await receiveNutrientsTask(item.taskType);
                    return [4 /*yield*/, receiveNutrientsTask(item.taskType)];
                case 2:
                    // $.receiveNutrientsTaskRes = await receiveNutrientsTask(item.taskType);
                    _k.sent();
                    console.log("\u505A " + item.taskName + "\u4EFB\u52A1\u7ED3\u679C:" + JSON.stringify($.receiveNutrientsTaskRes) + "\n");
                    _k.label = 3;
                case 3:
                    if (!(item.taskType === 3)) return [3 /*break*/, 8];
                    //浏览店铺
                    console.log("\u5F00\u59CB\u505A " + item.taskName + "\u4EFB\u52A1");
                    unFinishedShopNum = item.totalNum - item.gainedNum;
                    if (unFinishedShopNum === 0) {
                        return [3 /*break*/, 18];
                    }
                    return [4 /*yield*/, shopTaskList()];
                case 4:
                    _k.sent();
                    data = $.shopTaskListRes.data;
                    goodShopListARR = [], moreShopListARR = [], shopList = [];
                    goodShopList = data.goodShopList, moreShopList = data.moreShopList;
                    for (_b = 0, goodShopList_1 = goodShopList; _b < goodShopList_1.length; _b++) {
                        i = goodShopList_1[_b];
                        if (i.taskState === '2') {
                            goodShopListARR.push(i);
                        }
                    }
                    for (_c = 0, moreShopList_1 = moreShopList; _c < moreShopList_1.length; _c++) {
                        j = moreShopList_1[_c];
                        if (j.taskState === '2') {
                            moreShopListARR.push(j);
                        }
                    }
                    shopList = goodShopListARR.concat(moreShopListARR);
                    _d = 0, shopList_1 = shopList;
                    _k.label = 5;
                case 5:
                    if (!(_d < shopList_1.length)) return [3 /*break*/, 8];
                    shop = shopList_1[_d];
                    shopId = shop.shopId, shopTaskId = shop.shopTaskId;
                    body = {
                        "monitor_refer": "plant_shopNutrientsTask",
                        "shopId": shopId,
                        "shopTaskId": shopTaskId
                    };
                    return [4 /*yield*/, requestGet('shopNutrientsTask', body)];
                case 6:
                    shopRes = _k.sent();
                    console.log("shopRes\u7ED3\u679C:" + JSON.stringify(shopRes));
                    if (shopRes && shopRes.code === '0') {
                        if (shopRes.data && shopRes.data.nutrState && shopRes.data.nutrState === '1') {
                            unFinishedShopNum--;
                        }
                    }
                    if (unFinishedShopNum <= 0) {
                        console.log(item.taskName + "\u4EFB\u52A1\u5DF2\u505A\u5B8C\n");
                        return [3 /*break*/, 8];
                    }
                    _k.label = 7;
                case 7:
                    _d++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(item.taskType === 5)) return [3 /*break*/, 13];
                    //挑选商品
                    console.log("\u5F00\u59CB\u505A " + item.taskName + "\u4EFB\u52A1");
                    unFinishedProductNum = item.totalNum - item.gainedNum;
                    if (unFinishedProductNum === 0) {
                        return [3 /*break*/, 18];
                    }
                    return [4 /*yield*/, productTaskList()];
                case 9:
                    _k.sent();
                    data = $.productTaskList.data;
                    productListARR = [], productList = [];
                    productInfoList = data.productInfoList;
                    for (i = 0; i < productInfoList.length; i++) {
                        for (j = 0; j < productInfoList[i].length; j++) {
                            productListARR.push(productInfoList[i][j]);
                        }
                    }
                    for (_e = 0, productListARR_1 = productListARR; _e < productListARR_1.length; _e++) {
                        i = productListARR_1[_e];
                        if (i.taskState === '2') {
                            productList.push(i);
                        }
                    }
                    _f = 0, productList_1 = productList;
                    _k.label = 10;
                case 10:
                    if (!(_f < productList_1.length)) return [3 /*break*/, 13];
                    product = productList_1[_f];
                    skuId = product.skuId, productTaskId = product.productTaskId;
                    body = {
                        "monitor_refer": "plant_productNutrientsTask",
                        "productTaskId": productTaskId,
                        "skuId": skuId
                    };
                    return [4 /*yield*/, requestGet('productNutrientsTask', body)];
                case 11:
                    productRes = _k.sent();
                    if (productRes && productRes.code === '0') {
                        // console.log('nutrState', productRes)
                        //这里添加多重判断,有时候会出现活动太火爆的问题,导致nutrState没有
                        if (productRes.data && productRes.data.nutrState && productRes.data.nutrState === '1') {
                            unFinishedProductNum--;
                        }
                    }
                    if (unFinishedProductNum <= 0) {
                        console.log(item.taskName + "\u4EFB\u52A1\u5DF2\u505A\u5B8C\n");
                        return [3 /*break*/, 13];
                    }
                    _k.label = 12;
                case 12:
                    _f++;
                    return [3 /*break*/, 10];
                case 13:
                    if (!(item.taskType === 10)) return [3 /*break*/, 18];
                    //关注频道
                    console.log("\u5F00\u59CB\u505A " + item.taskName + "\u4EFB\u52A1");
                    unFinishedChannelNum = item.totalNum - item.gainedNum;
                    if (unFinishedChannelNum === 0) {
                        return [3 /*break*/, 18];
                    }
                    return [4 /*yield*/, plantChannelTaskList()];
                case 14:
                    _k.sent();
                    data = $.plantChannelTaskList.data;
                    goodChannelListARR = [], normalChannelListARR = [], channelList = [];
                    goodChannelList = data.goodChannelList, normalChannelList = data.normalChannelList;
                    for (_g = 0, goodChannelList_1 = goodChannelList; _g < goodChannelList_1.length; _g++) {
                        i = goodChannelList_1[_g];
                        if (i.taskState === '2') {
                            goodChannelListARR.push(i);
                        }
                    }
                    for (_h = 0, normalChannelList_1 = normalChannelList; _h < normalChannelList_1.length; _h++) {
                        j = normalChannelList_1[_h];
                        if (j.taskState === '2') {
                            normalChannelListARR.push(j);
                        }
                    }
                    channelList = goodChannelListARR.concat(normalChannelListARR);
                    _j = 0, channelList_1 = channelList;
                    _k.label = 15;
                case 15:
                    if (!(_j < channelList_1.length)) return [3 /*break*/, 18];
                    channelItem = channelList_1[_j];
                    channelId = channelItem.channelId, channelTaskId = channelItem.channelTaskId;
                    body = {
                        "channelId": channelId,
                        "channelTaskId": channelTaskId
                    };
                    return [4 /*yield*/, requestGet('plantChannelNutrientsTask', body)];
                case 16:
                    channelRes = _k.sent();
                    console.log("channelRes\u7ED3\u679C:" + JSON.stringify(channelRes));
                    if (channelRes && channelRes.code === '0') {
                        if (channelRes.data && channelRes.data.nutrState && channelRes.data.nutrState === '1') {
                            unFinishedChannelNum--;
                        }
                    }
                    if (unFinishedChannelNum <= 0) {
                        console.log(item.taskName + "\u4EFB\u52A1\u5DF2\u505A\u5B8C\n");
                        return [3 /*break*/, 18];
                    }
                    _k.label = 17;
                case 17:
                    _j++;
                    return [3 /*break*/, 15];
                case 18:
                    _i++;
                    return [3 /*break*/, 1];
                case 19: return [2 /*return*/];
            }
        });
    });
}
function showTaskProcess() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var _i, _a, item;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, plantBeanIndex()];
                case 1:
                    _b.sent();
                    $.taskList = $.plantBeanIndexResult.data.taskList;
                    if ($.taskList && $.taskList.length > 0) {
                        console.log("     任务   进度");
                        for (_i = 0, _a = $.taskList; _i < _a.length; _i++) {
                            item = _a[_i];
                            console.log("[" + item["taskName"] + "]  " + item["gainedNum"] + "/" + item["totalNum"] + "   " + item["isFinished"]);
                        }
                    }
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); });
}
//助力好友
function doHelp() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, plantUuid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = $.shareCodesArr;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    plantUuid = _a[_i];
                    console.log("\u5F00\u59CB\u52A9\u529B\u4EAC\u4E1C\u8D26\u53F7" + $.index + " - " + $.nickName + "\u7684\u597D\u53CB: " + plantUuid);
                    if (!plantUuid)
                        return [3 /*break*/, 3];
                    if (plantUuid === $.myPlantUuid) {
                        console.log("\n\u8DF3\u8FC7\u81EA\u5DF1\u7684plantUuid\n");
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, helpShare(plantUuid)];
                case 2:
                    _b.sent();
                    if ($.helpResult && $.helpResult.code === '0') {
                        // console.log(`助力好友结果: ${JSON.stringify($.helpResult.data.helpShareRes)}`);
                        if ($.helpResult.data.helpShareRes) {
                            if ($.helpResult.data.helpShareRes.state === '1') {
                                console.log("\u52A9\u529B\u597D\u53CB" + plantUuid + "\u6210\u529F");
                                console.log($.helpResult.data.helpShareRes.promptText + "\n");
                            }
                            else if ($.helpResult.data.helpShareRes.state === '2') {
                                console.log('您今日助力的机会已耗尽，已不能再帮助好友助力了\n');
                                return [3 /*break*/, 4];
                            }
                            else if ($.helpResult.data.helpShareRes.state === '3') {
                                console.log('该好友今日已满9人助力/20瓶营养液,明天再来为Ta助力吧\n');
                            }
                            else if ($.helpResult.data.helpShareRes.state === '4') {
                                console.log($.helpResult.data.helpShareRes.promptText + "\n");
                            }
                            else {
                                console.log("\u52A9\u529B\u5176\u4ED6\u60C5\u51B5\uFF1A" + JSON.stringify($.helpResult.data.helpShareRes));
                            }
                        }
                    }
                    else {
                        console.log("\u52A9\u529B\u597D\u53CB\u5931\u8D25: " + JSON.stringify($.helpResult));
                    }
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function showMsg() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            $.log("\n" + message + "\n");
            jdNotify = $.getdata('jdPlantBeanNotify') ? $.getdata('jdPlantBeanNotify') : jdNotify;
            if (!jdNotify || jdNotify === 'false') {
                $.msg($.name, subTitle, message);
            }
            return [2 /*return*/];
        });
    });
}
// ================================================此处是API=================================
//每轮种豆活动获取结束后,自动收取京豆
function getReward() {
    return __awaiter(this, void 0, void 0, function () {
        var body, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = {
                        "roundId": lastRoundId
                    };
                    _a = $;
                    return [4 /*yield*/, request('receivedBean', body)];
                case 1:
                    _a.getReward = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//收取营养液
function cultureBean(currentRoundId, nutrientsType) {
    return __awaiter(this, arguments, void 0, function () {
        var functionId, body, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    functionId = arguments.callee.name.toString();
                    body = {
                        "roundId": currentRoundId,
                        "nutrientsType": nutrientsType,
                    };
                    _a = $;
                    return [4 /*yield*/, request(functionId, body)];
                case 1:
                    _a.cultureBeanRes = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//偷营养液大于等于3瓶的好友
//①查询好友列表
function stealFriendList() {
    return __awaiter(this, void 0, void 0, function () {
        var body, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = {
                        pageNum: '1'
                    };
                    _a = $;
                    return [4 /*yield*/, request('plantFriendList', body)];
                case 1:
                    _a.stealFriendList = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//②执行偷好友营养液的动作
function collectUserNutr(paradiseUuid) {
    return __awaiter(this, arguments, void 0, function () {
        var functionId, body, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('开始偷好友');
                    functionId = arguments.callee.name.toString();
                    body = {
                        "paradiseUuid": paradiseUuid,
                        "roundId": currentRoundId
                    };
                    _a = $;
                    return [4 /*yield*/, request(functionId, body)];
                case 1:
                    _a.stealFriendRes = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function receiveNutrients() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = $;
                    return [4 /*yield*/, request('receiveNutrients', { "roundId": currentRoundId, "monitor_refer": "plant_receiveNutrients" })
                        // console.log(`定时领取营养液结果:${JSON.stringify($.receiveNutrientsRes)}`)
                    ];
                case 1:
                    _a.receiveNutrientsRes = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function plantEggDoLottery() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = $;
                    return [4 /*yield*/, requestGet('plantEggDoLottery')];
                case 1:
                    _a.plantEggDoLotteryResult = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//查询天天扭蛋的机会
function egg() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = $;
                    return [4 /*yield*/, requestGet('plantEggLotteryIndex')];
                case 1:
                    _a.plantEggLotteryRes = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function productTaskList() {
    return __awaiter(this, arguments, void 0, function () {
        var functionId, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    functionId = arguments.callee.name.toString();
                    _a = $;
                    return [4 /*yield*/, requestGet(functionId, { "monitor_refer": "plant_productTaskList" })];
                case 1:
                    _a.productTaskList = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function plantChannelTaskList() {
    return __awaiter(this, arguments, void 0, function () {
        var functionId, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    functionId = arguments.callee.name.toString();
                    _a = $;
                    return [4 /*yield*/, requestGet(functionId)];
                case 1:
                    _a.plantChannelTaskList = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function shopTaskList() {
    return __awaiter(this, arguments, void 0, function () {
        var functionId, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    functionId = arguments.callee.name.toString();
                    _a = $;
                    return [4 /*yield*/, requestGet(functionId, { "monitor_refer": "plant_receiveNutrients" })];
                case 1:
                    _a.shopTaskListRes = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function receiveNutrientsTask(awardType) {
    return __awaiter(this, arguments, void 0, function () {
        var functionId, body, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    functionId = arguments.callee.name.toString();
                    body = {
                        "monitor_refer": "receiveNutrientsTask",
                        "awardType": "" + awardType,
                    };
                    _a = $;
                    return [4 /*yield*/, requestGet(functionId, body)];
                case 1:
                    _a.receiveNutrientsTaskRes = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function plantShareSupportList() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, UTC8_Zero_Time_1, UTC8_End_Time_1, friendList_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = $;
                    return [4 /*yield*/, requestGet('plantShareSupportList', { "roundId": "" })];
                case 1:
                    _a.shareSupportList = _b.sent();
                    if ($.shareSupportList && $.shareSupportList.code === '0') {
                        data = $.shareSupportList.data;
                        UTC8_Zero_Time_1 = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000;
                        UTC8_End_Time_1 = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 + (24 * 60 * 60 * 1000);
                        friendList_1 = [];
                        data.map(function (item) {
                            if (UTC8_Zero_Time_1 <= item['createTime'] && item['createTime'] < UTC8_End_Time_1) {
                                friendList_1.push(item);
                            }
                        });
                        message += "\u3010\u52A9\u529B\u60A8\u7684\u597D\u53CB\u3011\u5171" + friendList_1.length + "\u4EBA";
                    }
                    else {
                        console.log("\u5F02\u5E38\u60C5\u51B5\uFF1A" + JSON.stringify($.shareSupportList));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//助力好友的api
function helpShare(plantUuid) {
    return __awaiter(this, void 0, void 0, function () {
        var body, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\n\u5F00\u59CB\u52A9\u529B\u597D\u53CB: " + plantUuid);
                    body = {
                        "plantUuid": plantUuid,
                        "wxHeadImgUrl": "",
                        "shareUuid": "",
                        "followType": "1",
                    };
                    _a = $;
                    return [4 /*yield*/, request("plantBeanIndex", body)];
                case 1:
                    _a.helpResult = _b.sent();
                    console.log("\u52A9\u529B\u7ED3\u679C\u7684code:" + ($.helpResult && $.helpResult.code));
                    return [2 /*return*/];
            }
        });
    });
}
function plantBeanIndex() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = $;
                    return [4 /*yield*/, request('plantBeanIndex')];
                case 1:
                    _a.plantBeanIndexResult = _b.sent(); //plantBeanIndexBody
                    return [2 /*return*/];
            }
        });
    });
}
function requestGet(function_id, body) {
    var _this = this;
    if (body === void 0) { body = {}; }
    if (!body.version) {
        body["version"] = "9.0.0.1";
    }
    body["monitor_source"] = "plant_app_plant_index";
    body["monitor_refer"] = "";
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var option;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $.wait(2000)];
                case 1:
                    _a.sent();
                    option = {
                        url: JD_API_HOST + "?functionId=" + function_id + "&body=" + escape(JSON.stringify(body)) + "&appid=ld",
                        headers: {
                            'Cookie': $.cookie,
                            'Host': 'api.m.jd.com',
                            'Accept': '*/*',
                            'Connection': 'keep-alive',
                            'User-Agent': 'JD4iPhone/167283 (iPhone;iOS 13.6.1;Scale/3.00)',
                            'Accept-Language': 'zh-Hans-CN;q=1,en-CN;q=0.9',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Content-Type': "application/x-www-form-urlencoded"
                        },
                        timeout: 10000,
                    };
                    $.get(option, function (err, resp, data) {
                        try {
                            if (err) {
                                console.log('\n种豆得豆: API查询请求失败 ‼️‼️');
                                $.logErr(err);
                            }
                            else {
                                data = JSON.parse(data);
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
            }
        });
    }); });
}
function request(function_id, body) {
    var _this = this;
    if (body === void 0) { body = {}; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $.wait(2000)];
                case 1:
                    _a.sent();
                    $.post(taskUrl(function_id, body), function (err, resp, data) {
                        try {
                            if (err) {
                                console.log('\n种豆得豆: API查询请求失败 ‼️‼️');
                                console.log("function_id:" + function_id);
                                $.logErr(err);
                            }
                            else {
                                data = JSON.parse(data);
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
            }
        });
    }); });
}
function taskUrl(function_id, body) {
    body["version"] = "9.2.4.0";
    body["monitor_source"] = "plant_app_plant_index";
    body["monitor_refer"] = "";
    return {
        url: JD_API_HOST,
        body: "functionId=" + function_id + "&body=" + escape(JSON.stringify(body)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2",
        headers: {
            "Cookie": $.cookie,
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Connection": "keep-alive",
            "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: 10000,
    };
}
function getParam(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function jsonParse(str) {
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
}
