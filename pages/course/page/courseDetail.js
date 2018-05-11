// pages/course/page/courseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleClass:[
      "circle1",
      "circle2",
      "circle3",
      "circle4",
      "circle5",
      "circle6",
      "circle7",
      "circle8",
      "circle9",
      "circle10"    
    ],
    index: 0,
    courseItems:[],
    courseName:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.courseType)
    var self = this;
    wx.request({
      url: 'https://ryq.dongff.xyz/MeiSi/Course_meidaFindByType',
      method: 'POST',
      data: {
        courseType: options.courseType,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {   
        self.setData({
          courseItems:res.data         
        });     
       
        wx.request({
          url: 'https://ryq.dongff.xyz/MeiSi/User_FindCoachByType',
          method: 'POST',
          data: {          
            courseType: self.data.courseItems[0].courseType
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },         
          success: function (res) {
            var coachList = ['全部教练']          
            for (var i of res.data.list) {
              coachList.push(i.coachName)
            }
            self.setData({
              courseName: coachList
            })
          }
        })
      }
    })    
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    var self = this
    wx.request({
      url: 'https://ryq.dongff.xyz/MeiSi/Course_meidaFindByCoach',
      method: 'POST',
      data: {
        coachName: self.data.courseName[self.data.index],
        courseType: self.data.courseItems[0].courseType
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        self.setData({
          courseItems:res.data
        });  
      }
    }) 
  },
  

})