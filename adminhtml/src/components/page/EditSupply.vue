<template>
    <div class="table">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path:'/DemandList'}"><i class="el-icon-menu"></i> 需求列表</el-breadcrumb-item>
                <el-breadcrumb-item>修改需求</el-breadcrumb-item>
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
                    <div class="grid-content ">申请人：</div>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary"  class="handle-del mr10" @click="showGetUser">选择申请人</el-button>
                    <chooseuser :dialogFormVisible.sync="isdisplayGet" @selted="seltedGetUser"></chooseuser>
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
                                v-for="item in  demandpubrecList"
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
                                    @change="bootDateChange01"
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
                                    @change="bootDateChange02"
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
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content form_label">地域省：</div>
                </el-col>

                <el-col :span="14">
                    <el-select v-model="type01_add" placeholder="所在省">
                        <el-option
                                v-for="item in sellTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content form_label">所在市：</div>
                </el-col>
                <el-col :span="14">
                    <el-select v-model="type02_add" placeholder="地域市">
                        <el-option
                                v-for="item in sortTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>

        </el-row>
        <el-row :gutter="15">
            <el-col :span="12">
                <el-col :span="5">
                    <div class="grid-content ">详细地址：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="address_detail" placeholder="详细地址"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="15">

            <el-col :span="19">
                <el-col :span="3">
                    <div class="grid-content ">需求阐述：</div>
                </el-col>
                <el-col :span="20">
                    <el-input :rows="4" type="textarea" v-model="demandDetail"></el-input>
                </el-col>
            </el-col>
        </el-row><br/><br/>
        <el-row :gutter="15">
            <el-col :span="3">
                <div class="grid-content ">相关文件：</div>
            </el-col>
            <el-col :span="10">
                <div>
                    <upload showtype="1" :showSuccList=true v-on:uploadSuccess="FileUrl" v-on:removesuc="rmFileUrl" :files="needFildList"></upload>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="3">
                <div class="grid-content ">相关图片(限5张)：</div>
            </el-col>
            <el-col :span="10">
                <div>
                    <upload showtype="4"  :showSuccList=true v-on:uploadSuccess="FileUrlImg" v-on:removesuc="rmFileUrlImg" :files="needImgList"  :disabled="isFullpic"></upload>
                </div>
            </el-col>
        </el-row>
        <!--保存 取消-->
        <el-row :gutter="15">
            <el-col :span="6">
                <div></div>
            </el-col>
            <el-col :span="3" :offset="6">
                <el-button @click="updateDemand" type="primary">提交</el-button>
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
              isFullpic: false,
              area_two:0,
              needFildList: [],//相关文件
              needImgList: [],//相关图片
              address_detail:'',
              type01_add:0,
                type02_add:0,
                sellTypeList: [],
                sortTypeList: [],
                aims:'',
                keyName:'userName',
                isdisplayUsers:false,
                isdisplayUser:false,
                isdisplayPub:false,
                isdisplayGet:false,
                typeList:[{id:1,name:'找钱'},{id:2,name:'找人'},{id:3,name:'找活'},{id:3,name:'找资源'}],
                canCrop: false,
                demandpubrecList:[{id:1,name:'供给'},{id:2,name:'需求'}],
                demandpubrec:'',
                /*测试上传图片的接口，返回结构为{url:''}*/
                uploadUrl: window.baseUploadImgUrl,
                startDate : '',
                endDate : '',
                demandName : '', //需求名称，模糊查询,
                demandMobile : '', //需求类型,类型id
                demandDate : '', //发布时间
                demandImg : '', //需求图片地址
                demandDetail :'' ,   //需求详情
                demandType : '' , //需求类型
                demandPuberName : '',    //发布人昵称
                demandRecName : '', //供给人昵称
                demandPuber : 0, //发布人id
                demandReceiver : 0, //供给人id
                demandUsers:[],
                annexs:[],
                annexsImg:[],
                budget:'',
                bootDate:'',
                curid : '',
                annexIds : [],
                demandUserIds : []
            }
        },
        created() {
            this.getCate();
            let id = localStorage.getItem('demandEditId');
            this.curid = id;

            //1-获取本条数据详情
            axios({
                method:'get',
                url:window.baseURL+'admin/demands/'+id,
            }).then(res=> {

              this.type02_add = '';
                let need = res.data.body;
                this.demandDetail = need.demand.detail;//需求详情
                this.demandName = need.demand.title; //需求名称，模糊查询,
                this.demandType = need.demand.demandType;//需求类型
                this.demandImg = need.demand.img; //需求图片地址
                this.demandpubrec = need.demand.isDerec; //1-发布需求。2-发布供给
                this.demandDate = need.demand.pubDate; //发布时间
                this.budget = need.demand.budget; //预算
                this.demandPuberName = need.demand.pubUsername;
                this.area_two = need.demand.areaId_two;
                this.type01_add = need.demand.areaId_one;
                //this.type02_add = need.demand.areaId_two;
                this.address_detail = need.demand.address;
                this.demandPuber = need.demand.userId;
                for(var i in need.demandUsers){
                    this.demandUsers.push({
                        userId: need.demandUsers[i].userId,
                        userName: need.demandUsers[i].userName,
                    });
                    this.demandUserIds.push(need.demandUsers[i].id);
                }
                this.startDate = need.demand.startDate;
                this.endDate = need.demand.endDate;


                for(var i in need.annexs){
                    var curobj = need.annexs[i];
                    this.annexIds.push(curobj.id);
                    if(curobj.businessType == 1){
                        this.annexs.push({
                            type:2,
                            businessType:1,
                            href:curobj.href,
                        })
                        this.needFildList.push({url: window.basePic + curobj.href, name: curobj.href});
                    }
                    if(curobj.businessType == 2){
                        this.annexsImg.push({
                            type:2,
                            businessType:2,
                            href:curobj.href,
                        })
                        this.needImgList.push({url: window.basePic + curobj.href, name: curobj.href});
                      this.annexsImg.length = this.needImgList.length;
                      if (this.annexsImg.length == 5) {
                        this.isFullpic = true;
                      }
                    }
                }




            }).catch(err =>{
                console.log(JSON.stringify(err));
            })
        },
        computed: {},
      watch: {
        type01_add: {
          handler(newV, oldV) {
            this.updateSort();
          }
        },

      },
        methods: {

            //展示制片人
            showSelectUsers(){
                this.isdisplayUsers = true;
            },

            closeShowUser() {
                this.isdisplayUsers = false;
            },
            deleteUser(obj){
                this.demandUsers.splice(this.demandUsers.indexOf(obj), 1);
            },
            bootDateChange01(val){
              this.startDate = val;
            },
          bootDateChange02(val){
            this.endDate = val;
          },

            updateDemand(){

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


                axios({
                    method:'post',
                    url:window.baseURL+'admin/demands',
                    data: {
                      annexs:this.annexs,
                      annexsImg:this.annexsImg,
                      demandUsers : this.demandUsers,
                      demandName : this.demandName, //需求名称，模糊查询,
                      demandDetail : this.demandDetail,   //需求详情
                      demandType : this.demandType , //需求类型
                      demandpubrec : this.demandpubrec, //1-发布需求。2-发布供给
                      demandPuberName : this.demandPuberName,    //发布人昵称
                      demandPuber : this.demandPuber, //发布人id
                      budget : this.budget, //需求预算
                      startDate : this.startDate,
                      endDate : this.endDate,
                      demandId : this.curid,
                      annexIds : this.annexIds,
                      demandUserIds : this.demandUserIds,
                      areaId_one : this.type01_add,
                      areaId_two : this.type02_add,
                      address : this.address_detail
                    }
                }).then(res=>{
                    this.$message('修改需求成功');
                    this.$router.push('/DemandList');
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
                if(user!= false) {
                    this.demandUsers.push({
                        userId: user.userId,
                        userName: user.userNickName,
                    });
                }
                this.demandRecName = user.userNickName;
                this.isdisplayGet = false;
            },
            FileUrl(data){
              data = data.targetFileName;
              this.annexs.push({
                    type:2,
                    businessType:1,
                    href:data,
                })
              this.needFildList.push({name:data,url:window.basePic+data});
            },
            rmFileUrl(data) {
              for (var i = 0; i < this.needFildList.length; i++) {
                var obj = this.needFildList[i];

                if (obj.name == data.name) {
                  this.$lodash.pullAt(this.needFildList, i);
                  this.tempParams.splice(this.tempParams.indexOf({
                    type: 1,
                    businessType: 2,
                    href: obj.name,
                  }), 1);

                }
              }
            },
            FileUrlImg(data){
              data = data.targetFileName;

              this.annexsImg.push({
                    type:2,
                    businessType:2,
                    href:data,
                })
              this.needImgList.push({name:data,url:window.basePic+data});
              if (this.annexsImg.length == 5) {
                this.isFullpic = true;
              }
            },
            rmFileUrlImg(data) {
              for (var i = 0; i < this.needImgList.length; i++) {
                var obj = this.needImgList[i];

                if (obj.name == data) {
                  this.$lodash.pullAt(this.annexsImg, i);
                  this.$lodash.pullAt(this.needImgList, i);
                  this.annexsImg.splice(this.annexsImg.indexOf({
                    type: 2,
                    businessType: 2,
                    href: obj.name,
                  }), 1);

                }
              }
              if (this.annexsImg.length < 5) {
                this.isFullpic = false;
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
              this.typeList = res.data.body;
            }).catch(err =>{
            })

            axios({
              method:'get',
              url:window.baseURL + 'admin/category',
              params:{
                code:'AREA',
              }
            }).then(res =>{

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
              this.updateSort();

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
                if(self.area_two!=0){
                  self.type02_add = self.area_two;
                }else{
                  self.type02_add = self.sortTypeList[0].id;
                }
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
            for(var i = 0 ; i < categoryTypeList.length; i++){

            }
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

    #comdata{width: 130px}
</style>