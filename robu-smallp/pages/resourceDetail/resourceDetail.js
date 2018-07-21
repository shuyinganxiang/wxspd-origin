//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({
  data: {
    resourceDetail: {}
  },
  onLoad: function(options) {
    this._getResourceDetail(options.id);
  },
  //获取资源详
  _getResourceDetail: function(options) {
    //将资源详情信息写入data中
    let that = this;
    var createdTime = util.formatTime(new Date());

    app.sendRequest({
      url: '/api/v1/mini/getResourceDetail',
      data: {
        resourceId: options.id
      },
      success: function (res) {
        if(res.code == 200){
          var rDetail = res.data.detail;
          that.setData({
            resourceDetail: rDetail
          })
        }
      },
      fail: function () {
        console.log("获取资源详情有误")
      }
    });

    
    // var rDetail = {
    //   'id': 1,
    //   'title': '【实验喵】观察菜豆种子的结构',
    //   'coverImg': 'http://wechatapppro-1252524126.file.myqcloud.com/app3f5mFexL3183/image/compress/ba3e0851b378e2e842b6c46977c680d2.jpg',
    //   'createdTime': createdTime,
    //   'url': '',
    //   'isPay':false
    // };
    // this.setData({
    //   resourceDetail: rDetail
    // })
  },
  // tapInnerLinkHandler: function (event) {
  //   console.log(event)
  //   wx.navigateTo({
  //     url: '../storyline/storyline?detailUrl=' + event.currentTarget.dataset.url,
  //   })
  // }

  payResource: function(event) {

    let that = this;
    var resourceId = 1;
    //查看是否已授权
    if (app.globalData.isAuth == false){
      app._requestUserWxInfo();
    }else{
      app.sendRequest({
        url: '/api/v1/mini/createOrder',
        data: {
          resourceId: resourceId
        },
        success: function (res) {
          var param = res.data;

          // param.orderId = orderId;
          // param.success = paySuccess;
          param.goodsType = 0;
          // param.fail = payFail;
          that.wxPay(param);
        },
        fail: function () {
          payFail();
        },
        successStatusAbnormal: function () {
          payFail();
        }
      })
    }
  },
  wxPay: function (param) {
    var that = this;
    wx.requestPayment({
      'timeStamp': param.timeStamp,
      'nonceStr': param.nonceStr,
      'package': param.package,
      'signType': 'MD5',
      'paySign': param.paySign,
      success: function (res) {
        console.log("pay success" + res);
        // app.wxPaySuccess(param);
        // param.success();
      },
      fail: function (res) {
        if (res.errMsg === 'requestPayment:fail cancel') {
          // param.fail();
          return;
        }
        app.showModal({
          content: '支付失败',
          complete: param.fail
        })
        // app.wxPayFail(param, res.errMsg);
      }
    })
  }
})