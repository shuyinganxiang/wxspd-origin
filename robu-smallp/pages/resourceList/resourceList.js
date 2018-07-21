//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    motto: 'Hello World',
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: []
  },
  setDisabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function (e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  //事件处理函数
  bindViewTap: function (options) {
    
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        console.log("用户信息：" + res.userInfo);

        //校验session是否失效
        app._checkSession(options);

        var encryptedData = res.encryptedData,
        iv = res.iv,
        rawData = res.rawData,
        signature = res.signature;
        app.sendRequest({
          url:'/api/v1/mini/getUserEncryptedData',
          data:{
            encryptedData: encryptedData,
            iv: iv,
            rawData: rawData,
            signature: signature
          },
          method: 'post',
          success: function (res) {
            if(res.code==0){
              var userData = res.data.decryptUserData;
              app.setUserInfoStorage(userData);
            }
            
          }
        })
      },
      fail: function () {
        console.log("获取用户信息失败");
        app._requestUserWxInfo();
      }
    });
  },
  onLoad: function () {
    this._sendResourceList();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  _sendResourceList:function(){
    let that = this;
    //暂时写死列表数据
    var resourceList = [
      { coverImg: "http://wechatapppro-1252524126.file.myqcloud.com/app3f5mFexL3183/image/compress/ba3e0851b378e2e842b6c46977c680d2.jpg", detailUrl: "03", title: "响度和振幅的关系", desc: "响度和振幅的关系"},
      { coverImg: "http://wechatapppro-1252524126.file.myqcloud.com/app3f5mFexL3183/image/compress/ba3e0851b378e2e842b6c46977c680d2.jpg", detailUrl: "01", title: "真空无法传声", desc: "真空无法传声"},
      { coverImg: "http://wechatapppro-1252524126.file.myqcloud.com/app3f5mFexL3183/image/compress/ba3e0851b378e2e842b6c46977c680d2.jpg", detailUrl: "test", title: "test", desc: "test"}
    ];
        that.setData({
          array: resourceList
        })
    // 请求后端接口获取资源，勿删
    // app.sendRequest({
    //   url: '/api/v1/mini/getResourcesList',
    //   method: 'get',
    //   success: function (res) {
    //     console.log(res.data);
    //     var resourceList = res.data.resourceList;
    //     console.log(resourceList);
    //     that.setData({
    //       array: resourceList
    //     })
    //   }
    // });
  },
  tapInnerLinkHandler: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../resourceDetail/resourceDetail?detailUrl=' + event.currentTarget.dataset.url,
    })
  }
})
