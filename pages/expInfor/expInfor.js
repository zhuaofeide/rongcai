// pages/expInfor/expInfor.js
var util = require('../../utils/util.js')
// var util = require('../../utils/url.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,      //页数
    size: 100,   //  数量
    total:'',
    hideHeader: true,
    hidden: true,
    refreshTime: '', // 刷新的时间 
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '没有更多了',
    addId:'',
    userId:'',
  },
  //上拉更多
  loadMore: function () {
    console.log('上拉更多数据');
  },
  //下拉刷新
  refesh: function () {
    console.log('上拉顶部')
    wx.startPullDownRefresh({
      success: function () {
        console.log('上拉顶部')
      }
    })

  },
  //增加工作经验
  addExp: function (options) {
    var addId = this.data.addId;
    console.log(addId);
    wx.navigateTo({
      url: "/pages/addexp/addexp?addId=" + addId
    })
  },
  // 查看工作经历
  viewExp: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/viewexp/viewexp?id=" + orderId
    })
  },

  // 处理数据
  post:function(res){
    var that =this;
    console.log(res)
    if (res.data.code === '200' && res.data.data.records.length !== 0) {
      console.log(res.data.data.records);
      that.setData({
        total: res.data.data.total
      });
      if (res.data.data.records.length === res.data.data.total) {
        that.setData({
          hidden: false
        });
      }
      that.setData({
        expList: res.data.data.records,
      });
    } else {
      that.setData({
        expList: null
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      addId: options.resumeid,      // 获取简历id
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var userid = app.globalData.userId;   // 获取用户id
  
    var url = app.globalData.url + '/ik-wechat/api/workexp/datagrid';
    var resumeid = this.data.addId
    var obj = {
      "size": this.data.size,
      "page": this.data.page,
      "resumeId": resumeid
    };
    util.http(url, obj, this.post);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})