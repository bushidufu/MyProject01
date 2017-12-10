<template>
    <div class="table">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path:'/DemandList'}"><i class="el-icon-menu"></i> 需求列表</el-breadcrumb-item>
                <el-breadcrumb-item>添加供给</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="15">
            <el-col :span="8">
                <el-col :span="9">
                    <div class="grid-content ">供给人：</div>
                </el-col>
                <el-col :span="15">
                    <el-input :disabled="true"  v-model="demandRecName" placeholder="请选择供给人"></el-input>
                </el-col>
            </el-col>

            <el-col :span="4">
                <el-button type="primary"  class="handle-del mr10" @click="showGetUser">选择供给人</el-button>

                <chooseuser :dialogFormVisible.sync="isdisplayGet" @selted="seltedGetUser"></chooseuser>


            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">承接人：</div>
                </el-col>
                <el-col :span="14">

                    <el-input :disabled="true" v-model="demandPuberName" placeholder="请选择承接人"></el-input>
                </el-col>

            </el-col>

            <el-col :span="4">
                <el-button type="primary"  class="handle-del mr10" @click="showPubUser">选择承接人</el-button>

                <chooseuser :dialogFormVisible.sync="isdisplayPub" @selted="seltedPubUser"></chooseuser>

                <!--<el-button>选择</el-button>-->
            </el-col>

        </el-row>

        <el-row :gutter="15">

            <el-col :span="8">
                <el-col :span="9">
                    <div class="grid-content ">供给标题：</div>
                </el-col>
                <el-col :span="15">
                    <el-input v-model="demandName" placeholder="请填写供给标题"></el-input>

                </el-col>
            </el-col>
            <el-col :span="8">
                <el-col :span="9">
                    <div class="grid-content ">供给类型：</div>
                </el-col>
                <el-col :span="15">
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

        </el-row>
        <el-row :gutter="15">
            <el-col :span="8">
                <el-col :span="9">
                    <div class="grid-content ">价格：</div>
                </el-col>
                <el-col :span="15">
                    <el-input v-model="aims" placeholder="请输入价格"></el-input>
                </el-col>
            </el-col>
            <el-col :span="8">
                <el-col :span="9">
                    <div class="grid-content ">有效期：</div>
                </el-col>
                <el-col :span="15">
                    <el-date-picker
                            v-model="bootDate"
                            type="date"
                            placeholder="请选择有效期"
                            @change="bootDateChange"
                            :editable="false">
                    </el-date-picker>
                    <!--<el-input v-model="uptime" placeholder="请选择开机时间"></el-input>-->
                </el-col>

            </el-col>

        </el-row>
        <br/>

        <el-row :gutter="15">

            <el-col :span="24">
                <el-col :span="3">
                    <div class="grid-content ">供给阐述：</div>
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
            <el-col :span="13">
                <div>
                    <upload showtype="1"  :showSuccList=true v-on:uploadSuccess="FileUrl" v-on:removeSuccess="rmFileUrl" :files="videoReal"></upload>
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
                <el-button @click="Add">添加</el-button>

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


  export default {
    data() {
      return {
        isdisplayUser:false,
        isdisplayPub:false,
        isdisplayGet:false,
        typeList:[{id:1,name:'有钱'},{id:2,name:'有人'},{id:3,name:'有活'},{id:3,name:'有资源'}],
        canCrop: false,
        /*测试上传图片的接口，返回结构为{url:''}*/
        uploadUrl: window.baseUploadImgUrl,

        demandName : '', //需求名称，模糊查询,
        demandMobile : '', //需求类型,类型id
        demandDate : '', //发布时间
        demandImg : '', //需求图片地址
        demandDetail :'' ,   //需求详情
        demandType : '' , //需求类型
        demandpubrec : 2, //1-发布需求。2-发布供给
        demandPuberName : '',    //发布人昵称
        demandRecName : '', //供给人昵称
        demandPuber : 0, //发布人id
        demandReceiver : 0, //供给人id

      }
    },
    created() {


    },
    computed: {},
    methods: {
      Add(){
        axios({
          method:'post',
          url:window.baseURL+'admin/demands',
          params:{
            demandName : this.demandName, //需求名称，模糊查询,
            demandImg : this.demandImg, //需求图片地址
            demandDetail : this.demandDetail,   //需求详情
            demandType : this.demandType , //需求类型
            demandpubrec : 2, //1-发布需求。2-发布供给
            demandPuberName : this.demandPuberName,    //发布人昵称
            demandRecName : this.demandRecName, //供给人昵称
            demandPuber : this.demandPuber, //发布人id
            demandReceiver : this.demandReceiver, //供给人id
          }
        }).then(res=>{
          if(res.data.code == 200){
            this.$message('修改供给成功');
            this.$router.push('/DemandList');
          }
        }).catch(err =>{
          console.log(JSON.stringify(err));
          this.$message('修改失败，请检查');

        })
      },
      Cancle(){
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
        this.demandRecName = user.userNickName;
        this.demandReceiver = user.userId;
        this.isdisplayGet = false;
      },
      FileUrl(data){
        this.demandImg = data;
      },
      rmFileUrl(data) {
      },
    },
    components: {
      upload, editor,chooseuser

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