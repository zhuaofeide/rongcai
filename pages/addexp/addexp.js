// pages/addexp/addexp.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: ['请选择', '技能', '研究','管理'],
    objectStatus: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '技能'
      },
      {
        id: 2,
        name: '研究',
      },
      {
        id: 3,
        name: '管理',
      }
    ],
    state: ['请选择', '0-30人', '30-100人', '100人以上'],
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
    length:0,
    inner:0,
    lip:0,
    sdate: '请选择',
    date: '请选择',
    start:'',
    end:'',
    jobType:'',
    jobDescription:'',
    companySize:'',
    addId:'',
    userid:'',
    company: function (e) {   //公司
      var that = this;
      that.setData({
        company: e.detail.value
      })
    },
    position: function (e) {   //职位
      var that = this;
      that.setData({
        position: e.detail.value
      })
    },
    industry: function (e) {   //行业
      var that = this;
      that.setData({
        industry: e.detail.value
      })
    },

  },
  // 入职时间
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
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
      sdate: e.detail.value,
      start: e.detail.value
    })
  },
  // 离职时间
  bindeDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
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
      date: e.detail.value,
       end: e.detail.value
    })
  },
  // 工作描述
  descR: function() {
    wx.navigateTo({
      url: '../expDes/expDes'
    })
  },
  // 公司规模
  bindStateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', this.data.state[ e.detail.value])
    this.setData({
      inner: e.detail.value,
      companySize: this.data.state[e.detail.value]
    })
  },
// 工作类型
  bindStatusChange: function (e) {
    // console.log('picker发送选择改变，携带值为', this.data.status[e.detail.value])
    this.setData({
      lip: e.detail.value,
      jobType:this.data.status[e.detail.value]
    })
  },
  // 保存
  formSubmit: function (e) {
    var start = this.data.start;                    // 开始时间
    var end = this.data.end;                    // 结束时间
    var company = e.detail.value.company2;         //公司
    var position = e.detail.value.position2;         //职位
    var industry = e.detail.value.industry2;         //行业
    var jobDescription = this.data.jobDescription;  // 工作描述
    var companySize = this.data.companySize;  // 公司规模
    var jobType = this.data.jobType;  // 工作类型
    var resumeId = this.data.addId;
    console.log(resumeId)
    //请选择开始时间
    if (start === '') {
      wx.showToast({
        title: '请选择入职时间',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //请选择结束时间
    if (end === '') {
      wx.showToast({
        title: '请选择离职时间',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }

    //公司
    if (company === '') {
      wx.showToast({
        title: '请填写公司',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //position
    if (position === '') {
      wx.showToast({
        title: '请填写职位',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }

    //描述
    if (jobDescription === '') {
      wx.showToast({
        title: '请填写工作描述',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //行业
    if (industry === '') {
      wx.showToast({
        title: '请填写行业',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //公司规模
    if (companySize === '' || companySize === '请选择') {
      wx.showToast({
        title: '请选择公司规模',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //工作类型
    if (jobType === '' || jobType === '请选择') {
      wx.showToast({
        title: '请选择工作类型',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    var obj = {
      "entryDate": start,
      "leaveDate": end,
      "company": company,
      "position": position,
      "jobDescription": jobDescription,
      "industry": industry,
      "companySize": companySize,
      "jobType": jobType,
      "resumeId": resumeId,
    }
    var obj1 = JSON.stringify(obj);
    JSON.parse(obj1);
    console.log(obj1);
    var userid = this.data.userid
    wx.request({
      method: 'POST',
      header: {
        'userId': userid,
      },
      url: app.globalData.url +'/ik-wechat/api/workexp/saveorupdate',
      // url:'https://www.romcai.com/ik-wechat/api/workexp/saveorupdate',
      // url:'http://192.168.10.114:9000/ik-wechat/api/workexp/saveorupdate',
      data: obj1,
      success: (res) => {
        wx.hideLoading();
        console.log(res);
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
        wx.hideLoading();
        wx.showToast({
          title: '保存失败',
          image: '../../images/icon/warm.png',
          duration: 1000
        })
      }
    })
  },

  // 获取评价长度
  getLength: function () {
    var that = this;
    wx.getStorage({
      key: 'jobDescription',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          length: res.data.length,
          jobDescription: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var addId = options.addId; // 获取简历id
    console.log(addId)
    var userid = app.globalData.userId;   // 获取经验id
    this.setData({
      addId: options.addId,      //存储id
      userid: userid      //存储id
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
  onShow: function () {
    this.getLength();
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