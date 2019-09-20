// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImages: [
      "../../images/news/5g.jpeg",
      "../../images/news/ai.jpeg",
      "../../images/news/huawei.jpeg",
      "../../images/news/timg.jpeg"
    ],
    inTheatersList: [],
    comingSoonList: [],
    top250List:[],
    showLoading: false,
    isSearching: false,
    isSearchEmpty: false,
    searchList: []
  },

  onOpenMovieDetail(event){
    let movieId = event.currentTarget.dataset.movieId
    wx.navigateTo({
      url: './movie-detail?movieId='+movieId,
    })
  },

  openMore(){
    wx.navigateTo({
      url: './movie-more',
    })
  },

  onSearch(event){
    if (event.detail.value){
      let value = event.detail.value
      this.getSearchList(value)
      this.setData({ isSearching: true })
      console.log(this.data.searchList)
      
    }else{
      this.setData({ isSearching: false })
    }
  },

  onImageError(event){
    let index = event.currentTarget.dataset.index
    let top250List = this.data.top250List
    top250List[index].images.large = "../../images/error_img.jpg"
    this.setData({ top250List: top250List })
  },
  
  getInTheatersList(){
    let _this = this
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters',
      data: {
        count: 5
      },
      success(res) {
        _this.setData({ inTheatersList: res.data.subjects })
        //console.log(_this.data.inTheatersList)
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

  getComingSoon() {
    let _this = this
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon',
      data: {
        count: 3
      },
      success(res) {
        _this.setData({ comingSoonList: res.data.subjects })
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

  getTop250List() {
    let _this = this
    let start = _this.data.top250List.length
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250',
      data: {
        start: start,
        count: 9
      },
      success(res) {
        let top250List = _this.data.top250List.concat(res.data.subjects)
        _this.setData({ top250List: top250List })
        //_this.setData({ showLoading: true })
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

  getSearchList(queryValue) {
    let _this = this
    wx.request({
      url: 'http://t.yushu.im/v2/movie/search',
      data: {
        q: queryValue
      },
      success(res) {
        //console.log(res)
        let searchList = res.data.subjects
        _this.setData({ searchList: searchList })
        if (!searchList.length) {
          _this.setData({ isSearchEmpty: true })
        } else {
          _this.setData({ isSearchEmpty: false })
        }
        //_this.setData({ showLoading: true })
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
    this.getInTheatersList()
    this.getComingSoon()
    this.getTop250List()
    //console.log(this.data.top250List)
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
    this.getTop250List()
    let _this = this
    _this.setData({ showLoading: true })
    setTimeout(() => {
      _this.setData({ showLoading: false })
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})