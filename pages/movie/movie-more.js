// pages/movie/movie-more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comingSoonList: [],
    showLoading: false
  },

  onOpenMovieDetail(event) {
    let movieId = event.currentTarget.dataset.movieId
    wx.navigateTo({
      url: './movie-detail?movieId=' + movieId,
    })
  },

  getComingSoon() {
    let _this = this
    let start = _this.data.comingSoonList.length
    
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon',
      data: {
        start: start,
        count: 9
      },
      success(res) {
        let comingSoonList = _this.data.comingSoonList.concat(res.data.subjects)
        _this.setData({ comingSoonList: comingSoonList })
        
        //console.log(_this.data.comingSoonList)
      },
      fail() {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getComingSoon()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.getComingSoon()
    let _this = this
    _this.setData({showLoading:true})
    setTimeout(()=>{
      _this.setData({ showLoading: false })
    },1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})