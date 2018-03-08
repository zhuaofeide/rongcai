// pages/expDes/expDes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txtLeng: 0,
    text: ''
  },
  // 保存
  bindFormSubmit: function (e) {
    if (e.detail.value.textarea != '') {
      wx.setStorage({
        key: "jobDescription",
        data: this.data.text,
        success: function (res) {
          console.log(res.errMsg)
          wx.showToast({
            title: '保存成功',
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
        }
      })
    }
  },
  textLentgh: function (e) {
    this.setData({
      txtLeng: e.detail.value.length,
      text: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'jobDescription',
      success: function (res) {
        that.setData({
          text: res.data
        });
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