// pages/addexp/addexp.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0,
    status: ['全职', '兼职'],
    objectStatus: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '全职'
      },
      {
        id: 2,
        name: '兼职',
      }
    ],
    state: ['0-30人', '30-100人', '100人以上'],
    objectState: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '0-30'
      },
      {
        id: 2,
        name: '30-100',
      },
      {
        id: 3,
        name: '100人以上',
      }
    ],

    focus: false,
    index: 0,
    inner: 0,
    lip: 0,
    sdate: '请选择',
    date: '请选择',
    start: '',
    end: '',
    company: '',
    position: '',
    industry: '',
    des: '',
    companySize: '',
    workType: '',
    jobDescription: '',
    length: 0,
    
  },
  // 入职时间
  bindDateChange: function (e) {
    var ss = e.detail.value
    var d2 = new Date(this.data.date.replace(/\-/g, "\/"));
    var d1 = new Date(ss.replace(/\-/g, "\/"));
    if (d1 > d2) {
      wx.showToast({
        title: '开始大于结束',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return false;
    }
    this.setData({
      sdate: e.detail.value
    })
  },
  // 离职时间
  bindeDateChange: function (e) {
    var ss = e.detail.value
    var d1 = new Date(this.data.sdate.replace(/\-/g, "\/"));
    var d2 = new Date(ss.replace(/\-/g, "\/"));
    if (d1 > d2) {
      wx.showToast({
        title: '开始大于结束',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return false;
    }
    this.setData({
      date: e.detail.value
    })
  },
  //公司
  bindKeyInput: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  //职位
  bindKeyPosition: function (e) {
    this.setData({
      position: e.detail.value
    })
  },
  //行业
  bindKeyIndustry: function (e) {
    this.setData({
      industry: e.detail.value
    })
  },
  // 工作描述
  descR: function () {
    wx.navigateTo({
      url: '../id-expDes/expDes'
    })
  },
  // 公司规模
  bindStateChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.state[e.detail.value])
    this.setData({
      inner: e.detail.value,
      companySize: this.data.state[e.detail.value]
    })
  },
  // 工作类型
  bindStatusChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      lip: e.detail.value,
      workType: this.data.status[e.detail.value]
    })
  },
  // 保存
  formSubmit: function (e) {
    var exId= this.data.orderId;                    // 个人id
    var start = this.data.sdate;                    // 开始时间
    var end = this.data.date;                    // 结束时间
    var company = this.data.company;         //获取公司名称
    var position = this.data.position;        //职位
    var industry = this.data.industry;        //行业
    var jobDescription = this.data.jobDescription   //描述
    var companySize = this.data.companySize;     // 规模
    var workType = this.data.workType;     // 工作类型

    //公司名称
    if (company === '') {
      wx.showToast({
        title: '请填写公司名称',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //职位名称
    if (position === '') {
      wx.showToast({
        title: '请填写职位名称',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //行业
    if (industry === '') {
      wx.showToast({
        title: '请填写行业名称',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //工作描述
    if (jobDescription === '') {
      wx.showToast({
        title: '请填写工作描述',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //公司名称
    if (company === '') {
      wx.showToast({
        title: '请填写公司名称',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    var obj = {
      "id": exId,
      "entryDate": start,
      "leaveDate": end,
      "company": company,
      "position": position,
      "industry": industry,
      "jobDescription": jobDescription ,
      "jobType": workType,
      "companySize": companySize
    }
    var obj1 = JSON.stringify(obj);
    JSON.parse(obj1);
    console.log(obj1);
    wx.request({
      method: 'POST',
      header: {
        'userId': app.globalData.userId
      },
      url: app.globalData.url+'/ik-wechat/api/workexp/saveorupdate',
      // url: 'http://192.168.10.114:9000/ik-wechat/api/workexp/saveorupdate',
      data: obj1,
      success: (res) => {
        wx.hideLoading();
        console.log(res)
        if (res.data.code === '200') {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: -1
                })
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: '保存失败',
            image: '../../images/icon/warm.png',
            duration: 1000
          })
        }
      },
      fail: (req) => {
        wx.showToast({
          title: '保存失败',
          image: '../../images/icon/warm.png',
          duration: 1000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var orderId = e.id;
    console.log(orderId)
    this.data.orderId = orderId;
    this.setData({
      orderId: orderId
    });
    var that = this;
    var id = that.data.orderId;
    // 获取数据
    wx.request({
      method: 'POST',
      url: app.globalData.url+"/ik-wechat/api/workexp/detail",
      // url: 'http://192.168.10.114:9000/ik-wechat/api/workexp/detail',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userId': app.globalData.userId,
      },
      data: {
        id: id
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code === '200') {
          console.log(res.data.data);
          that.setData({
            expDetail: res.data.data.records,
            sdate: res.data.data.entryDate,
            date: res.data.data.leaveDate,
            company: res.data.data.company,
            position: res.data.data.position,
            industry: res.data.data.industry,
            companySize: res.data.data.companySize,
            workType: res.data.data.jobType,
            jobDescription: res.data.data.jobDescription,
            length: res.data.data.jobDescription.length
          });
          wx.setStorage({
            key: "idDescription",
            data: this.data.jobDescription,
            success: function (res) {
              console.log(res.errMsg)
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //工作描述
    var that = this;
    wx.getStorage({
      key: 'idDescription',
      success: function (res) {
        that.setData({
          length: res.data.length,
          jobDescription: res.data
        });
      }
    })
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