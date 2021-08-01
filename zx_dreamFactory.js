// prettier-ignore

const zxCommon = require('./zx_common.js');
let zxObject = new zxCommon.ZxObject('京喜工厂');
const $ = zxObject.$;
$.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;

const JD_API_HOST = 'https://m.jingxi.com';

let jdNotify = true; //是否关闭通知，false打开通知推送，true关闭通知推送
let tuanActiveId = ``,
    hasSend = false;
const jxOpenUrl = `openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://wqsd.jd.com/pingou/dream_factory/index.html%22%20%7D`;
$.Qswitch = true;
const inviteCodes = [
    //'T022v_13RxwZ91ffPR_wlPcNfACjVWnYaS5kRrbA@T0205KkcH1lQpB6qW3uX06FuCjVWnYaS5kRrbA@T0225KkcRR1K8wXXJxKiwaIIdACjVWnYaS5kRrbA@T018v_h6QBsa9VfeKByb1ACjVWnYaS5kRrbA@T016aGPImbWDIsNs9Zd1CjVWnYaS5kRrbA@T020anX1lb-5IPJt9JJyQH-MCjVWnYaS5kRrbA@T0225KkcRBoRp1SEJBP1nKIDdgCjVWnYaS5kRrbA@T0225KkcRBoRp1SEJBP1nKIDdgCjVWnYaS5kRrbA'
    'GQFaiFODayP3CFmn1GngIw==@htUVUcz88GkkaRpg8X59lg==@GoJPV0b29CFq7ww_565pnQ=='
];
$.SQSwitch = true;
$.SJSwitch = true;
$.tuanIds = [];
$.appId = 10001;
$.canHelp = true; //能否参团
!(async() => {
    await requestAlgo();
    await getTuanActiveId();
    //await requireConfig();
    //await requireConfig();
    if (!$.cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }

    await $.dowork(async function() {
        $.ele = 0;
        $.pickEle = 0;
        $.pickFriendEle = 0;
        $.friendList = [];
        $.canHelpFlag = true; //能否助力朋友(招工)
        $.tuanNum = 0; //成团人数
        //await TotalBean();
        console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
        if (!$.isLogin) {
            $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

            if ($.isNode()) {
                await $.notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
            }
            return
        }
        await jdDreamFactory()
    })
    await $.dowork(async function() {
        console.log(`\n账号${$.UserName} 内部相互进团\n`);
        $.canHelp = true;
        for (let item of $.tuanIds) {
            if (!$.canHelp) break;
            console.log(`\n${$.UserName} 去参加团 ${item}`);
            await JoinTuan(item);
            await $.wait(1000);
        }
        //if ($.canHelp) await joinLeaderTuan(); //参团
    })
    if ($.isNode() && $.allMessage) {
        await $.notify.sendNotify(`${$.name}`, `${$.allMessage}`, { url: jxOpenUrl })
    }
})()
.catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

async function jdDreamFactory() {
    try {
        await userInfo();
        await QueryFriendList(); //查询今日招工情况以及剩余助力次数
        // await joinLeaderTuan();//参团
        await helpFriends();
        if (!$.unActive) return
            // await collectElectricity()
        await getUserElectricity();
        await taskList();
        await investElectric();
        await QueryHireReward(); //收取招工电力
        await PickUp(); //收取自家的地下零件
        await stealFriend();
        await tuanActivity();
        await QueryAllTuan();
        await exchangeProNotify();
        await showMsg();
    } catch (e) {
        $.logErr(e)
    }
}


// 收取发电机的电力
function collectElectricity(facId = $.factoryId, help = false, master) {
    return new Promise(async resolve => {
        // let url = `/dreamfactory/generator/CollectCurrentElectricity?zone=dream_factory&apptoken=&pgtimestamp=&phoneID=&factoryid=${facId}&doubleflag=1&sceneval=2&g_login_type=1`;
        // if (help && master) {
        //   url = `/dreamfactory/generator/CollectCurrentElectricity?zone=dream_factory&factoryid=${facId}&master=${master}&sceneval=2&g_login_type=1`;
        // }
        let body = `factoryid=${facId}&apptoken=&pgtimestamp=&phoneID=&doubleflag=1`;
        if (help && master) {
            body += `factoryid=${facId}&master=${master}`;
        }
        $.get(taskurl(`generator/CollectCurrentElectricity`, body, `_time,apptoken,doubleflag,factoryid,pgtimestamp,phoneID,timeStamp,zone`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            if (help) {
                                $.ele += Number(data.data['loginPinCollectElectricity'])
                                console.log(`帮助好友收取 ${data.data['CollectElectricity']} 电力，获得 ${data.data['loginPinCollectElectricity']} 电力`);
                                $.message += `【帮助好友】帮助成功，获得 ${data.data['loginPinCollectElectricity']} 电力\n`
                            } else {
                                $.ele += Number(data.data['CollectElectricity'])
                                console.log(`收取电力成功: 共${data.data['CollectElectricity']} `);
                                $.message += `【收取发电站】收取成功，获得 ${data.data['CollectElectricity']} 电力\n`
                            }
                        } else {
                            if (help) {
                                console.log(`收取好友电力失败:${data.msg}\n`);
                            } else {
                                console.log(`收取电力失败:${data.msg}\n`);
                            }
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

// 投入电力
function investElectric() {
    return new Promise(async resolve => {
        // const url = `/dreamfactory/userinfo/InvestElectric?zone=dream_factory&productionId=${$.productionId}&sceneval=2&g_login_type=1`;
        $.get(taskurl('userinfo/InvestElectric', `productionId=${$.productionId}`, `_time,productionId,zone`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.ret === 0) {
                            console.log(`成功投入电力${data.data.investElectric}电力`);
                            $.message += `【投入电力】投入成功，共计 ${data.data.investElectric} 电力\n`;
                        } else {
                            console.log(`投入失败，${data.msg}`);
                            $.message += `【投入电力】投入失败，${data.msg}\n`;
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

// 初始化任务
function taskList() {
    return new Promise(async resolve => {
        // const url = `/newtasksys/newtasksys_front/GetUserTaskStatusList?source=dreamfactory&bizCode=dream_factory&sceneval=2&g_login_type=1`;
        $.get(newtasksysUrl('GetUserTaskStatusList', '', `_time,bizCode,source`), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        let userTaskStatusList = data['data']['userTaskStatusList'];
                        for (let i = 0; i < userTaskStatusList.length; i++) {
                            const vo = userTaskStatusList[i];
                            if (vo['awardStatus'] !== 1) {
                                if (vo.completedTimes >= vo.targetTimes) {
                                    console.log(`任务：${vo.description}可完成`)
                                    await completeTask(vo.taskId, vo.taskName)
                                    await $.wait(1000); //延迟等待一秒
                                } else {
                                    switch (vo.taskType) {
                                        case 2: // 逛一逛任务
                                        case 6: // 浏览商品任务
                                        case 9: // 开宝箱
                                            for (let i = vo.completedTimes; i <= vo.configTargetTimes; ++i) {
                                                console.log(`去做任务：${vo.taskName}`)
                                                await doTask(vo.taskId)
                                                await completeTask(vo.taskId, vo.taskName)
                                                await $.wait(1000); //延迟等待一秒
                                            }
                                            break
                                        case 4: // 招工
                                            break
                                        case 5:
                                            // 收集类
                                            break
                                        case 1: // 登陆领奖
                                        default:
                                            break
                                    }
                                }
                            }
                        }
                        console.log(`完成任务：共领取${$.ele}电力`)
                        $.message += `【每日任务】领奖成功，共计 ${$.ele} 电力\n`;
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

// 获得用户电力情况
function getUserElectricity() {
    return new Promise(async resolve => {
        // const url = `/dreamfactory/generator/QueryCurrentElectricityQuantity?zone=dream_factory&factoryid=${$.factoryId}&sceneval=2&g_login_type=1`
        $.get(taskurl(`generator/QueryCurrentElectricityQuantity`, `factoryid=${$.factoryId}`, `_time,factoryid,zone`), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            console.log(`发电机：当前 ${data.data.currentElectricityQuantity} 电力，最大值 ${data.data.maxElectricityQuantity} 电力`)
                            if (data.data.currentElectricityQuantity < data.data.maxElectricityQuantity) {
                                $.log(`\n本次发电机电力集满分享后${data.data.nextCollectDoubleFlag === 1 ? '可' : '不可'}获得双倍电力，${data.data.nextCollectDoubleFlag === 1 ? '故目前不收取电力' : '故现在收取电力'}\n`)
                            }
                            if (data.data.nextCollectDoubleFlag === 1) {
                                if (data.data.currentElectricityQuantity === data.data.maxElectricityQuantity && data.data.doubleElectricityFlag) {
                                    console.log(`发电机：电力可翻倍并收获`)
                                        // await shareReport();
                                    await collectElectricity()
                                } else {
                                    $.message += `【发电机电力】当前 ${data.data.currentElectricityQuantity} 电力，未达到收获标准\n`
                                }
                            } else {
                                //再收取双倍电力达到上限时，直接收取，不再等到满级
                                await collectElectricity()
                            }
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

//查询有多少的招工电力可收取
function QueryHireReward() {
    return new Promise(async resolve => {
        // const url = `/dreamfactory/friend/HireAward?zone=dream_factory&date=${new Date().Format("yyyyMMdd")}&type=0&sceneval=2&g_login_type=1`
        $.get(taskurl('friend/QueryHireReward', ``, `_time,zone`), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            for (let item of data['data']['hireReward']) {
                                if (item.date !== new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).Format("yyyyMMdd")) {
                                    await hireAward(item.date, item.type);
                                }
                            }
                        } else {
                            console.log(`异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
// 收取招工/劳模电力
function hireAward(date, type = 0) {
    return new Promise(async resolve => {
        // const url = `/dreamfactory/friend/HireAward?zone=dream_factory&date=${new Date().Format("yyyyMMdd")}&type=0&sceneval=2&g_login_type=1`
        $.get(taskurl('friend/HireAward', `date=${date}&type=${type}`, '_time,date,type,zone'), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            console.log(`打工电力：收取成功`)
                            $.message += `【打工电力】：收取成功\n`
                        } else {
                            console.log(`打工电力：收取失败，${data.msg}`)
                            $.message += `【打工电力】收取失败，${data.msg}\n`
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
async function helpFriends() {
    let Hours = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getHours();
    if (Hours < 6) {
        console.log(`\n未到招工时间(每日6-24点之间可招工)\n`)
        return
    }
    if ($.canHelpFlag) {
        await shareCodesFormat();
        for (let code of $.newShareCodes) {
            if (code) {
                if ($.encryptPin === code) {
                    console.log(`不能为自己助力,跳过`);
                    continue;
                }
                const assistFriendRes = await assistFriend(code);
                if (assistFriendRes && assistFriendRes['ret'] === 0) {
                    console.log(`助力朋友：${code}成功，因一次只能助力一个，故跳出助力`)
                    break
                } else if (assistFriendRes && assistFriendRes['ret'] === 11009) {
                    console.log(`助力朋友[${code}]失败：${assistFriendRes.msg}，跳出助力`);
                    break
                } else {
                    console.log(`助力朋友[${code}]失败：${assistFriendRes.msg}`)
                }
            }
        }
    } else {
        $.log(`\n今日助力好友机会已耗尽\n`);
    }
}
// 帮助用户,此处UA不可更换,否则助力功能会失效
function assistFriend(sharepin) {
    return new Promise(async resolve => {
        // const url = `/dreamfactory/friend/AssistFriend?zone=dream_factory&sharepin=${escape(sharepin)}&sceneval=2&g_login_type=1`
        // const options = {
        //   'url': `https://m.jingxi.com/dreamfactory/friend/AssistFriend?zone=dream_factory&sharepin=${escape(sharepin)}&sceneval=2&g_login_type=1`,
        //   'headers': {
        //     "Accept": "*/*",
        //     "Accept-Encoding": "gzip, deflate, br",
        //     "Accept-Language": "zh-cn",
        //     "Connection": "keep-alive",
        //     "Cookie": $.cookie,
        //     "Host": "m.jingxi.com",
        //     "Referer": "https://st.jingxi.com/pingou/dream_factory/index.html",
        //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36"
        //   }
        // }
        const options = taskurl('friend/AssistFriend', `sharepin=${escape(sharepin)}`, `_time,sharepin,zone`);
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        // if (data['ret'] === 0) {
                        //   console.log(`助力朋友：${sharepin}成功`)
                        // } else {
                        //   console.log(`助力朋友[${sharepin}]失败：${data.msg}`)
                        // }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
//查询助力招工情况
function QueryFriendList() {
    return new Promise(async resolve => {
        $.get(taskurl('friend/QueryFriendList', ``, `_time,zone`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            data = data['data'];
                            const { assistListToday = [], assistNumMax, hireListToday = [], hireNumMax } = data;
                            console.log(`\n\n你今日还能帮好友打工（${assistNumMax - assistListToday.length || 0}/${assistNumMax}）次\n\n`);
                            if (assistListToday.length === assistNumMax) {
                                $.canHelpFlag = false;
                            }
                            $.log(`【今日招工进度】${hireListToday.length}/${hireNumMax}`);
                            $.message += `【招工进度】${hireListToday.length}/${hireNumMax}\n`;
                        } else {
                            console.log(`QueryFriendList异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
// 任务领奖
function completeTask(taskId, taskName) {
    return new Promise(async resolve => {
        // const url = `/newtasksys/newtasksys_front/Award?source=dreamfactory&bizCode=dream_factory&taskId=${taskId}&sceneval=2&g_login_type=1`;
        $.get(newtasksysUrl('Award', taskId, `_time,bizCode,source,taskId`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        switch (data['data']['awardStatus']) {
                            case 1:
                                $.ele += Number(data['data']['prizeInfo'].replace('\\n', ''))
                                console.log(`领取${taskName}任务奖励成功，收获：${Number(data['data']['prizeInfo'].replace('\\n', ''))}电力`);
                                break
                            case 1013:
                            case 0:
                                console.log(`领取${taskName}任务奖励失败，任务已领奖`);
                                break
                            default:
                                console.log(`领取${taskName}任务奖励失败，${data['msg']}`)
                                break
                        }
                        // if (data['ret'] === 0) {
                        //   console.log("做任务完成！")
                        // } else {
                        //   console.log(`异常：${JSON.stringify(data)}`)
                        // }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

// 完成任务
function doTask(taskId) {
    return new Promise(async resolve => {
        // const url = `/newtasksys/newtasksys_front/DoTask?source=dreamfactory&bizCode=dream_factory&taskId=${taskId}&sceneval=2&g_login_type=1`;
        $.get(newtasksysUrl('DoTask', taskId, '_time,bizCode,configExtra,source,taskId'), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            console.log("做任务完成！")
                        } else {
                            console.log(`DoTask异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

// 初始化个人信息
function userInfo() {
    return new Promise(async resolve => {
        $.get(taskurl('userinfo/GetUserInfo', `pin=&sharePin=&shareType=&materialTuanPin=&materialTuanId=&source=`, '_time,materialTuanId,materialTuanPin,pin,sharePin,shareType,source,zone'), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            data = data['data'];
                            $.unActive = true; //标记是否开启了京喜活动或者选购了商品进行生产
                            $.encryptPin = '';
                            $.shelvesList = [];
                            if (data.factoryList && data.productionList) {
                                const production = data.productionList[0];
                                const factory = data.factoryList[0];
                                const productionStage = data.productionStage;
                                $.factoryId = factory.factoryId; //工厂ID
                                $.productionId = production.productionId; //商品ID
                                $.commodityDimId = production.commodityDimId;
                                $.encryptPin = data.user.encryptPin;
                                // subTitle = data.user.pin;
                                await GetCommodityDetails(); //获取已选购的商品信息
                                if (productionStage['productionStageAwardStatus'] === 1) {
                                    $.log(`可以开红包了\n`);
                                    await DrawProductionStagePrize(); //领取红包
                                } else {
                                    $.log(`再加${productionStage['productionStageProgress']}电力可开红包\n`)
                                }
                                console.log(`当前电力：${data.user.electric}`)
                                console.log(`当前等级：${data.user.currentLevel}`)
                                console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${data.user.encryptPin}`);
                                console.log(`已投入电力：${production.investedElectric}`);
                                console.log(`所需电力：${production.needElectric}`);
                                console.log(`生产进度：${((production.investedElectric / production.needElectric) * 100).toFixed(2)}%`);
                                $.message += `【京东账号${$.index}】${$.nickName}\n`
                                $.message += `【生产商品】${$.productName}\n`;
                                $.message += `【当前等级】${data.user.userIdentity} ${data.user.currentLevel}\n`;
                                $.message += `【生产进度】${((production.investedElectric / production.needElectric) * 100).toFixed(2)}%\n`;
                                if (production.investedElectric >= production.needElectric) {
                                    if (production['exchangeStatus'] === 1) $.log(`\n\n可以兑换商品了`)
                                    if (production['exchangeStatus'] === 3) {
                                        $.log(`\n\n商品兑换已超时`)
                                        if (new Date().getHours() === 9) {
                                            $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}兑换已超时，请选择新商品进行制造`)
                                            $.allMessage += `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}兑换已超时，请选择新商品进行制造${$.index !== cookiesArr.length ? '\n\n' : ''}`;
                                        }
                                    }
                                    // await exchangeProNotify()
                                } else {
                                    console.log(`\n\n预计最快还需 【${((production.needElectric - production.investedElectric) / (2 * 60 * 60 * 24)).toFixed(2)}天】生产完毕\n\n`)
                                }
                                if (production.status === 3) {
                                    $.log(`\n\n商品生产已失效`)
                                    $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}\n【超时未完成】已失效，请选择新商品进行制造`)
                                    $.allMessage += `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}\n【超时未完成】已失效，请选择新商品进行制造${$.index !== cookiesArr.length ? '\n\n' : ''}`;
                                }
                            } else {
                                $.unActive = false; //标记是否开启了京喜活动或者选购了商品进行生产
                                if (!data.factoryList) {
                                    console.log(`【提示】京东账号${$.index}[${$.nickName}]京喜工厂活动未开始\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 开启活动\n`);
                                    // $.msg($.name, '【提示】', `京东账号${$.index}[${$.nickName}]京喜工厂活动未开始\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 开启活动`);
                                } else if (data.factoryList && !data.productionList) {
                                    console.log(`【提示】京东账号${$.index}[${$.nickName}]京喜工厂未选购商品\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 选购\n`)
                                    let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
                                    if (nowTimes.getHours() === 12) {
                                        //如按每小时运行一次，则此处将一天12点推送1次提醒
                                        $.msg($.name, '提醒⏰', `京东账号${$.index}[${$.nickName}]京喜工厂未选择商品\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 选择商品`);
                                        // if ($.isNode()) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `京东账号${$.index}[${$.nickName}]京喜工厂未选择商品\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 选择商品`)
                                        if ($.isNode()) $.allMessage += `京东账号${$.index}[${$.nickName}]京喜工厂未选择商品\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 选择商品${$.index !== cookiesArr.length ? '\n\n' : ''}`
                                    }
                                }
                            }
                        } else {
                            console.log(`GetUserInfo异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
//查询当前生产的商品名称
function GetCommodityDetails() {
    return new Promise(async resolve => {
        // const url = `/dreamfactory/diminfo/GetCommodityDetails?zone=dream_factory&sceneval=2&g_login_type=1&commodityId=${$.commodityDimId}`;
        $.get(taskurl('diminfo/GetCommodityDetails', `commodityId=${$.commodityDimId}`, `_time,commodityId,zone`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            data = data['data'];
                            $.productName = data['commodityList'][0].name;
                        } else {
                            console.log(`GetCommodityDetails异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
// 查询已完成商品
function GetShelvesList(pageNo = 1) {
    return new Promise(async resolve => {
        $.get(taskurl('userinfo/GetShelvesList', `pageNo=${pageNo}&pageSize=12`, `_time,pageNo,pageSize,zone`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            data = data['data'];
                            const { shelvesList } = data;
                            if (shelvesList) {
                                $.shelvesList = [...$.shelvesList, ...shelvesList];
                                pageNo++
                                GetShelvesList(pageNo);
                            }
                        } else {
                            console.log(`GetShelvesList异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
//领取红包
function DrawProductionStagePrize() {
    return new Promise(async resolve => {
        // const url = `/dreamfactory/userinfo/DrawProductionStagePrize?zone=dream_factory&sceneval=2&g_login_type=1&productionId=${$.productionId}`;
        $.get(taskurl('userinfo/DrawProductionStagePrize', `productionId=${$.productionId}`, `_time,productionId,zone`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    console.log(`开幸运红包：${data}`);
                    // if ($.safeGet(data)) {
                    //   data = JSON.parse(data);
                    //   if (data['ret'] === 0) {
                    //
                    //   } else {
                    //     console.log(`异常：${JSON.stringify(data)}`)
                    //   }
                    // }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
async function PickUp(encryptPin = $.encryptPin, help = false) {
    $.pickUpMyselfComponent = true;
    const GetUserComponentRes = await GetUserComponent(encryptPin, 1500);
    if (GetUserComponentRes && GetUserComponentRes['ret'] === 0 && GetUserComponentRes['data']) {
        const { componentList } = GetUserComponentRes['data'];
        if (componentList && componentList.length <= 0) {
            if (help) {
                $.log(`好友【${encryptPin}】地下暂无零件可收\n`)
            } else {
                $.log(`自家地下暂无零件可收\n`)
            }
            $.pickUpMyselfComponent = false;
        }
        for (let item of componentList) {
            await $.wait(1000);
            const PickUpComponentRes = await PickUpComponent(item['placeId'], encryptPin);
            if (PickUpComponentRes) {
                if (PickUpComponentRes['ret'] === 0) {
                    const data = PickUpComponentRes['data'];
                    if (help) {
                        console.log(`收取好友[${encryptPin}]零件成功:获得${data['increaseElectric']}电力\n`);
                        $.pickFriendEle += data['increaseElectric'];
                    } else {
                        console.log(`收取自家零件成功:获得${data['increaseElectric']}电力\n`);
                        $.pickEle += data['increaseElectric'];
                    }
                } else {
                    if (help) {
                        console.log(`收好友[${encryptPin}]零件失败：${PickUpComponentRes.msg},直接跳出\n`)
                    } else {
                        console.log(`收自己地下零件失败：${PickUpComponentRes.msg},直接跳出\n`);
                        $.pickUpMyselfComponent = false;
                    }
                    break
                }
            }
        }
    }
}

function GetUserComponent(pin = $.encryptPin, timeout = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            $.get(taskurl('usermaterial/GetUserComponent', `pin=${pin}`, `_time,pin,zone`), (err, resp, data) => {
                try {
                    if (err) {
                        console.log(`${JSON.stringify(err)}`)
                        console.log(`${$.name} API请求失败，请检查网路重试`)
                    } else {
                        if ($.safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {

                            } else {
                                console.log(`GetUserComponent失败：${JSON.stringify(data)}`)
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp)
                } finally {
                    resolve(data);
                }
            })
        }, timeout)
    })
}
//收取地下随机零件电力API

function PickUpComponent(index, encryptPin) {
    return new Promise(resolve => {
        $.get(taskurl('usermaterial/PickUpComponent', `placeId=${index}&pin=${encryptPin}`, `_time,pin,placeId,zone`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
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
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
//偷好友的电力
async function stealFriend() {
    // if (!$.pickUpMyselfComponent) {
    //   $.log(`今日收取零件已达上限，偷好友零件也达到上限，故跳出`)
    //   return
    // }
    //调整，只在每日1点，12点，19点尝试收取好友零件
    if (new Date().getHours() !== 1 && new Date().getHours() !== 12 && new Date().getHours() !== 19) return
    await getFriendList();
    $.friendList = [...new Set($.friendList)].filter(vo => !!vo && vo['newFlag'] !== 1);
    console.log(`查询好友列表完成，共${$.friendList.length}好友，下面开始拾取好友地下的零件\n`);
    for (let i = 0; i < $.friendList.length; i++) {
        let pin = $.friendList[i]['encryptPin']; //好友的encryptPin
        console.log(`\n开始收取第 ${i + 1} 个好友 【${$.friendList[i]['nickName']}】 地下零件 collectFlag：${$.friendList[i]['collectFlag']}`)
        await PickUp(pin, true);
        // await getFactoryIdByPin(pin);//获取好友工厂ID
        // if ($.stealFactoryId) await collectElectricity($.stealFactoryId,true, pin);
    }
}

function getFriendList(sort = 0) {
    return new Promise(async resolve => {
        $.get(taskurl('friend/QueryFactoryManagerList', `sort=${sort}`, `_time,sort,zone`), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            data = data['data'];
                            if (data.list && data.list.length <= 0) {
                                // console.log(`查询好友列表完成，共${$.friendList.length}好友，下面开始拾取好友地下的零件\n`);
                                return
                            }
                            let friendsEncryptPins = [];
                            for (let item of data.list) {
                                friendsEncryptPins.push(item);
                            }
                            $.friendList = [...$.friendList, ...friendsEncryptPins];
                            // if (!$.isNode()) return
                            await getFriendList(data.sort);
                        } else {
                            console.log(`QueryFactoryManagerList异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function getFactoryIdByPin(pin) {
    return new Promise((resolve, reject) => {
        // const url = `/dreamfactory/userinfo/GetUserInfoByPin?zone=dream_factory&pin=${pin}&sceneval=2`;
        $.get(taskurl('userinfo/GetUserInfoByPin', `pin=${pin}`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            if (data.data.factoryList) {
                                //做此判断,有时候返回factoryList为null
                                // resolve(data['data']['factoryList'][0]['factoryId'])
                                $.stealFactoryId = data['data']['factoryList'][0]['factoryId'];
                            }
                        } else {
                            console.log(`异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
async function tuanActivity() {
    const tuanConfig = await QueryActiveConfig();
    if (tuanConfig && tuanConfig.ret === 0) {
        const { activeId, surplusOpenTuanNum, tuanId } = tuanConfig['data']['userTuanInfo'];
        console.log(`今日剩余开团次数：${surplusOpenTuanNum}次`);
        $.surplusOpenTuanNum = surplusOpenTuanNum;
        if (!tuanId && surplusOpenTuanNum > 0) {
            //开团
            $.log(`准备开团`)
            await CreateTuan();
        } else if (tuanId) {
            //查询词团信息
            const QueryTuanRes = await QueryTuan(activeId, tuanId);
            if (QueryTuanRes && QueryTuanRes.ret === 0) {
                const { tuanInfo } = QueryTuanRes.data;
                if ((tuanInfo && tuanInfo[0]['endTime']) <= QueryTuanRes['nowTime'] && surplusOpenTuanNum > 0) {
                    $.log(`之前的团已过期，准备重新开团\n`)
                    await CreateTuan();
                }
                for (let item of tuanInfo) {
                    const { realTuanNum, tuanNum, userInfo } = item;
                    $.tuanNum = tuanNum || 0;
                    $.log(`\n开团情况:${realTuanNum}/${tuanNum}\n`);
                    if (realTuanNum === tuanNum) {
                        for (let user of userInfo) {
                            if (user.encryptPin === $.encryptPin) {
                                if (user.receiveElectric && user.receiveElectric > 0) {
                                    console.log(`您在${new Date(user.joinTime * 1000).toLocaleString()}开团奖励已经领取成功\n`)
                                    if ($.surplusOpenTuanNum > 0) await CreateTuan();
                                } else {
                                    $.log(`开始领取开团奖励`);
                                    await tuanAward(item.tuanActiveId, item.tuanId); //isTuanLeader
                                }
                            }
                        }
                    } else {
                        $.tuanIds.push(tuanId);
                        $.log(`\n此团未达领取团奖励人数：${realTuanNum}/${tuanNum}人\n`)
                    }
                }
            }
        }
    }
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
    return new Promise((resolve) => {
        const body = `activeId=${escape(tuanActiveId)}&tuanId=`;
        const options = taskTuanUrl(`QueryActiveConfig`, body, `_time,activeId,tuanId`)
        $.get(options, async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            const { userTuanInfo } = data['data'];
                            console.log(`\n团活动ID  ${userTuanInfo.activeId}`);
                            console.log(`团ID  ${userTuanInfo.tuanId}\n`);
                        } else {
                            console.log(`QueryActiveConfig异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function QueryTuan(activeId, tuanId) {
    return new Promise((resolve) => {
        const body = `activeId=${escape(activeId)}&tuanId=${escape(tuanId)}`;
        const options = taskTuanUrl(`QueryTuan`, body, `_time,activeId,tuanId`)
        $.get(options, async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            // $.log(`\n开团情况:${data.data.tuanInfo.realTuanNum}/${data.data.tuanInfo.tuanNum}\n`)
                        } else {
                            console.log(`异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
//开团API
function CreateTuan() {
    return new Promise((resolve) => {
        const body = `activeId=${escape(tuanActiveId)}&isOpenApp=1`
        const options = taskTuanUrl(`CreateTuan`, body, '_time,activeId,isOpenApp')
        $.get(options, async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            console.log(`【开团成功】tuanId为 ${data.data['tuanId']}`);
                            $.tuanIds.push(data.data['tuanId']);
                        } else {
                            //{"msg":"活动已结束，请稍后再试~","nowTime":1621551005,"ret":10218}
                            if (data['ret'] === 10218 && !hasSend && (new Date().getHours() % 6 === 0)) {
                                hasSend = true;
                                $.msg($.name, '', `京喜工厂拼团瓜分电力活动团ID（activeId）已失效\n请自行抓包替换(Node环境变量为TUAN_ACTIVEID，iOS端在BoxJx)或者联系作者等待更新`);
                                if ($.isNode()) await notify.sendNotify($.name, `京喜工厂拼团瓜分电力活动团ID（activeId）已失效\n请自行抓包替换(Node环境变量为TUAN_ACTIVEID，iOS端在BoxJx)或者联系作者等待更新`)
                            }
                            console.log(`开团异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function JoinTuan(tuanId, stk = '_time,activeId,tuanId') {
    return new Promise((resolve) => {
        const body = `activeId=${escape(tuanActiveId)}&tuanId=${escape(tuanId)}`;
        const options = taskTuanUrl(`JoinTuan`, body, '_time,activeId,tuanId')
        $.get(options, async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            console.log(`参团成功：${JSON.stringify(data)}\n`);
                        } else if (data['ret'] === 10005 || data['ret'] === 10206) {
                            //火爆，或者今日参团机会已耗尽
                            console.log(`参团失败：${JSON.stringify(data)}\n`);
                            $.canHelp = false;
                        } else {
                            console.log(`参团失败：${JSON.stringify(data)}\n`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
//查询所有的团情况(自己开团以及参加别人的团)
function QueryAllTuan() {
    return new Promise((resolve) => {
        const body = `activeId=${escape(tuanActiveId)}&pageNo=1&pageSize=10`;
        const options = taskTuanUrl(`QueryAllTuan`, body, '_time,activeId,pageNo,pageSize')
        $.get(options, async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            const { tuanInfo } = data;
                            for (let item of tuanInfo) {
                                if (item.tuanNum === item.realTuanNum) {
                                    // console.log(`参加团主【${item.tuanLeader}】已成功`)
                                    const { userInfo } = item;
                                    for (let item2 of userInfo) {
                                        if (item2.encryptPin === $.encryptPin) {
                                            if (item2.receiveElectric && item2.receiveElectric > 0) {
                                                console.log(`${new Date(item2.joinTime * 1000).toLocaleString()}参加团主【${item2.nickName}】的奖励已经领取成功`)
                                            } else {
                                                console.log(`开始领取${new Date(item2.joinTime * 1000).toLocaleString()}参加团主【${item2.nickName}】的奖励`)
                                                await tuanAward(item.tuanActiveId, item.tuanId, item.tuanLeader === $.encryptPin); //isTuanLeader
                                            }
                                        }
                                    }
                                } else {
                                    console.log(`${new Date(item.beginTime * 1000).toLocaleString()}参加团主【${item.tuanLeader}】失败`)
                                }
                            }
                        } else {
                            console.log(`QueryAllTuan异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
//开团人的领取奖励API
function tuanAward(activeId, tuanId, isTuanLeader = true) {
    return new Promise((resolve) => {
        const body = `activeId=${escape(activeId)}&tuanId=${escape(tuanId)}`;
        const options = taskTuanUrl(`Award`, body, '_time,activeId,tuanId')
        $.get(options, async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if ($.safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            if (isTuanLeader) {
                                console.log(`开团奖励(团长)${data.data['electric']}领取成功`);
                                $.message += `【开团(团长)奖励】${data.data['electric']}领取成功\n`;
                                if ($.surplusOpenTuanNum > 0) {
                                    $.log(`开团奖励(团长)已领取，准备开团`);
                                    await CreateTuan();
                                }
                            } else {
                                console.log(`参团奖励${data.data['electric']}领取成功`);
                                $.message += `【参团奖励】${data.data['electric']}领取成功\n`;
                            }
                        } else if (data['ret'] === 10212) {
                            console.log(`${JSON.stringify(data)}`);

                            if (isTuanLeader && $.surplusOpenTuanNum > 0) {
                                $.log(`团奖励已领取，准备开团`);
                                await CreateTuan();
                            }
                        } else {
                            console.log(`异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function updateTuanIdsCDN(url = 'https://raw.githubusercontent.com/gitupdate/updateTeam/master/shareCodes/jd_updateFactoryTuanId.json') {
    return new Promise(async resolve => {
        const options = {
            url: `${url}?${new Date()}`,
            "timeout": 10000,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
            const tunnel = require("tunnel");
            const agent = {
                https: tunnel.httpsOverHttp({
                    proxy: {
                        host: process.env.TG_PROXY_HOST,
                        port: process.env.TG_PROXY_PORT * 1
                    }
                })
            }
            Object.assign(options, { agent })
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    // console.log(`${JSON.stringify(err)}`)
                } else {
                    if ($.safeGet(data)) {
                        $.tuanConfigs = data = JSON.parse(data);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
        await $.wait(20000)
        resolve();
    })
}

//商品可兑换时的通知
async function exchangeProNotify() {
    await GetShelvesList();
    let exchangeEndTime, exchangeEndHours, nowHours;
    //脚本运行的UTC+8时区的时间戳
    let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
    if ($.shelvesList && $.shelvesList.length > 0) console.log(`\n  商品名     兑换状态`)
    for (let shel of $.shelvesList) {
        console.log(`${shel['name']}    ${shel['exchangeStatus'] === 1 ? '未兑换' : shel['exchangeStatus'] === 2 ? '已兑换' : '兑换超时'}`)
        if (shel['exchangeStatus'] === 1) {
            exchangeEndTime = shel['exchangeEndTime'] * 1000;
            $.picture = shel['picture'];
            // 兑换截止时间点
            exchangeEndHours = new Date(exchangeEndTime + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).getHours();
            //兑换截止时间(年月日 时分秒)
            $.exchangeEndTime = new Date(exchangeEndTime + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString('zh', { hour12: false });
            //脚本运行此时的时间点
            nowHours = nowTimes.getHours();
        } else if (shel['exchangeStatus'] === 3) {
            //兑换超时
        }
    }
    if (exchangeEndTime) {
        //比如兑换(超时)截止时间是2020/12/8 09:20:04,现在时间是2020/12/6
        if (nowTimes < exchangeEndTime) {
            // 一:在兑换超时这一天(2020/12/8 09:20:04)的前3小时内通知（每次运行都通知）
            let flag = true;
            if ((exchangeEndTime - nowTimes.getTime()) <= 3600000 * 3) {
                let expiredTime = parseFloat(((exchangeEndTime - nowTimes.getTime()) / (60 * 60 * 1000)).toFixed(1))
                $.msg($.name, ``, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}${expiredTime}小时后兑换超时\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, { 'open-url': jxOpenUrl, 'media-url': $.picture })
                    // if ($.isNode()) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}${(exchangeEndTime - nowTimes) / 60*60*1000}分钟后兑换超时\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, { url: jxOpenUrl })
                if ($.isNode()) $.allMessage += `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}${expiredTime}小时后兑换超时\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换${$.index !== cookiesArr.length ? '\n\n' : ''}`
                flag = false;
            }
            //二:在可兑换的时候，0,2,4等等小时通知一次
            if (nowHours % 2 === 0 && flag) {
                $.msg($.name, ``, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}已可兑换\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, { 'open-url': jxOpenUrl, 'media-url': $.picture })
                    // if ($.isNode()) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}已可兑换\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, { url: jxOpenUrl })
                if ($.isNode()) $.allMessage += `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}已可兑换\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换${$.index !== cookiesArr.length ? '\n\n' : ''}`
            }
        }
    }
}
async function showMsg() {
    return new Promise(async resolve => {
                $.message += `【收取自己零件】${$.pickUpMyselfComponent ? `获得${$.pickEle}电力` : `今日已达上限`}\n`;
          $.message += `【收取好友零件】${$.pickUpMyselfComponent ? `获得${$.pickFriendEle}电力` : `今日已达上限`}\n`;
          if ($.isNode() && process.env.DREAMFACTORY_NOTIFY_CONTROL) {
            $.ctrTemp = `${process.env.DREAMFACTORY_NOTIFY_CONTROL}` === 'false';
          } else if ($.getdata('jdDreamFactory')) {
            $.ctrTemp = $.getdata('jdDreamFactory') === 'false';
          } else {
            $.ctrTemp = `${jdNotify}` === 'false';
          }
          if (new Date().getHours() === 22) {
            $.msg($.name, '', `${$.message}`)
            $.log(`\n${$.message}`);
          } else {
            $.log(`\n${$.message}`);
          }
          resolve()
        })
      }

      async function getTuanActiveId() {
        const method = `GET`;
        let headers = {};
        let myRequest =  {url: 'https://st.jingxi.com/pingou/dream_factory/index.html', method: method, headers: headers};
        return new Promise(async resolve => {
          $.get(myRequest, (err, resp, data) => {
            try {
              data = data && data.match(/window\._CONFIG = (.*) ;var __getImgUrl/);
              if (data) {
                data = JSON.parse(data[1]);
                const tuanConfigs = (data[0].skinConfig[0].adConfig || []).filter(vo => !!vo && vo['channel'] === 'h5');
                if (tuanConfigs && tuanConfigs.length) {
                  for (let item of tuanConfigs) {
                    const start = item.start;
                    const end = item.end;
                    const link = item.link;
                    if (new Date(item.end).getTime() > Date.now()) {
                      if (link && link.match(/activeId=(.*),/) && link.match(/activeId=(.*),/)[1]) {
                        console.log(`\n获取团活动ID成功: ${link.match(/activeId=(.*),/)[1]}\n有效时段：${start} - ${end}`);
                        tuanActiveId = link.match(/activeId=(.*),/)[1];
                        break
                      }
                    } else {
                        tuanActiveId = '';
                    }
                  }
                }
              }
            } catch (e) {
              console.log(data);$.logErr(e, resp);
            } finally {resolve();}
          })
        })
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
        return new Promise(async resolve => {
          // console.log(`第${$.index}个京东账号的助力码:::${$.shareCodesArr[$.index - 1]}`)
          $.newShareCodes = [];
          if ($.shareCodesArr[$.index - 1]) {
            $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
          } else {
            console.log(`由于您第${$.index}个京东账号未提供shareCode,将采纳本脚本自带的助力码\n`)
            const tempIndex = $.index > inviteCodes.length ? (inviteCodes.length - 1) : ($.index - 1);
            $.newShareCodes = inviteCodes[tempIndex].split('@');
          }
          //const readShareCodeRes = await readShareCode();
          const readShareCodeRes = null;
          if (readShareCodeRes && readShareCodeRes.code === 200) {
            $.newShareCodes = [...new Set([...$.newShareCodes, ...(readShareCodeRes.data || [])])];
          }
          console.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify($.newShareCodes)}`)
          resolve();
        })
      }
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
          resolve()
        })
      }
      function TotalBean() {
        return new Promise(async resolve => {
          const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
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
          }
          $.post(options, (err, resp, data) => {
            try {
              if (err) {
                console.log(`${JSON.stringify(err)}`)
                console.log(`${$.name} API请求失败，请检查网路重试`)
              } else {
                if (data) {
                  data = JSON.parse(data);
                  if (data['retcode'] === 13) {
                    $.isLogin = false; //cookie过期
                    return
                  }
                  if (data['retcode'] === 0) {
                    $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
                  } else {
                    $.nickName = $.UserName
                  }
                } else {
                  console.log(`京东服务器返回空数据`)
                }
              }
            } catch (e) {
              $.logErr(e, resp)
            } finally {
              resolve();
            }
          })
        })
      }

      
      function taskTuanUrl(functionId, body = '', stk) {
        let url = `https://m.jingxi.com/dreamfactory/tuan/${functionId}?${body}&_time=${Date.now()}&_=${Date.now() + 2}&sceneval=2&g_login_type=1&_ste=1`
        url += `&h5st=${decrypt(Date.now(), stk || '', '', url)}`
        if (stk) {
          url += `&_stk=${encodeURIComponent(stk)}`;
        }
        return {
          url,
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
        }
      }
      
      function taskurl(functionId, body = '', stk) {
        let url = `${JD_API_HOST}/dreamfactory/${functionId}?zone=dream_factory&${body}&sceneval=2&g_login_type=1&_time=${Date.now()}&_=${Date.now() + 2}&_ste=1`
        url += `&h5st=${decrypt(Date.now(), stk, '', url)}`
        if (stk) {
          url += `&_stk=${encodeURIComponent(stk)}`;
        }
        return {
          url,
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
        }
      }
      function newtasksysUrl(functionId, taskId, stk) {
        let url = `${JD_API_HOST}/newtasksys/newtasksys_front/${functionId}?source=dreamfactory&bizCode=dream_factory&sceneval=2&g_login_type=1&_time=${Date.now()}&_=${Date.now() + 2}&_ste=1`;
        if (taskId) {
          url += `&taskId=${taskId}`;
        }
        if (stk) {
          url += `&_stk=${stk}`;
        }
        //传入url进行签名
        url += `&h5st=${decrypt(Date.now(), stk, '', url)}`
        return {
          url,
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
        }
      }
      /*
      修改时间戳转换函数，京喜工厂原版修改
       */
      Date.prototype.Format = function (fmt) {
        var e,
            n = this, d = fmt, l = {
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
            d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? l[k] : ("".concat(a) + l[k]).substr("".concat(l[k]).length))
          }
        }
        return d;
      }
      
      async function requestAlgo() {
        $.fingerprint = await $.generateFp();
        const options = {
          "url": `https://cactus.jd.com/request_algo?g_ty=ajax`,
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
        }
        new Promise(async resolve => {
          $.post(options, (err, resp, data) => {
            try {
              if (err) {
                console.log(`${JSON.stringify(err)}`)
                console.log(`request_algo 签名参数API请求失败，请检查网路重试`)
              } else {
                if (data) {
                  // console.log(data);
                  data = JSON.parse(data);
                  if (data['status'] === 200) {
                    $.token = data.data.result.tk;
                    let enCryptMethodJDString = data.data.result.algo;
                    if (enCryptMethodJDString) $.enCryptMethodJD = new Function(`return ${enCryptMethodJDString}`)();
                    console.log(`获取签名参数成功！`)
                    console.log(`fp: ${$.fingerprint}`)
                    console.log(`token: ${$.token}`)
                    console.log(`enCryptMethodJD: ${enCryptMethodJDString}`)
                  } else {
                    console.log(`fp: ${$.fingerprint}`)
                    console.log('request_algo 签名参数API请求失败:')
                  }
                } else {
                  console.log(`京东服务器返回空数据`)
                }
              }
            } catch (e) {
              $.logErr(e, resp)
            } finally {
              resolve();
            }
          })
        })
      }
      function decrypt(time, stk, type, url) {
        stk = stk || (url ? $.getUrlData(url, '_stk') : '')
        if (stk) {
          const timestamp = new Date(time).Format("yyyyMMddhhmmssSSS");
          let hash1 = '';
          if ($.fingerprint && $.token && $.enCryptMethodJD) {
            hash1 = $.enCryptMethodJD($.token, $.fingerprint.toString(), timestamp.toString(), $.appId.toString(), $.CryptoJS).toString($.CryptoJS.enc.Hex);
          } else {
            const random = '5gkjB6SpmC9s';
            $.token = `tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc`;
            $.fingerprint = 5287160221454703;
            const str = `${$.token}${$.fingerprint}${timestamp}${$.appId}${random}`;
            hash1 = $.CryptoJS.SHA512(str, $.token).toString($.CryptoJS.enc.Hex);
          }
          let st = '';
          stk.split(',').map((item, index) => {
            st += `${item}:${$.getUrlData(url, item)}${index === stk.split(',').length -1 ? '' : '&'}`;
          })
          const hash2 = $.CryptoJS.HmacSHA256(st, hash1.toString()).toString($.CryptoJS.enc.Hex);
          // console.log(`\nst:${st}`)
          // console.log(`h5st:${["".concat(timestamp.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.token), "".concat(hash2)].join(";")}\n`)
          return encodeURIComponent(["".concat(timestamp.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.token), "".concat(hash2)].join(";"))
        } else {
          return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d'
        }
      }