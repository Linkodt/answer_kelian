// miniprogram/pages/as_success/as_success.js
var rap = getApp()
Page({
  data: {
    isshow:false,
    jifen:0,
    src:"",
    name:""
  },
  onLoad(e){
    var that = this
    console.log(e.jifen)
    if(Number(e.jifen)>0){
      e.jifen = Number(e.jifen)
      that.setData({
        jifen:e.jifen,
        isshow:true
      })
    }else if(rap.globalData.userInfo._id){
      that.setData({
        isshow:true,
        jifen:rap.globalData.userInfo.jifen
      })
    }
    that.setData({
      src:rap.globalData.userInfo.user_info.avator,
      name:rap.globalData.userInfo.user_info.nickName
    })
    
    
  },
  onShareAppMessage: function (ops) {
    var that = this
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '科联小游戏',
      path: 'pages/index/index?id=' + rap.globalData.userInfo._id + '&jifen=' + that.data.jifen ,  // 路径，传递参数到指定页面。
      imageUrl:'../../images/图层 2.png', // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
  // subMsg(){
  //   var that = this
  //   wx.requestSubscribeMessage({
  //     tmplIds: ['T69NfGW5DYICiMpk3s2l3RyqsPiClkAka_1_dbLYiE8'],
      
  //   })
  // },
  // send(openid){
  //   wx.cloud.callFunction({
  //     name: "sendMsg",
  //     data: {
  //       openid: openid
  //     }
  //   }).then(res => {
  //     console.log("推送消息成功", res)
  //   }).catch(res => {
  //     console.log("推送消息失败", res)
  //   })
  // }
  ,
  go_first(e){
    // wx.downloadFile({
    //   url: 'https://6b6f-kodt-kelian-r5vfd-1302937988.tcb.qcloud.la/%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg?sign=bca97c01e0aa9fabe0f491efdd298fc2&t=1599723946',
    //   success:function(res){
    //     if(res.statusCode==200){
    //       console.log('图片下载成功'+res.tempFilePath)
    //       const fs = wx.getFileSystemManager()
    //       fs.saveFile({
    //         tempFilePath:res.tempFilePath,
    //         success(res){
    //           console.log('图片缓存成功',res.savedFilePath)
    //           wx.setStorageSync('image_cache', res.saveFile)
    //         }
    //       })
    //     }else{
    //       console.log('响应失败',res.statusCode)
    //     }
    //   }
    // })
    wx.getImageInfo({
      src: 'https://6b6f-kodt-kelian-r5vfd-1302937988.tcb.qcloud.la/%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg?sign=bca97c01e0aa9fabe0f491efdd298fc2&t=1599723946',
      success: function (ret) {
          var path = ret.path;
          wx.saveImageToPhotosAlbum({
              filePath: path,
              success(result) {
                  console.log(result)
                  wx.showToast({
                    title: '保存成功',
                    icon:"none",
                    duration:2000
                  })
              }
          })
      }
  })
  }
})