// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const result = await cloud.openapi.subscribeMessage.send({
      touser:EventTarget.openid,
      page:'pages/index/index',
      data:{
        thing3:{
          value:"请于2020.09.28-2020.09.30前往创客空间领取奖品"
        },
        thing6:{
          value:"您的积分已经超过20"
        }
      }
    })
  }catch(err){

  }
}