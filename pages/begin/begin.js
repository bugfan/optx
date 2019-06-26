//index.js
//获取应用实例
const app = getApp()
const wordList = require('../../utils/word.js')  //题库
const config = require('../../utils/config.js')  //
Page({
  practiceStart: function () {
    if (config.debug) {
      var len = wordList.word.length
      for (let i = 0; i < config.count; i++) {
        app.globalData.list.push(wordList.word[Math.floor(Math.random() * len)])
      }
      return
    }
    // wx.setStorageSync('offset',400)
    const limit = config.limit
    var offset = wx.getStorageSync('offset')
    if (offset<1){
      offset=0
    }
    console.log("limit:",limit,"offset:",offset)
    wx.request({
      url: config.apiPrefix + '/api/sms/temp?offset='+offset+'&limit='+limit+'&au=XNlcm5hbW',
      success: (res) => {
        if (res.data) {
          app.globalData.list.length = 0
          for (let i = 0; i < res.data.length; i++) {
            app.globalData.list.push(res.data[i])
          }
          wx.redirectTo({   //页面
            url: '../practice/practice',
          })
          if (res.statusCode==200){
            wx.setStorageSync('offset', offset + limit)
          }
        }
      }
    })    
  },

  // bindInfo: function () {
  //   wx.redirectTo({
  //     url: '../info/info',
  //   })
  // },
  
  commonStart: function () { 
    //生成题目
    this.getOpts();
  },


  //从后台获取题目
  getOpts: function () {
    if (config.debug) {
      var len = wordList.word.length
      for (let i = 0; i < config.count; i++) {
        app.globalData.list.push(wordList.word[Math.floor(Math.random() * len)])
      }
      return
    }
    wx.request({
      url: config.apiPrefix + '/api/sms?count=' + config.count+'&au=XNlcm5hbW',
      success: (res) => {
        if (res.data){
          app.globalData.list.length=0
          for (var i = 0; i < res.data.length; i++) {
            // console.log(i,res.data[i])
            app.globalData.list.push(res.data[i])
          }
          wx.redirectTo({
            url: '../play/play',
          })
        }
      },
      fail:(res) => {
        wx.showToast({
          title: '请求数据失败',
          icon: 'none',
          duration:2000
        })
      }
    })
  },

  onReady:function(){
    //清除错题记录
    // app.globalData.numValue.length = 0;
    
    
  }
})
