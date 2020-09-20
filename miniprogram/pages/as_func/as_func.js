// miniprogram/pages/as_func/as_func.js
var rap = getApp()
// 获取数据库
const db=wx.cloud.database();
const _ = db.command;
// 获取集合
const question_col = db.collection('question');
const User_Info = db.collection('user');
Page({
  data: {
      title:"自科部帅不帅？？？",
      list:[
        "A. 帅",
        "B. 太帅了 呜呜呜",
        "C. u1s1 把我帅哭了",
        "D. 啊这，还用问吗？"
      ],
      all_list:[
      ],
      index:0,
      point:0,
      answer:"",
      isshow:false
  },
  choose:function(e){
    var that = this
    // console.log(e)
    console.log(e.currentTarget.dataset.bind)
    console.log(typeof(e.currentTarget.dataset.bind))
    // console.log(e.currentTarget.dataset.tap)
    if(that.data.answer==that.data.list[e.currentTarget.dataset.bind]){
      // 答对了
      wx.showToast({
        title: '答对了',
        icon:"none",
        duration:2000
      })
      that.setData({
        index:that.data.index + 1,
        point:Number(that.data.point) + 1
      })
    }else{
      // 答题失败
      wx.showToast({
        title: '答错了(T_T)',
        icon:"none",
        duration:2000
      })
      that.setData({
        index:that.data.index + 1
      })
    }
    if(that.data.index>4){
      //答完题目 要跳转跟更新记录
      // 先更新记录
      User_Info.doc(rap.globalData.userInfo._id).update({
        data:{
          jifen:that.data.point,
          get_answer:true
        },
        success: function(res) {
          wx.reLaunch({
            url: '../as_success/as_success?jifen=' + that.data.point,
          })
        },
      })
    }else{
      // 还未答完题 继续更新题目
      that.setData({
        title:that.data.all_list[that.data.index].question,
        list:that.data.all_list[that.data.index].quest_ABCD,
        answer:that.data.all_list[that.data.index].answer
      })
    }
  },
  onLoad:function(res){
    var that = this
    question_col.aggregate().sample({size:5}).end().then(res=>{
      console.log(res)
      var all_list = res.list
      that.setData({
        all_list:res.list,
        title:res.list[that.data.index].question,
        list:res.list[that.data.index].quest_ABCD,
        answer:res.list[that.data.index].answer,
        isshow:true
      })
    })
  }
})