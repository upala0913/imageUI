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
                                            <i class="el-icon-s-custom" />
                                            头像
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
                                                       icon="el-icon-edit" circle title="上传头像" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="per-table-title" >
                                            <i class="el-icon-user" />
                                            昵称
                                        </td>
                                        <td class="per-table-cont" >
                                            {{username}}
                                        </td>
                                    </tr>
									<tr>
										<td class="per-table-title" >
											<i class="el-icon-user" />
											真实名称
										</td>
										<td class="per-table-cont" >
											<div class="reName-bind-status" >
												<span v-if="!reNameBind" >未实名认证</span>
												<span v-if="reNameBind" >{{reName}}</span>
											</div>
											<div class="reName-bind-active" >
												<el-link type="primary" v-if="!reNameBind" @click="reNamePlain=true" >
													去认证</el-link>
												<el-link type="primary" v-if="reNameBind" @click="cancelReName" >已认证</el-link>
											</div>
										</td>
									</tr>
                                    <tr>
                                        <td class="per-table-title" >
                                            <i class="el-icon-view" />
                                            密码
                                        </td>
                                        <td class="per-table-cont" >
                                            <el-button type="primary" icon="el-icon-edit" circle title="修改密码">
                                            </el-button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="per-table-title" >
                                            <i class="el-icon-phone-outline" />
                                            电话
                                        </td>
                                        <td class="per-table-cont" >
                                            <div class="mobile-bind-status" >
                                                <span v-if="!mobileBind" >未绑定</span>
                                                <span v-if="mobileBind" >{{mobile}}</span>
                                            </div>
                                            <div class="mobile-bind-active" >
                                                <el-link type="primary" v-if="!mobileBind"
                                                         @click="mobileBindPlain=true">绑定</el-link>
                                                <el-link type="primary" v-if="mobileBind" @click="cancelMobileBind" >
                                                    解绑</el-link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="per-table-title" >
                                            <i class="el-icon-message" />
                                            邮箱
                                        </td>
                                        <td class="per-table-cont" >
                                            <div class="email-bind-status" >
                                                <span v-if="!emailBind" >未绑定</span>
                                                <span v-if="emailBind" >{{email}}</span>
                                            </div>
                                            <div class="email-bind-active" >
                                                <el-link type="primary" v-if="!emailBind"
                                                         @click="emailBindPlain=true">绑定</el-link>
                                                <el-link type="primary" v-if="emailBind" @click="cancelEmailBind" >
                                                    解绑</el-link>
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
        <el-dialog class="bind-info" title="实名认证" :visible.sync="reNamePlain">
            <el-input class="reName" placeholder="请输入实名" v-model="reName" clearable />
            <el-input class="idCard" placeholder="请输入身份证号" v-model="idCard" clearable />
            <el-date-picker class="birthday" v-model="birthday" type="date" format="yyyy年MM月dd日"
                            placeholder="选择日期" />
            <el-button class="idCard-submit" type="success" round @click="getIdCard" >认证</el-button>
            <el-button class="idCard-reset" type="success" round @click="resetIdCard">取消</el-button>
        </el-dialog>
        <el-dialog class="bind-info" title="电话绑定" :visible.sync="mobileBindPlain">
            <el-input class="bind-mobile" placeholder="请输入电话" v-model="mobile" clearable />
            <el-input class="bind-code" placeholder="请输入验证码" v-model="code" clearable />
            <el-button class="code-button" type="success" @click="getMobileCode">点击获取验证码</el-button>
            <el-button class="bind-submit" type="info" round @click="submitMobileAndCode" >提交</el-button>
            <el-button class="bind-reset" type="info" round @click="resetMobileAndCode">重置</el-button>
        </el-dialog>
        <el-dialog class="bind-info" title="邮箱绑定" :visible.sync="emailBindPlain">
            <el-input class="bind-mobile" placeholder="请输入邮箱" v-model="email" clearable />
            <el-input class="bind-code" placeholder="请输入验证码" v-model="code" clearable />
            <el-button class="code-button" type="success" @click="getEmailCode">点击获取验证码</el-button>
            <el-button class="bind-submit" type="info" round @click="submitEmailAndCode" >提交</el-button>
            <el-button class="bind-reset" type="info" round @click="resetEmailAndCode">重置</el-button>
        </el-dialog>
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
                code: '',
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
				},
                mobileBindPlain: false,
                emailBindPlain: false,
                reNamePlain: false,
                idCard: '',
                birthday: '',
            }
        },
        created() {
            this.getPersonInfo();
            this.mobileIsBind();
            this.emailIsBind();
            this.reNameIsBind();
            this.srcIsBind();
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
            // 获取个人信息
			getPersonInfo: function() {
                _self = this;
                let id = _self.$route.query.id;
                _self.perId = id;
                _self.$storage.set("id", id);
                let param = {"id": id};
                let url = '/api/upala/user/getPersonInfo';
                this.$axios.post(url, param).then(function(res) {
                    if (res.data.code === 200) {
                        _self.username = res.data.data.userName;
                        _self.password = res.data.data.userPass;
                        _self.src = res.data.data.photo;
                        if (res.data.data.mobile !== null) {
                            _self.mobile = res.data.data.mobile;
                            _self.mobileBind = true;
                        }
                        if (res.data.data.email !== null) {
                            _self.email = res.data.data.email;
                            _self.emailBind = true;
                        }
                        if (res.data.data.reName !== null) {
                            _self.reName = res.data.data.reName;
                            _self.reNameBind = true;
                        }
                    }
				}).catch(function(res) {});
			},
            // 判断字符串是否为空
            isEmpty: function(param) {
                let data = param.trim();
                return data === '' || typeof data === 'undefined';
            },
            // 显示信息
            showInfo: function(message, type) {
                _self = this;
                _self.$message({
                    message: message,
                    type: type
                })
            },
            // 获取手机短信验证码
            getMobileCode: function() {
                _self = this;
                if (_self.isEmpty(_self.mobile)) {
                    _self.showInfo("电话号码不能为空：", "warning");
                } else {
                    let param = {"mobile":_self.mobile, "username": _self.reName, "id": _self.perId};
                    let url = "/api/upala/personal/getMobileMessage";
                    _self.$axios.post(url, param).then(function(res) {
                        if (res.data.status) {
                            _self.showInfo("信息：" + res.data.message, "info");
                        }
                    }).catch(function(res) {});
                }
            },
            // 绑定电话
            submitMobileAndCode: function() {
                _self = this;
                if (_self.isEmpty(_self.mobile) || _self.isEmpty(_self.code)) {
                    _self.showInfo("电话号码和验证码不能为空", "error");
                } else {
                    let param = {"mobile": _self.mobile, "check": _self.code, "id": _self.perId};
                    let url = "/api/upala/personal/bindMobile";
                    _self.$axios.post(url, param).then(function(res) {
                        if (res.data.status) {
                            _self.showInfo("信息：" + res.data.message, "info");
                        }
                    }).catch(function(res) {});
                }
            },
            // 重置信息
            resetMobileAndCode: function() {
                _self = this;
                _self.mobile = '';
                _self.code = '';
            },
            // 获取邮箱验证码
            getEmailCode: function() {
                _self = this;
                if (_self.isEmpty(_self.email)) {
                    _self.showInfo("邮箱不能为空", "error");
                } else {
                    let param = {"email": _self.email, "username": _self.reName, "id": _self.perId};
                    let url = "/api/upala/personal/emailMessage";
                    _self.$axios.post(url, param).then(function(res) {
                        console.log(res.data);
                        if (res.data.status) {
                            _self.showInfo(res.data.message, "info");
                        }
                    }).catch(function(res) {})
                }
            },
            // 提交需要绑定的邮箱和验证码
            submitEmailAndCode: function() {
                _self = this;
                if (_self.isEmpty(_self.code) || _self.isEmpty(_self.email)) {
                    _self.showInfo("邮箱或验证码不能为空", "error")
                } else {
                    let param = {"email":_self.email, "check":_self.code, "id": _self.perId};
                    let url = "/api/upala/personal/bindEmail";
                    _self.$axios.post(url, param).then(function(res) {
                        if (res.data.status) {
                            _self.showInfo(res.data.message, "info");
                        } else {
                            _self.showInfo(res.data.message, "error");
                        }
                    }).catch(function(res) {})
                }
            },
            // 重置信息
            resetEmailAndCode: function() {
                _self = this;
                _self.email = '';
                _self.code = '';
            },
            formatNumber: function(param) {
                return param < 10 ? "0" + param : param;
            },
            formatDate: function() {
                _self = this;
                let date = new Date(_self.birthday);
                let fullYear = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                return fullYear+"年"+_self.formatNumber(month)+"月"+_self.formatNumber(day)+"日";
            },
            // 获取个人身份
            getIdCard: function() {
                _self = this;
                let formatDate = _self.formatDate(_self.birthday);
                // let data = {"reName": _self.reName};
                let key = "e34eeaf5cd7b7c34d9f367e076750fb5";
                let url = "/api/juhe/idcard/index?key=" + key +"&cardno=" + _self.idCard;
                this.$axios.get(url).then(function(res) {
                    if (res.data.resultcode == 200) {
                        if (res.data.result.birthday === formatDate) {
                            let path = "/api/upala/personal/reName";
                            let param = {"id": _self.perId, "reName": _self.reName};
                            _self.$axios.post(path, param).then(function(res) {
                                if (res.data.code === 200) {
                                    _self.reName = _self.username;
                                    _self.reNameBind = true;
                                }
                            }).catch(function(res) {
                                _self.showInfo("请求出错:" + res, "error");
                            })
                        } else {
                            _self.showInfo("身份有误", "error");
                        }
                    } else {
                        _self.showInfo("实名认证失败！！！", "error");
                    }
                }).catch(function(res) {
                    _self.showInfo("获取失败：" + res, "error");
                })
            },
            resetIdCard: function() {
                _self = this;
                _self.reNamePlain = false;
            },
            // 取消认证
            cancelReName: function() {
                this.$confirm('不能取消实名认证', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                });
            },
            // 解除信息
            removeInfo: function(url, msg) {
                let param = {"id": _self.perId};
                _self.$axios.post(url, param).then((res) => {
                    if (res.data.status) {
                        _self.showInfo(msg + "成功解绑", "success");
                    }
                }).catch((res) => {
                    _self.showInfo("请求失败：" + res, "error");
                });
            },
            // 解绑电话
            cancelMobileBind: function() {
                _self = this;
                this.$confirm('此操作将解除电话的绑定, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = "/api/upala/personal/removeMobile";
                    _self.removeInfo(url, "电话");
                    _self.$forceUpdate();
                }).catch(() => {});
            },
            // 解绑邮箱
            cancelEmailBind: function() {
                _self = this;
                this.$confirm('此操作将解除邮箱的绑定, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = "/api/upala/personal/removeEmail";
                    _self.removeInfo(url, "邮箱");
                    _self.$forceUpdate();
                }).catch(() => {});
            },
        }
    }
</script>

<style scoped>
    @import '../assets/css/personal.css';
</style>
