<template>
    <div>
        <div class="space-title" >空间设置</div>
        <el-button class="space-folder-add" type="primary" @click="addFolderVisible=true" icon="el-icon-folder-add">新增</el-button>
        <el-button class="space-folder-download" type="primary" icon="el-icon-download">导出</el-button>
        <!-- 新增面板 -->
        <el-dialog title="新增文件夹" class="add-folder" :visible.sync="addFolderVisible" width="30%" center>
            <label for="folderName" class="folder-name-title" >文件夹名称：</label>
            <el-input id="folderName" class="folder-name" v-model="folderName" placeholder="请输入文件夹名称" />
            <label for="folderIndex" class="folder-index-title" >文件夹目录需要：</label>
            <el-input id="folderIndex" class="folder-index" v-model="folderIndex" placeholder="请输入文件夹目录序号" />
            <label class="folder-type" >类型：</label>
            <el-select v-model="addType" class="space-folder-type" placeholder="请选择" @change="getType(addType)" >
                <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button class="add-cancel" @click="addFolderVisible = false">取 消</el-button>
                <el-button class="add-submit" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <div class="space-setting-search" >
            <label for="name" class="space-setting-search-name-title" >名称：</label>
            <el-input class="space-setting-search-name" id="name" v-model="nameSearch" placeholder="请输入名称" />
            <label class="space-setting-search-type-title" >类型：</label>
            <el-select v-model="type" class="space-setting-search-type" placeholder="请选择">
                <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <label class="space-setting-search-delFlag-title" >删除标记：</label>
            <el-select v-model="delFlag" class="space-setting-delFlag" placeholder="请选择">
                <el-option v-for="item in delFlags" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-button class="space-search" type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
        </div>
        <hr class="space-hr"/>
        <div class="image-space" >
            <el-table :data="documentSpaces" :stripe="true" :highlight-current-row="true" border style="width:100%">
                <el-table-column fixed align="center" prop="id" label="标识码" width="300"/>
                <el-table-column align="center" prop="name" label="名称" width="120"/>
                <el-table-column align="center" prop="index" label="目录序号" width="100"/>
                <el-table-column align="center" prop="userId" label="用户ID" width="300"/>
                <el-table-column align="center" prop="type" label="类型" width="100"/>
                <el-table-column align="center" sortable prop="createTime" label="创建时间" width="200"/>
                <el-table-column align="center" sortable prop="updateTime" label="修改时间" width="200"/>
                <el-table-column align="center" prop="delFlag" label="删除标志" width="120"/>
                <el-table-column fixed="right" align="center" label="操作" width="130">
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
                total: 0,
                nameSearch: '', // 输入名称
                type: '', // 类型
                types: [{
                    value: 0,
                    label: "图片"
                }, {
                    value: 1,
                    label: '文件'
                }, {
                    value: 2,
                    label: '视频'
                }, {
                    value: 3,
                    label: '其他'
                }], // 文件类型
                delFlag: '', // 删除标记
                delFlags: [{
                    value: 0,
                    label: '未删除'
                }, {
                    value: 1,
                    label: '已删除'
                }], // 删除标记
                addFolderVisible: false, // 添加文件夹
                folderName: '', // 文件夹名称
                folderIndex: '', // 文件夹目录序号
                addType: '', // 文件夹类型
            }
        },
        created() {
            this.queryDocumentAll("", this.currentPage, this.pageSize);
        },
        methods: {
            // 显示信息
            showInfo: function(message, type) {
                this.$message({
                    message: message,
                    type: type
                });
            },
            // 格式化数据
            formatNumber: function(param) {
                if (param < 10)
                    return "0" + param;
                return param;
            },
            // 格式化日期
            formatDate: function(param) {
                let date = new Date(param);
                let fullYear = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                return fullYear + "-" + this.formatNumber(month) + "-" + this.formatNumber(day) + " " +
                    this.formatNumber(hours) +":"+ this.formatNumber(minutes) + ":" + this.formatNumber(seconds);
            },
            // 判断文件类型
            getDocType: function(param) {
                let type;
                switch(param) {
                    case 0:
                        type = "图片";
                        break;
                    case 1:
                        type = "文件";
                        break;
                    case 2:
                        type = "视频";
                        break;
                    case 3:
                        type = "其他";
                        break;
                }
                return type;
            },
            // 判断文件夹是否删除
            getDelFlag: function(param) {
                let delFlag;
                switch (param) {
                    case 0:
                        delFlag = "未删除";
                        break;
                    case 1:
                        delFlag = "已删除";
                        break;
                }
                return delFlag;
            },
            // 查询全部的目录文件夹
            queryDocumentAll: function(param, currentPage, pageSize) {
                _self = this;
                let url = "/api/upala/image/queryDocumentFolder";
                let data = {"delFlag": param, "index": currentPage, "limit": pageSize};
                this.$axios.post(url, data).then((res) => {
                    if (res.data.status) {
                        let dataArray = res.data.data;
                        for (let i=0; i < dataArray.length; i++) {
                            dataArray[i].createTime = _self.formatDate(dataArray[i].createTime);
                            dataArray[i].updateTime = _self.formatDate(dataArray[i].updateTime);
                            dataArray[i].type = _self.getDocType(dataArray[i].type);
                            dataArray[i].delFlag = _self.getDelFlag(dataArray[i].delFlag);
                        }
                        _self.documentSpaces = dataArray;
                        _self.total = res.data.total;
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
            },
            getData: function() {
                _self = this;
                let data = {"name": this.nameSearch, "type": this.type, "delFlag": this.delFlag,
                    "delFlagType": this.delFlagType, "userId": this.$global.userId};
                alert (JSON.stringify(data));
            },
            getType: function(param) {
                alert(param);
            }
        }
    }
</script>

<style scoped>
    @import '../../assets/css/image/spaceSetting.css';
</style>