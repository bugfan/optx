//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')  //按钮音效
const wordList = require('../../utils/word.js')  //题库
const config = require('../../utils/config.js')  //

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    showDetail:false,
    currentValue: 0,
    myQuesList: app.globalData.num,
    myQues: null,//我的答案
    current: 0,//当前题目编号
    timeHandle: null,//定时器
    action: 'normal',
  },



  onLoad: function (e) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    if (e.action && e.action == 'fast') {
      let self = this;
      this.setData({
        action: 'fast',
        timeHandle: setInterval(function () {
          if (self.data.current < (config.count -1)) {
            self.bindNext();
          } else {
            self.bindShowGrade();
          }
        }, 2000)
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value != 1){
      this.setData({
        showDetail:true,
      })
    }else{
      this.setData({
        showDetail: false,
      })
    }
  },
  // 下一题
  bindNext: function () {
    //按钮音效
    util.nextAudio.play();
    this.setData({
      showDetail:false,
    })
    this.setData({
      //移动下标
      current: this.data.current + 1,
    })
    console.log("当前编号:",this.data.current)
    if (this.data.current > config.count){
      this.data.current = 0
      this.getOpts()
    }
  },
  reStart: function () {
    //清空本次成绩
    wx.removeStorageSync('score');
    //清空本次题目序列
    app.globalData.num.length = 0;
    wx.redirectTo({
      url: '../begin/begin',
    })
  },
  // getOpts: function () {
  //   var len = wordList.word.length
  //   for (let i = 0; i < 20; i++) {
  //     app.globalData.num.push(wordList.word[Math.floor(Math.random() * len)])
  //   }
  //   console.log("题目:", app.globalData.num)
  // },
  getOpts: function () {
    wx.request({
      url: config.apiPrefix + '/api/sms?count=' + config.count + '&au=XNlcm5hbW',
      success: (res) => {
        if (res.data) {
          for (let i = 0; i < res.data.length; i++) {
            app.globalData.num.push(res.data[i])
          }
        }
      }
    })

  },
  //比较方式
  compare: function (x, y) {
    if (x < y) {
      return 1;
    } else if (x > y) {
      return -1;
    } else {
      return 0;
    }
  }
})
