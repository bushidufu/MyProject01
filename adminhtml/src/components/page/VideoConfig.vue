<template>

    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 视频管理</el-breadcrumb-item>
                <el-breadcrumb-item>视频管理</el-breadcrumb-item>
            </el-breadcrumb>

        </div>

        <div>
            <el-row :gutter="15">

                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">视频名称：</div>

                    </el-col>
                    <el-col :span="9">

                        <el-input icon="edit" v-model="videoName" class="handle-input mr10 lmbt"  placeholder="请输入内容">
                        </el-input>

                    </el-col>
                </el-col>
                <el-col :span="10">
                    <el-col :span="6">
                        <div class="grid-content ">类别：
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <el-select v-model="videoType1" placeholder="请选择来源">
                            <el-option
                                    v-for="item in videoTypeList1"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">

                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">类型：</div>

                    </el-col>
                    <el-col :span="9">

                        <el-select v-model="videoType2" placeholder="请选择来源">
                            <el-option
                                    v-for="item in videoTypeList2"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>

                    </el-col>
                </el-col>
                <el-col :span="10">
                    <el-col :span="6">
                        <div class="grid-content ">题材：
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <el-select v-model="videoType3" placeholder="请选择来源">
                            <el-option
                                    v-for="item in videoTypeList3"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary"  @click="search">搜索</el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="addVideo">添加视频</el-button>
                    </el-col>
                </el-col>
            </el-row>

        </div>

        <el-table :data="videoList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">

            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="id" label=" 视频ID" :show-overflow-tooltip="true" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" :show-overflow-tooltip="true" align="center">
            </el-table-column>
            <el-table-column prop="userNickName" label="用户名称" :show-overflow-tooltip="true" align="center">
            </el-table-column>
            <el-table-column prop="typeName" label="类别" :show-overflow-tooltip="true" align="center">
            </el-table-column>
            <el-table-column prop="categoryName" label="视频类型" :show-overflow-tooltip="true" align="center">
            </el-table-column>
            <el-table-column prop="timeFormat" label="视频时长" :show-overflow-tooltip="true" align="center">
            </el-table-column>
            <el-table-column prop="name" label="视频名称" :show-overflow-tooltip="true" align="center">
            </el-table-column>
            <el-table-column prop="sourceFormat" label="来源" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>

                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button size="small"
                               @click="handleRec(scope.$index, scope.row)">{{scope.row.recType == 0 ? "推荐" : "撤推"}}
                    </el-button>
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


    </div>



</template>

<script>

  import axios from 'axios';
  import upload from './UploadFile.vue'
  import {Message} from 'element-ui';

  export default {
    data() {
      return {
        url: './static/newvuetable.json',
        videoList: [],
        cur_page: 1,
        pageSize: 10,
        total_Count: 200,
        multipleSelection: [],
        videoType: '',
        videoType1: '',
        videoType2: '',
        videoType3 : '',
        select_word: '',
        del_list: [],
        lmbt: '',
        videoName: '',
        videoTypeList: [],
        videoTypeList1: [],
        videoTypeList2: [],
        videoTypeList3: [],
        value: '',
        title:'',
      }
    },
      watch: {
          videoType1: {
              handler(newV, oldV) {
                  this.getCate('VIDEO_TYPE',2,newV);
              }
          }
      },
    created() {
              this.getData();
              this.getCate('VIDEO_TYPE');
              this.getCate3('VIDEO_CHILD_TYPE');
    },
    computed: {
      data() {
        const self = this;
      }
    },
    methods: {

      getData() {

        let params = {

          page: this.cur_page,
          size: this.pageSize,
        }
        if (this.videoType1 !== '') {
          params['videoType1'] = this.videoType1;
        }
        if (this.videoType2 !== '') {
          params['videoType2'] = this.videoType2;
        }
        if (this.videoType3 !== '') {
          params['videoType3'] = this.videoType3;
        }
        if (this.videoName !== '') {
          params['name'] = this.videoName;
        }

        axios.get(window.baseURL + 'admin/videos', {params})
          .then(res => {
            this.total_Count = res.data.body.total;
            this.videoList = res.data.body.videos;

          }).catch(err => {

          this.$message('数据获取失败');
        });

        axios.get(window.baseURL + 'admin/videos/types', {params})
          .then(res => {

            this.videoTypeList = res.data.body;

          }).catch(err => {

          this.$message('数据获取失败');
        });

      },
      total_Count_Page(val) {
        this.cur_page = val;
        this.getData(val);
      },
        handleRec(index, row){  //推荐，取消推荐

            var state_up = 0;
            if(row.recType == 0){
                state_up = 1;
            }else{
                state_up = 0;
            }

            const self = this;
            var bid = JSON.stringify(row.id);
            axios({
                method: 'PATCH',
                url: window.baseURL + 'admin/videos/recommend',
                params: {
                    id : bid,
                    state : state_up
                }
            })
                .then(function (response) {
                    const code = response.data.code;
                    if (code == 200) {
                        self.search();
                    } else {
                        this.$message("推荐失败");
                    }
                });
        },
      search() {
          let self = this;
        let params = {
          page: this.cur_page,
          size: this.pageSize,
        }
        if (this.videoType1 !== '') {
          params['videoType1'] = this.videoType1;
        }
        if (this.videoType2 !== '') {
              params['videoType2'] = this.videoType2;
        }
        if (this.videoType3 !== '') {
              params['videoType3'] = this.videoType3;
        }
        if (this.videoName !== '') {
          params['name'] = this.videoName;
        }
        axios.get(window.baseURL + 'admin/videos', {params})
          .then(res => {
            self.total_Count = res.data.body.total;
            self.videoList = res.data.body.videos;

          }).catch(err => {

          this.$message('数据获取失败');
        });
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleEdit(index, row) {

        localStorage.setItem('videoEditId', row.id);
        localStorage.setItem('videoEditing', true);
        this.$router.push('/editVideo');
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
          delUrl = window.baseURL+'admin/videos/' + ids;
        }else {
          delUrl = window.baseURL+'admin/videos/batch';
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

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addVideo(){
        this.$router.push('/AddVideo');
      },
      getCate(code,level,parentId){

            if(undefined == code){
                this.$message('失败的类型查询');
            }
          if(undefined == level){
                level = 1;
          }
          if(undefined == parentId){
              parentId = '';
          }


          var self = this;

            axios({
                method:'get',
                url:window.baseURL + 'admin/category',
                params:{
                    code:'VIDEO_TYPE',
                    level : level,
                    parentId : parentId
                }
            }).then(res =>{
                if (res.data.code == 200){
                        if(level == 1){
                            this.videoTypeList1 =res.data.body;
                        }
                      if(level == 2){
                          this.videoTypeList2 =res.data.body;
                      }
                      if(level == 3){
                          this.videoTypeList3 =res.data.body;
                      }

                  }else {
                      this.$message('网络错误，请检查');
                  }
            }).catch(err =>{
              this.$message('网络错误，请检查');
            })
        },
        getCate3(code,level,parentId){
            if(undefined == code){
                this.$message('失败的类型查询');
            }
            if(undefined == level){
                level = 1;
            }
            if(undefined == parentId){
                parentId = '';
            }
            var self = this;
            axios({
                method:'get',
                url:window.baseURL + 'admin/category',
                params:{
                    code:code,
                    level : level,
                    parentId : parentId
                }
            }).then(res =>{
                if (res.data.code == 200){
                    this.videoTypeList3 =res.data.body;
                }else {
                    this.$message('网络错误，请检查');
                }
            }).catch(err =>{
                this.$message('网络错误，请检查');
            })
        },
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getData(val);
      },





    }
  }
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;

    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        margin-top: 6px;

    }

    .el-table th>.cell {
        text-align: center
    }

    .lmbt {
        width: 160px
    }
    .el-row{margin-bottom: 10px}
    .lbt{margin-top:8px}
    #delet{margin-bottom: 0}
</style>