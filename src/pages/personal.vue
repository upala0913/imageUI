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
                                            头像{{perId}}
                                        </td>
                                        <td class="per-table-cont-icon" >
												<span v-if="!isSrc" >
													<el-avatar :size="70" src="https://empty" class="per-info-icon" >
														<img alt="头像" :src="photo"/>
                                            		</el-avatar>
												</span>
                                                <span v-if="isSrc" >
													<el-avatar :size="70" src="https://empty" class="per-info-icon" >
														<img alt="头像" :src="src"/>
													</el-avatar>
												</span>
                                            <el-button class="edit-icon" type="primary"
                                                       icon="el-icon-edit" circle title="上传头像"></el-button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="per-table-title" >
                                            <i class="el-icon-user" ></i>
                                            昵称
                                        </td>
                                        <td class="per-table-cont" >
                                            {{username}}
                                        </td>
                                    </tr>
									<tr>
										<td class="per-table-title" >
											<i class="el-icon-user" ></i>
											真实名称
										</td>
										<td class="per-table-cont" >
											<div class="reName-bind-status" >
												<span v-if="!reNameBind" >未实名认证</span>
												<span v-if="reNameBind" >{{reName}}</span>
											</div>
											<div class="reName-bind-active" >
												<el-link type="primary" v-if="!reNameBind" >去认证</el-link>
												<el-link type="primary" v-if="reNameBind" >已认证</el-link>
											</div>
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
                                                <span v-if="!mobileBind" >未绑定</span>
                                                <span v-if="mobileBind" >{{mobile}}</span>
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
                                                <span v-if="!emailBind" >未绑定</span>
                                                <span v-if="emailBind" >{{email}}</span>
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
				username: '',
				photo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
				src: '', // 头像
				isSrc: false,
                password: "",
                mobile: '',
                email: '',
                emailBind: false,
                mobileBind: false,
				reName: '',
				reNameBind: false,
				perId: '',
				admin: {
                    id: '',
                    userName: '',
                    userPass: '',
                    mobile: '',
                    email: '',
                    photo: '',
                    reName: ''
				}
            }
        },
        created() {
            this.bindData();
            this.getPersonInfo();
            this.mobileIsBind();
            this.emailIsBind();
            this.reNameIsBind();
            this.srcIsBind();
        },
        methods: {
            bindData: function() {
                _self = this;
                let admin = _self.$storage.get("admin");
                _self.perId = admin.id;
                console.log(_self.perId);
			},
            mobileIsBind: function() {
                _self = this;
                let $mobile = this.mobile;
                $mobile === ''?_self.mobileBind = false:_self.mobileBind = true;
            },
            emailIsBind: function() {
                _self = this;
                let $email = this.email;
                $email === ''?_self.emailBind = false:_self.emailBind = true;
            },
			reNameIsBind: function() {
                _self = this;
                let $reName = this.reName;
                $reName === ''?_self.reNameBind = false:_self.reNameBind = true;
			},
            srcIsBind: function() {
                _self = this;
                let $src = this.src;
                console.log($src);
                $src === ''?_self.isSrc = false:_self.isSrc = true;
            },
			getPersonInfo: function() {
                _self = this;
                let param = {"id": _self.perId};
                let url = '/api/upala/user/getPersonInfo';
                this.$axios.post(url, param).then(function(res) {
					_self.username = res.data.data.userName;
					_self.password = res.data.data.userPass;
					_self.src = res.data.data.photo;
					_self.mobile = res.data.data.mobile;
					_self.email = res.data.data.email;
					_self.reName = res.data.data.reName;
				}).catch(function(res) {});
			}
        }
    }
</script>

<style scoped>
    @import '../assets/css/personal.css';
</style>
