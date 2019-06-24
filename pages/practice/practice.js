//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/config.js')  //

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    list: app.globalData.list,
    currentIndex: 0,//当前题目编号
    limit:config.limit,
    parse: false,
    currentResult:false,
    selectedIndex:null,
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
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //存入我的答案
  tap: function (e) {
    this.setData({
      currentResult: false,
    })
    var indexz = e.currentTarget.dataset.indexz
    this.setData({
      selectedIndex:indexz,
    })
    for (let i = 0; i < app.globalData.list[this.data.currentIndex].items.length;i++){
      if (i==indexz){
        app.globalData.list[this.data.currentIndex].items[i].checked = true
      }else{
        app.globalData.list[this.data.currentIndex].items[i].checked = false
      }
    }
    if (app.globalData.list[this.data.currentIndex].items[indexz].value==1){
      this.setData({
        currentResult: true,
      })
    }
    // console.log("答案:", this.data.currentResult, this.data.list[this.data.currentIndex])    
  },
  parsex: function (e) {
    var v = false
    if (this.data.parse) {
      v = false
    } else {
      v = true
    }
    this.setData({
      parse: v,
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value,app.globalData.list[this.data.currentIndex])
  },
  // 下一题
  bindNext: function () {
    this.setData({
      parse: false,
      currentResult: false,
      selectedIndex: null,
    })
    if (this.data.currentIndex == (config.limit - 1)) {
      var limit = this.data.limit
      wx.setStorageSync('offset', wx.getStorageSync('offset') + limit)
      var offset = wx.getStorageSync('offset')

      console.log("next limit:", limit, "offset:", offset)
      wx.request({
        url: config.apiPrefix + '/api/sms/temp?offset=' + offset + '&limit=' + limit + '&au=XNlcm5hbW',
        success: (res) => {
          if (res.data.length>0) {
            app.globalData.list.length = 0
            for (let i = 0; i < res.data.length; i++) {
              app.globalData.list.push(res.data[i])
            }
            if (res.statusCode == 200) {
              this.data.currentIndex = 0
              this.setData({
                list:app.globalData.list,
              })
            }
          }else{
            wx.setStorageSync('offset', 0)  //全部做完了，清0
          }
        }
      }) 
      return
    }
    if (this.data.currentIndex < (config.limit - 1)) {
      this.setData({
        //移动下标
        currentIndex: this.data.currentIndex + 1,
      })
    }
  },
  bindPre: function () {
    this.setData({
      parse: false,
      currentResult: false,
      selectedIndex: null,
    })
    var limit = this.data.limit
    var offset = wx.getStorageSync('offset')
    if (offset > 0){
      offset-=1
    }
    wx.request({
      url: config.apiPrefix + '/api/sms/temp?offset=' + offset + '&limit=' + limit + '&au=XNlcm5hbW',
      success: (res) => {
        if (res.data.length > 0) {
          app.globalData.list.length = 0
          for (let i = 0; i < res.data.length; i++) {
            app.globalData.list.push(res.data[i])
          }
          if (res.statusCode == 200) {
            wx.setStorageSync('offset', offset)
            this.data.currentIndex = 0
            this.setData({
              list: app.globalData.list,
            })
          }
        }
      }
    })
  },
  reStart: function () {
    wx.showModal({
      title: '返回主界面',
      content: '是否返回到主界面?',
      success:function(res){
        if (res.confirm){
          var offset = wx.getStorageSync('offset')
          if (offset < 1) {
            offset = 0
          } else {
            offset -= 1
          }
          wx.setStorageSync('offset', offset)
          //清空本次成绩
          wx.removeStorageSync('score');
          wx.redirectTo({
            url: '../begin/begin',
          })
        }
      }
    })
  },
})
