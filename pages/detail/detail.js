// pages/detail/detail.js
const app=getApp()
Page({
  data: {
    //正确答案
    right:"",
    //解析
    why:"",
    question:"",
    itemx:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let no = app.globalData.detailIndex
    var rig = ''
    for (let i = 0; i < app.globalData.list[no].items.length; i++) {
      if (app.globalData.list[no].items[i].value=="1") {
        rig = app.globalData.list[no].items[i].name
      }
    }
    console.log
    this.setData({
      question: app.globalData.list[no].question,
      right:rig,
      why: app.globalData.list[no].detail,
      itemx:app.globalData.list[no].items
    })
  },

 bindBack:function(){
   wx.redirectTo({
     url: '../award/award',
   })
 }
})