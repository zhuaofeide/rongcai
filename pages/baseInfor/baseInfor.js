// pages/baseInfor/baseInfor.js
const app = getApp();
const avatarPath ="http://www.romcai.com:80/static/attached";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    path:'../../images/icon/default.png',
    path2: '../../images/icon/default.png',
    path1: '',
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
    state: ['请选择', '在职', '离职'],
    objectState: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '在职'
      },
      {
        id: 2,
        name: '离职',
      }
    ],
    cardtype: ['请选择', '身份证'],
    objectCardtype: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '身份证'
      },
    ],
    status: ['请选择', '已婚', '未婚'],
    objectStatus: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '已婚'
      },
      {
        id: 2,
        name: '未婚',
      }
    ],
    focus: false,
    index: 0,
    inner: 0,
    cardinner: 0,
    lip: 0,
    customItem: '', 
    relname:'',    // 姓名
    gender:'请选择',  //性别
    birth:'',  // 出生日期
    phone:'',     // 手机号
    jobStatus:'请选择',  //求职状态
    start:'请选择',     // 开始工作
    idtype:'请选择',      // 证件类型
    idcard:'',    // 证件号
    email:'',       // 邮箱
    bdate: '请选择',    // 出生日期
    wdate: '请选择',     
    marriage:'请选择',      // 婚姻状态 
    region: ['广东省', '深圳市', '宝安区'],   // 居住地址
    local: ['广东省', '深圳市', '宝安区'],      // 户籍地址
    addId:'',
    userid:'',
    baseInfor:[],
    defaultSelect:'请选择'
  },
  //头像选择
  selectImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var path = res.tempFilePaths
        console.log(path)
        that.setData({
          path: res.tempFilePaths[0]
        })
        wx.uploadFile({
          header: {
            'content-type': 'application/x-www-form-urlencoded',// 默认值
            'userId': app.globalData.userId
          },
          url: app.globalData.url + '/ik-wechat/api/commons/file/batch/upload',
          filePath: that.data.path,
          name: 'file',
          formData: {
            'user': 'test',
            'prefixName':'avatar'
          },
          success: function (res) {
            console.log(res.data)
            var lap = JSON.parse(res.data)
            console.log(lap)
            console.log(lap.data[0].relativePath)
            var src = lap.data[0].relativePath
            if (lap.code === '200') {
              that.setData({
                path: avatarPath + src,
                path1: src
              })
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000,
                success: function () {
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
      }  
    })
  },
  // 姓名
  relname: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      relname: e.detail.value
    })
  },

  // 性别选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      gender: this.data.sex[e.detail.value]
    })
  },
  // 出生日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      bdate: e.detail.value
    })
  },
  // 手机号
  phone: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },
  bindKeyPhone: function (e) {   
    var phone = e.detail.value;
    if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
        wx.showToast({
          title: '手机号格式不正确',
          image: '../../images/icon/warm.png',
          duration: 1000
        })
        return;
    }
  },
  // 职位状态
  bindStateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      inner: e.detail.value,
      jobStatus: this.data.state[e.detail.value]
    })
  },
  // 工作年份
  bindWorkDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      wdate: e.detail.value
    })
  },
  // 居住地
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 邮箱
  email: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      email: e.detail.value
    })
  },
  bindKeyEmail: function (e) {   //获取input输入的值
    var email = e.detail.value;

      if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
        wx.showToast({
          title: '邮箱格式不正确',
          image: '../../images/icon/warm.png',
          duration: 1000
        })
        return;
    }
  },
  // 证件类型
  bindCardChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cardinner: e.detail.value,
      idtype: this.data.cardtype[e.detail.value]
    })
  },
  // 证件号
  idCard: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      idcard: e.detail.value
    })
  },
  bindKeyCard: function (e) {   //获取input输入的值
    var Number = e.detail.value;

      if (!(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(Number))) {
        wx.showToast({
          title: '身份证格式不正确',
          image: '../../images/icon/warm.png',
          duration: 1000
        })
        return;
      }
  },
  // 户籍地
  bindLocalChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      local: e.detail.value
    })
  },
  // 婚姻状态
  bindStatusChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      lip: e.detail.value,
      marriage: this.data.status[e.detail.value]
    })
  },
  // 保存
  formSubmit: function (e) {
    var that=this;
    var name = that.data.relname;   //姓名 
    var path = that.data.path1;   //头像
    var gender = that.data.gender; // 性别
    var date = that.data.bdate; // 出生日期
    var phone = that.data.phone; // 手机号
    var jobStatus = that.data.jobStatus; // 求职状态
    var wdate = that.data.wdate; // 工作年份
    var region = that.data.region; // 居住地
    var email = that.data.email; // 邮箱
    var idtype = that.data.idtype; // 证件类型
    var idcard = that.data.idcard; // 证件号
    var local = that.data.local;  // 户籍所在地
    var marriage = that.data.marriage; //婚姻状态
    var resumeId = that.data.addId; //简历id
    var userid = that.data.userid;


    var obj = {
      "avatar": path,
      "realname": name,
      "sex": gender,
      "birthday": date,
      "mobile": phone,
      "jobStatus": jobStatus,
      "workingYear":wdate,
      // "address": region,
      "nowProvince": region[0],  //居住地
      "nowCity": region[1],
      "nowDistrict": region[2],
      "email": email,
      "idType": idtype,
      "idNo": idcard,
      // "domicilePlace": local,   //户籍
      "province": local[0],
      "city": local[1],
      "district": local[2],
      "maritalStatus": marriage,
      "id": resumeId,
      "userId": userid
    }

    //姓名
    if (name === '' || name === undefined) {
      wx.showToast({
        title: '请填写姓名',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //性别
    if (gender === '' || gender === '请选择') {
      wx.showToast({
        title: '请选择性别',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //出生日期
    if (date === '' || date === '请选择') {
      wx.showToast({
        title: '请选择出生日期',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //手机号
    if (phone === '') {
      wx.showToast({
        title: '请填写手机号',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return;
    }
    //求职状态
    if (jobStatus === '' || jobStatus === '请选择') {
      wx.showToast({
        title: '请选择求职状态',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //工作年份
    if (wdate === '' || wdate === '请选择') {
      wx.showToast({
        title: '请选择工作年份',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //居住地
    if (region === '' || region === '请选择') {
      wx.showToast({
        title: '请选择工作年份',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //邮箱
    if (email === '') {
      wx.showToast({
        title: '请填写邮箱',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
      wx.showToast({
        title: '邮箱格式不正确',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return;
    }
    //证件类型
    if (idtype === '' || idtype === '请选择') {
      wx.showToast({
        title: '请选择证件类型',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //证件号
    if (idcard === '') {
      wx.showToast({
        title: '请填写证件号',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }

    if (!(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(idcard))) {
      wx.showToast({
        title: '身份证格式不正确',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return;
    }
    //户籍所在地
    if (local === '' || local === '请选择') {
      wx.showToast({
        title: '请选择户籍地',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    //婚姻状态
    if (marriage === '' || marriage === '请选择') {
      wx.showToast({
        title: '请选择婚姻状态',
        image: '../../images/icon/warm.png',
        duration: 2000
      })
      return
    }
    // console.log(obj)
    var obj1 = JSON.stringify(obj);
   
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
  //获取个人信息
  getDetail: function (userid, resumeid){
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
        if (res.data.code === '200' && res.data.data.status==0) {
          console.log(res.data.data);
          that.setData({
            baseInfor: res.data.data
          })
          console.log(that.data.baseInfor.avatar);
          that.setData({
            path:res.data.data.avatar,    //头像
            relname: res.data.data.realname,    //姓名
            phone: res.data.data.mobile,    // 手机号
            email: res.data.data.email,    // 邮箱
            idcard: res.data.data.idNo,    // 身份证
            bdate: res.data.data.birthday,  // 出生日期
            wdate: res.data.data.workingYear, // 工作年份
            region: [res.data.data.nowProvince, res.data.data.nowCity, res.data.data.nowDistrict], // 居住地
            local: [res.data.data.province, res.data.data.city, res.data.data.district],  // 户籍
            idtype: res.data.data.idType,  //证件类型
            marriage: res.data.data.maritalStatus,   //婚姻状态
            jobStatus: res.data.data.jobStatus,   //工作状态
            gender: res.data.data.sex,   //性别
          });
        }else{

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      addId: options.resumeid,      //存储id
      userid: app.globalData.userId      //存储id
    });
    console.log(this.data.addId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var resumeid = this.data.addId; // 获取简历id
    var userid = this.data.userid;   // 获取经验id
    this.getDetail(userid, resumeid);
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