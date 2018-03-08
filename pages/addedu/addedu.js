// pages/addexp/addexp.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: ['请选择', '有', '无'],
    objectStatus: [
      {
        id: 0,
        name: '请选择'
      },
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
    sdate: '请选择',
    date: '请选择',
    start: '',
    end: '',
    userid: '',
    studyExperience:'',
    addId: '',
    school: function (e) {   //获取input输入的值
      var that = this;
      that.setData({
        school: e.detail.value
      })
    },
    education: function (e) {   //获取input输入的值
      var that = this;
      that.setData({
        education: e.detail.value
      })
    },
    major: function (e) {   //获取input输入的值
      var that = this;
      that.setData({
        major: e.detail.value
      })
    }
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
      sdate: e.detail.value,
      start: e.detail.value
    })
  },
  // 毕业时间
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

  // 留学经历
  bindStatusChange: function (e) {
    // console.log('picker发送选择改变，携带值为', this.data.status[e.detail.value])
    this.setData({
      lip: e.detail.value,
      studyExperience: this.data.status[e.detail.value]
    })
  },
  //提交
  formSubmit: function (e) {
    var start = this.data.start;                    // 开始时间
    var end = this.data.end;                    // 结束时间
    var school = e.detail.value.pro2;         //学校
    var education = e.detail.value.pro3;         //学历
    var major = e.detail.value.pro4;         //专业
    var studyExperience = this.data.studyExperience;  // 留学经历
    var resumeId = this.data.addId;

    //请选择开始时间
    if (start === '') {
      wx.showToast({
        title: '请选择入学时间',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //请选择结束时间
    if (end === '') {
      wx.showToast({
        title: '请选择毕业时间',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }

    //学校
    if (school === '') {
      wx.showToast({
        title: '请填写学校',
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
    //专业
    if (major === '') {
      wx.showToast({
        title: '请填写专业',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //留学经历
    if (studyExperience === '' || studyExperience === '请选择') {
      wx.showToast({
        title: '请选择留学经历',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    var obj = {
      "startDate": start,
      "graduationDate": end,
      "school": school,
      "major": major,
      "education": education,
      "studyExperience": studyExperience,
      "resumeId": resumeId
    }
    var obj1 = JSON.stringify(obj);
    JSON.parse(obj1)
    // console.log(obj1)
    var userid = this.data.userid
    wx.request({
      method: 'POST',
      header: {
        'userId': userid,
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
          wx.hideLoading();
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
  onLoad: function (options) {
    // var addId = options.addId; // 获取简历id
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