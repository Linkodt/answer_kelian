// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'kodt-kelian-r5vfd'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()

  return {
    event,
    openid:OPENID,
    appid: APPIDD,
    unionid: UNIONID,
  }
}