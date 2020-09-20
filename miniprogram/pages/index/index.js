// miniprogram/pages/index/index.js
var rap = getApp()
// 获取数据库
const db=wx.cloud.database();
const _ = db.command;
// 获取集合
// const question_col = db.collection('question');
const User_Info = db.collection('user');

Page({
  data: {
      now_id:"2",
      img:"",
      keke:"",
      openid:"",
      src_1:"cloud://kodt-kelian-r5vfd.6b6f-kodt-kelian-r5vfd-1302937988/图层 5.png",
      src_2:"cloud://kodt-kelian-r5vfd.6b6f-kodt-kelian-r5vfd-1302937988/图层 4.png",
      src_3:"cloud://kodt-kelian-r5vfd.6b6f-kodt-kelian-r5vfd-1302937988/点击科科开始游戏.png"
  },
  async getBackground(F_id){
    var that = this
    wx.cloud.downloadFile({
      fileID: F_id, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        return res.tempFilePath
      },
      fail: console.error
    })
  },
  async loadLogin(){
    var that = this
    wx.cloud.callFunction({
      name: 'userinfo',
      complete: res => {
        // console.log('callFunction test result: ', res)
        rap.globalData.userInfo.openid = res.result.openid
        console.log('openid:',rap.globalData.userInfo.openid)
      }
    })
  },
   
  sayHello:function(e){
    wx.navigateTo({
      url: '../page_2/page_2',
    })
  }
  ,
  async onLoad(e){
    wx.login({
      success:res => {
        // console.log('user_login:',res)
        // rap.globalData.userInfo.code = res.code
        console.log("code:",res.code)
      },
      fail:console.error
    })
    this.loadLogin()
    // this.loadListData()
    // this.InsertData()
    if(e.id){
      // 说明是被邀请过来的
      // 邀请的人的积分+1
      // User_Info
      // 先获取到那个人的积分吧 e.jifen
      e.jifen = Number(e.jifen) + 1
      User_Info.doc(e.id).update({
        data:{
          jifen:e.jifen,
        }
      })
    }
  }
})