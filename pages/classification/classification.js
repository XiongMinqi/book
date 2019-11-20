const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    index: 0,
    man: [],
    booklist: [],
    sex: "",
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],

  },
  getchoose() {
    if (this.data.sex === "male") {
      app.globalData.fly.get('/cats/lv2').then(res => {
        let man = res.data.male
        this.setData({
          man
        })
        man.map((rst, index) => {
          if (rst.major === this.data.name) {
            let booklist = rst.mins
            this.setData({
              booklist
            })
          }
        })
        // console.log(this.data.man, "man")
        console.log(this.data.booklist, "booklist")
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)

    this.setData({
      name: options.name,
      index: options.index,
      sex: options.sex
    })
    console.log(this.data.sex)
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.getchoose()
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