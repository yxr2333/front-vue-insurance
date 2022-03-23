import http from './public'
import requests from './ajax'
// 验证码
export const geetest = () => {
  return requests({
    url: '/captcha',
    method: 'get'
  })
}
// 登陆
export const userLogin = (params) => {
  return requests({
    url: '/user/login',
    method: 'post',
    data: params,
  })
}
// 退出登陆
export const loginOut = (params) => {
  return requests({
    url: '/user/logout',
    method: 'post',
    data: params,
  })
}
// 用户信息
// export const userInfo = (params) => {
//   return http.fetchGet('/member/checkLogin', params)
// }
export const userInfo = (params) => {
  return requests({
    url: `/user/${params}`,
    method: 'get',
    // params: params,
  })
}
export const changeAdd = (params) => {
  return requests({
    url: '/user/address',
    method: 'put',
    data: params,
    // headers:{
    //   'Content-Type': 'x-www-form-urlencoded',
    // }
  })
}

// 注册账号
export const register = (params) => {
  return requests({
    url: '/user/register',
    method: 'post',
    data: params,
  })
}
// 邮箱验证
export const SendEmailCaptcha = (params) => {
  return requests({
    url: '/captcha/mail',
    method: 'get',
    params: params,
  })
}
// 修改头像
export const upload = (params) => {
  return requests({
    url: '/user/icon',
    method: 'post',
    data: params,
  })
}
// 修改密码
export const changePassword = (params) => {
  return requests({
    url: '/user/pwd',
    method: 'post',
    data: params,
  })
}
// 捐赠列表
export const thanksList = (params) => {
  return http.fetchGet('/member/thanks', params)
}
export const productHome = () => {
  return requests({
    url: '/carousel/all',
    method: 'get'
  })
}
// 首页接口
export const navList = (params) => {
  return http.fetchGet('/goods/navList', params)
}
// 推荐板块
export const recommend = (params) => {
  return http.fetchGet('/goods/recommend', params)
}

// export const productHome = () => {
//   return requests({
//     url: '/goodsDetails?productId=150642571432839',
//     method: 'get'
//   })
// }

// 捐赠板块
export const thank = (params) => {
  return http.fetchGet('/goods/thank', params)
}
// 调查问卷
export const getQues = (params) => {
  return requests({
    // url: '/goodsDetails?productId=150642571432839',
    url: '/ques/all',
    // url: '/category',
    method: 'get',
    params: params,
  })
}

export const getOrderId = (params) => {
  return requests({
    // url: '/goodsDetails?productId=150642571432839',
    url: `/order/get/cus/${params}`,
    // url: '/category',
    method: 'get',
    // params: params,
  })
}