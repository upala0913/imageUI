<template>
    <div class="container" >
        <image-header/>
        <div class="personal-main" >
            <vue-particles color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle"
                :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
                :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
                clickMode="push" class="lizi" >
            </vue-particles>
            <div class="personal-info" >
                <el-col :span="22">
                    <el-tabs :tab-position="tabPosition" class="per-info">
                        <el-tab-pane label="个人资料">
                            <div class="per-mean" >
                                <div class="per-title" >个人资料</div>
                                <table class="per-table" >
                                    <tr>
                                        <td class="per-table-title-icon" >
                                            <i class="el-icon-s-custom" ></i>
                                            头像
                                        </td>
                                        <td class="per-table-cont-icon" >
                                            <el-avatar :size="70" src="https://empty" class="per-info-icon" >
                                                <img alt="头像"
                                                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                                            </el-avatar>
                                            <el-button class="edit-icon" type="primary"
                                                       icon="el-icon-edit" circle title="修改头像"></el-button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="per-table-title" >
                                            <i class="el-icon-user" ></i>
                                            昵称
                                        </td>
                                        <td class="per-table-cont" >
                                            张飞
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="per-table-title" >
                                            <i class="el-icon-view" ></i>
                                            密码
                                        </td>
                                        <td class="per-table-cont" >
                                            <el-input v-model="password" disabled show-password class="password">
                                            </el-input>
                                            <el-button type="primary" icon="el-icon-edit" circle title="修改密码">
                                            </el-button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="per-table-title" >
                                            <i class="el-icon-phone-outline" ></i>
                                            电话
                                        </td>
                                        <td class="per-table-cont" >
                                            <div class="mobile-bind-status" >
                                                <span v-if="mobile === ''" >未绑定</span>
                                                <span v-if="mobile !== ''" >{{mobile}}</span>
                                            </div>
                                            <div class="mobile-bind-active" >
                                                <el-link type="primary" v-if="!mobileBind" >绑定</el-link>
                                                <el-link type="primary" v-if="mobileBind" >解绑</el-link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="per-table-title" >
                                            <i class="el-icon-message" ></i>
                                            邮箱
                                        </td>
                                        <td class="per-table-cont" >
                                            <div class="email-bind-status" >
                                                <span v-if="email === ''" >未绑定</span>
                                                <span v-if="email !== ''" >{{email}}</span>
                                            </div>
                                            <div class="email-bind-active" >
                                                <el-link type="primary" v-if="!emailBind" >绑定</el-link>
                                                <el-link type="primary" v-if="emailBind" >解绑</el-link>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </div>
        </div>
        <image-footer/>
    </div>
</template>

<script>
    let _self;
    import imageHeader from '@/components/common/imageHeader'
    import imageFooter from '@/components/common/imageFooter'
    import Vue from 'vue'
    import vueParticles from 'vue-particles'
    Vue.use(vueParticles);
    export default {
        name: "personal",
        components: {
            imageHeader, imageFooter,
        },
        data() {
            return {
                active: true,
                tabPosition: 'left',
                password: "123456",
                mobile: '19426382365',
                email: '',
                emailBind: false,
                mobileBind: false,
            }
        },
        created() {
            this.mobileIsBind();
            this.emailIsBind();
        },
        methods: {
            mobileIsBind: function() {
                _self = this;
                let $mobile = this.mobile;
                $mobile === ''?_self.mobileBind = false:_self.mobileBind = true;
            },
            emailIsBind: function() {
                _self = this;
                let $email = this.email;
                $email === ''?_self.emailBind = false:_self.emailBind = true;
            }
        }
    }
</script>

<style scoped>
    @import '../assets/css/personal.css';
</style>
