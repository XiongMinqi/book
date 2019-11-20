const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    man: [],
    woman: [],
    press: [],
    female: [],
    male: [],
    name: "",
    index: 0
  },
  fenlei() {
    this.setData({
      num: 1
    })
  },
  paihang() {
    this.setData({
      num: 0,
    })
  },
  getbook() {
    app.globalData.fly.get('/cats/lv2/statistics').then(res => {
      let man = res.data.male;
      let woman = res.data.female;
      let press = res.data.press;
      this.setData({
        man,
        woman,
        press
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getranking() {
    app.globalData.fly.get('/ranking/gender').then(res => {
      let female = res.data.female.splice(0, 6)
      let male = res.data.male.splice(0, 6)
      this.setData({
        female,
        male
      })
      // console.log(res);
      // console.log(male)
    }).catch(err => {
      console.log(err)
    })
  },
  classification(e) {
    console.log(e)
    let name = e.currentTarget.dataset.item.name
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/classification/classification?name=${name}&index=${index}&sex=male`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getbook();
    this.getranking();
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