<template>
	<div class="image-container">
		图片管理
		<el-button type="primary" @click="getStu">主要按钮</el-button>
		<div v-for="(item, index) in students">
			<p>{{item.stuNum}}--{{ item.stuName }}--{{ item.stuSex }}</p>
		</div>
	</div>
</template>

<script>
    var _self;
    export default {
        name: "imageManage",
        data() {
            return {
                students: []
            }
        },
        methods: {
            getStu: function () {
                _self = this;
                let url = "/api/upala/test/getStu";
                this.$axios.post(url).then(function (res) {
                    if (res.status === 200) {
                        _self.students = res.data.data;
                        console.log(_self.students);
                    }
                }).catch(function (res) {
                    console.log(res);
                });
            }
        }
    }
</script>

<style scoped>

</style>
