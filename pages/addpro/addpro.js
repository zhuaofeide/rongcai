// pages/addexp/addexp.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ['请选择', '男', '女'],
    objectSex: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '男'
      },
      {
        id: 2,
        name: '女',
      }
    ],
    status: ['请选择', '技能', '研究', '管理'],
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
    company: function (e) {   //获取input输入的值
      var that = this;
      that.setData({
        company: e.detail.value
      })
    },
    pro: function (e) {   //获取input输入的值
      var that = this;
      that.setData({
        pro: e.detail.value
      })
    },
    focus: true,
    index: 0,
    inner: 0,
    lip: 0,
    length:0,
    length2:0,
    sdate: '请选择',
    date: '请选择',
    start:'',
    end:'',
    itemDescription:'',
    dutyDescription:'',
    addId: '',
    userid: ''
  },
  // 入职时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var ss = e.detail.value
    var d2 = new Date(this.data.date.replace(/\-/g, "\/"));
    var d1 = new Date(ss.replace(/\-/g, "\/"));
    if (d1 > d2) {
      console.log(d1)
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
    if(d1>d2){
      console.log(d1)
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
  descP: function () {
    wx.navigateTo({
      url: '../prodes/prodes'
    })
  },
  // 责任描述
  descR: function () {
    wx.navigateTo({
      url: '../resdes/resdes'
    })
  },


  // 保存
  formSubmit: function (e) {
    var start = this.data.start;                    // 开始时间
    var end = this.data.end;                    // 结束时间
    var pro = e.detail.value.pro2;         //获取项目名称
    var itemDescription = this.data.itemDescription;
    var dutyDescription = this.data.dutyDescription;
    var company = e.detail.value.company2;         //获取项目名称
    var resumeId = this.data.addId;
    //请选择开始时间
    if (start === '') {
      wx.showToast({
        title: '请选择开始时间',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //请选择结束时间
    if (end === '') {
      wx.showToast({
        title: '请选择结束时间',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }

    //项目名称
    if (pro === '') {
      wx.showToast({
        title: '请填写项目名称',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //项目描述
    if (itemDescription === '') {
      wx.showToast({
        title: '请填写项目描述',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //责任描述
    if (dutyDescription === '') {
      wx.showToast({
        title: '请填写责任描述',
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
      "startDate": start,
      "endDate": end,
      "belongCompany": company,
      "itemName": pro,
      "itemDescription": itemDescription,
      "dutyDescription": dutyDescription,
      "resumeId": resumeId,
    }
    var obj1 = JSON.stringify(obj);
    JSON.parse(obj1);
    // console.log(obj1)
    var userid = this.data.userid
    wx.request({
      method: 'POST',
      header: {
        'userId': userid,
      },
      url: app.globalData.url +'/ik-wechat/api/itemexp/saveorupdate',
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
      fail:(req)=>{
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
      key: 'itemDescription',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          length: res.data.length,
          itemDescription: res.data
        })
      }
    })
  },
  getLength1: function () {
    var that = this;
    wx.getStorage({
      key: 'dutyDescription',
      success: function (res) {
        console.log(res.data)
        that.setData({
          length2: res.data.length,
          dutyDescription: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var addId = options.addId; // 获取简历id
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
    this.getLength1();
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