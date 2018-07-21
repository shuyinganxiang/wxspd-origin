//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    navInfo: [
      {
        'src': 'http://wechatapppro-1252524126.file.myqcloud.com/undefined/image/a164b0343468d5305bbc339101b1214d.png',
        'txt': '实验喵'
      },
      {
        'src': 'http://wechatapppro-1252524126.file.myqcloud.com/undefined/image/6e8fac2a7426ee2226ee239c68e24f84.png',
        'txt': '科学牛科学牛科学牛'
      },
      {
        'src': 'http://wechatapppro-1252524126.file.myqcloud.com/undefined/image/c857e18acc8f7a9d64a2e0f45368574d.png',
        'txt': '问题虫'
      },
      {
        'src': 'http://wechatapppro-1252524126.file.myqcloud.com/undefined/image/ba426a8094906b393578cec2c331f375.png',
        'txt': '汉字说'
      },
      {
        'src': 'http://wechatapppro-1252524126.file.myqcloud.com/undefined/image/c857e18acc8f7a9d64a2e0f45368574d.png',
        'txt': '问题虫'
      },
      {
        'src': 'http://wechatapppro-1252524126.file.myqcloud.com/undefined/image/ba426a8094906b393578cec2c331f375.png',
        'txt': '汉字说'
      }
    ],
    viewList: []
  },
  onLoad: function () {
    this._sendResourceList();
  },
  _sendResourceList: function () {
    let that = this;
    //暂时写死列表数据
    var resourceList = [{
      id: 1,
      coverImg: "http://wechatapppro-1252524126.file.myqcloud.com/app3f5mFexL3183/image/107b2290ee23b9c36e2be9e6eacd08f1.jpg",
      detailUrl: "03",
      title: "【实验喵】观察菜豆种子的结构",
      desc: "点击图片体验交互式实验微课"
    },
    {
      id: 2,
      coverImg: "http://wechatapppro-1252524126.file.myqcloud.com/app3f5mFexL3183/image/compress/ba3e0851b378e2e842b6c46977c680d2.jpg",
      detailUrl: "01",
      title: "真空无法传声",
      desc: "真空无法传声"
    },
    {
      id: 3,
      coverImg: "http://wechatapppro-1252524126.file.myqcloud.com/app3f5mFexL3183/image/fcb025ef862f5a9d7ce2d2a096b24291.jpg",
      detailUrl: "test",
      title: "【物理】中考成绩特惠向前“购”",
      desc: "力学、电学、声学、热学光学五大模块内容"
    }
    ];
    that.setData({
      /*
      * viewList： data中定义的变量容器
      * resourceList： 后端接口返回的数据
      */
      viewList: resourceList
    });
    wx.getUserInfo({
      // 获取用户头像信息

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
  swiperIndex: function (e) {
    console.log('item：', e.target.dataset)
    console.log('item：', e.target.dataset.courseid)
  }
})
