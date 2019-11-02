<template>
  <div>
    <blog-header></blog-header>
    <hr/>
    <div>
      <label for="username">用户名：</label>
      <input id="username" type="text" v-model="loginInfoVo.username" placeholder="请输入用户名"><br/>
      <label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
      <input id="password" type="password" v-model="loginInfoVo.password" placeholder="请输入密码" ><br/>
      <button @click="login" >登陆</button><br/>
      <label for="check">登录验证情况：</label>
      <textarea name="text" id="check" cols="30" rows="10" v-model="responseResult" ></textarea>
    </div>
    <hr/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
  import blogHeader from '@/components/common/BlogHeader.vue'
  import blogFooter from '@/components/common/BlogFooter.vue'
    export default {
        name: "BlogLogin",
        components: {
            blogHeader, blogFooter
        },
        data() {
            return {
                loginInfoVo: {username: '', password: ''},
                responseResult: []
            }
        },
        methods: {
            login() {
                this.$axios
                    .post('/login', {
                        username: this.loginInfoVo.username,
                        password: this.loginInfoVo.password
                    })
                    .then(successResponse => {
                        this.responseResult = JSON.stringify(successResponse.data);
                        if (successResponse.data.code === 200) {
                            this.$router.replace({path: '/index'})
                        }
                    })
                    .catch(failResponse => {})
            }
        }
    }
</script>

<style scoped>

</style>
