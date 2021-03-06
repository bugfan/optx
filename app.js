//app.js
App({
  onLaunch: function () {
   
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    //存储单次成绩
    var oneScore = wx.getStorageSync('oneScore') || []
    wx.setStorageSync('oneScore', oneScore)

    //存储排行榜成绩
    var allScore = wx.getStorageSync('allScore') || []
    wx.setStorageSync('allScore', allScore)


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    list: [],//待生成的题目序列 [{}]
    answerList:[],//答案序列 [字符串]
    detailIndex:0,  //解析详情页面
    currentItem:null,//当前题目 {}
    userInfo: null,
  }
})