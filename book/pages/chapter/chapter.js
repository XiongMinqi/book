const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    chapters: [],
    link: "",
    title: "",
    index: 0,
  },
  //目录
  chapter() {
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
      wx.hideLoading()
      let chapters = res.data.mixToc.chapters
      this.setData({
        chapters
      })
      console.log(res)
      console.log(this.data.chapters, 21356)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  //阅读
  read(e){
    console.log(e)
    let link = e.currentTarget.dataset.item.link
    let title = e.currentTarget.dataset.item.title
    let index = e.currentTarget.dataset.index
    this.setData({
      link,
      title,
      index
    })
    wx.setStorageSync("title", this.data.title)
    wx.setStorageSync("index", this.data.index)
    wx.navigateTo({
      url: `/pages/read/read?link=${link}`
    })
    console.log(this.data.link,this.data.title)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let id = options.id
    
    this.setData({
      id
    })
    wx.setStorageSync("bookid", this.data.id)
    this.chapter()
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