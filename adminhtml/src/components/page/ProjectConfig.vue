<template>

    <div>
        <div>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/projectConfig' }"><i class="el-icon-menu"></i>项目管理</el-breadcrumb-item>
                    <el-breadcrumb-item>项目管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-row :gutter="15" class="rowmargin">

                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">类型：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="type" placeholder="请选择类型">
                        <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    </el-col>
                </el-col>
                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">类别：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="sort" placeholder="请选择类别">
                            <el-option
                                    v-for="item in sortArr"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">分类：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="category" placeholder="请选择分类">
                            <el-option
                                    v-for="item in cateArr"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>

            </el-row><br/>


            <el-row :gutter="15" class="rowmargin">
                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">项目阶段：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="stage" placeholder="请选择项目阶段">
                            <el-option
                                    v-for="item in stages"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content">项目名称：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input icon="edit" v-model="name" class="handle-input mr10 lmbt"  placeholder="请输入名称">
                        </el-input>
                    </el-col>
                </el-col>
                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">融资目标：  </div>

                    </el-col>
                    <el-col :span="16">

                        <el-input icon="edit" v-model="aims" class="handle-input mr10 lmbt"  placeholder="请输入融资目标">
                        </el-input>

                    </el-col>
                </el-col>


            </el-row>
            <br>

            <el-row :gutter="15" class="rowmargin">
                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">融资占比：
                        </div>
                    </el-col>

                    <el-col :span="16">
                        <el-input icon="edit" v-model="completeAmount" class="handle-input mr10 lmbt"  placeholder="请输入融资占比">
                        </el-input>

                    </el-col>

                </el-col>
                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">起投金额：
                        </div>
                    </el-col>

                    <el-col :span="16">
                        <el-input icon="edit" v-model="voteScale" class="handle-input mr10 lmbt"  placeholder="请输入起投金额">
                        </el-input>
                    </el-col>

                </el-col>
                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content ">导演：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input icon="edit" v-model="userId" class="handle-input mr10 lmbt"  placeholder="请输入导演名字">
                        </el-input>
                    </el-col>
                </el-col>


            </el-row><br/>
            <el-row :gutter="15" class="rowmargin">
                <el-col :span="7">
                    <el-col :span="8">
                        <div class="grid-content " >制片人：  </div>

                    </el-col>
                    <el-col :span="16">

                        <el-input icon="edit" v-model="writename" class="handle-input mr10 lmbt"  placeholder="请输入制片人名字">
                        </el-input>

                    </el-col>
                </el-col>
                <el-col :span="7">
                    <el-col :span="8" >
                        <div class="grid-content">需求数量：
                        </div>
                    </el-col>

                    <el-col :span="16">
                        <el-input icon="edit" v-model="demandCount" class="handle-input mr10 lmbt"  placeholder="请输入数量">
                        </el-input>
                    </el-col>

                </el-col>
                <el-col :span="4">
                    <el-col :span="12">
                        <el-button type="primary" @click="proSearch">搜索</el-button>

                    </el-col>

                    <el-col :span="12">
                        <el-button type="primary" @click="proAdd">添加</el-button>

                    </el-col>
                </el-col>
            </el-row>


        </div>
        <br/><br/>

        <el-table :data="tableList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">

            <!--<el-table-column type="selection"></el-table-column>-->
            <el-table-column prop="id" label="ID" :show-overflow-tooltip="true" align="center">
            </el-table-column>
            <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" align="center" width="110">
            </el-table-column>
            <!--<el-table-column prop="studioName" label="所属" width="100">-->
            <!--</el-table-column>-->

            <el-table-column prop="userName" label="主创" width="140" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="screenName" label="发布人" width="95" align="center" :show-overflow-tooltip="true">
            </el-table-column>

            <el-table-column prop="completeAmount" label="融资占比" width="95" align="center">
            </el-table-column>
            <el-table-column prop="voteScale" label="起投金额" width="95" align="center">
            </el-table-column>
            <el-table-column prop="cycle" label="融资周期" width="100" align="center">
            </el-table-column>
            <el-table-column label="操作" id="cz" width="200">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>

                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button size="small"
                               @click="handleRecommend(scope.$index, scope.row)">{{scope.row.recState == 0 ? "推荐" : "撤推"}}
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
  import {Message} from 'element-ui';


  export default {
    data() {
      return {
        cur_page: 1,
        pageSize: 10,
        projectName:'',//项目名称
        multipleSelection:[],
        stage:'',
        stages: [],//项目阶段
        typeList: [],
        type: '',//项目一级类型
        sort: '',//项目二级类别
        sortArr: [],
        category: '',//项目三级分类
        cateArr: [],
        name:'',
        aims: '',//融资目标
        completeAmount: '',//融资占比
        voteScale: '',//起投金额
        userId:'',
        tableList:[],
        pageTotal:0,
        writename:'',
        demandCount:'',
      }
    },
    created() {
      this.getCate();

      this.getProList();
    },
    computed: {
      data() {
      }
    },
    methods: {

      handleEdit(index, row){
        localStorage.setItem('proEditId', row.id);
        localStorage.setItem('proEditing', true);
        this.$router.push('/editProject')
      },
//      handleDelete(index, row){
//
//        axios({
//          method:'delete',
//          url:window.baseURL +'admin/project/'+row.id,
//        }).then(res =>{
//          this.$message('删除成功');
//          this.getProList();
//
//        }).catch(err=>{
//
//          console.log(JSON.stringify(err));
//          this.$message('删除失败');
//        })
//      },

        handleDelete(index,row) {
            this.deletVideo(row.id,false);
        },
        handleRecommend(index,row) {
            let recommendUrl = window.baseURL+'admin/project/recommend';
            let params = {};
            var id = row.id;
            var curstate = row.recState;
            if(curstate == 0){
                curstate = 1;
            }else{
                curstate = 0
            }
            params['id'] = id;
            params['state'] = curstate;
            let self = this;
            axios({
                method:'patch',
                url: recommendUrl,
                params:params,
            }).then(res =>{
                if(res.data.code != 200){
                    self.$message.error(res.data.msg);
                }else{
                    self.proSearch();
                }
            }).catch(err =>{
                self.$message.error('推荐失败');
            });
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
                delUrl = window.baseURL+'admin/project/' + ids;
            }else {
                delUrl = window.baseURL+'admin/project/batch';
                params['ids']=ids;
            }
            this.$confirm('此操作将删除本条信息', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios({
                    method:'delete',
                    url: delUrl,
                    params:params,
                }).then(res =>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.proSearch();
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

      handleAddNeed(index, row){
        this.$router.push('/editProject')
      },

      handleCurrentChange(val) {
        this.cur_page = val;
        this.getProList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      getProList(){

         axios({
           methods:'get',
           url:window.baseURL+'admin/project',
           params:{

             page:this.cur_page,
             size: this.pageSize,
           }
         }).then(res=>{
           console.log(1111111);
           console.log(res.data.body.projects);
           this.tableList = res.data.body.projects;
           this.pageTotal = res.data.body.total;
         }).catch(err=>{
           this.$message('获取数据失败，请刷新');
         })
      },
      proSearch(){

        let par = this.makeParams();
        axios({
          methods:'get',
          url:window.baseURL+'admin/project',
          params:par,
        }).then(res=>{

          this.tableList = res.data.body.projects;
          this.pageTotal = res.data.body.total;
        }).catch(err=>{

        })
      },
      makeParams(){
        let tempParams = {};
        if (this.$lodash.trim(this.projectName) !== '' ){
          tempParams['projectName'] = this.projectName;
        }
        if (this.stage !== ''){
          tempParams['stage'] = this.stage;
        }
        if (this.type !== ''){
          tempParams['type'] = this.type;
        }
        if (this.sort !== ''){
          tempParams['sort'] = this.sort;
        }
        if (this.category !== ''){
          tempParams['category'] = this.category;
        }
        if (this.$lodash.trim(this.name) !== '' ){
          tempParams['name'] = this.name;
        }
        if (this.$lodash.trim(this.aims) !== '' ){
          tempParams['aims'] = this.aims;
        }
        if (this.$lodash.trim(this.completeAmount) !== '' ){
          tempParams['completeAmount'] = this.completeAmount;
        }
        if (this.$lodash.trim(this.voteScale) !== '' ){
          tempParams['voteScale'] = this.voteScale;
        }
        if (this.$lodash.trim(this.userId) !== '' ){
          tempParams['userId'] = this.userId;
        }
        if (this.$lodash.isNumber((parseInt(this.demandCount))) ){
          tempParams['demandCount'] = this.demandCount;
        }

        return tempParams;

      },
      proAdd(){

        this.$router.push('/AddProject');
      },
      //分类联动
      updateSort() {

        for (var i = 0; i < this.typeList.length; i++) {
          var obj = this.typeList[i];
          if (this.type == obj.id) {
            this.sortArr = obj.subs;
            if(this.sortArr == undefined) {
              this.sort ='';
              this.category ='';
              return;
            }
            this.sort = this.sortArr[0].id;

            this.cateArr = obj.subs[0].subs;
            if(this.cateArr == undefined){
              this.category = '';
              return;
            }else {
              this.category = this.cateArr[0].id;
            }
            break;
          }
        }
      },
      updateCategory() {

        for (var i = 0; i < this.sortArr.length; i++) {
          var obj = this.sortArr[i];
          if (this.sort == obj.id) {
            this.cateArr = obj.subs;
            if(this.cateArr == undefined){
              this.category = '';
              return;
            }else {
              this.category = this.cateArr[0].id;
            }

            break;
          }

        }
      },
      getCate(){

        axios({
          method:'get',
          url:window.baseURL + 'admin/category',
          params:{
            code:'PROJECT_STAGE_TYPE',
            level:1
          }
        }).then(res =>{

          if (res.data.code == 200){

            this.stages =res.data.body;
          }else {
            this.$message('网络错误，请检查');
          }
        }).catch(err =>{
          this.$message('网络错误，请检查');

        });

        axios({
          method:'get',
          url:window.baseURL + 'admin/category',
          params:{
            code:'PROJECT_TYPE',
          }
        }).then(res =>{
          let dataArr = res.data.body;

          let array2 = [];
          let array1 = [];
          let tempObj = {};
          let tempObj2 = {};

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
              array2.push(obj);

            }else if (obj.level == 3){

              let str =  'pId'+obj.parentId;
              if(this.$lodash.isEmpty(tempObj[str])){
                tempObj[str]=[obj];
              }else {
                tempObj[str].push(obj);
              }
            }
          }

          for (var i = 0; i < array2.length; i++) {
            var obj = array2[i];
            let str =  'pId'+obj.id;
            obj.subs = tempObj[str];

          }

          for (var i = 0; i < array2.length; i++) {
            var obj = array2[i];

            let str =  'pId'+obj.parentId;

            if(this.$lodash.isEmpty(tempObj2[str])){
              tempObj2[str]=[obj];
            }else {
              tempObj2[str].push(obj);
            }
          }

          for (var i = 0; i < array1.length; i++) {
            var obj = array1[i];
            let str =  'pId'+obj.id;
            obj.subs = tempObj2[str];
          }

          this.typeList = array1;

        }).catch(err =>{

        })
      },


    },
    watch: {

      type: {
        handler(newV, oldV) {
          this.updateSort();
          this.updateCategory();
        }
      },
      sort: {
        handler(newV, oldV) {
          this.updateCategory();

        }
      },
      currentStr(newV, oldV){
        switch (this.currentIndex) {
          case 1:
            this.czDetail = newV;
            break;
          case 2:
            this.dyIntro = newV;
            break;
          case 3:
            this.bjIntro = newV;
            break;
          case 4:
            this.gsIntro = newV;
            break;
          case 5:
            this.gsDetail = newV;
            break;
          case 6:
            this.dyDetail = newV;
            break;
          default:
            break;
        }

      }

    },

  }
</script>

<style scoped>
    .grid-content {
        padding-top:5px;
        border-radius: 4px;
        min-height: 36px;
        margin-top: 0px;
    }


    .rowmargin {
        margin-top:-15px;
    }

</style>