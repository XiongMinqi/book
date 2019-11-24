const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    number: [],
    num: 0,
    hot: [],
    inputvalue: "",
    history: [],
    histories: [],
    searchbook: [],
  },
  //从数组从随机取六个值
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
  // 具体详情
  novel(e) {
    // console.log(e)
    let novelid = e.currentTarget.dataset.item._id
    let title = e.currentTarget.dataset.item.title
    wx.navigateTo({
      url: `/pages/novel/novel?novelid=${novelid}&title=${title}`,
    })
    this.localstorage()
  },
  //输入框输入
  oninput(e) {
    // if (this.data.inputvalue===""){
      this.setData({
        inputvalue: e.detail.value
      })
    // }
    
    app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.inputvalue}`).then(res => {
      console.log(res)
      let searchbook = res.data.books
      this.setData({
        searchbook
      })
    }).catch(err => {
      console.log(err)
    })

  },
  //给输入框赋值
  getwords(e){
    console.log(e)
    this.setData({
      inputvalue: e.currentTarget.dataset.item
    })
    // this.oninput()
    if (this.data.inputvalue !== ""){
      app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.inputvalue}`).then(res => {
        console.log(res)
        let searchbook = res.data.books
        this.setData({
          searchbook
        })
      }).catch(err => {
        console.log(err)
      })
    }
   
  },
  //换一换
  change() {
    let number = [1, 2, 3, 4, 5, 6]
    let num = number[Math.floor(Math.random() * number.length)]
    this.setData({
      num,
      number
    })
    // console.log(this.data.num, "num")
    let hotwords = this.getRandom(this.data.hot, 6)
    this.setData({
      hotwords
    })
  },
  //获取热词
  getcheck() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/book/hot-word`).then(res => {
      wx.hideLoading()
      let hot = res.data.hotWords
      let hotwords = this.getRandom(hot, 6)
      this.setData({
        hot,
        hotwords
      })
      // console.log(res)
      // console.log(this.data.hotwords)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  // 本地存储历史记录
  localstorage() {
    // console.log(12345613)
    if (this.data.histories.length === 0) {
      // console.log("本地没数据")
      this.data.history = []
      console.log(typeof(this.data.history))
      this.data.history.push(this.data.inputvalue)
      wx.setStorageSync("history", this.data.history)
    } else if (this.data.histories && this.data.histories.length < 6 && this.data.inputvalue !== "") {
      if (this.data.histories.indexOf(this.data.inputvalue) === -1) {
        this.data.history.unshift(this.data.inputvalue);
      }
      wx.setStorageSync("history", this.data.history)
      console.log(this.data.history)
    } else if (this.data.histories && this.data.histories.length > 6 && this.data.inputvalue !== "") {
      if (this.data.histories.indexOf(this.data.inputvalue) === -1) {
        this.data.history.pop();
        this.data.history.unshift(this.data.inputvalue);
      }
      wx.setStorageSync("history", this.data.history)
    }
    this.getlocalstorage()
  },
  // 获取历史记录
  getlocalstorage() {
    let histories = wx.getStorageSync("history")
    if (histories !== []) {
      let history = histories
      this.setData({
        histories,
        history
      })
    } else {
      this.setData({
        histories: []
      })
    }
    console.log(this.data.histories)
  },
  //清空历史记录
  clear() {
    wx.clearStorageSync("history")
    this.setData({
      histories: []
    })
    this.getlocalstorage()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let number = [1, 2, 3, 4, 5, 6]
    let num = number[Math.floor(Math.random() * number.length)]
    this.setData({
      num,
      number
    })
    // console.log(this.data.num, "num")
    this.getcheck()
    this.getlocalstorage()
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