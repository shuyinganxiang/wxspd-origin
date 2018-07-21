var url = "请求后台数据的url";
// var url = "https://news-at.zhihu.com/api/4/news/latest";
// 页数
var page = 1;
Page({
  data: {
    //如果没有数据 设置true显示，false不显示，显示一个提示图片信息
    show_none: 'none',
    name: "您还没有订单哦!",
    hidden: true,
    // 声明一个数据接收返回的数据
    list: [],
    // 用户ID
    merber_id: 1,
  },
  // 初始化数据
  onLoad: function () {
    var that = this;
    that.data.merber_id = wx.getStorageSync("member_id");
    // 这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    wx.request({
      url: url,
      method: "post",
      data: {
        // 需要传递的参数
        member_id: that.data.merber_id,
        length: page, // 页数，默认第一页

      },
      success: function (res) {
        //console.info(that.data.list);
        console.log(res);
        var num = res.data.data.data.length;
        console.log(num);
        // 判断数据长度如果不等于0，前台展示数据，false显示暂无订单提示信息
        if (num != 0) {
          that.setData({
            list: res.data.data.data,
            show_none: 'none'
          })

        } else {
          that.setData({
            list: res.data.data.data,
            show_none: 'block'
          })
        }
        that.setData({
          hidden: true
        });
      }
    });
  },
  // 点击view获取到相应信息并跳转页面
  btn_click: function (event) {
    console.log(event);
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: url,
      method: "post",
      data: {
        member_id: that.data.merber_id,
        length: 0,
      },
      // 请求头部
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("刷新" + res.data.data.data);
        that.setData({
          list: res.data.data.data
        });

        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  // 加载更多
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '正在加载中',
    })
    page++;
    // 页数+1
    wx.request({
      url: url,
      method: "post",
      data: {
        member_id: that.data.merber_id,
        length: page,

      },
      // 请求头部
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 回调函数
        console.log(res);


        for (var i = 0; i < res.data.data.data.length; i++) {
          that.data.list.push(res.data.data.data[i]);
        }
        // 设置数据
        that.setData({
          list: that.data.list
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },
})