<!--需求列表-->
<template>
    <div class="table">
        <chooseuser :dialogFormVisible.sync="isdisplay" @selted="seltedMethod"></chooseuser>

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 需求列表</el-breadcrumb-item>
                <el-breadcrumb-item>需求列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content form_label">需求名称：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="demandName"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content form_label">需求类别：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-select v-model="demandType" placeholder="请选择供给类型">
                            <el-option
                                    v-for="item in typeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="7">
                        <div class="grid-content form_label">供需：</div>
                    </el-col>
                    <el-col :span="10">
                        <el-select v-model="demandpubrec" placeholder="请选择">
                            <el-option
                                    v-for="item in  demandpubrecList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="15">
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content form_label">发布人：</div>
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="search_pub" disabled="disabled"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="showpubwin">选择</el-button>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">申请人：</div>
                    </el-col>
                    <el-col :span="10">
                        <el-input v-model="search_rec" disabled="disabled"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="showrecwin">选择</el-button>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content form_label">状态：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-select v-model="search_state" placeholder="完成">
                            <el-option key="finish" label="完成" value="bbk"></el-option>
                            <el-option key="unfinish" label="未完成" value="xtc"></el-option>
                        </el-select>
                    </el-col>
                </el-col>

                <el-col :span="6">
                    <el-col :span="8">
                        <el-button type="primary" icon="search" @click="dosearch">搜索</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" icon="plus" @click="demandAdd">添加</el-button>
                    </el-col>
                </el-col>

            </el-row>
            <br/>
        </div>


        <el-table   :data="demandList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="id" label="ID" width="80" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="发布人Id" width="100" align="center">
            </el-table-column>
            <el-table-column prop="title" label="需求标题" width="150" :show-overflow-tooltip="showflow" align="center">
            </el-table-column>
            <el-table-column prop="demandType" label="类型" width="65" align="center">
                
            </el-table-column>
            <el-table-column prop="pubDate" label="发布时间" width="110"align="center">
            </el-table-column>
            <el-table-column prop="rec" label="供需" width="100" align="center" :formatter="fordemandtype">
            </el-table-column>

            <el-table-column label="操作" align="center" >
                <template scope="scope">

                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="small"
                    @click="handleDelete(scope.$index, scope.row)" type="danger">删除
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
  import chooseuser from '../common/ChooseUser.vue';

  export default {
    data() {
      return {
        showflow:true,
        search_copyright: '',
        demandType: '',
        search_state: '',
        demandList: [],
        total_Count: 10,
        cur_page: 1,
        pageSize: 10,
        isdisplay: false,
        demandPuber: '',
        search_pub: '',
        search_chooserose: 0,
        demandReceiver: '',
        search_rec: '',
        demandName : '', //需求名称，模糊查询,
        isSearch:false,
        typeList:[],
        demandpubrecList:[{id:1,name:'供'},{id:2,name:'需'}],
        demandpubrec:'',
      }
    },
    created() {
      this.getdata();
      this.getCate();

        axios({
            method:'get',
            url:window.baseURL + 'admin/category',
            params:{
                code:'DEMAND_TYPE',
            }
        }).then(res =>{
            this.typeList = res.data.body;
    }).catch(err =>{
        })


    },
    components: {
      chooseuser
    },
    watch: {
      type01: {
        handler(newV, oldV) {
          this.updateSort();
        },
      },
      type01_add: {
        handler(newV, oldV) {
          this.updateSort();
        }
      },

    },
    methods: {
        fordemandtype(row,column){
            if(row.rec == 1){
                return "供给"
            }
            if(row.rec == 2){
                return "需求"
            }
        },
        handleSelectionChange(){

        },
      getdata(){
        axios({
          method:'get',
          url:window.baseURL+'admin/demands',
          params:{demandCondition:JSON.stringify({
            curPage : this.cur_page, //页面页码
            pageSize : this.pageSize //页面数量
          })}
        }).then(res=>{
          this.total_Count = res.data.body.count;
          this.demandList = res.data.body.body;
          console.log(JSON.stringify(this.demandList));
        }).catch(err =>{
          console.log(JSON.stringify(err));
        })
      },
      dosearch() {

        this.cur_page = this.isSearch ? this.cur_page : 1 ;
        this.isSearch = true;


          let params =  {
              demandName : this.demandName,
              demandType : this.demandType,
              demandPuber : this.demandPuber,
              curPage : this.cur_page,
              pageSize : this.pageSize
          };


        if(this.demandType != ''){
            params.demandType = this.demandType;
        }
        if(this.demandpubrec != ''){
              params.demandpubrec = this.demandpubrec;
        }


        axios({
          method:'get',
          url:window.baseURL+'admin/demands',
          params:{demandCondition:JSON.stringify(params)}

        }).then(res=>{
          this.total_Count = res.data.body.count;
          this.demandList = res.data.body.body;
          console.log(JSON.stringify(this.demandList));
        }).catch(err =>{
          console.log(JSON.stringify(err));
        })

      },
      showpubwin() {
        this.search_chooserose = 1;
        this.isdisplay = true;
      },
      showrecwin() {
        this.search_chooserose = 2;
        this.isdisplay = true;
      },
      demand_search() {

      },
      handleEdit(index,row){
        localStorage.setItem('demandEditId', row.id);
        localStorage.setItem('demandEditing', true);
        this.$router.push('/EditSupply');
      },
      handleDelete(index,row){
        this.$confirm('此操作将删除本条信息', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method:'delete',
            url:window.baseURL+'/admin/demands/'+row.id,
          }).then(res =>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            console.log(222222222);
           // this.getData();
            axios({
              method:'get',
              url:window.baseURL+'admin/demands',
              params:{demandCondition:JSON.stringify({
                curPage : this.cur_page, //页面页码
                pageSize : this.pageSize //页面数量
              })}
            }).then(res=>{
              this.total_Count = res.data.body.count;
              this.demandList = res.data.body.body;
              console.log(JSON.stringify(this.demandList));
            }).catch(err =>{
              console.log(JSON.stringify(err));
            })
          });

        });
      },
      demandAdd() {
        this.$router.push('/AddNeed');
      },
      seltedMethod(obj) {
        if (this.search_chooserose == 1) {
          this.demandPuber = obj.userId;
          this.search_pub = obj.userNickName;
        }
        if (this.search_chooserose == 2) {
          this.demandReceiver = obj.userId;
          this.search_rec = obj.userNickName;
        }
        this.isdisplay = false;
      },
      handleCurrentChange(val) {
        this.cur_page = val;

        if(this.isSearch){
          this.dosearch();

        }else {
          this.getdata();

        }

      },
      getCate(){

        axios({
          method:'get',
          url:window.baseURL + 'admin/category',
          params:{
            code:'DEMAND_TYPE',
          }
        }).then(res =>{
            console.log(res.data.body);
          let dataArr = res.data.body;
          let array1 = [];
          let tempObj = {};

          for (var i = 0; i < dataArr.length; i++) {
            var obj = dataArr[i];
            if (obj.level == 1){
              obj['subs'] = [];
              array1.push(obj);

            }else if (obj.level == 2){
              obj['subs'] = [];
              let str =  'pId'+obj.parentId;
              if(this.$lodash.isEmpty(tempObj[str])){

                tempObj[str]=[obj];
              }else {
                tempObj[str].push(obj);
              }
            }
          }

          for (var i = 0; i < array1.length; i++) {
            var obj = array1[i];
            let str =  'pId'+obj.id;
            obj.subs = tempObj[str];
          }
          this.sellTypeList = array1;

        }).catch(err =>{

        })
      },
      //分类联动
      updateSort() {
        const self = this;
        for (var i = 0; i < this.sellTypeList.length; i++) {
          var obj = this.sellTypeList[i];

          if (self.type01_add == obj.id) {
            self.sortTypeList = obj.subs;
            self.type02_add = self.sortTypeList[0].id;
            break;
          }

          if (this.type01 == obj.id) {
            this.sortTypeList = obj.subs;
            //this.categoryTypeList = obj.subs[0].subs;
            this.type02 = this.sortTypeList[0].id;
            break;
          }
        }
      },
      updateCategory() {

        for (var i = 0; i < this.sortTypeList.length; i++) {
          var obj = this.sortTypeList[i];
          if (this.type02 == obj.id) {
            this.categoryTypeList = obj.subs;
            break;
          }

        }
      },
    }
  }
</script>

<style scoped>
    .grid-content {
        margin-top: 8px
    }

    .rightname {
        margin-right: 10px;
    }

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

    .el-row {
        margin-bottom: 10px
    }
</style>