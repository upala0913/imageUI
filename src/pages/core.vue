<template>
	<div class="container">
		<div class="top">
			<!-- 城市 -->
			<i class="iconfont iconchengshi iconProvince" title="城市" ></i>
			<el-select class="province" clearable v-model="provinceValue" placeholder="请选择省" value="0"
					   @change="getCity" >
				<el-option v-for="item in province" :key="item.id" :value="item.name"></el-option>
			</el-select>
			<el-select class="city" clearable v-model="cityValue" placeholder="请选择市/区" value="0"
						@change="getWeather">
				<el-option v-for="item in city" :key="item.id" :value="item.name" ></el-option>
			</el-select>
			<!-- 天气 -->
			<div class="info" >
				<i class="iconfont iconriqidate3 iconDate" title="日期" ></i>
				<div class="grid-content bg-purple contentDate">{{dateTime}}</div>
				<i class="iconfont iconfeng iconDirect" title="风向" ></i>
				<div class="grid-content bg-purple contentDirect">{{weather.direct}}</div>
				<i class="iconfont iconwendu iconTemperature" title="温度" ></i>
				<div class="grid-content bg-purple contentTemperature">{{weather.temperature}}</div>
				<i class="iconfont iconHailstorm-Night iconWeather" title="天气" ></i>
				<div class="grid-content bg-purple contentWeather">{{weather.weather}}</div>
			</div>
		</div>
		<el-popover v-if="!visibleAdmin"  placement="bottom" title="请输入信息" width="380" v-model="visible1"
					trigger="manual">
			<el-input placeholder="请输入账号/手机号/邮箱" v-model="username" clearable class="username"></el-input>
			<el-input placeholder="请输入密码" v-model="password" show-password class="password"></el-input>
			<el-input placeholder="请输入验证码" v-model="code" clearable class="code"></el-input>
			<el-button class="loginCode" @click="getCode" >{{codeInfo}}</el-button>
			<el-button type="primary" round class="submit" @click="submit" title="提交">提交</el-button>
			<el-button type="primary" round @click="cancel" class="cancel" title="取消" >取消</el-button>
			<el-button type="primary" icon="el-icon-user" slot="reference" circle title="登陆"
					   @click="visible1 = !visible1" class="login"></el-button>
		</el-popover>
		<el-dropdown size="mini" split-button type="primary" v-if="visibleAdmin" class="adminDropDown">
			{{admin.userName}}
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="toPersonal" >个人中心</el-dropdown-item>
				<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
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
	var _self;
    var key = "137b2595309f2dc3";

    // 导入md5加密插件
    import md5 from 'js-md5';
    export default {
        name: "core",
        data() {
            return {
                province: [],
				city: [],
				provinceValue: '',
                cityValue: '',
				parentId: '',
				weather: {},
				dateTime: '',
                visible1: false,
                visible2: false,
				username: '',
                password: '',
				code: '',
                codeInfo: '',
				md5: '',
				visibleAdmin: false,
				admin: {}
            }
        },
		created() {
          	// this.getProvince();
            // this.getWeather();
            this.getDate();
            this.getCode();
            this.getAdminInfo();
		},
        methods: {
            // 获取省份信息
            getProvince: function () {
                _self = this;
				let url = "/api/jisu/area/province?appkey=" + key;
				this.$axios.get(url).then(function(res) {
				    if (res.status === 200) {
				        _self.province = res.data.result;
					}
				}).catch(function(res) {
				    console.log(res);
				});
            },
			// 获取城市信息
            getCity: function(event) {
                _self.city = [];
                let province = _self.province;
                let length = province.length;
                let i = 0;
                for (i=0;i<length;i++) {
                    if (event === province[i].name) {
                        _self.parentId = province[i].id;
                        console.log(_self.parentId);
                        break;
					}
				}
                let url = "/api/jisu/area/city?parentid="+_self.parentId+"&appkey=" + key;
                this.$axios.get(url).then(function(res) {
                    _self.city = res.data.result;
				}).catch(function(res) {
                    _self.$message({
                        message: "请求出错： " + res,
                        type: 'warning'
                    });
				});
			},
			// 获取天气
            getWeather: function(event) {
                _self = this;
                console.log(event);
                let key = "3fdd4ff8cc3f97e2f547623ebe0d3086";
                let url = "/api/juhe/simpleWeather/query?city="+ event +"&key=" + key;
                this.$axios.get(url).then(function(res) {
                    _self.weather = res.data.result.future[0];
				}).catch(function(res) {
                    console.log(res);
				});
			},
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
				    if (res.status === 200) {
				        _self.codeInfo = res.data.message;
					}
				}).catch(function(res) {
                    _self.$message({
						message: '获取验证码出错  ' + res,
						type: 'error'
					});
				});
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
            submit: function() {
                _self = this;
                let username = _self.username.trim();
                let password = _self.password.trim();
                let code = _self.code;
                if (username === '' || password === '') {
                    _self.$message({
                        message: '用户名密码不能为空',
                        type: 'error'
                    });
				} else {
                    let md = '';
                    if (password.trim() === '') {
                        md = '';
                    } else {
                        md = _self.getMD5(password);
                    }
                    let param = {"username":username, "password":md, "code":code};
                    console.log(JSON.stringify(param));
                    let url = "/api/upala/user/login";
                    this.$axios.post(url, param).then(function(res) {
                        if (res.data.status === 200) {
                            _self.admin = res.data.data;
                            _self.visibleAdmin = true;
                        }
                        if (res.data.status === 10000) {
                            _self.$message({
                                message: res.data.message,
                                type: 'error'
                            });
                        }
                        if (res.data.status === 10001) {
                            _self.$message({
                                message: res.data.message,
                                type: 'error'
                            });
                        }
                        _self.getCode();
                    }).catch(function(res) {
                        _self.$message({
                            message: '登录失败  ' + res,
                            type: 'error'
                        });
                        _self.getCode();
                    });
				}
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
			getAdminInfo: function() {
                _self = this;
                let url = "/api/upala/user/adminInfo";
                this.$axios.post(url).then(function(res) {
                    if (res.data.status === 10004) {
                        _self.admin = res.data.data;
                        _self.visibleAdmin = true;
                    }
				}).catch(function(res) {
                    _self.$message({
                        message: '请求出错 ' + res,
                        type: 'error'
                    });
				});
			},
            logout: function() {
                _self = this;
                let url = "/api/upala/user/logout";
                this.$axios.post(url).then(function(res) {
                    if (res.data.status === 200) {
						_self.admin = {};
                        _self.visibleAdmin = false;
                        _self.cancel();
					}
				}).catch(function(res) {
                    _self.$message({
						message: "请求出错： " + res,
						type: 'error'
					});
				});
			},
			toPersonal: function() {
				this.$router.push({path: '/personal'});
			}
        }
    }
</script>

<style scoped>
	@import '../assets/iconfont/iconfont.css';
	@import '../assets/css/core.css';
</style>
