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
    parse:false,
    nextText:'下一题'
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
  tap:function(e){
    // console.log("e:",e)
    app.globalData.list[this.data.currentIndex].items[e.currentTarget.dataset.indexz].checked = true
    this.setData({
      list:app.globalData.list,
    })
    this.bindNext()
  },
  parsex:function(e){
   var v =false
   if (this.data.parse){
     v =false
   }else{
     v =true
   }
    this.setData({
      parse:v,
    })
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    // // var items = app.globalData.list;
    // for (var i = 0;i<app.globalData.list[this.data.currentIndex].items.length;i++) {
    //   if (app.globalData.list[this.data.currentIndex].items[i].value == e.detail.value.toString() && e.detail.value==1){
    //     app.globalData.list[this.data.currentIndex].items[i].checked = true
    //   }else{
    //     app.globalData.list[this.data.currentIndex].items[i].checked == false //判断
    //   }
    // }
  },
// 下一题
  bindNext:function(){
    this.setData({
      parse:false,
    })
    if(this.data.currentIndex == (config.count - 1)) {
        this.bindShowGrade()
        return
    }
    this.calcShowText()

    if (this.data.currentIndex < (config.count-1)){
      this.setData({
        //移动下标
        currentIndex: this.data.currentIndex + 1,
      })
    }
  },
  calcShowText:function(){
    if (this.data.currentIndex == (config.count - 2)) {
      this.setData({
        nextText: '显示成绩',
      })
    } else {
      this.setData({
        nextText: '下一题',
      })
    }
  },
  bindPre: function (){
    if (this.data.currentIndex >0) {
      let ind = this.data.currentIndex - 1
      for (var i =0 ;i< app.globalData.list[ind].items.length;i++){
          if (app.globalData.list[ind].items[i].checked){
            
          }
      }
      this.setData({
        list:app.globalData.list,
        currentIndex: this.data.currentIndex - 1,
      })
      this.calcShowText()
    }
  },
  reStart: function () {
    //清空本次成绩
    wx.removeStorageSync('score');
    wx.redirectTo({
      url: '../begin/begin',
    })
  },
  //显示成绩
  bindShowGrade:function(){
    wx.redirectTo({
      url: '../award/award'
    })
  },
})
