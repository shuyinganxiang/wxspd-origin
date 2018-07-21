//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    infoList:[
      {
        icon: 'icon-notebook',
        txt: '个人信息'
      },
      {
        icon: 'icon-location',
        txt: '我的活动'
      },
      {
        icon: 'icon-vip-card',
        txt: '我的打卡'
      },
      {
        icon: 'icon-coupon',
        txt: '我的已购'
      },
      {
        icon: 'icon-integral',
        txt: '赠送记录'
      },
      {
        icon: 'icon-integral',
        txt: '我的订单'
      },
      {
        icon: 'icon-integral',
        txt: '优惠券'
      }
    ]
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  userInfo:function(){
    console.log("显示用户的详细信息")
  }
})
