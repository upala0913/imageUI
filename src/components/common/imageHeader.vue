<template>
	<div class="top">
		<div class="logo-icon" >
			<img src="../../assets/image/logo.png" alt="logo" class="logo" @click="toCore" >
			<span class="logo-font" >
				U&nbsp;P&nbsp;A&nbsp;L&nbsp;A&nbsp;文&nbsp;&nbsp;件&nbsp;&nbsp;管&nbsp;&nbsp;理
			</span>
		</div>
		<div class="sky-info" >
			<!-- 城市 -->
			<i class="iconfont iconchengshi iconProvince" title="城市" />
			<el-select class="province" clearable v-model="provinceValue" placeholder="请选择省" value="0"
					   @change="getCity" >
				<el-option v-for="item in province" :key="item.ident" :value="item.name" />
			</el-select>
			<el-select class="city" clearable v-model="cityValue" placeholder="请选择市/区" value="0"
					   @change="getWeather">
				<el-option v-for="item in city" :key="item.ident" :value="item.name" />
			</el-select>
			<!-- 天气 -->
			<div class="info" >
				<i class="iconfont iconriqidate3 iconDate" title="日期" />
				<div class="grid-content bg-purple contentDate">{{dateTime}}</div>
				<i class="iconfont iconfeng iconDirect" title="风向" />
				<div class="grid-content bg-purple contentDirect">{{weather.direct}}</div>
				<i class="iconfont iconwendu iconTemperature" title="温度" />
				<div class="grid-content bg-purple contentTemperature">{{weather.temperature}}</div>
				<i class="iconfont iconHailstorm-Night iconWeather" title="天气" />
				<div class="grid-content bg-purple contentWeather">{{weather.weather}}</div>
			</div>
		</div>

		<el-popover v-if="!visibleAdmin"  placement="bottom" title="请输入信息" width="380" v-model="visible1"
					trigger="manual">
			<el-input placeholder="请输入账号/手机号/邮箱" v-model="personInfo.username" clearable class="username" />
			<el-input placeholder="请输入密码" v-model="personInfo.password" show-password class="password" />
			<el-input placeholder="请输入验证码" v-model="code" clearable class="code" />
			<el-button class="loginCode" @click="getCode" >{{codeInfo}}</el-button>
			<el-button type="primary" round class="submit" @click="submit" title="提交">提交</el-button>
			<el-button type="primary" round @click="cancel" class="cancel" title="取消" >取消</el-button>
			<el-button type="primary" icon="el-icon-user" slot="reference" circle title="登陆"
					   @click="visible1 = !visible1" class="login" />
		</el-popover>
		<el-dropdown size="mini" split-button type="primary" v-if="visibleAdmin" class="adminDropDown">
			{{admin.userName}}
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="toPersonal" >个人中心</el-dropdown-item>
				<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	let _self;
    let key = "137b2595309f2dc3";

    // 导入md5加密插件
    import md5 from 'js-md5';

    export default {
        name: "imageHeader",
		data() {
            return {
                parentId: '',
                visible1: false,
                codeInfo: '',
                md5: '',
                provinceValue: '',
                cityValue: '',
                province: [],
                city: [],
                dateTime: '',
                weather: {
                    direct: '',
                    temperature: '',
				},
                visibleAdmin: false,
				personInfo: {
                    username: "",
                    password: ""
				},
                code: '',
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
            this.getProvince();
            this.getDate();
            this.getCode();
            this.getAdminInfo();
        },
		methods: {
			// 显示信息方法
			showInfo: function(message, type) {
				this.$message({
					message: message,
					type: type
				});
			},
            // 获取省份信息
            getProvince: function () {
                _self = this;
                let url = "/api/poi/upload/queryProvince";
                let param = {"parentId": 0};
                this.$axios.post(url, param).then(function(res) {
                    if (res.status === 200) {
                        _self.province = res.data.data;
                    }
                }).catch(function(res) {
					_self.showInfo("请求失败：" + res, "error");
                });
            },
            // 获取城市信息
            getCity: function(event) {
                _self = this;
				_self.cityValue = '';
				_self.weather = {};
                let province = _self.province;
                let length = province.length;
                for (let i=0;i<length;i++) {
                    if (event === province[i].name) {
                        _self.parentId = province[i].ident;
                        break;
                    }
                }
                let url = "/api/poi/upload/queryProvince";
                let param = {"parentId": _self.parentId};
                this.$axios.post(url, param).then(function(res) {
                	if (res.data.status === 1001) {
						_self.showInfo("该地区没有城市", "warning");
					} else {
						_self.city = res.data.data;
					}
                }).catch(function(res) {
					_self.showInfo("请求出错： " + res, "warning");
                });
            },
            // 获取天气
            getWeather: function(event) {
                _self = this;
                let key = "3fdd4ff8cc3f97e2f547623ebe0d3086";
                let url = "/api/juhe/simpleWeather/query?city="+ event +"&key=" + key;
                this.$axios.get(url).then(function(res) {
                    if (res.data.error_code === 207301) {
						_self.showInfo("信息：" + res.data.reason, "error");
					} else {
                        _self.weather = res.data.result.future[0];
					}
                }).catch(function(res) {
					_self.showInfo("请求输错：" + res, "error");
                });
            },
            // 获取日期
            getDate: function() {
                _self = this;
                setInterval(function() {
                    let date = new Date();
                    let fullYear = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    let seconds = date.getSeconds();
                    _self.dateTime = fullYear+"-"+month+"-"+_self.getFormat(day)+" "+_self.getFormat(hours)+":"+
                        _self.getFormat(minutes)+":"+_self.getFormat(seconds);
                }, 1000);
            },
            // 格式化数据
            getFormat: function(num) {
                if (num < 10)
                    return "0" + num;
                return num;
            },
            // 获取验证码
            getCode: function() {
                _self = this;
                let url = "/api/upala/user/code/getCodeInfo";
                this.$axios.post(url).then(function(res) {
                	console.log(res.data);
                    if (res.status === 200 && res.data.status === true) {
                        _self.codeInfo = res.data.data;
                    }
                }).catch(function(res) {
					_self.showInfo("获取验证码出错" + res, "error");
                });
            },
            submit: function() {
                _self = this;
                let username = _self.personInfo.username.trim();
                let password = _self.personInfo.password.trim();
                let code = _self.code;
                if (username === '' || password === '') {
					_self.showInfo("用户名密码不能为空", "error");
                } else {
                    let md = '';
                    if (password.trim() === '') {
                        md = '';
                    } else {
                        md = _self.getMD5(password);
                    }
                    let param = {"username":username, "password":md, "code":code};
                    let url = "/api/upala/user/login";
                    this.$axios.post(url, param).then(function(res) {
                        if (res.data.code === 200) {
                            _self.admin = res.data.data;
                            _self.visibleAdmin = true;
                        }
                        if (res.data.code === 3426) {
							_self.showInfo("信息：" + res.data.message, "error");
                        }
                        _self.getCode();
                    }).catch(function(res) {
						_self.showInfo("登录失败：" + res, "error");
                        _self.getCode();
                    });
                }
            },
            //取消提交
            cancel: function() {
                _self = this;
                _self.visible1 = !_self.visible1;
                _self.username = '';
                _self.password = '';
                _self.code = '';
            },
            getMD5: function(param) {
                return md5(param.toUpperCase());
            },
			// 退出登录
            logout: function() {
                _self = this;
                let url = "/api/upala/user/logout";
                this.$axios.post(url).then(function(res) {
                    if (res.data.status === 200) {
                        _self.admin = {};
                        _self.visibleAdmin = false;
                        _self.cancel();
						_self.$router.push({path: '/'});
                    }
                }).catch(function(res) {
					_self.showInfo("请求出错：" + res, "error");
                });
            },
			// 进入个人中心页面
            toPersonal: function() {
                _self = this;
                if (_self.admin.userName === '')
                    _self.$router.push({path: '/'});
                else {
                    _self.$router.push({path: '/personal', query: {"id":_self.admin.id}});
				}
            },
            getAdminInfo: function() {
                _self = this;
                let url = "/api/upala/user/adminInfo";
                this.$axios.post(url).then(function(res) {
                    if (res.data.status === 10004) {
                        _self.admin = res.data.data;
                        _self.visibleAdmin = true;
                    }
                }).catch(function(res) {
					_self.showInfo("请求出错：" + res, "error");
                });
            },
			toCore: function() {
            	this.$router.push({path:'/'});
			}
		}
    }
</script>

<style scoped>
	@import '../../assets/iconfont/iconfont.css';
	@import '../../assets/css/imageHeader.css';
</style>
