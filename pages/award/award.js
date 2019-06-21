//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    fscore: 0,
    num: 0,
    listCommit:[],  // 题 index=id value=对错 
    scoreList:[]  //历史得分
  },
  onLoad: function () {
    this.setData({
      listCommit:[],
      scoreList: wx.getStorageSync("allScore")
    })
    let commits = []
    let fs = 0
    for (let i=0;i<app.globalData.list.length;i++){
      let obj = app.globalData.list[i]
      let flg =false
      for (let j=0;j<obj.items.length;j++){
        if (obj.items[j].value == '1' && obj.items[j].checked==true){
          flg = true
          break
        }
      }
      if (flg){
        fs++
      }
      commits.push(flg)
    }
     // //记录分数
    wx.setStorageSync('oneScore',fs)
    let flag = 0
    for (let i = 0; i < this.data.scoreList.length; i++) {
      if (fs == this.data.scoreList[i]) {
        flag++;
        break;
      }
    }
    if (flag == 0) {
      this.data.scoreList.push(fs);
    }

    this.data.scoreList.sort(this.compare)
    this.setData({
      scoreList: this.data.scoreList.slice(0, 5)
    })

    wx.setStorageSync('allScore', this.data.scoreList)

    this.setData({
      fscore: fs,
      scoreList : wx.getStorageSync('allScore'),
      num: app.globalData.list,
      listCommit:commits
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
  },

  bindStart: function () {
    //清空本次成绩
    wx.removeStorageSync('score');
    //清空本次题目序列
    app.globalData.list.length=0;
    wx.redirectTo({
      url: '../begin/begin',
    })
  },

  select:function(e){
   //获取当前题号
    let no=e.target.dataset.num;
    app.globalData.detailIndex=no;
    console.log("tihao1 " + no)
    console.log("tihao " + app.globalData.detailIndex)
    wx.redirectTo({
      url: '../detail/detail',
    })
  }
  
})
