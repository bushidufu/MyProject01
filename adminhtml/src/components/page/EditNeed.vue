<template>
    <div class="table">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path:'/DemandList'}"><i class="el-icon-menu"></i> 需求列表</el-breadcrumb-item>
                <el-breadcrumb-item>编辑需求</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="15">
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">发起人：</div>
                </el-col>
                <el-col :span="14">
                    <el-input :disabled="true"  v-model="demandPuberName" placeholder="请选择发起人"></el-input>
                </el-col>
            </el-col>

            <el-col :span="3">
                <el-button type="primary"  class="handle-del mr10" @click="showPubUser">选择发起人</el-button>
                <chooseuser :dialogFormVisible.sync="isdisplayPub" @selted="seltedPubUser"></chooseuser>
            </el-col>

            <el-col :span="10">
                <el-col :span="5">
                    <div class="grid-content ">承接人：</div>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary"  class="handle-del mr10" @click="showGetUser">选择承接人</el-button>

                    <chooseuser :dialogFormVisible.sync="isdisplayGet" @selted="seltedGetUser"></chooseuser>

                    <!--<el-button>选择</el-button>-->
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="showSelectUsers">查看</el-button>
                    <showUser :dialogFormVisible.sync="isdisplayUsers" :keyName="keyName" :needShowUserArr="demandUsers" @selted="closeShowUser" @delUeritem="deleteUser"></showUser>
                </el-col>
            </el-col>
        </el-row>

        <el-row :gutter="15">
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">需求标题：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="demandName" placeholder="请填写需求标题"></el-input>

                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content form_label">供需类型：</div>
                </el-col>
                <el-col :span="14">
                    <el-select v-model="demandpubrec" placeholder="请选择">
                        <el-option
                                v-for="item in demandpubrecList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">需求类型：</div>
                </el-col>
                <el-col :span="14">
                    <el-select v-model="demandType" placeholder="请选择需求类型">

                        <el-option
                                v-for="item in typeList"
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
                    <div class="grid-content ">开始时间：</div>
                </el-col>
                <el-col :span="14">
                    <el-date-picker id="comdata"
                                    v-model="startDate"
                                    type="date"
                                    placeholder="开始时间"
                                    @change="bootDateChange"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    :editable="false">
                    </el-date-picker>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">结束时间：</div>
                </el-col>
                <el-col :span="14">
                    <el-date-picker id="comdata"
                                    v-model="endDate"
                                    type="date"
                                    placeholder="结束时间"
                                    @change="bootDateChange"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    :editable="false">
                    </el-date-picker>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">需求预算：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="budget" placeholder="请输入需求预算"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <br/>

        <el-row :gutter="15">

            <el-col :span="19">
                <el-col :span="3">
                    <div class="grid-content ">需求阐述：</div>
                </el-col>
                <el-col :span="20">

                    <editor ref="myTextEditor"
                            :fileName="'myFile'"
                            :canCrop="canCrop"
                            :uploadUrl="uploadUrl"
                            v-model="demandDetail">
                    </editor>                </el-col>

            </el-col>


        </el-row><br/><br/>




        <el-row :gutter="15">
            <el-col :span="3">
                <div class="grid-content ">相关文件：</div>
            </el-col>
            <el-col :span="12">
                <div>
                    <upload showtype="1"  :showSuccList=true v-on:uploadSuccess="FileUrl" v-on:removeSuccess="rmFileUrl" :files="filesReal"></upload>
                </div>
            </el-col>
        </el-row>
        <br/><br/>
        <!--保存 取消-->
        <el-row :gutter="15">
            <el-col :span="6">
                <div></div>
            </el-col>

            <el-col :span="6" :offset="6">
                <el-button @click="Update">提交</el-button>

            </el-col>
            <el-col :span="3">
                <el-button @click="Cancle">取消</el-button>
            </el-col>
            <el-col :span="3">
                <div></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

  import axios from 'axios';
  import upload from './UploadFile.vue'
  import chooseuser from '../common/ChooseUser.vue';
  import editor from './Quilleditor.vue'
  import showUser from '../common/ShowUser.vue';


  export default {
    data() {
      return {
          budget : '',
        keyName:'userName',
        isdisplayUsers:false,
        isdisplayUser:false,
        isdisplayPub:false,
        isdisplayGet:false,
        demandpubrecList:[{id:1,name:'供给'},{id:2,name:'需求'}],
        typeList:[{id:1,name:'找钱'},{id:2,name:'找人'},{id:3,name:'找活'},{id:4,name:'找资源'},{id:5,name:'找资源2'},{id:6,name:'找资源1'}],
        canCrop: false,
        /*测试上传图片的接口，返回结构为{url:''}*/
        uploadUrl: window.baseUploadImgUrl,
        startDate : '',
        endDate : '',
        demandName : '', //需求名称，模糊查询,
        demandMobile : '', //需求类型,类型id
        demandDate : '', //发布时间
        demandDetail :'' ,   //需求详情
        demandType : '' , //需求类型
        demandpubrec : '', //1-发布需求。2-发布供给
        demandPuberName : '',    //发布人昵称
        demandRecName : '', //供给人昵称
        demandPuber : 0, //发布人id
        demandReceiver : 0, //供给人id
        isEditing:false,
        id:0,
        filesReal:[],
        deleteArr:[],
        annexs:[],
        demandUserIds:[],
        demandUsers:[],
        newAddUsers:[],

      }
    },
    created() {

      let id = localStorage.getItem('demandEditId');
      let isEditing = localStorage.getItem('demandEditing');
      this.id =id;
      this.isEditing =isEditing;

      this.getdata();

    },
    computed: {},
    methods: {

        bootDateChange(){},
      //展示制片人
      showSelectUsers(){
        this.isdisplayUsers = true;
      },

      closeShowUser() {

        this.isdisplayUsers = false;
      },
      deleteUser(obj){
        if (obj.id !=undefined){
            this.demandUserIds.push(obj.id);
        }
        this.demandUsers.splice(this.demandUsers.indexOf(obj), 1);
        this.newAddUsers.splice(this.newAddUsers.indexOf(obj), 1);
      },

      getdata(){
        axios({
          method:'get',
          url:window.baseURL+'admin/demands/'+this.id,

        }).then(res=> {

          let need = res.data.body.demand;
          let annexsArr = res.data.body.annexs;
          let demUsers = res.data.body.demandUsers;

          this.demandDetail = need.detail;//需求详情
          this.demandName = need.title; //需求名称，模糊查询,
          this.demandType = need.demandType;//需求类型
          this.demandpubrec = need.isDerec; //1-发布需求。2-发布供给
          this.demandPuberName = need.pubUsername;    //发布人昵称
          this.demandPuber = need.userId; //发布人id
          this.startDate = need.startDate;
          this.endDate = need.endDate;
          this.budget = need.budget;

          for (var i = 0; i < demUsers.length; i++) {
            var obj = demUsers[i];
            this.demandUsers.push({id:obj.id,userName:obj.userName,userId:obj.userId})
          }
          for (var i = 0; i < annexsArr.length; i++) {
            var obj = annexsArr[i];
            this.filesReal.push({url: window.basePic + obj.href, name: obj.href,id:obj.id});
          }
        }).catch(err =>{
          this.$message('获取数据失败，请检查');
        })
      },

      Update(){
        let token = localStorage.getItem('token');

          if(undefined == this.demandName || '' == this.demandName){
              this.$message('需求标题不可为空');
              return;
          }
          if(undefined == this.demandDetail || '' == this.demandDetail){
              this.$message('需求详情不可为空');
              return;
          }
          if(undefined == this.demandType || '' == this.demandType){
              this.$message('需求类型不可为空');
              return;
          }
          if(undefined == this.demandpubrec || '' == this.demandpubrec){
              this.$message('供需类型不可为空');
              return;
          }
          if(undefined == this.demandPuber || '' == this.demandPuber){
              this.$message('发布人不可为空');
              return;
          }
          if(undefined == this.budget || '' == this.budget){
              this.$message('需求预算不可为空');
              return;
          }
          if(undefined == this.startDate || this.startDate == ''){
              this.$message('需求开始时间不可为空');
              return;
          }
          if(undefined == this.endDate || this.endDate == ''){
              this.$message('需求结束时间不可为空');
              return;
          }


          let paramsTemp = {
              annexs:this.annexs,
              demandUsers:this.newAddUsers,
              annexIds:this.deleteArr,
              demandName : this.demandName, //需求名称，模糊查询,
              demandDetail : this.demandDetail,   //需求详情
              demandType : this.demandType , //需求类型
              demandpubrec : this.demandpubrec, //1-发布需求。2-发布供给
              demandPuberName : this.demandPuberName,    //发布人昵称
              demandPuber : this.demandPuber, //发布人id
              demandUserIds:this.demandUserIds,
              demandId:this.id,
              budget : this.budget, //需求预算
              startDate : this.startDate,
              endDate : this.endDate
        };
        axios({
          method:'post',
          url:window.baseURL+'admin/demands',
        headers: {'X-XSRF-TOKEN': token,
            'Content-Type': 'application/json'},
          data:{
            annexs:this.annexs,
            annexsImg:this.annexsImg,
            demandUsers:this.demandUsers,
            demandName : this.demandName, //需求名称，模糊查询,
            demandDetail : this.demandDetail,   //需求详情
            demandType : this.demandType , //需求类型
            demandpubrec : this.demandpubrec, //1-发布需求。2-发布供给
            demandPuberName : this.demandPuberName,    //发布人昵称
            demandPuber : this.demandPuber, //发布人id
            budget : this.budget, //需求预算
            startDate : this.startDate,
            endDate : this.endDate,
            demandId:this.id,

          }
        }).then(res=>{
          if(res.data.code == 200){
            localStorage.setItem('demandEditId',0);
            localStorage.setItem('demandEditing',0);
            this.$message('修改成功');
            this.$router.push('/DemandList');
          }else {
            this.$message('修改失败，请检查');

          }
        }).catch(err =>{
          this.$message('修改失败，请检查');

        })
      },
      Cancle(){

        localStorage.setItem('demandEditId',0);
        localStorage.setItem('demandEditing',0);
        this.$message('已取消');

        this.$router.push('/DemandList');
      },
      //选择用户
      showCreatUser(){
        this.isdisplayUser = true;
      },
      showPubUser(){
        this.isdisplayPub = true;
      },
      seltedPubUser(user){
        this.demandPuberName = user.userNickName;
        this.demandPuber = user.userId;
        this.isdisplayPub = false;
      },
      showGetUser(){
        this.isdisplayGet = true;
      },
      seltedGetUser(user){

        if(user!= false){
          this.demandUsers.push({
            userId: user.userId,
            userName: user.userNickName,
          });
          this.newAddUsers.push({
            userId: user.userId,
            userName: user.userNickName,
          });
        }
        this.isdisplayGet = false;
      },
      FileUrl(data){
        this.annexs.push({
          type:2,
          businessType:1,
          href:data,
        })
        this.filesReal.push({url: window.basePic + data, name: data})
      },
      rmFileUrl(data) {

          for (var i = 0; i < this.filesReal.length; i++) {
            var obj = this.filesReal[i];
            if(data.id == obj.id){
              this.deleteArr.push(data.id);
              this.$lodash.pullAt(this.filesReal,i);
              return;
            }
          }

        if(data.id)
        this.filesReal= [];
      },
    },
    components: {
      upload, editor,chooseuser,showUser

    },
  }
</script>

<style scoped>
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        margin-top: 10px;

    }
    .upto{margin-bottom: 60px}


</style>