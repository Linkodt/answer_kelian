// miniprogram/pages/pj_success/pj_success.js
Page({
  data:{
    
  },
  go_first:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  }
})