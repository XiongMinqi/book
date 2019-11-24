const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    num: 0,
    novelid: 0,
    id: "hot",
    bookid: "",
    sum: 50,
    book: [],
    booklist: [],
    sex: "",
    bookdetails: [],
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
  scroll(e) {
    // console.log(e)
  },
  color(e) {
    console.log(e);
    this.setData({
      num: e.currentTarget.dataset.index, //按钮CSS变化
      id: e.currentTarget.dataset.item.id
    })
    this.getallbook()
  },
  bgcolor(e) {
    console.log(e);
    this.setData({
      sum: e.currentTarget.dataset.index, //按钮CSS变化
      bookid: e.currentTarget.dataset.item
    })
    this.getallbook()
  },
  getchoose() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.sex === "male") {
      app.globalData.fly.get('/cats/lv2').then(res => {
        wx.hideLoading()
        let book = res.data.male
        this.setData({
          book
        })
        book.map((rst, index) => {
          if (rst.major === this.data.name) {
            let booklist = rst.mins
            this.setData({
              booklist
            })
          }
        })
        // console.log(this.data.book, "book")
        // console.log(this.data.booklist, "booklist")
        // console.log(res)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    }
    if (this.data.sex === "female") {
      app.globalData.fly.get('/cats/lv2').then(res => {
        wx.hideLoading()
        let book = res.data.female
        this.setData({
          book
        })
        book.map((rst, index) => {
          if (rst.major === this.data.name) {
            let booklist = rst.mins
            this.setData({
              booklist
            })
          }
        })
        // console.log(this.data.book, "book")
        // console.log(this.data.booklist, "booklist")
        // console.log(res)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    }
    if (this.data.sex === "publish") {
      app.globalData.fly.get('/cats/lv2').then(res => {
        wx.hideLoading()
        let book = res.data.press
        this.setData({
          book
        })
        book.map((rst, index) => {
          if (rst.major === this.data.name) {
            let booklist = rst.mins
            this.setData({
              booklist
            })
          }
        })
        // console.log(this.data.book, "book")
        // console.log(this.data.booklist, "booklist")
        // console.log(res)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    }
  },
  // book详情
  getallbook() {
    wx.showLoading({
      title: '加载中',
    })
    if(this.data.bookid!==undefined){
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.sex}&type=${this.data.id}&major=${this.data.name}&minor=${this.data.bookid}&start=${0}&limit=20`).then(res => {
        wx.hideLoading()
        let bookdetails = res.data.books
        this.setData({
          bookdetails
        })
        // console.log(res)
        // console.log(this.data.bookdetails, "bookdetails")
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    }
    if (this.data.bookid === undefined) {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.sex}&type=${this.data.id}&major=${this.data.name}&start=${0}&limit=20`).then(res => {
        wx.hideLoading()
        let bookdetails = res.data.books
        this.setData({
          bookdetails
        })
        // console.log(res)
        // console.log(this.data.bookdetails, "bookdetails")
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    }
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
    // console.log(this.data.sex)
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.getchoose()
    this.getallbook();
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