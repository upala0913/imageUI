<template>
    <div>
        <div class="space-title" >空间设置</div>
        <hr class="space-hr"/>
        <div class="image-space" >
            <el-table :data="documentSpaces" border style="width: 100%">
                <el-table-column prop="id" label="标识码" width="200"/>
                <el-table-column prop="name" label="名称" width="120"/>
                <el-table-column prop="index" label="目录index" width="100"/>
                <el-table-column prop="type" label="类型" width="120"/>
                <el-table-column sortable prop="createTime" label="创建时间" width="200"/>
                <el-table-column prop="delFlag" label="删除标志" width="120"/>
                <el-table-column prop="delFlagType" label="删除标志类型" width="120"/>
                <el-table-column fixed="right" label="操作" width="130">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="text" size="small">
                            <i class="el-icon-edit"/>&nbsp;编辑
                        </el-button>
                        <el-button @click="handleDelete(scope.row)" type="text" size="small">
                            <i class="el-icon-delete"/>&nbsp;删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="image-space-page" >
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="total" />
        </div>
    </div>
</template>

<script>
    let _self;
    export default {
        name: "spaceSetting",
        data() {
            return {
                documentSpaces: [],
                currentPage: 1,
                pageSizes: [10, 20, 30, 40],
                pageSize: 10,
                total: 400,
            }
        },
        created() {
            this.queryDocumentAll(0);
        },
        methods: {
            // 显示信息
            showInfo: function(message, type) {
                this.$message({
                    message: message,
                    type: type
                });
            },
            // 查询全部的目录文件夹
            queryDocumentAll: function(param) {
                _self = this;
                let url = "/api/upala/image/queryDocumentFolder";
                let data = {"delFlag": param};
                this.$axios.post(url, data).then((res) => {
                    if (res.data.status) {
                        _self.documentSpaces = res.data.data;
                    }
                }).catch((res) => {
                    _self.showInfo("请求失败：" + res, "error");
                });
            },
            // 编辑数据
            handleEdit: function(row) {
                alert(JSON.stringify(row));
            },
            // 删除数据
            handleDelete: function(row) {
                alert(JSON.stringify(row));
            },
            // 分页
            handleSizeChange: function(val) {
                alert(`每页 ${val} 条`);
            },
            handleCurrentChange: function(val) {
                alert(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped>
    @import '../../assets/css/image/spaceSetting.css';
</style>