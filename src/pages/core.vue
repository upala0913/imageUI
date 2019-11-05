<template>
  <div class="container">
    <div class="module">
      <p class="list" @click="btnImage">
        <span class="font">图片</span>
        <i class="iconfont icontupian icon"></i>
      </p>
      <p class="list" @click="btnFile">
        <span class="font">文件</span>
        <i class="iconfont iconbuoumaotubiao25 icon"></i>
      </p>
      <p class="list" @click="btnVideo" >
        <span class="font">视频</span>
        <i class="iconfont iconshipin icon"></i>
      </p>
      <p class="list" @click="btnMore" >
        <span class="font">更多</span>
        <i class="iconfont icongengduo icon"></i>
      </p>
    </div>
  </div>
</template>

<script>
	export default {
		name: "core",
    methods: {
      btnImage: function() {
      	this.$router.push({path:'/image'});
      },
      btnFile: function() {
      	alert("file");
      },
		  btnVideo: function() {
        alert("video");
      },
      btnMore: function() {
      	alert("more");
      }
    }
	}
</script>

<style scoped>
  @import '../assets/iconfont/iconfont.css';
  @import '../assets/css/core.css';
</style>
