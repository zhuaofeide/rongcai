// pages/image-interview/image-interview.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '../../images/icon/bgimg.png',
    limg: '../../images/icon/camare.png',
    savedFilePath: '',
    up: true,
    id: ''
  },

  //图片选择
  selectImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var path = res.tempFilePaths[0]
        console.log(res)
        // console.log(path)
        that.setData({
          img: path,
          up: false
        })
        // 保存本地
        // wx.saveFile({
        //   tempFilePath: path,
        //   success: function (res) {
        //     console.log(res)
        //     // var savedFilePath = res.savedFilePath
        //     that.setData({
        //       img: res.savedFilePath,
        //       up: false
        //     })
        //   }
        // })
      }
    })
  },
  // 保存
  saveInfor: function (e) {
    var id = this.data.id;
    this.setInfor(id);
    // wx.getSavedFileList({
    //   success: function (res) {
    //     console.log(res.fileList)
    //   }
    // })
  },
  //保存请求
  setInfor: function (id) {
    wx.uploadFile({
      header: {
        'content-type': 'application/x-www-form-urlencoded',// 默认值
        'userId': id
      },
      url: app.globalData.url + '/ik-wechat/api/resume/filesUpload',
      filePath: this.data.img,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        var data = res.data
        console.log(res)
        var lap = JSON.parse(res.data)
        if (lap.code === '200') {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/my-resume/my-resume'
                })
                // wx.navigateBack({
                //   delta: 2
                // })
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: '请求异常',
            image: '../../images/icon/warm.png',
            duration: 2000
          })
        }
      },
      fail: function (req) {
        wx.showToast({
          title: '请求有误',
          image: '../../images/icon/warm.png',
          duration: 2000
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: app.globalData.userId
    })
    // console.log(id);
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