<template>
	<div class="container">
		<div class="top">
			<label for="weather">天气：</label>
			<select name="weather" id="weather">

			</select>
		</div>
		<div class="module">
			<p class="list" @click="btnImage">
				<span class="font">图片</span>
				<i class="iconfont icontupian icon"></i>
			</p>
			<p class="list" @click="btnFile">
				<span class="font">文件</span>
				<i class="iconfont iconbuoumaotubiao25 icon"></i>
			</p>
			<p class="list" @click="btnVideo">
				<span class="font">视频</span>
				<i class="iconfont iconshipin icon"></i>
			</p>
			<p class="list" @click="btnMore">
				<span class="font">更多</span>
				<i class="iconfont icongengduo icon"></i>
			</p>
		</div>
	</div>
</template>

<script>
    export default {
        name: "core",
        data() {
            return {
                city: []
            }
        },
		created() {
          	this.getCity();
		},
        methods: {
            getCity: function () {
                var url = "https://api.jisuapi.com/area/province?appkey=137b2595309f2dc3";
				this.$axios.get(url).then(function(res) {
				    console.log("数据："+res);
				}).catch(function(res) {
				    console.log(res);
				});
            },
            btnImage: function () {
                this.$router.push({path: '/imageManage'});
            },
            btnFile: function () {
                alert("file");
            },
            btnVideo: function () {
                alert("video");
            },
            btnMore: function () {
                alert("more");
            }
        }
    }
</script>

<style scoped>
	@import '../assets/iconfont/iconfont.css';
	@import '../assets/css/core.css';
</style>
