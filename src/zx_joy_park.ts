import $ from './zx_ts_common';
import { axios, format, USER_AGENT } from './zx_ts_common';

let res: any = '';
let joyId: Array<number> = [], workJoyInfoList: any = [];
let joyId1: number;


$.init("汪汪乐园", 'joypark', -1);

!(async () => {

  //await requireConfig();
  $.dowork(async function () {
    console.log(`\n开始【京东账号${$.index}】${$.nickName || $.userName}\n`);
    let taskVos: any = await api('apTaskList', { "linkId": "LsQNxL7iWDlXUs6cFl-AAg" });
    let tasks: any = taskVos.data
    for (let t of tasks) {
      if (t.taskTitle === '汪汪乐园签到') {
        if (t.taskDoTimes === 0) {
          res = await api('apDoTask', { "taskType": t.taskType, "taskId": t.id, "linkId": "LsQNxL7iWDlXUs6cFl-AAg" })
          console.log('签到:', res)
          await $.sleep(1000)
          await api('apTaskDrawAward', { "taskType": t.taskType, "taskId": t.id, "linkId": "LsQNxL7iWDlXUs6cFl-AAg" })
        }
      } else if (t.taskTitle === '汪汪乐园浏览会场' || t.taskTitle === '汪汪乐园浏览商品') {
        let arr: Array<string> = ['汪汪乐园浏览会场', '汪汪乐园浏览商品']
        for (let name of arr) {
          if (t.taskDoTimes + 1 === t.taskLimitTimes || t.taskDoTimes === t.taskLimitTimes) continue
          let times: number = name === '汪汪乐园浏览会场' ? 5 : 10;
          res = await api('apTaskDetail', { "taskType": t.taskType, "taskId": t.id, "channel": 4, "linkId": "LsQNxL7iWDlXUs6cFl-AAg" })
          let apTaskDetail: any, taskResult: any, awardRes: any;

          console.log(res.data)

          for (let i = 0; i < times; i++) {
            try {
              apTaskDetail = res.data.taskItemList[i]
            } catch (e) {
              break
            }
            console.log('apTaskDetail:', apTaskDetail)
            taskResult = await api('apDoTask', { "taskType": t.taskType, "taskId": t.id, "channel": 4, "linkId": "LsQNxL7iWDlXUs6cFl-AAg", "itemId": encodeURIComponent(apTaskDetail.itemId) })
            console.log('doTask: ', JSON.stringify(taskResult))
            if (taskResult.errMsg === '任务已完成') break
            console.log('等待中...')
            await $.sleep(10000)
            awardRes = await api('apTaskDrawAward', { "taskType": t.taskType, "taskId": t.id, "linkId": "LsQNxL7iWDlXUs6cFl-AAg" })
            if (awardRes.success && awardRes.code === 0)
              console.log(awardRes.data[0].awardGivenNumber)
            else
              console.log('领取奖励出错:', JSON.stringify(awardRes))
            await $.sleep(1000)
          }
        }
      }
    }
  });
})()

function api(fn: string, body: Object): Object {
  return new Promise(async resolve => {
    let { data } = await axios.post("https://api.m.jd.com/",
      `functionId=${fn}&body=${JSON.stringify(body)}&_t=${Date.now()}&appid=activities_platform`
      , {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': USER_AGENT,
          'Host': 'api.m.jd.com',
          'Referer': 'https://joypark.jd.com/',
          'Origin': 'https://joypark.jd.com',
          'Cookie': $.cookie
        }
      })
    resolve(data);
  })
}

function joyList() {
  return new Promise(async resolve => {
    let { data } = await axios.get(`https://api.m.jd.com/?functionId=joyList&body={%22linkId%22:%22LsQNxL7iWDlXUs6cFl-AAg%22}&_t=${Date.now()}&appid=activities_platform`, {
      headers: {
        'host': 'api.m.jd.com',
        'User-agent': USER_AGENT,
        'Cookie': $.cookie,
        'origin': 'https://joypark.jd.com',
        'referer': 'https://joypark.jd.com'
      }
    })
    resolve(data)
  })
}