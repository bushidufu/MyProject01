<template>
    <div>
        <el-dialog title="短视频选择" size="small" :visible.sync="this.dialogFormVisible">
            <div class="table">
                <div class="handle-box">
                    <el-input
                            placeholder="输入名称"
                            icon="search"
                            v-model="searchname"
                            :on-icon-click="startsearch"
                            class="handle-select"
                    >
                    </el-input>
                </div>

                <el-table :data="videoList" border style="width: 100%" ref="multipleTable">
                    <el-table-column prop="id" label="短片id" width="150">
                    </el-table-column>
                    <el-table-column prop="name" label="短片名称">
                    </el-table-column>
                    <el-table-column prop="studioName" label="机构名称">
                    </el-table-column>
                    <el-table-column prop="times" label="时长">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small"
                                       @click="handleUp(scope.$index, scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            layout="prev, pager, next"
                            :total="total_Count">
                    </el-pagination>
                </div>
                <div slot="footer" class="dialog-footer" style="float:right;margin-top:-14px;">
                    <el-button @click="closewin">取 消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import {Message} from 'element-ui';
    import axios from 'axios';

    export default {
        data(){
            return {
                searchname : '',
                total_Count: 10,
                cur_page: 1,
                pageSize: 10,
                chooseUserId : '',
                chooseStudioId : '',
                isShowClose : false,
                videoList : '',
                studioId : '',
                videoId : '',
                studioName : '',
                videoName : ''
            }
        },
        props: ['dialogFormVisible'],
        methods : {
            formatter(row,column){

            },
            startsearch(){
                console.log("search.........");
                let params = {
                    page: this.cur_page,
                    size: this.pageSize,
                }
                if (this.videoName !== '') {
                    params['name'] = this.searchname;
                }
                axios.get(window.baseURL + 'admin/videos', {params})
                    .then(res => {
                        this.total_Count = res.data.body.total;
                        this.videoList = res.data.body.videos;
                    }).catch(err => {

                    this.$message('数据获取失败');
                });
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.startsearch();
            },
            handleUp(index,row){
                var obj = {
                    'studioId' : row.studioId,
                    'videoId' : row.id,
                    'studioName' : row.studioName,
                    'videoName' : row.name
                }
                this.$emit('selVideo',obj);
            },
            closewin(obj){
                this.$emit('selVideo',false);
            }
        }
    }

</script>


<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 200px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

</style>