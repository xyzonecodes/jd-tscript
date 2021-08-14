import  $ from './zx_ts_common';
import {axios,format} from './zx_ts_common';

let res: any = '';

interface Params {
  ddwMoney?: number,
  ddwPaperMoney?: number,
  strPgtimestamp?: string,
  strPgUUNum?: string,
  strPhoneID?: string,
  strBuildIndex?: string,
  ddwCostCoin?: number,
}

$.init("财富岛提现",'jxcfdtx',10028);

!(async () => {
  await $.requestAlgo();

  $.dowork(async function(){
    console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.userName}*********\n`);
    if (!$.isLogin) {
        console.log($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.userName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        await $.notify.sendNotify(`${$.name}cookie已失效 - ${$.userName}`, `京东账号${$.index} ${$.userName}\n请重新登录获取cookie`);
   
        return
    }

    

      // 只在00:00:xx和12:00:xx升级建筑
    if ((new Date().getHours() === 0 || new Date().getHours() === 12) && new Date().getMinutes() === 0) {
        for (let b of ['food', 'fun', 'shop', 'sea']) {
          res = await api('user/GetBuildInfo', '_cfd_t,bizCode,dwEnv,dwType,ptag,source,strBuildIndex,strZone', {strBuildIndex: b})
          if (res.dwCanLvlUp === 1) {
            res = await api('user/BuildLvlUp', '_cfd_t,bizCode,ddwCostCoin,dwEnv,ptag,source,strBuildIndex,strZone', {ddwCostCoin: res.ddwNextLvlCostCoin, strBuildIndex: b})
            if (res.iRet === 0) {
              console.log(`${b}升级成功`)
              break
            }
          }
        }
      }
  
      // 提现
      console.log('解锁：', format(new Date(), 'hh:mm:ss:SSS'))
      let token: any = await $.getJxToken()
      res = await api('user/CashOutQuali',
        '_cfd_t,bizCode,dwEnv,ptag,source,strPgUUNum,strPgtimestamp,strPhoneID,strZone',
        {strPgUUNum: token.strPgUUNum, strPgtimestamp: token.strPgtimestamp, strPhoneID: token.strPhoneID})
      console.log('资格:', res)
      if (res.iRet === 2036)
        return 
      await $.sleep(4000)
      console.log('提现：', format(new Date(), 'hh:mm:ss:SSS'))
      let money: number, h: number = new Date().getHours()
      if (h === 0)
        money = 100
      else if (h === 12)
        money = 50
      else
        money = 10
      money = process.env.CFD_CASHOUT_MONEY ? parseFloat(process.env.CFD_CASHOUT_MONEY) * 100 : money
      console.log('本次计划提现：', money / 100)
  
      res = await api('user/CashOut', '_cfd_t,bizCode,ddwMoney,ddwPaperMoney,dwEnv,ptag,source,strPgUUNum,strPgtimestamp,strPhoneID,strZone',
        {ddwMoney: money, ddwPaperMoney: money * 10, strPgUUNum: token.strPgUUNum, strPgtimestamp: token.strPgtimestamp, strPhoneID: token.strPhoneID})
      console.log('提现:', res)
  })
})()

function api(fn: string, stk: string, params: Params = {}) {
  return new Promise(async resolve => {
    let url = `https://m.jingxi.com/jxbfd/${fn}?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=${Date.now()}&ptag=138631.26.55&_ste=1&_=${Date.now()}&sceneval=2&_stk=${encodeURIComponent(stk)}`
    if (['GetUserTaskStatusList', 'Award', 'DoTask'].includes(fn)) {
      console.log('api2')
      url = `https://m.jingxi.com/newtasksys/newtasksys_front/${fn}?strZone=jxbfd&bizCode=jxbfddch&source=jxbfd&dwEnv=7&_cfd_t=${Date.now()}&ptag=138631.26.55&_stk=${encodeURIComponent(stk)}&_ste=1&_=${Date.now()}&sceneval=2`
    }
    if (Object.keys(params).length !== 0) {
      let key: (keyof Params)
      for (key in params) {
        if (params.hasOwnProperty(key))
          url += `&${key}=${params[key]}`
      }
    }
    url += '&h5st=' + $.decrypt(stk, url)
    let {data} = await axios.get(url, {
      headers: {
        Cookie: $.cookie,
        Referer: "https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
        Host: "m.jingxi.com",
        "User-Agent": `jdpingou`,
      }
    })
    resolve(data)
  })
}
