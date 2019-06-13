//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')  //按钮音效
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    currentValue: 0,
    myQuesList: app.globalData.num,
    myQues: null,//我的答案
    current: 0,//当前题目编号
    timeHandle: null,//定时器
    action: 'normal'
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
          if (self.data.current < 4) {
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


    var items = app.globalData.num;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value

    }
    //判断题目对错
    this.setData({
      items: items,
      currentValue: e.detail.value
    });
  },
  // 下一题
  bindNext: function () {
    //按钮音效
    util.nextAudio.play();
    this.setData({
      //移动下标
      current: this.data.current + 1,
      
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
