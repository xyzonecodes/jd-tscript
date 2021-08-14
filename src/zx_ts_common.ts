import { format } from 'date-fns';
import axios from 'axios';
import { Md5 } from 'ts-md5'
import USER_AGENT from './zx_USER_AGENTS';
import * as dotenv from 'dotenv';

const CryptoJS = require('crypto-js')
const jdCookieNode = require('./jdCookie');
const notify = require('./sendNotify');
const shareCodes = require('./zx_shareCodes');

let fingerprint: string | number, token: string = '', enCryptMethodJD: any;

dotenv.config()

class ZxObject {
  jsname = '';
  name = '';
  appId = 0;
  cookiesArr: string[] = []; //配置文件中的cookie列表
  cookie = ''; //当前执行的cookie
  printDetail = false; //打印详细
  helpAuthor = true;
  notify = notify;
  message = '';
  allMessage = '';
  isLogin = true;
  userName = '';
  nickName = '';
  shareCode = '';
  index = 0;
  //助力码  
  shareCodesArr: string[] = []; //当前配置的助力码列表
  init(myname: string, jsname: string, appid: number) {
    this.name = myname;
    this.jsname = jsname;
    this.appId = appid;
    this.cookiesArr = [];
    this.shareCode = '';
    this.formatShareCode();
    this.requireConfig();
  }

  dowork = async (fn: Function) => {
    for (let i = 0; i < this.cookiesArr.length; i++) {
      if (this.cookiesArr[i]) {
        this.replaceCookie(this.cookiesArr[i]);
        this.index = i + 1;
        if (typeof fn === "function") {
          await fn();
        } else {
          console.log(fn)
        }
      }
    }
  }

  //处理sharecode
  formatShareCode = async () => {
    //助力码待处理
    if (this.jsname && shareCodes.shareCodes && shareCodes.shareCodes.hasOwnProperty(this.jsname)) {
      this.shareCode = shareCodes.shareCodes[this.jsname];
    }
    if (this.shareCode && this.shareCode.length > 0) {
      if (this.shareCode[0].indexOf('@') > -1) {
        this.shareCodesArr = this.shareCode[0].split('@');
      } else {
        this.shareCodesArr.push(this.shareCode);
      }
    }
  }

  replaceCookie = async (cookie: string) => {
    this.cookie = cookie;
    this.userName = decodeURIComponent((this.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && this.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]) || '')
    this.isLogin = true;
    this.nickName = '';
    await this.TotalBean();
  }
  getJxToken = async () => {
    function generateStr(input: number) {
      let src = 'abcdefghijklmnopqrstuvwxyz1234567890';
      let res = '';
      for (let i = 0; i < input; i++) {
        res += src[Math.floor(src.length * Math.random())];
      }
      return res;
    }

    let phoneId = generateStr(40);
    let timestamp = Date.now().toString();
    let nickname = this.cookie.match(/pt_pin=([^;]*)/)![1];
    let jstoken = Md5.hashStr('' + decodeURIComponent(nickname) + timestamp + phoneId + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy');
    return {
      'strPgtimestamp': timestamp,
      'strPhoneID': phoneId,
      'strPgUUNum': jstoken
    }
  }
  requestAlgo() {
    fingerprint = this.generateFp();
    return new Promise<void>(async resolve => {
      let { data } = await axios.post('https://cactus.jd.com/request_algo?g_ty=ajax', {
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
          'User-Agent': USER_AGENT,
          'Content-Type': 'application/json',
          'Origin': 'https://st.jingxi.com',
          'Sec-Fetch-Site': 'cross-site',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Referer': 'https://st.jingxi.com/',
          'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'
        },
      })
      if (data['status'] === 200) {
        token = data.data.result.tk;
        console.log('token:', token)
        let enCryptMethodJDString = data.data.result.algo;
        if (enCryptMethodJDString) enCryptMethodJD = new Function(`return ${enCryptMethodJDString}`)();
      } else {
        console.log(`fp: ${fingerprint}`)
        console.log('request_algo 签名参数API请求失败:')
      }
      resolve()
    })
  }

  decrypt(stk: string, url: string) {
    const timestamp = (format(new Date(), 'yyyyMMddhhmmssSSS'))
    let hash1: string;
    if (fingerprint && token && enCryptMethodJD) {
      hash1 = enCryptMethodJD(token, fingerprint.toString(), timestamp.toString(), this.appId.toString(), CryptoJS).toString(CryptoJS.enc.Hex);
    } else {
      const random = '5gkjB6SpmC9s';
      token = `tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc`;
      fingerprint = 9686767825751161;
      const str = `${token}${fingerprint}${timestamp}${this.appId}${random}`;
      hash1 = CryptoJS.SHA512(str, token).toString(CryptoJS.enc.Hex);
    }
    let st: string = '';
    stk.split(',').map((item, index) => {
      st += `${item}:${this.getQueryString(url, item)}${index === stk.split(',').length - 1 ? '' : '&'}`;
    })
    const hash2 = CryptoJS.HmacSHA256(st, hash1.toString()).toString(CryptoJS.enc.Hex);
    return encodeURIComponent(["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat(this.appId.toString()), "".concat(token), "".concat(hash2)].join(";"))
  }

  getQueryString(url: string, name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = url.split('?')[1].match(reg);
    if (r != null) return unescape(r[2]);
    return '';
  }

  generateFp() {
    let e = "0123456789";
    let a = 13;
    let i = '';
    for (; a--;)
      i += e[Math.random() * e.length | 0];
    return (i + Date.now()).slice(0, 16)
  }


  getBeanShareCode = async (cookie: string) {
    let { data } = await axios.post('https://api.m.jd.com/client.action',
      `functionId=plantBeanIndex&body=${escape(
        JSON.stringify({ version: "9.0.0.1", "monitor_source": "plant_app_plant_index", "monitor_refer": "" })
      )}&appid=ld&client=apple&area=5_274_49707_49973&build=167283&clientVersion=9.1.0`, {
      headers: {
        Cookie: this.cookie,
        Host: "api.m.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        "User-Agent": USER_AGENT
      }
    })
    if (data.data?.jwordShareInfo?.shareUrl)
      return data.data.jwordShareInfo.shareUrl.split('Uuid=')![1]
    else
      return ''
  }

  getFarmShareCode = async (cookie: string) {
    let { data } = await axios.post('https://api.m.jd.com/client.action?functionId=initForFarm', `body=${escape(JSON.stringify({ "version": 4 }))}&appid=wh5&clientVersion=9.1.0`, {
      headers: {
        "cookie": this.cookie,
        "origin": "https://home.m.jd.com",
        "referer": "https://home.m.jd.com/myJd/newhome.action",
        "User-Agent": USER_AGENT,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    if (data.farmUserPro)
      return data.farmUserPro.shareCode
    else
      return ''
  }

  TotalBean = async () => {
    let totalBean = {
      isLogin: true,
      nickName: ''
    }
    return new Promise(resolve => {
      axios.get('https://me-api.jd.com/user_new/info/GetJDUserInfoUnion', {
        headers: {
          Host: "me-api.jd.com",
          Connection: "keep-alive",
          Cookie: this.cookie,
          "User-Agent": USER_AGENT,
          "Accept-Language": "zh-cn",
          "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
          "Accept-Encoding": "gzip, deflate, br"
        }
      }).then(res => {
        if (res.data) {
          let data = res.data
          if (data['retcode'] === "1001") {
            totalBean.isLogin = false; //cookie过期
          }
          if (data['retcode'] === "0" && data['data'] && data.data.hasOwnProperty("userInfo")) {
            totalBean.isLogin = true
            totalBean.nickName = data.data.userInfo.baseInfo.nickname;
          }
          resolve(totalBean)
        } else {
          console.log('京东服务器返回空数据');
          resolve(totalBean)
        }
      }).catch(e => {
        console.log('Error:', e)
        resolve(totalBean)
      })
    })
  }

  requireConfig() {
    return new Promise(resolve => {
      console.log('开始获取配置文件\n')
      const jdCookieNode = require('./jdCookie.js');
      Object.keys(jdCookieNode).forEach((item) => {
        if (jdCookieNode[item]) {
          this.cookiesArr.push(jdCookieNode[item])
        }
      })
      console.log(`共${this.cookiesArr.length}个京东账号\n`)
      resolve(this.cookiesArr)
    })
  }

  sleep(t: number) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, t)
    })
  }

  get(opts: any, callback = (err: any, resp: any, data: any) => { }) {
    // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
    if (opts.body && opts.headers && !opts.headers['Content-Type']) {
      opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return new Promise(async resolve => {
      let { data } = await axios.get(opts.url, opts.headers)
      const {
        statusCode: status,
        statusCode,
        headers,
        body
      } = data
      callback(null, {
        status,
        statusCode,
        headers,
        body
      }, body)
      resolve(data)
    })
  }
  async post(opts: any, callback = (err: any, resp: any, data: any) => { }) {
    // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
    if (opts.body && opts.headers && !opts.headers['Content-Type']) {
      opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return new Promise(async resolve => {
      let { data } = await axios.post(opts.url, opts.data, opts.headers)
      const {
        statusCode: status,
        statusCode,
        headers,
        body
      } = data
      callback(null, {
        status,
        statusCode,
        headers,
        body
      }, body)
      resolve(data)
    })
  }

  msg(title = '', subt = '', desc = '') {
    let logs = ['', '==============📣系统通知📣==============']
    logs.push(title)
    subt ? logs.push(subt) : ''
    desc ? logs.push(desc) : ''
    this.log(logs);
  }

  log(logs: string[]) {
    console.log(logs.join('\n'))
  }

}

let $ = new ZxObject();
export default $;
export {
  axios,
  format,
  USER_AGENT
}

