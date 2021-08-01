const zxCommon = require('./zx_common.js');
let zxObject = new zxCommon.ZxObject('京喜财富岛提现');
const $ = zxObject.$;


const JD_API_HOST = "https://m.jingxi.com/";
$.showLog = $.getdata("cfd_showLog") ? $.getdata("cfd_showLog") === "true" : false;
$.notifyTime = $.getdata("cfd_notifyTime");
$.result = [];
let token, nowTimes;

$.appId = 10028;
!(async() => {
    if (!$.cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    $.requestAlgo();
    await $.dowork(async function() {
        console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
        if (!$.isLogin) {
            $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

            if ($.isNode()) {
                await $.notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
            }
            return
        }
        $.info = {}
        $.money = 0
        token = await $.getJxToken()
        await cfd();
    })

    if ($.allMessage) {
        if ($.isNode()) await $.notify.sendNotify(`${$.name}`, `${$.allMessage}`);
    }
})()
.catch((e) => $.logErr(e))
    .finally(() => $.done());

async function cfd() {
    try {
        nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000)
        if ((nowTimes.getHours() === 11 || nowTimes.getHours() === 23) && nowTimes.getMinutes() === 59) {
            let nowtime = new Date().Format("s.S")
            let starttime = $.isNode() ? (process.env.CFD_STARTTIME ? process.env.CFD_STARTTIME * 1 : 59.9) : ($.getdata('CFD_STARTTIME') ? $.getdata('CFD_STARTTIME') * 1 : 59.9);
            if (nowtime < 59) {
                let sleeptime = (starttime - nowtime) * 1000;
                console.log(`等待时间 ${sleeptime / 1000}\n`);
                await $.sleep(sleeptime)
            }
        }

        if ($.index % 2 !== 0) {
            console.log(`等待`)
            await $.wait(1000)
        }

        const beginInfo = await getUserInfo(false);
        if (beginInfo.Fund.ddwFundTargTm === 0) {
            console.log(`还未开通活动，请先开通\n`)
            return
        }

        console.log(`获取提现资格`)
        await cashOutQuali()
        console.log(`提现`)
        console.log(`提现金额：按库存轮询提现，0点场提1元以上，12点场提0.5元以上，12点后不做限制`)
        await userCashOutState()

        await showMsg()

    } catch (e) {
        $.logErr(e)
    }
}

// 提现
function cashOutQuali() {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/CashOutQuali`, `strPgUUNum=${token['farm_jstoken']}&strPgtimestamp=${token['timestamp']}&strPhoneID=${token['phoneid']}`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} CashOutQuali API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (data.iRet === 0) {
                        console.log(`获取提现资格成功\n`)
                    } else {
                        console.log(`获取提现资格失败：${data.sErrMsg}\n`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}
async function userCashOutState(type = true) {
    return new Promise(async(resolve) => {
        $.get(taskUrl(`user/UserCashOutState`), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} UserCashOutState API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    if (type) {
                        if (data.dwTodayIsCashOut !== 1) {
                            if (data.ddwUsrTodayGetRich >= data.ddwTodayTargetUnLockRich) {
                                nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000)
                                if (nowTimes.getHours() >= 0 && nowTimes.getHours() < 12) {
                                    data.UsrCurrCashList = data.UsrCurrCashList.filter((x) => x.ddwMoney / 100 >= 1)
                                } else if (nowTimes.getHours() === 12 && nowTimes.getMinutes() <= 10) {
                                    data.UsrCurrCashList = data.UsrCurrCashList.filter((x) => x.ddwMoney / 100 >= 0.5)
                                }
                                for (let key of Object.keys(data.UsrCurrCashList).reverse()) {
                                    let vo = data.UsrCurrCashList[key]
                                    if (vo.dwDefault === 1) {
                                        let cashOutRes = await cashOut(vo.ddwMoney, vo.ddwPaperMoney)
                                        if (cashOutRes.iRet === 0) {
                                            $.money = vo.ddwMoney / 100
                                            console.log(`提现成功获得：${$.money}元`)
                                            break
                                        } else {
                                            await userCashOutState()
                                        }
                                    } else {
                                        console.log(`${vo.ddwMoney / 100}元库存不足`)
                                    }
                                }
                            } else {
                                console.log(`不满足提现条件开始升级建筑`)
                                    //升级建筑
                                for (let key of Object.keys($.info.buildInfo.buildList)) {
                                    let vo = $.info.buildInfo.buildList[key]
                                    let body = `strBuildIndex=${vo.strBuildIndex}`
                                    let getBuildInfoRes = await getBuildInfo(body, vo)
                                    let buildNmae;
                                    switch (vo.strBuildIndex) {
                                        case 'food':
                                            buildNmae = '京喜美食城'
                                            break
                                        case 'sea':
                                            buildNmae = '京喜旅馆'
                                            break
                                        case 'shop':
                                            buildNmae = '京喜商店'
                                            break
                                        case 'fun':
                                            buildNmae = '京喜游乐场'
                                        default:
                                            break
                                    }
                                    console.log(`升级建筑`)
                                    console.log(`【${buildNmae}】当前等级：${vo.dwLvl} 升级获得财富：${getBuildInfoRes.ddwLvlRich}`)
                                    console.log(`【${buildNmae}】升级需要${getBuildInfoRes.ddwNextLvlCostCoin}金币，当前拥有${$.info.ddwCoinBalance}`)
                                    if (getBuildInfoRes.dwCanLvlUp > 0 && $.info.ddwCoinBalance >= getBuildInfoRes.ddwNextLvlCostCoin) {
                                        console.log(`【${buildNmae}】满足升级条件，开始升级`)
                                        const body = `ddwCostCoin=${getBuildInfoRes.ddwNextLvlCostCoin}&strBuildIndex=${getBuildInfoRes.strBuildIndex}`
                                        let buildLvlUpRes = await buildLvlUp(body)
                                        if (buildLvlUpRes.iRet === 0) {
                                            console.log(`【${buildNmae}】升级成功\n`)
                                            break
                                        } else {
                                            console.log(`【${buildNmae}】升级失败：${buildLvlUpRes.sErrMsg}\n`)
                                        }
                                    } else {
                                        console.log(`【${buildNmae}】不满足升级条件，跳过升级\n`)
                                    }
                                }
                                let userCashOutStateRes = await userCashOutState(false)
                                if (userCashOutStateRes.ddwUsrTodayGetRich >= userCashOutStateRes.ddwTodayTargetUnLockRich) {
                                    await userCashOutState()
                                } else {
                                    console.log(`今日还未赚够${userCashOutStateRes.ddwTodayTargetUnLockRich}财富，无法提现`)
                                }
                            }
                        } else {
                            console.log(`提现失败：今天已经提现过了~`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}

function cashOut(ddwMoney, ddwPaperMoney) {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/CashOut`, `ddwMoney=${ddwMoney}&ddwPaperMoney=${ddwPaperMoney}&strPgUUNum=${token['farm_jstoken']}&strPgtimestamp=${token['timestamp']}&strPhoneID=${token['phoneid']}`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} CashOut API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}

// 升级建筑
function getBuildInfo(body) {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/GetBuildInfo`, body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} GetBuildInfo API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}

function buildLvlUp(body) {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/BuildLvlUp`, body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} BuildLvlUp API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}

// 获取用户信息
function getUserInfo(showInvite = true) {
    return new Promise(async(resolve) => {
        $.get(taskUrl(`user/QueryUserInfo`, `strPgUUNum=${token['farm_jstoken']}&strPgtimestamp=${token['timestamp']}&strPhoneID=${token['phoneid']}`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} QueryUserInfo API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    const {
                        buildInfo = {},
                            ddwRichBalance,
                            ddwCoinBalance,
                            sErrMsg,
                            strMyShareId,
                            dwLandLvl,
                            Fund = {},
                            StoryInfo = {}
                    } = data;
                    if (showInvite) {
                        console.log(`\n获取用户信息：${sErrMsg}\n${$.showLog ? data : ""}`);
                        console.log(`\n当前等级:${dwLandLvl},金币:${ddwCoinBalance},财富值:${ddwRichBalance}\n`)
                    }
                    if (showInvite && strMyShareId) {
                        console.log(`财富岛好友互助码每次运行都变化,旧的可继续使用`);
                        console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${strMyShareId}\n\n`);
                        $.shareCodes.push(strMyShareId)
                    }
                    $.info = {
                        ...$.info,
                        buildInfo,
                        ddwRichBalance,
                        ddwCoinBalance,
                        strMyShareId,
                        dwLandLvl,
                        Fund,
                        StoryInfo
                    };
                    resolve({
                        buildInfo,
                        ddwRichBalance,
                        ddwCoinBalance,
                        strMyShareId,
                        Fund,
                        StoryInfo
                    });
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function taskUrl(function_path, body = '') {
    let url = `${JD_API_HOST}jxbfd/${function_path}?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=${Date.now()}&ptag=138631.26.55&${body}&_stk=_cfd_t%2CbizCode%2CddwTaskId%2CdwEnv%2Cptag%2Csource%2CstrShareId%2CstrZone&_ste=1`;
    url += `&h5st=${decrypt(Date.now(), '', '', url)}&_=${Date.now() + 2}&sceneval=2&g_login_type=1&g_ty=ls`;
    return {
        url,
        headers: {
            Cookie: $.cookie,
            Accept: "*/*",
            Connection: "keep-alive",
            Referer: "https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
            "Accept-Encoding": "gzip, deflate, br",
            Host: "m.jingxi.com",
            "User-Agent": `jdpingou;iPhone;3.15.2;14.2.1;ea00763447803eb0f32045dcba629c248ea53bb3;network/wifi;model/iPhone13,2;appBuild/100365;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
            "Accept-Language": "zh-cn",
        },
        timeout: 10000
    };
}

function showMsg() {
    return new Promise(resolve => {
        $.message += `提现成功：获得${$.money}元`
        if ($.money > 0) {
            $.allMessage += `【京东账号${$.index}】${$.nickName || $.UserName}\n${$.message}${$.index !== $.cookiesArr.length ? '\n\n' : '\n\n'}`;
        }
        $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n${$.message}`);
        resolve()
    })
}