//index.js
//获取应用实例
const app = getApp()
const wordList = require('../../utils/word.js')  //题库
const config = require('../../utils/config.js')  //
Page({
 
  practiceStart: function () {
    
    
    wx.redirectTo({   //页面
      url: '../practice/practice',
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
          for (let i = 0; i < res.data.length; i++) {
            app.globalData.list.push(res.data[i])
          }
          wx.redirectTo({
            url: '../play/play',
          })
        }
      }
    })
  },

  onReady:function(){
    //清除错题记录
    // app.globalData.numValue.length = 0;
    
    
  }
})
