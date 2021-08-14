const Md5 = require('./utils/md5');

const consts = require('./zx_consts.js');

function ZxObject(v, jsname) {
    //const printDetail = false  //是否显示出参详情
    let $ = new Env(v);
    ZxObject.prototype.$ = $;
    const jdCookieNode = $.isNode() ? require('./jdCookie') : '';
    const notify = $.isNode() ? require('./sendNotify') : '';
    const shareCodes = require('./zx_shareCodes');
    $.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;

    //if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};

    let cookiesArr = [];
    if ($.isNode()) {
        Object.keys(jdCookieNode).forEach((item) => {
            cookiesArr.push(jdCookieNode[item])
        })
    } else {
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
        } else {
            $.shareCodesArr.push($.shareCode);
        }
    }

    $.dowork = async(fn) => {
        for (let i = 0; i < $.cookiesArr.length; i++) {
            if ($.cookiesArr[i]) {
                $.replaceCookie($.cookiesArr[i]);
                $.index = i + 1;
                if (typeof fn === "function") {
                    await fn();
                } else {
                    console.log(fn)
                }
            }
        }
    }

    $.replaceCookie = async function(cookie) {
        $.cookie = cookie;
        $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.isLogin = true;
        $.nickName = '';
        //await TotalBean();
    }
    $.sleep = async function(timeout) {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    }
    $.timeFormat = function(time) {
        let date;
        if (time) {
            date = new Date(time)
        } else {
            date = new Date();
        }
        return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
    }

    $.randomString = function(e) {
        e = e || 32;
        let t = "abcdefhijkmnprstwxyz2345678",
            a = t.length,
            n = "";
        for (i = 0; i < e; i++)
            n += t.charAt(Math.floor(Math.random() * a));
        return n
    }

    $.getRandomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $.safeGet = function(data) {
        try {
            if (typeof JSON.parse(data) == "object") {
                return true;
            }
        } catch (e) {
            console.log(e);
            console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
            return false;
        }
    }

    $.jsonParse = function(str) {
        if (typeof str == "string") {
            try {
                return JSON.parse(str);
            } catch (e) {
                console.log(e);
                $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
                return [];
            }
        }
    }

    /**
     * 获取url参数值
     * @param url
     * @param name
     * @returns {string}
     */
    $.getUrlData = function(url, name) {
            if (typeof URL !== "undefined") {
                let urls = new URL(url);
                let data = urls.searchParams.get(name);
                return data ? data : '';
            } else {
                const query = url.match(/\?.*/)[0].substring(1)
                const vars = query.split('&')
                for (let i = 0; i < vars.length; i++) {
                    const pair = vars[i].split('=')
                    if (pair[0] === name) {
                        // return pair[1];
                        return vars[i].substr(vars[i].indexOf('=') + 1);
                    }
                }
                return ''
            }
        }
        /**
         * 模拟生成 fingerprint
         * @returns {string}
         */
    $.generateFp = function() {
        let e = "0123456789";
        let a = 13;
        let i = '';
        for (; a--;)
            i += e[Math.random() * e.length | 0];
        return (i + Date.now()).slice(0, 16)
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
                    "cookie": $.cookie,
                    "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                    "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
                }
            }
            $.get(options, (err, resp, data) => {
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

    $.getJxToken = async() => {
        function generateStr(input) {
            let src = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let res = '';
            for (let i = 0; i < input; i++) {
                res += src[Math.floor(src.length * Math.random())];
            }
            return res;
        }

        let phoneId = generateStr(40);
        let timestamp = Date.now().toString();
        let jstoken = Md5('' + decodeURIComponent($.nickname) + timestamp + phoneId + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy');
        return {
            'strPgtimestamp': timestamp,
            'strPhoneID': phoneId,
            'strPgUUNum': jstoken
        }
    }

    $.requestAlgo = async function() {
        $.fingerprint = await generateFp();
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

    decrypt = function(time, stk, type, url) {
            stk = stk || (url ? getUrlData(url, '_stk') : '')
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
                    st += `${item}:${getUrlData(url, item)}${index === stk.split(',').length - 1 ? '' : '&'}`;
                })
                const hash2 = $.CryptoJS.HmacSHA256(st, hash1.toString()).toString($.CryptoJS.enc.Hex);
                // console.log(`\nst:${st}`)
                // console.log(`h5st:${["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat($.appId.toString()), "".concat(token), "".concat(hash2)].join(";")}\n`)
                return encodeURIComponent(["".concat(timestamp.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.token), "".concat(hash2)].join(";"))
            } else {
                return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d'
            }
        }
        /**
         * 获取url参数值
         * @param url
         * @param name
         * @returns {string}
         */
    getUrlData = function(url, name) {
            if (typeof URL !== "undefined") {
                let urls = new URL(url);
                let data = urls.searchParams.get(name);
                return data ? data : '';
            } else {
                const query = url.match(/\?.*/)[0].substring(1)
                const vars = query.split('&')
                for (let i = 0; i < vars.length; i++) {
                    const pair = vars[i].split('=')
                    if (pair[0] === name) {
                        // return pair[1];
                        return vars[i].substr(vars[i].indexOf('=') + 1);
                    }
                }
                return ''
            }
        }
        /**
         * 模拟生成 fingerprint
         * @returns {string}
         */
    generateFp = function() {
        let e = "0123456789";
        let a = 13;
        let i = '';
        for (; a--;)
            i += e[Math.random() * e.length | 0];
        return (i + Date.now()).slice(0, 16)
    }

    //获取昵称（直接用，勿删）
    $.queryJdUserInfo = async function(timeout = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let url = {
                    url: `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
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
                }
                $.get(url, (err, resp, data) => {
                    try {
                        if ($.printDetail) console.log(data)
                        data = JSON.parse(data);
                        if (data.retcode === 13) {
                            return
                        }
                        if (data.base)
                            $.nickName = data.base.nickname;
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            }, timeout)
        })
    }
}

module.exports = {
    ZxObject
}

/*
修改时间戳转换函数，京喜工厂原版修改
 */
Date.prototype.Format = function(fmt) {
    var e,
        n = this,
        d = fmt,
        l = {
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

// 来自 @chavyleung 大佬
// https://raw.githubusercontent.com/chavyleung/scripts/master/Env.js
function Env(name, opts) {
    class Http {
        constructor(env) {
            this.env = env
        }

        send(opts, method = 'GET') {
            opts = typeof opts === 'string' ? {
                url: opts
            } : opts
            let sender = this.get
            if (method === 'POST') {
                sender = this.post
            }
            return new Promise((resolve, reject) => {
                sender.call(this, opts, (err, resp, body) => {
                    if (err) reject(err)
                    else resolve(resp)
                })
            })
        }

        get(opts) {
            return this.send.call(this.env, opts)
        }

        post(opts) {
            return this.send.call(this.env, opts, 'POST')
        }
    }

    return new(class {
        constructor(name, opts) {
            this.name = name
            this.http = new Http(this)
            this.data = null
            this.dataFile = 'box.dat'
            this.logs = []
            this.isMute = false
            this.isNeedRewrite = false
            this.logSeparator = '\n'
            this.startTime = new Date().getTime()
            Object.assign(this, opts)
            this.log('', `🔔${this.name}, 开始!`)
        }

        isNode() {
            return 'undefined' !== typeof module && !!module.exports
        }

        isQuanX() {
            return 'undefined' !== typeof $task
        }

        isSurge() {
            return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
        }

        isLoon() {
            return 'undefined' !== typeof $loon
        }

        toObj(str, defaultValue = null) {
            try {
                return JSON.parse(str)
            } catch {
                return defaultValue
            }
        }

        toStr(obj, defaultValue = null) {
            try {
                return JSON.stringify(obj)
            } catch {
                return defaultValue
            }
        }

        getjson(key, defaultValue) {
            let json = defaultValue
            const val = this.getdata(key)
            if (val) {
                try {
                    json = JSON.parse(this.getdata(key))
                } catch {}
            }
            return json
        }

        setjson(val, key) {
            try {
                return this.setdata(JSON.stringify(val), key)
            } catch {
                return false
            }
        }

        getScript(url) {
            return new Promise((resolve) => {
                this.get({
                    url
                }, (err, resp, body) => resolve(body))
            })
        }

        runScript(script, runOpts) {
            return new Promise((resolve) => {
                let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
                httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
                let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
                httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
                httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
                const [key, addr] = httpapi.split('@')
                const opts = {
                    url: `http://${addr}/v1/scripting/evaluate`,
                    body: {
                        script_text: script,
                        mock_type: 'cron',
                        timeout: httpapi_timeout
                    },
                    headers: {
                        'X-Key': key,
                        'Accept': '*/*'
                    }
                }
                this.post(opts, (err, resp, body) => resolve(body))
            }).catch((e) => this.logErr(e))
        }

        loaddata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                if (isCurDirDataFile || isRootDirDataFile) {
                    const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
                    try {
                        return JSON.parse(this.fs.readFileSync(datPath))
                    } catch (e) {
                        return {}
                    }
                } else return {}
            } else return {}
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                const jsondata = JSON.stringify(this.data)
                if (isCurDirDataFile) {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                } else if (isRootDirDataFile) {
                    this.fs.writeFileSync(rootDirDataFilePath, jsondata)
                } else {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                }
            }
        }

        lodash_get(source, path, defaultValue = undefined) {
            const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
            let result = source
            for (const p of paths) {
                result = Object(result)[p]
                if (result === undefined) {
                    return defaultValue
                }
            }
            return result
        }

        lodash_set(obj, path, value) {
            if (Object(obj) !== obj) return obj
            if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
            path
                .slice(0, -1)
                .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
                    path[path.length - 1]
                ] = value
            return obj
        }

        getdata(key) {
            let val = this.getval(key)
                // 如果以 @
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
                const objval = objkey ? this.getval(objkey) : ''
                if (objval) {
                    try {
                        const objedval = JSON.parse(objval)
                        val = objedval ? this.lodash_get(objedval, paths, '') : val
                    } catch (e) {
                        val = ''
                    }
                }
            }
            return val
        }

        setdata(val, key) {
            let issuc = false
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
                const objdat = this.getval(objkey)
                const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
                try {
                    const objedval = JSON.parse(objval)
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                } catch (e) {
                    const objedval = {}
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                }
            } else {
                issuc = this.setval(val, key)
            }
            return issuc
        }

        getval(key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.read(key)
            } else if (this.isQuanX()) {
                return $prefs.valueForKey(key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                return this.data[key]
            } else {
                return (this.data && this.data[key]) || null
            }
        }

        setval(val, key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.write(val, key)
            } else if (this.isQuanX()) {
                return $prefs.setValueForKey(val, key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                this.data[key] = val
                this.writedata()
                return true
            } else {
                return (this.data && this.data[key]) || null
            }
        }

        initGotEnv(opts) {
            this.got = this.got ? this.got : require('got')
            this.cktough = this.cktough ? this.cktough : require('tough-cookie')
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
            if (opts) {
                opts.headers = opts.headers ? opts.headers : {}
                if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
                    opts.cookieJar = this.ckjar
                }
            }
        }

        get(opts, callback = () => {}) {
            if (opts.headers) {
                delete opts.headers['Content-Type']
                delete opts.headers['Content-Length']
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient.get(opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {
                        hints: false
                    })
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                this.got(opts)
                    .on('redirect', (resp, nextOpts) => {
                        try {
                            if (resp.headers['set-cookie']) {
                                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                                if (ck) {
                                    this.ckjar.setCookieSync(ck, null)
                                }
                                nextOpts.cookieJar = this.ckjar
                            }
                        } catch (e) {
                            this.logErr(e)
                        }
                        // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
                    })
                    .then(
                        (resp) => {
                            const {
                                statusCode: status,
                                statusCode,
                                headers,
                                body
                            } = resp
                            callback(null, {
                                status,
                                statusCode,
                                headers,
                                body
                            }, body)
                        },
                        (err) => {
                            const {
                                message: error,
                                response: resp
                            } = err
                            callback(error, resp, resp && resp.body)
                        }
                    )
            }
        }

        post(opts, callback = () => {}) {
                // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
                if (opts.body && opts.headers && !opts.headers['Content-Type']) {
                    opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
                }
                if (opts.headers) delete opts.headers['Content-Length']
                if (this.isSurge() || this.isLoon()) {
                    if (this.isSurge() && this.isNeedRewrite) {
                        opts.headers = opts.headers || {}
                        Object.assign(opts.headers, {
                            'X-Surge-Skip-Scripting': false
                        })
                    }
                    $httpClient.post(opts, (err, resp, body) => {
                        if (!err && resp) {
                            resp.body = body
                            resp.statusCode = resp.status
                        }
                        callback(err, resp, body)
                    })
                } else if (this.isQuanX()) {
                    opts.method = 'POST'
                    if (this.isNeedRewrite) {
                        opts.opts = opts.opts || {}
                        Object.assign(opts.opts, {
                            hints: false
                        })
                    }
                    $task.fetch(opts).then(
                        (resp) => {
                            const {
                                statusCode: status,
                                statusCode,
                                headers,
                                body
                            } = resp
                            callback(null, {
                                status,
                                statusCode,
                                headers,
                                body
                            }, body)
                        },
                        (err) => callback(err)
                    )
                } else if (this.isNode()) {
                    this.initGotEnv(opts)
                    const {
                        url,
                        ..._opts
                    } = opts
                    this.got.post(url, _opts).then(
                        (resp) => {
                            const {
                                statusCode: status,
                                statusCode,
                                headers,
                                body
                            } = resp
                            callback(null, {
                                status,
                                statusCode,
                                headers,
                                body
                            }, body)
                        },
                        (err) => {
                            const {
                                message: error,
                                response: resp
                            } = err
                            callback(error, resp, resp && resp.body)
                        }
                    )
                }
            }
            /**
             *
             * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
             *    :$.time('yyyyMMddHHmmssS')
             *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
             *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
             * @param {*} fmt 格式化参数
             *
             */
        time(fmt) {
            let o = {
                'M+': new Date().getMonth() + 1,
                'd+': new Date().getDate(),
                'H+': new Date().getHours(),
                'm+': new Date().getMinutes(),
                's+': new Date().getSeconds(),
                'q+': Math.floor((new Date().getMonth() + 3) / 3),
                'S': new Date().getMilliseconds()
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length))
            for (let k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            return fmt
        }

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
        msg(title = name, subt = '', desc = '', opts) {
            const toEnvOpts = (rawopts) => {
                if (!rawopts) return rawopts
                if (typeof rawopts === 'string') {
                    if (this.isLoon()) return rawopts
                    else if (this.isQuanX()) return {
                        'open-url': rawopts
                    }
                    else if (this.isSurge()) return {
                        url: rawopts
                    }
                    else return undefined
                } else if (typeof rawopts === 'object') {
                    if (this.isLoon()) {
                        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
                        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
                        return {
                            openUrl,
                            mediaUrl
                        }
                    } else if (this.isQuanX()) {
                        let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
                        let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
                        return {
                            'open-url': openUrl,
                            'media-url': mediaUrl
                        }
                    } else if (this.isSurge()) {
                        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
                        return {
                            url: openUrl
                        }
                    }
                } else {
                    return undefined
                }
            }
            if (!this.isMute) {
                if (this.isSurge() || this.isLoon()) {
                    $notification.post(title, subt, desc, toEnvOpts(opts))
                } else if (this.isQuanX()) {
                    $notify(title, subt, desc, toEnvOpts(opts))
                }
            }
            if (!this.isMuteLog) {
                let logs = ['', '==============📣系统通知📣==============']
                logs.push(title)
                subt ? logs.push(subt) : ''
                desc ? logs.push(desc) : ''
                console.log(logs.join('\n'))
                this.logs = this.logs.concat(logs)
            }
        }

        log(...logs) {
            if (logs.length > 0) {
                this.logs = [...this.logs, ...logs]
            }
            console.log(logs.join(this.logSeparator))
        }

        logErr(err, msg) {
            const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            if (!isPrintSack) {
                this.log('', `❗️${this.name}, 错误!`, err)
            } else {
                this.log('', `❗️${this.name}, 错误!`, err.stack)
            }
        }

        wait(time) {
            return new Promise((resolve) => setTimeout(resolve, time))
        }

        done(val = {}) {
            const endTime = new Date().getTime()
            const costTime = (endTime - this.startTime) / 1000
            this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
            this.log()
            if (this.isSurge() || this.isQuanX() || this.isLoon()) {
                $done(val)
            }
        }
    })(name, opts)
}