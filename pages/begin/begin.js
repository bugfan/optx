//index.js
//获取应用实例
const app = getApp()
const wordList = require('../../utils/word.js')  //题库
Page({
 
  practiceStart: function () {
    
    
    wx.redirectTo({   //页面
      url: '../play/play',
    })
  },

  // bindInfo: function () {
  //   wx.redirectTo({
  //     url: '../info/info',
  //   })
  // },
  
  commonStart: function () {
    wx.redirectTo({
      url: '../animation/animation',
    })
  },


  //从后台获取题目
  getOpts: function () {
    for (let i =0;i<wordList.word.length;i++){
      app.globalData.num.push(wordList.word[i])
    }
    console.log("题目:",app.globalData.num)
  },

  onReady:function(){
    //生成题目
    this.getOpts();
    //清除错题记录
    app.globalData.numValue.length = 0;
    
    
  }
})
