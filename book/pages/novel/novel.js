const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 1,
    novelid: 0,
    comments: [],
    relationbook: [],
    relation: [],
    novel: {},
    warnSize: 'default',
    defaultSize: 'default',
    loading: false,
    plain: false,
    disabled: false,
    num: 0, //后端给的分数,显示相应的星星
    one: "",
    two: "",
    name: "",
    toView: 'green',
    id: "",
    chapters: [],
    firstlink: "",
    title: "",
    rst: false,
  },
  detail() {
    this.setData({
      number: 1
    })
  },
  pinglun() {
    this.setData({
      number: 0,
    })
  },
  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  //获取书籍详情
  getnoval() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/book/${this.data.novelid}`).then(res => {
      wx.hideLoading()
      let novel = res.data
      let number = res.data.rating.score
      let num = Math.floor(Math.round(number) / 2)

      let one = num
      let two = 5 - num
      this.setData({
        novel,
        num,
        one,
        two
      })
      console.log(res)
      console.log(novel)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  // 获取相关书籍
  getrelation() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/book/${this.data.novelid}/recommend`).then(res => {
      wx.hideLoading()
      let relationbook = res.data.books
      let relation = this.getRandom(relationbook, 3)
      this.setData({
        relationbook,
        relation
      })
      // console.log(res)
      // console.log(this.data.relationbook)
      // console.log(this.data.relation)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  //相关书籍跳转详情页
  relationbook(e) {
    console.log(e)
    let novelid = e.currentTarget.dataset.item._id
    let title = e.currentTarget.dataset.item.title
    this.setData({
      novelid,
      title
    })
    wx.navigateTo({
      url: `/pages/novel/novel?novelid=${novelid}&title=${title}`,
    })

  },
  // 换一换
  change() {
    let relation = this.getRandom(this.data.relationbook, 3)
    this.setData({
      relation
    })
    console.log(this.data.relation)
  },
  //从数组从随机取三个值
  getRandom(arr, count) {
    let shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },
  //评论
  getcomments() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/post/short-review?book=${this.data.novelid}&total=true&sortType=newest`).then(res => {
      wx.hideLoading()
      let comments = res.data.docs
      this.setData({
        comments
      })
      // console.log(res)
      // console.log(this.data.comments, "comments")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  //章节目录
  list(e) {
    console.log(e)
    let id = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/chapter/chapter?id=${id}`,
    })
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
  // 加入书架
  bookcase(e) {
    console.log(e)
    if (this.data.rst === false) {
      this.setData({
        rst: true
      })
      let novel = {
        novelmsg: e.currentTarget.dataset.item,
        rst: true
      }
      let novelbooks = wx.getStorageSync("novel")
      if (novelbooks) {
        novelbooks.unshift(novel)
        wx.setStorageSync("novel", novelbooks)
      } else {
        let noveldetails = []
        noveldetails.unshift(novel)
        wx.setStorageSync("novel", noveldetails)
      }
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '该书已加入书架',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let name = options.title
    // 将是否加入书架结果从本地取出
    let novelrst = wx.getStorageSync("novel")
    if (novelrst){
      novelrst.map(item => {
        if (name === item.novelmsg.title) {
          this.setData({
            rst: item.rst
          })
        }
      })
    }else{
      this.setData({
        rst: false
      })
    }
    



    this.setData({
      novelid: options.novelid,
      name

    })
    // 将书名存到本地
    wx.setStorageSync("bookname", this.data.name)
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // console.log(this.data.novelid)
    this.getnoval()
    this.getcomments()
    this.getrelation()
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