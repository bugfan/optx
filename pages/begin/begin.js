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
    wx.redirectTo({
      url: '../play/play',
    })
  },


  //从后台获取题目
  getOpts: function () {
    if (config.debug) {
      var len = wordList.word.length
      for (let i = 0; i < config.count; i++) {
        app.globalData.num.push(wordList.word[Math.floor(Math.random() * len)])
      }
      return
    }
    
    wx.request({
      url: config.apiPrefix + '/api/sms?count=' + config.count+'&au=XNlcm5hbW',
      success: (res) => {
        if (res.data){
          for (let i = 0; i < res.data.length; i++) {
            app.globalData.num.push(res.data[i])
          }
        }
        // console.log("data res list:", JSON.stringify(app.globalData.num))
      }
    })

    // var len = wordList.word.length
    // for (let i = 0; i < config.count;i++){
    //   app.globalData.num.push(wordList.word[Math.floor(Math.random()*len)])
    // }
    // console.log("题目:",app.globalData.num)

  },

  onReady:function(){
    //生成题目
    this.getOpts();
    //清除错题记录
    app.globalData.numValue.length = 0;
    
    
  }
})
