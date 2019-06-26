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
    this.setData({
      list: app.globalData.list,
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
      // let ind = this.data.currentIndex - 1
      // for (var i =0 ;i< app.globalData.list[ind].items.length;i++){
      //     if (app.globalData.list[ind].items[i].checked){
            
      //     }
      // }
      this.setData({
        list:app.globalData.list,
        currentIndex: this.data.currentIndex - 1,
      })
      this.calcShowText()
    }
  },
  reStart: function () {
    wx.showModal({
      title: '返回主界面',
      content: '是否返回到主界面?',
      success: function (res) {
        if (res.confirm) {
          //清空本次成绩
          // wx.removeStorageSync('score');
          wx.redirectTo({
            url: '../begin/begin',
          })
        }
      }
    })
  },
  //显示成绩
  bindShowGrade:function(){
    wx.redirectTo({
      url: '../award/award'
    })
  },
})
