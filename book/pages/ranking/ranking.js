const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week: "",
    month: "",
    total: "",
    id: "",
    num: 0,
    books: [],
  },
  // 具体详情
  novel(e) {
    console.log(e)
    let novelid = e.currentTarget.dataset.item._id
    let title = e.currentTarget.dataset.item.title
    wx.navigateTo({
      url: `/pages/novel/novel?novelid=${novelid}&title=${title}`,
    })
  },
  week() {
    this.setData({
      num: 0,
      id: this.data.week
    })
    this.ranklist()
  },
  month() {
    this.setData({
      num: 1,
      id: this.data.month
    })
    this.ranklist()
  },
  total() {
    this.setData({
      num: 2,
      id: this.data.total
    })
    this.ranklist()
  },
  //榜单封装方法
  ranklist() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/ranking/${this.data.id}`).then(res => {
      wx.hideLoading()
      let books = res.data.ranking.books
      this.setData({
        books
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  // 排名详情
  rankInfo() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/ranking/${this.data.id}`).then(res => {
      wx.hideLoading()
      let week = res.data.ranking._id
      let month = res.data.ranking.monthRank
      let total = res.data.ranking.totalRank
      let books = res.data.ranking.books
      this.setData({
        week,
        month,
        total,
        books
      })
      console.log(res)
      console.log(this.data.week)
      console.log(this.data.month)
      console.log(this.data.total)
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
    let id = options.id
    let title = options.title
    wx.setNavigationBarTitle({
      title: title,
    })
    this.setData({
      id
    })
    this.rankInfo()
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