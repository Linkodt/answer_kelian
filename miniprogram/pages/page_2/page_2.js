// miniprogram/pages/page_2/page_2.js
var rap = getApp()
// 获取数据库
const db=wx.cloud.database();
const _ = db.command;
// 获取集合
// const question_col = db.collection('question');
const User_Info = db.collection('user');

Page({
  data: {
    button_text:"登录",
    userinfo:{}
  },
  async getUserInfo(e){
    var that = this
    if(that.data.button_text=="已登录"||that.data.button_text=="登录成功"){
      wx.showModal({
        showCancel:false,
        title:"彩蛋",
        content:"小程序制作：自科部林科达。\r\n小程序原画：宣传部陈昕，\r\n宣传部原鸣。"
      })
    }
    rap.globalData.user = e.detail.userInfo
    console.log(rap.globalData.user)
    rap.globalData.userInfo.user_info.avator = rap.globalData.user.avatarUrl
    rap.globalData.userInfo.user_info.nickName = rap.globalData.user.nickName
    // 插入数据
    var that = this
    var openid = rap.globalData.userInfo.openid
    // 判断有无数据
    await User_Info.where({
      openid:openid
    }).get().then(res=>{
      // console.log(res.data[0])
      if(res.data.length==1){
        // 有用户
        // 取得用户的全部信息到全局中，
        console.log("点击登录时发现有用户信息")
       rap.globalData.userInfo = res.data[0]
      //  console.log(rap.globalData.userInfo)
      that.setData({
        button_text:"已登录"
      })
      }else{
        // 没有该用户
        // 插入数据
      console.log("点击登陆时没有用户信息")
      User_Info.add({
        data:rap.globalData.userInfo
      }).then(res=>{
        if(res._id){
          wx.showToast({
            title: '登录成功',
            icon:"none",
            duration:1000,
          })
          that.setData({
            button_text:"登录成功"
          })
        }else{
          wx.showToast({
            title: '登录失败',
            icon:"none",
            duration:1000,
          })
        }
        console.log(res)
      })
      }
    })
  },
  onLoad(e){
    if(e.name){
      console.log("i am here")
    }else{
      console.log("not")
    }
    console.log(rap.globalData.userInfo)
    // console.log(rap.globalData.user2Info)
    this.InsertData()
    this.setData({
      userinfo:rap.globalData.userInfo
    })
  },
  async InsertData(){
    var that = this
    var openid = rap.globalData.userInfo.openid
    // 判断有无数据
    await User_Info.where({
      openid:openid
    }).get().then(res=>{
      // console.log(res.data[0])
      if(res.data.length==1){
        // 有用户
        // 取得用户的全部信息到全局中，
       rap.globalData.userInfo = res.data[0]
       console.log("有用户信息：",rap.globalData.userInfo)
       that.setData({
        button_text:"已登录"
      })
      }else{
        // 没有该用户
        // 插入数据
        // 提醒尚未登录
        wx.showModal({
          content:"请点击右上的登录",
          showCancel:false,
          confirmText:"确定",
          confirmColor:"#86db47",
        })
      }
    })
  },
  pj_function:function(){
    // console.log(rap.globalData.userInfo.user_info.avator)
    if(rap.globalData.userInfo.user_info.avator){
      console.log('神秘彩蛋破译')
      // pj_string:true 跳转到彩蛋破解
      if(rap.globalData.userInfo.pj_string){
        wx.navigateTo({
          url: '../pj_success/pj_success',
        })
      }else{
      // false 跳转到破译页面
      wx.navigateTo({
        url: '../pj_func/pj_func',
      })
    }
    }else{
      wx.showModal({
        content:"请点击右上的登录",
        showCancel:false,
        confirmText:"确定",
        confirmColor:"#86db47",
      })
    }
  },
  as_function:function(){
    // console.log(rap.globalData.userInfo.nickNname)
    if(rap.globalData.userInfo.user_info.avator){
      if(rap.globalData.userInfo.get_answer){
        // 答题成功页面
        console.log("答题成功")
        wx.navigateTo({
          url: '../as_success/as_success',
        })
      }else{
      wx.navigateTo({
        url: '../as_func/as_func',
      })
    } 
  }else{
    wx.showModal({
      content:"请点击右上的登录",
      showCancel:false,
      confirmText:"确定",
      confirmColor:"#86db47",
    })
  }
  },
})