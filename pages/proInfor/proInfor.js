// pages/expInfor/expInfor.js
var util = require('../../utils/util.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,      //页数
    size: 100,   //  数量
    total: '',
    onPullDownRefresh: function () {   // 下拉刷新
      wx.startPullDownRefresh()
    },
    hideHeader: true,
    hidden: true,
    refreshTime: '', // 刷新的时间 
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '没有更多了',
    detailId: '',
    addId: '',
  },
  //事件处理函数
  addPro: function () {
    var addId = this.data.addId;
    wx.navigateTo({
      url: "../addpro/addpro?addId=" + addId
    })
  },
  // 查看项目经验
  viewPro: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/viewpro/viewpro?id=" + orderId
    })
  },
  // 获取列表itemexp
  getList: function (resumeid, userid) {
    wx.showLoading();
    var obj = {
      "size": this.data.size,
      "page": this.data.page,
      "resumeId": resumeid
    };
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userId': userid
      },
      url: app.globalData.url + '/ik-wechat/api/itemexp/datagrid',
      data: obj,
      success: (res) => {
        wx.hideLoading();
        this.setData({
          hidden: true
        })
        if (res.data.code === '200' && res.data.data.records.length !== 0) {
          // console.log(res.data.data.records.length);
          console.log(res.data.data);
          this.setData({
            total: res.data.data.total
          });
          if (res.data.data.records.length === res.data.data.total) {
            this.setData({
              hidden: false
            });
          }
          this.setData({
            expList: res.data.data.records,
          });
        } else {
          this.setData({
            expList: null
          });
        }
      },
      fail: function (req) {
        wx.hideLoading();
      }
    })
  },
  // 处理数据
  post: function (res) {
    var that = this;
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
  onReady: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var userid = app.globalData.userId;   // 获取用户id

    var url = app.globalData.url + '/ik-wechat/api/itemexp/datagrid';
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