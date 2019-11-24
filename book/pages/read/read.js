const app = getApp()
var WxParse = require('../../lib/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: "",
    body: "",
    title: "",
    loading: false,
    plain: false,
    disabled: false,
    name: "",
    index: 0,
    id: "",
    chapters: [],
    beforelink: "",
    afterlink: "",
  },
  before() {
    if (this.data.index === 0) {
      wx.showToast({
        title: '当前已是第一章',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        index: 0
      })
    } else {
      let indexnum = this.data.index - 1
      this.setData({
        index:indexnum
      })
    }
    wx.setStorageSync("index", this.data.index)
    this.changzhangjie()
  },
  after() {
    let index = this.data.index + 1
    this.setData({
      index
    })
    wx.setStorageSync("index", index)
    this.changzhangjie()
  },
  //切换章节方法
  changzhangjie() {
    //先获取章节link
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
      wx.hideLoading()
      let chapters = res.data.mixToc.chapters
      let link = chapters[this.data.index].link
      let title = chapters[this.data.index].title
      wx.setStorageSync("title", title)
      this.setData({
        chapters,
        link
      })
      this.read()
      console.log(res)
      console.log(this.data.chapters, 21356)
      console.log(this.data.link, "beforelink")
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  read() {
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(this.data.link)}`).then(res => {
      wx.hideLoading()
      let body = res.data.chapter.body
      let title = wx.getStorageSync("title")
      this.setData({
        body,
        title
      })
      // WxParse.wxParse(bindName, type, data, target, imagePadding)
      // 1.bindName绑定的数据名(必填)
      // 2.type可以为html或者md(必填)
      // 3.data为传入的具体数据(必填)
      // 4.target为Page对象, 一般为this(必填)
      // 5.imagePadding为当图片自适应是左右的单一padding(默认为0, 可选)
      let that = this;
      WxParse.wxParse('courseDetail', 'md', this.data.body, that, 5)

      console.log(res)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let link = options.link
    let title = wx.getStorageSync("title")
    let name = wx.getStorageSync("bookname")
    let index = wx.getStorageSync("index")
    let id = wx.getStorageSync("bookid")
    this.setData({
      link,
      title,
      name,
      index,
      id
    })
    wx.setNavigationBarTitle({
      title: this.data.name
    })
    console.log(this.data.link, this.data.title, this.data.index)
    this.read()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})