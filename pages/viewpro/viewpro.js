// pages/addexp/addexp.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0,
    status: ['技能', '研究', '管理'],
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
    sdate: '',
    date: '',
    itemName: '',
    company: '',
    length: 0,
    length2: 0,
    itemDescription: '',
    dutyDescription: '',
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
  //项目名称
  bindKeyInput: function (e) {
    this.setData({
      itemName: e.detail.value
    })
  },
  //公司
  bindKeyCompany: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  // 工作描述
  descP: function () {
    wx.navigateTo({
      url: '../id-prodes/prodes'
    })
  },
  // 责任描述
  descR: function () {
    wx.navigateTo({
      url: '../id-resdes/resdes'
    })
  },
  // 公司规模
  bindStateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      inner: e.detail.value
    })
  },
  // 工作类型
  bindStatusChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      lip: e.detail.value
    })
  },
  // 保存
  formSubmit: function (e) {
    var exId = this.data.orderId;                    // 个人id
    var start = this.data.sdate;                    // 开始时间
    var end = this.data.date;                    // 结束时间
    var company = this.data.company;         //公司
    var itemName = this.data.itemName;        //项目名称
    var itemDescription = this.data.itemDescription   //描述
    var dutyDescription = this.data.dutyDescription;     // 规模

    //公司名称
    if (company === '') {
      wx.showToast({
        title: '请填写公司名称',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //项目
    if (itemName === '') {
      wx.showToast({
        title: '请填写职位名称',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    var obj = {
      "id": exId,
      "startDate": start,
      "endDate": end,
      "belongCompany": company,
      "itemName": itemName,
      "itemDescription": itemDescription,
      "dutyDescription": dutyDescription
    }
    var obj1 = JSON.stringify(obj);
    JSON.parse(obj1)
    console.log(obj1)
    wx.request({
      method: 'POST',
      header: {
        'userId': app.globalData.userId
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
    this.data.orderId = orderId;
    this.setData({
      orderId: orderId
    });
    var that = this;
    var id = that.data.orderId;
    // 获取数据
    wx.request({
      method: 'POST',
      url: app.globalData.url+"/ik-wechat/api/itemexp/detail",
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
            date: res.data.data.endDate,
            company: res.data.data.belongCompany,
            itemName: res.data.data.itemName,
            itemDescription: res.data.data.itemDescription,
            dutyDescription: res.data.data.dutyDescription,
            length2: res.data.data.dutyDescription.length,
            length: res.data.data.itemDescription.length
          });
          wx.setStorage({
            key: "iditemDescription",
            data: this.data.itemDescription,
            success: function (res) {
              console.log(res.errMsg)
            }
          })
          wx.setStorage({
            key: "iddutyDescription",
            data: this.data.dutyDescription,
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
    //项目
    var that = this;
    wx.getStorage({
      key: 'iditemDescription',
      success: function (res) {
        that.setData({
          length: res.data.length,
          itemDescription: res.data
        });
      }
    }),
      wx.getStorage({
        key: 'iddutyDescription',
        success: function (res) {
          that.setData({
            length2: res.data.length,
            dutyDescription: res.data
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