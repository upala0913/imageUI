<template>
    <div class="image-container">
        <div class="image-header" >
            <div class="image-manage-title">图片管理</div>
            <ul class="image-manage-list">
                <li class="image-manage-list-li">
                    <span class="image-manage-list-li-text">首页</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                </li>
                <li class="image-manage-list-li">
                    <span class="image-manage-list-li-text">消息</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                </li>
                <li class="image-manage-list-li">
                    <span class="image-manage-list-li-text">联系我们</span>
                </li>
            </ul>
        </div>
        <div class="image-aside" >
            <el-menu default-active="1" class="el-menu-demo" mode="vertical"
                     background-color="#545c64" text-color="#ffffff" @select="handlerSelect">
                <el-menu-item index="/imageInfo">图片信息</el-menu-item>
                <el-menu-item index="/imageUpload">图片上传</el-menu-item>
                <el-menu-item index="/imageDiscern">图片识别</el-menu-item>
                <el-menu-item index="/imageBase64">图片编码</el-menu-item>
            </el-menu>
        </div>
        <div class="image-main">
            <router-view />
        </div>
        <image-footer />
    </div>
</template>

<script>

    let _self;

    // 导入页面
    import imageFooter from "../components/common/imageFooter";

    export default {
        name: "imageManage",
        components: {
            imageFooter
        },
        data() {
            return {}
        },
        methods: {
            handlerSelect: function(key, keyPath) {
                _self = this;
                switch (key) {
                    case "/imageInfo":
                        _self.$router.push(key);
                        break;
                    case "/imageUpload":
                        _self.$router.push(key);
                        break;
                    case "/imageDiscern":
                        _self.$router.push(key);
                        break;
                    case "/imageBase64":
                        _self.$router.push(key);
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    @import '../assets/css/imageManage.css';
</style>
