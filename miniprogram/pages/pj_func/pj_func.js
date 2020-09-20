// miniprogram/pages/pj_func/pj_func.js
var rap = getApp()
// 获取数据库
const db=wx.cloud.database();
const _ = db.command;
// 获取集合
// const question_col = db.collection('question');
const User_Info = db.collection('user');

Page({
  data: {
    src:""
  },
  async confrim(e){
    var that = this
    var openid = rap.globalData.userInfo.openid
    console.log(e.detail.value)
    var str = e.detail.value.toUpperCase()
    if(str == "I LOVE SCAU AIE" ){
      // 解密成功逻辑: 数据库设为 pj:true
      // 先设置全局中的pj为true
      // 更新数据失败了
      rap.globalData.userInfo.pj_string = true
      await User_Info.doc(rap.globalData.userInfo._id).update({
        data:{
          pj_string:true
        },
        success:function(res){
          console.log("更新数据",res)
        }
      })
      console.log("解密成功")
      wx.navigateTo({
        url: '../../pages/pj_success/pj_success',
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }else{
      console.log("解密失败")
      // 解密失败逻辑：===》 在数据库更新为 pj：false  不需要更新
      wx.navigateTo({
        url: '../../pages/pj_false/pj_false',
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  },
  onLoad(){
    this.setData({
      src:rap.globalData.userInfo.user_info.avator
    })
  },
  vr2:function(){
    wx.navigateTo({
      url: '../web_src/web_src',
    })
  }
})