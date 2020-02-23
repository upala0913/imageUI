<template>
    <div class="image-container">
        <div class="image-header" >
            <div class="image-manage-title">图片管理</div>
            <ul class="image-manage-list">
                <li class="image-manage-list-li">
                    <span class="image-manage-list-li-text" @click="toIndex">首页</span>&nbsp;&nbsp;|&nbsp;&nbsp;
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
            <el-menu default-active="1" class="el-menu-demo" mode="vertical" :unique-opened="true"
                     background-color="#545c64" text-color="#ffffff" @select="handlerSelect">
                <el-submenu index="1" >
                    <template slot="title" >
                        <i class="el-icon-folder" />
                        <span>空间目录</span>
                    </template>
                    <el-menu-item index="/imageInfo">
                        <i class="el-icon-picture" />
                        <span>图片信息</span>
                    </el-menu-item>
                    <el-menu-item index="/imageUpload">
                        <i class="el-icon-upload" />
                        <span>图片上传</span>
                    </el-menu-item>
                    <el-menu-item index="/imageDiscern">
                        <i class="el-icon-full-screen" />
                        <span>图片识别</span>
                    </el-menu-item>
                    <el-menu-item index="/imageBase64">
                        <i class="el-icon-data-analysis" />
                        <span>图片编码</span>
                    </el-menu-item>
                    <el-menu-item index="/spaceSetting">
                        <i class="el-icon-setting" />
                        <span>空间设置</span>
                    </el-menu-item>
                </el-submenu>
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
            return {
                perId: "",
            }
        },
        created() {
            // this.userIsExist();
        },
        methods: {
            // userIsExist: function() {
            //     _self = this;
            //     if (this.perId === "") {
            //         _self.$router.push({path: '/'});
            //     }
            // },
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
                    case "/spaceSetting":
                        _self.$router.push(key);
                        break;
                }
            },
            toIndex: function() {
                this.$router.push({path: '/'});
            }
        }
    }
</script>

<style scoped>
    @import '../assets/css/imageManage.css';
</style>
