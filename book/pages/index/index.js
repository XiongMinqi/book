const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rst: true,
    novel: [],
    chapters: [],
    firstlink: "",
    title: "",
  },
  clear() {
    wx.removeStorageSync("novel")
  },
  delete(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.data.novel.splice(index, 1)
    this.setData({
      novel: this.data.novel
    })
    wx.setStorageSync("novel", this.data.novel)
  },
  // 直接阅读
  read(e) {
    console.log(e)
    wx.setStorageSync("index", 0)
    let id = e.currentTarget.dataset.item._id
    this.setData({
      id
    })
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
      wx.hideLoading()
      let chapters = res.data.mixToc.chapters
      let firstlink = chapters[0].link
      let title = chapters[0].title
      this.setData({
        chapters,
        firstlink,
        title
      })
      wx.setStorageSync("title", this.data.title)
      wx.navigateTo({
        url: `/pages/read/read?link=${firstlink}`
      })
      console.log(res)
      console.log(this.data.chapters, 21356)
      console.log(this.data.firstlink, "firstlink")
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  getbook() {
    app.globalData.fly.get("")
  },
  help() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  choose() {
    this.setData({
      rst: !this.data.rst
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let novel = wx.getStorageSync("novel")
    this.setData({
      novel
    })
    console.log(this.data.novel)
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
    console.log("下拉刷新")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(11111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})