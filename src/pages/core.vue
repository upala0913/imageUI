<template>
	<div class="container">
		<image-header/>
		<div class="main" >
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
		<image-footer/>
	</div>
</template>

<script>
	let _self;
	import imageHeader from '@/components/common/imageHeader'
	import imageFooter from '@/components/common/imageFooter'
    export default {
        name: "core",
		components: {
			imageHeader, imageFooter
		},
        data() {
            return {}
        },
        methods: {
            btnImage: function() {
                _self = this;
                _self.getMessage('/imageManage')
            },
            btnFile: function() {
                _self = this;
                let url = "/api/upala/user/skip/pages";
                this.$axios.post(url).then(function(res) {
                    if (res.data.status === 10003) {
                        _self.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                }).catch(function(res) {
                    _self.$message({
                        message: '请求出错 ' + res,
                        type: 'error'
                    });
                });
            },
            btnVideo: function() {
                alert("video");
            },
            btnMore: function() {
                alert("more");
            },
			getMessage: function(param) {
				_self = this;
				let url = "/api/upala/user/skip/pages";
				this.$axios.post(url).then(function(res) {
					if (res.data.status === 10003) {
						_self.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
					if (res.data.status === 10004) {
						_self.$router.push({path: param});
					}
				}).catch(function(res) {
					_self.$message({
						message: '请求出错 ' + res,
						type: 'error'
					});
				});
			},
        }
    }
</script>

<style scoped>
	@import '../assets/iconfont/iconfont.css';
	@import '../assets/css/core.css';
</style>
