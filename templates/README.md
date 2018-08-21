# css-loading
#### 需求：
给一张loading图，分别用css和js实现loading效果
#### 思路：
1. 分左右两个div: leftDiv、rightDiv，显示宽度为图片的一半，设置overflow:hidden <br>
2. div内部包含一个innerDiv，innerDiv宽高为图片宽高，背景设为loading图，使用clip裁剪图片的一半。<br>
3. 这样leftInnerDiv显示的是图片的右半区，rightInnerDiv显示的是图片的左半区。<br>
4. css animation或js transform来旋转
  > 注意：初始状态是完全不显示图片

#### 实现：
webpack+vue脚手架<br>
使用npm run dev测试



## 纯css实现loading
在圆圈上画出8个小圆点,使用animation+keyframes,延迟改变圆点颜色
