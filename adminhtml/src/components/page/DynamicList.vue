<template>
    <div class="table">
        <chooseuser :dialogFormVisible.sync="isdisplay" @selted="seltedMethod"></chooseuser>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 动态管理</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content form_label">动态内容：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="search_content"></el-input>
                    </el-col>
                </el-col>

                <el-col :span="8">
                    <el-col :span="6">
                        <div class="grid-content form_label">发布人：</div>
                    </el-col>
                    <el-col :span="10">
                        <el-input v-model="userName" disabled="disabled"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" @click="showchooseuser">选择用户</el-button>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="9">
                        <el-button type="primary" icon="search" @click="dynamic_search">搜索</el-button>
                    </el-col>
                    <el-col :span="9">
                        <el-button type="primary" icon="plus" @click="showaddwin">新增</el-button>
                    </el-col>
                </el-col>

            </el-row><br/>

        </div>
        <br/>


        <el-table :data="dynamicList" border
                   ref="multipleTable" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="id" label="序号" width="100" align="center">
            </el-table-column>
            <el-table-column prop="userName" label="发布人" width="150" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="userId" label="发布人Id" width="100" align="center">
            </el-table-column>

            <el-table-column prop="title" label="标题" width="160" align="center" :show-overflow-tooltip="true">
            </el-table-column>

            <el-table-column prop="oneWord" label="简介" width="180" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="detail" label="详情" width="200" align="center" :show-overflow-tooltip="true">
            </el-table-column>

            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleDelete(scope.$index, scope.row)" type="danger">删除
                    </el-button>
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="pageTotal">
            </el-pagination>
        </div>

     </div>
</template>


<script>

  import axios from 'axios';
  import chooseuser from '../common/ChooseUser.vue';
  import upload from './UploadFile.vue';

  export default {
    data() {
      return {
        search_date: '',
        dynamicList: [],
        isdisplay: false,
        dialogFormVisible: false,
        userId: '',//用户编号
        userName: '',
        search_content: '',
        pageTotal: 0,
        cur_page: 1,
      }
    },
    components: {
      chooseuser, upload
    },
    created() {

      this.getData();

    },
    methods: {

      getData() {
        axios({
          method: 'get',
          url: window.baseURL + 'admin/dynamic',
          params: {
            page: this.cur_page,
          }
        }).then(res => {
          console.log(JSON.stringify(res.data.body));
          this.pageTotal = res.data.body.total;
          this.dynamicList = res.data.body.dynamics;
        }).catch(err => {
          this.$message('数据获取失败');
        });
      },
      dynamic_search() { //搜索
        axios({
          method: 'get',
          url: window.baseURL + 'admin/dynamic',
          params: {
            userId: this.userId
          }
        }).then(res => {
          this.pageTotal = res.data.body.total;
          this.dynamicList = res.data.body.dynamics;
        }).catch(err => {
          this.$message('数据获取失败');
        });
      },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

      showchooseuser() {
        this.isdisplay = true
      },
      seltedMethod(obj) {
        this.userId = obj.userId;
        this.userName = obj.userNickName;
        this.isdisplay = false
      },
      showaddwin() {
        this.$router.push('/AddDynamic');
      },
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getData();
      },
        handleDelete(index,row) {
            this.deletVideo(row.id,false);
        },

        delAll() {
            const self = this,
                length = self.multipleSelection.length;
            let str = '';


            for (let i = 0; i < length; i++) {
                str += (i == (length - 1)) ? self.multipleSelection[i].id : self.multipleSelection[i].id + ',';
            }
            this.deletVideo(str,true);

        },
        deletVideo( ids,isAll){
            let delUrl = '';
            let params = {};
            if(!isAll){
                delUrl = window.baseURL+'admin/dynamic/' + ids;
            }else {
                delUrl = window.baseURL+'admin/dynamic/batch';
                params['ids']=ids;
            }
            this.$confirm('此操作将删除本条信息', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios({
                    method:'delete',
                    url:delUrl,
                    params:params,
                }).then(res =>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData();
                }).catch(err =>{
                    this.$message.error('删除失败');
                });

            }).catch(() => {
                this.$message({
                    type: 'success',
                    message: '已取消删除'
                });
            });
        },
      handleEdit(index, row) {

        localStorage.setItem('dynamicEditId', row.id);
        localStorage.setItem('dynamicEditing', true);
        this.$router.push('/editDynamic')
      }
    }
  }


</script>


<style scoped>
    .form_label{
        margin-top:5px;
    }
    .sv{margin-left: 100px;margin-right: 10px}
</style>