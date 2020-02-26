<template>
    <div class="container">
        <image-header/>
        <div class="main">
            <div class="module">
                <p class="list" @click="btnImage">
                    <span class="font">图片</span>
                    <i class="iconfont icontupian icon"/>
                </p>
                <p class="list" @click="btnFile">
                    <span class="font">文件</span>
                    <i class="iconfont iconbuoumaotubiao25 icon"/>
                </p>
                <p class="list" @click="btnVideo">
                    <span class="font">视频</span>
                    <i class="iconfont iconshipin icon"/>
                </p>
                <p class="list" @click="btnMore">
                    <span class="font">更多</span>
                    <i class="iconfont icongengduo icon"/>
                </p>
            </div>
        </div>
        <image-footer/>
    </div>
</template>

<script>
    let _self;

    // 导入页面
    import imageHeader from '../components/common/imageHeader'
    import imageFooter from '../components/common/imageFooter'

    export default {
        name: "core",
        components: {
            imageHeader, imageFooter
        },
        data() {
            return {}
        },
        methods: {
            // 显示信息方法
            showInfo: function (message, type) {
                this.$message({
                    message: message,
                    type: type
                });
            },
            // 跳转图片信息页面
            btnImage: function () {
                this.getMessage('/imageManage')
            },
            // 跳转图片信息页面
            btnFile: function () {
                this.showInfo("该功能尚未开发", "warning");
            },
            // 跳转图片信息页面
            btnVideo: function () {
                this.showInfo("该功能尚未开发", "warning");
            },
            // 跳转图片信息页面
            btnMore: function () {
                this.showInfo("该功能尚未开发", "warning");
            },
            getMessage: function (param) {
                _self = this;
                if(_self.$global.userId !== "") {
                    let url = "/api/upala/user/skip/pages";
                    this.$axios.post(url).then(function (res) {
                        if (res.data.status) {
                            _self.$router.push({path: param});
                        } else {
                            _self.showInfo(res.data.message, "warning");
                        }
                    }).catch(function (res) {
                        _self.showInfo('请求出错:' + res.data.message, "error");
                    });
                } else {
                    _self.showInfo("请先登录", "warning");
                }
            },
        }
    }
</script>

<style scoped>
    @import '../assets/iconfont/iconfont.css';
    @import '../assets/css/core.css';
</style>
