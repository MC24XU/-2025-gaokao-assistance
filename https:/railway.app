6. 小程序调用示例：
```js
wx.request({
  url: 'https://.../api/ranks',
  data: { province: '福建', type: '理科' },
  success: res => console.log(res.data)
});
