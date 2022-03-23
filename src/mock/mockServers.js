import Mock from 'mockjs'
// import checkLogin from './checkLogin.json'
// import home from './home.json'
import navList from './navList.json'
import recommend from './recommend.json'
import allGoods from './allgoods.json'
import checkLogin from './checkLogin.json'
import thank from './thank.json'
import thanks from './thanks.json'
import cartList from './cartList.json'
import product from './product.json'
// Mock.mock('/member/login', {code: 200, data: checkLogin})
Mock.mock('/goods/navList', navList)
// Mock.mock('/goods/home', home)
Mock.mock('/goods/recommend', recommend)
Mock.mock('/goods/allGoods?page=1&size=20&sort=&priceGt=&priceLte=', allGoods)
Mock.mock('/member/checkLogin', checkLogin)
Mock.mock('/goods/thank', thank)
Mock.mock('/api/goodsDetails?productId=150642571432839', product)
Mock.mock('/member/cartList', cartList)
Mock.mock('/member/thanks?size=10&page=1', thanks)
