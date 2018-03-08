// pages/addexp/addexp.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:0,
    status: ['有', '无'],
    objectStatus: [
      {
        id: 1,
        name: '有'
      },
      {
        id: 2,
        name: '无',
      }
    ],
    focus: false,
    index: 0,
    inner: 0,
    lip: 0,
    sdate: '',
    date: '',
    school:'',
    education:'',
    major:'',
    studyExperience: '',
  },
  // 入学时间
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
      sdate: e.detail.value
    })
  },
  // 毕业时间
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
  //学校
  bindKeySchool: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  //学历
  bindKeyEducation: function (e) {
    this.setData({
      education: e.detail.value
    })
  },
  //学历
  bindKeyMajor: function (e) {
    this.setData({
      major: e.detail.value
    })
  },
  // 留学经历
  bindStatusChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      lip: e.detail.value,
      studyExperience : this.data.status[e.detail.value]
    });
  },
  // 保存
  formSubmit: function (e) {
    var exId = this.data.orderId;                    // 个人id
    var start = this.data.sdate;                    // 开始时间
    var end = this.data.date;                    // 结束时间
    var school = this.data.school;         //学校
    var education = this.data.education;        //学历
    var major = this.data.major;        //行业
    var studyExperience = this.data.studyExperience   //留学经历

    //学校名称
    if (school === '') {
      wx.showToast({
        title: '请填写学校名称',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //学历
    if (education === '') {
      wx.showToast({
        title: '请填写学历',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //行业
    if (major === '') {
      wx.showToast({
        title: '请填写专业名称',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    var obj = {
      "id": exId,
      "startDate": start,
      "graduationDate": end,
      "school": school,
      "education": education,
      "major": major,
      "studyExperience": studyExperience
    }
    var obj1 = JSON.stringify(obj);
    JSON.parse(obj1)
    console.log(obj1)
    wx.request({
      method: 'POST',
      method: 'POST',
      header: {
        'userId': app.globalData.userId
      },
      url: app.globalData.url +'/ik-wechat/api/eduexp/saveorupdate',
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
    console.log(id);
    // 获取数据
    wx.request({
      method: 'POST',
      url: app.globalData.url +"/ik-wechat/api/eduexp/detail",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userId': app.globalData.userId
      },
      data: {
        id: id
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code === '200') {
          console.log(res.data.data);
          that.setData({
            sdate: res.data.data.startDate,
            date: res.data.data.graduationDate,
            school: res.data.data.school,
            education: res.data.data.education ,
            major: res.data.data.major,
            studyExperience: res.data.data.studyExperience 
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