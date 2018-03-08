// pages/addexp/addexp.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ['请选择', '月薪', '年薪'],
    objectTypes: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '月薪'
      },
      {
        id: 2,
        name: '年薪',
      }
    ],
    name: function (e) {   //获取input输入的值
      var that = this;
      that.setData({
        name: e.detail.value
      })
    },
    industry: function (e) {   //获取input输入的值
      var that = this;
      that.setData({
        industry: e.detail.value
      })
    },
    cashs: ['请选择', '6-8k', '8-10k', '10-15k','15K以上'],
    objectCashs: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '6-8k'
      },
      {
        id: 2,
        name: '8-10k',
      },
      {
        id: 3,
        name: '10-15k',
      },
      {
        id: 4,
        name: '15K以上',
      }
    ],
    status: ['请选择', '全职', '兼职'],
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
    region: ['广东省', '深圳市', '宝安区'],
    focus: true,
    index: 0,
    inner: 0,
    lip: 0,
    length:0,
    wageType:'', //薪资类型
    expectedSalary:'',  //期望薪资
    jobType:'',      // 工作类型
    arriveTime:'请选择',  //到岗时间
    sdate: '请选择',    
    date: '请选择', 
    selfEvaluation:'',  //自我评价
    addId: '',
    userid:'',
    industry2:'',
    defaultSelect:'请选择'
  },
  // 地点
  bindPositionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 薪资类型
  bindeTypeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', this.data.types[e.detail.value])
    this.setData({
      index: e.detail.value,
      wageType: this.data.types[e.detail.value]
    })
  },
  // 期望薪资
  bindeCashChange: function (e) {
    // console.log('picker发送选择改变，携带值为', this.data.cashs[e.detail.value])
    this.setData({
      inner: e.detail.value,
      expectedSalary: this.data.cashs[e.detail.value]
    })
  },
  // 工作类型
  bindStatusChange: function (e) {
    // console.log('picker发送选择改变，携带值为',this.data.status[e.detail.value])
    this.setData({
      lip: e.detail.value,
      jobType: this.data.status[e.detail.value]
    })
  },

  // 到岗时间
  bindStateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      arriveTime: e.detail.value
    })
  },
  // 自我评价
  descR: function () {
    wx.navigateTo({
      url: '../assessment/assessment'
    })
  },
  //提交
  formSubmit: function (e) {
    var that=this;
    wx.getStorage({
      key: 'selfEvaluation',
      success: function (res) {
        console.log(res.data)
        that.setData({
          selfEvaluation: res.data
        })
      }
    })
    var address = this.data.region;             // 地址
    var name2 = e.detail.value.name2;         //获取input初始值
    var wageType = this.data.wageType;      // 薪资类型
    var expectedSalary = this.data.expectedSalary;         // 期望薪资
    var jobType = this.data.jobType;                    // 工作类型
    var industry2 = e.detail.value.industry2;         //行业
    var arriveTime = this.data.arriveTime;                    // 到岗时间
    var selfEvaluation = this.data.selfEvaluation;            // 自我评价        
    var resumeId = this.data.addId;
    var userid = this.data.userid;

    //姓名
    if (name2 === '' || name2 === undefined){
      wx.showToast({
        title: '请输入职位',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //薪资类型
    if (wageType === '请选择' || wageType === undefined || wageType === '') {
      wx.showToast({
        title: '请选择薪资类型',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }// 期望薪资
    if (expectedSalary === '请选择' || expectedSalary === '' || expectedSalary === undefined) {
      wx.showToast({
        title: '请选择期望薪资',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //工作类型
    if (jobType === '请选择' || jobType === '' || jobType === undefined) {
      wx.showToast({
        title: '请选择工作类型',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //行业
    if (industry2 === '' || industry2 === undefined) {
      wx.showToast({
        title: '请填写行业',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //到岗时间
    if (arriveTime === '' || arriveTime === '请选择' || arriveTime === undefined) {
      wx.showToast({
        title: '请选择到岗时间',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //评价
    if (selfEvaluation === '' || selfEvaluation === undefined) {
      wx.showToast({
        title: '请填写评价',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    var obj={
      "province": address[0],
      "city": address[1], 
      "district": address[2],
      "position": name2,
      "wageType": wageType,
      "expectedSalary": expectedSalary,
      "jobType": jobType,
      "industry": industry2,
      "arriveTime": arriveTime,
      "selfEvaluation": selfEvaluation,
      "id": resumeId,
      "userId": userid
    }
    var obj1 = JSON.stringify(obj);
    JSON.parse(obj1);
    console.log(obj1);
   
    wx.request({
      method: 'POST',
      header: {
        'userId': userid
      },
      url: app.globalData.url +'/ik-wechat/api/resume/saveorupdate',
      data: obj1,
      success: (res) => {
        wx.hideLoading();
        console.log(res)
        if (res.data.code === '200' ) {
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
  // 获取评价长度
  getLength:function(){
    var that = this;
    wx.getStorage({
      key: 'selfEvaluation',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          length: res.data.length,
          selfEvaluation: res.data
        })
      }
    })
  },
  //获取个人信息
  getDetail: function (userid, resumeid) {
    var that=this;
    // 获取数据
    wx.request({
      method: 'POST',
      url: app.globalData.url + "/ik-wechat/api/resume/detail",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userId': userid
      },
      data: {
        resumeId: resumeid
      },
      success: (res) => {
        wx.hideLoading();
        console.log(res);
        if (res.data.code === '200' && res.data.data.legnth !== 0) {
          console.log(res.data.data);
          that.setData({
            name: res.data.data.position,    //职位
            wageType: res.data.data.wageType,    // 薪资类型
            expectedSalary: res.data.data.expectedSalary,    // 期望薪资
            jobType: res.data.data.jobType,    // 工作类型
            industry2: res.data.data.industry,  // 行业
            arriveTime: res.data.data.arriveTime, // 到岗时间
            selfEvaluation: res.data.data.selfEvaluation,
            region: [res.data.data.province, res.data.data.city, res.data.data.district], // 地点
          });
         
        }
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
      addId: options.resumeid,      //存储id
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
    var resumeid = this.data.addId; // 获取简历id
    var userid = this.data.userid;   // 获取经验id
    this.getDetail(userid, resumeid);
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