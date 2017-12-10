<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/projectConfig' }"><i class="el-icon-menu"></i>项目管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="15">
            <el-col :span="7">
                <el-col :span="8">
                    <div class="grid-content ">项目名称：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="projectName" placeholder="请输入项目名称"></el-input>

                </el-col>
            </el-col>
            <el-col :span="8">
                <el-col :span="9">
                    <div class="grid-content ">主创选择：</div>

                </el-col>
                <el-col :span="8">
                    <el-button type="primary" class="handle-del mr10" @click="showChooseW">选择主创</el-button>
                    <chooseuser :dialogFormVisible.sync="isdisplayWrite" @selted="selectChooseW"></chooseuser>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="showSelectUsers">查看</el-button>
                    <showUser :dialogFormVisible.sync="isdisplayUsers" :keyName="keyName" :needShowUserArr="chooseWrite" @selted="closeShowUser" @delUeritem="deleteUser"></showUser>
                </el-col>
            </el-col>

        </el-row>
        <!--制片人选择-->
        <el-row :gutter="15">
            <el-col :span="7" style="display:none;">
                <el-col :span="6">
                    <div class="grid-content ">编剧：</div>
                </el-col>
                <el-col :span="10">

                    <el-input :disabled="true" v-model="screenName" placeholder="请选择编剧"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" class="handle-del mr10" @click="showMaker">选择编剧</el-button>
                    <chooseuser :dialogFormVisible.sync="isdisplayMaker" @selted="seltedMaker"></chooseuser>
                </el-col>
            </el-col>
        </el-row>

        <el-row :gutter="15">
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">融资目标：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="aims" placeholder="请输入融资目标"></el-input>

                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">项目阶段：</div>
                </el-col>
                <el-col :span="14">
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
                    <div class="grid-content ">发布人：</div>
                </el-col>
                <el-col :span="10">

                    <el-input :disabled="true" v-model="pubUserName" placeholder="请选择发布人"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" class="handle-del mr10" @click="showPubUser">选择发布人</el-button>
                    <chooseuser :dialogFormVisible.sync="isdisplayPubUser" @selted="seltedPubUser"></chooseuser>
                </el-col>
            </el-col>

            <el-col :span="6" style="display:none;">
                <el-col :span="10">
                    <div class="grid-content ">题材：</div>
                </el-col>
                <el-col :span="14">
                    <el-select v-model="childType" placeholder="请选择类型">
                        <el-option
                                v-for="item in childTypeList"
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
                    <div class="grid-content ">类型：</div>
                </el-col>
                <el-col :span="14">
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

            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">类别：</div>
                </el-col>
                <el-col :span="14">
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
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">分类：</div>
                </el-col>
                <el-col :span="14">
                    <el-select v-model="category" placeholder="请选择分类">
                        <el-option
                                v-for=" item in cateArr"
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
                    <div class="grid-content ">融资周期：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="cycle" placeholder="请输入融资周期"></el-input>

                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">起投金额：</div>
                </el-col>
                <el-col :span="14">

                    <el-input v-model="voteScale" placeholder="请输入起投金额"></el-input>
                </el-col>

            </el-col>



            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">上映日期：</div>
                </el-col>
                <el-col :span="14">
                    <el-date-picker
                            id="releaseDateid"
                            v-model="releaseDate"
                            type="date"
                            :editable="false"
                            @change="releaseDateChange"
                            placeholder="请选择上映日期">
                    </el-date-picker>
                    <!--<el-input v-model="onlinetime" placeholder="请选择上映日期"></el-input>-->

                </el-col>
            </el-col>

        </el-row>

        <el-row :gutter="15">

            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">项目预算：</div>
                </el-col>
                <el-col :span="14">

                    <el-input v-model="budget" placeholder="请输入项目预算"></el-input>
                </el-col>

            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">融资占比：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="completeAmount" placeholder="请输入融资占比"></el-input>
                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">开机时间：</div>
                </el-col>
                <el-col :span="14">
                    <el-date-picker
                            v-model="bootDate"
                            type="date"
                            placeholder="请选择开机时间"
                            @change="bootDateChange"
                            :editable="false">
                    </el-date-picker>
                    <!--<el-input v-model="uptime" placeholder="请选择开机时间"></el-input>-->
                </el-col>

            </el-col>




        </el-row>

        <el-row :gutter="15">
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">预计片长：</div>
                </el-col>
                <el-col :span="14">

                    <el-input v-model="pretime" placeholder="单位为秒"></el-input>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">对白语言：</div>
                </el-col>
                <el-col :span="14">
                    <el-select v-model="language" placeholder="对白语言">
                        <el-option
                                v-for="item in languages"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="7" style="display: none">
                <el-col :span="8">
                    <div class="grid-content ">相关需求：</div>
                </el-col>
                <el-col :span="10">

                    <el-input :disabled="true" v-model="pubUserName" placeholder="请选择需求"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" class="handle-del mr10" @click="showPubUser">选择相关需求</el-button>
                    <chooseuser :dialogFormVisible.sync="isdisplayPubUser" @selted="seltedPubUser"></chooseuser>
                </el-col>
            </el-col>
        </el-row>

        <el-row :gutter="15">
            <el-col :span="20">
                <el-checkbox-group v-model="checklist">
                    题材：<el-checkbox v-for="item in childTypeList" :label="item.id" :key="item.name">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>

        <br/>
        <el-row :gutter="15" id="workarea">

            <el-col :span="2">
                <el-button @click="buttonClick(1)">创作阐述</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="buttonClick(2)">导演简介</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="buttonClick(3)">导演阐述</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="buttonClick(4)">编剧描述</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="buttonClick(5)">故事大纲</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="buttonClick(6)">故事描述</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="buttonClick(7)">项目简介</el-button>
            </el-col>
            <el-col :span="8">
            </el-col>

        </el-row>
        <el-row :gutter="15">
            <!--<editor ref="myTextEditor" id="editarea"-->
                    <!--:fileName="'myFile'"-->
                    <!--:canCrop="canCrop"-->
                    <!--:uploadUrl="uploadUrl"-->
                    <!--v-model="currentStr">-->
            <!--</editor>-->
            <el-input :rows="4" type="textarea" v-model="currentStr"></el-input>
        </el-row><br/>


        <!-- 电影海报 -->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">当前主题海报：</div>
            </el-col>
            <el-col :span="20">
                <div>
                    <img :src="topicimg" style="width:150px;height:150px;">
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">电影海报：</div>
            </el-col>
            <el-col :span="8">
                <div>
                    <upload showtype="4" :showSuccList=true :files="moviePicsReal" v-on:uploadSuccess="moviePicUrl" v-on:removeSuccess="rmmoviePicUrl" v-on:toppic="toppic"></upload>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="15" style="display:none;">
            <el-col :span="4">
                <div class="grid-content ">制片人照片：</div>
            </el-col>
            <el-col :span="8">

                <div>
                    <upload showtype="3" :showSuccList=true :files="writePicsReal" v-on:uploadSuccess="writePic" v-on:removeSuccess="rmwritePic"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <el-row :gutter="15" style="display:none;">
            <el-col :span="4">
                <div class="grid-content ">编剧照片：</div>
            </el-col>
            <el-col :span="8">

                <div>
                    <upload showtype="3" :showSuccList=true :files="makerPicsReal" v-on:uploadSuccess="makerPic" v-on:removeSuccess="rmmakerPic"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--作品年表-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">作品年表：</div>
            </el-col>
            <el-col :span="8">

                <div>
                    <upload :showSuccList=true :files="productsListReal" v-on:uploadSuccess="products" v-on:removeSuccess="rmproducts"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--预算表-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">预算表：</div>
            </el-col>
            <el-col :span="8">

                <div>
                    <upload :showSuccList=true :files="planListReal" v-on:uploadSuccess="plan" v-on:removeSuccess="rmplan"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--完整剧本-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content">完整剧本：</div>
            </el-col>
            <el-col :span="8">

                <div>
                    <upload :showSuccList=true :files="finalScriptReal" v-on:uploadSuccess="finalS" v-on:removeSuccess="rmfinalS"></upload>
                </div>
            </el-col>
        </el-row><br/>

        <!--制片人年表-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">制片人年表：</div>
            </el-col>
            <el-col :span="8">

                <div>
                    <upload :showSuccList=true :files="writeDescListReal" v-on:uploadSuccess="writeDesc" v-on:removeSuccess="rmwriteDesc"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--制片人照片-->


        <!--编剧年表-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">编剧年表：</div>
            </el-col>
            <el-col :span="8">

                <div>
                    <upload :showSuccList=true :files="makerDescListReal" v-on:uploadSuccess="makerDesc" v-on:removeSuccess="rmmakerDesc"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--编剧照片-->

        <!--其他相关文件-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">其他相关文件：</div>
            </el-col>
            <el-col :span="8">

                <div>
                    <upload  showtype="1" :showSuccList=true :files="filesListReal" v-on:uploadSuccess="filesL" v-on:removeSuccess="rmfilesL"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--保存 取消-->
        <el-row :gutter="15">
            <el-col :span="6">
                <div></div>
            </el-col>
            <el-col :span="3" :offset="5">
                <el-button @click="projectUpdate" type="primary">{{ buttonSaveTitle }}</el-button>
            </el-col>
            <el-col :span="3">
                <el-button @click="projectCancle">{{ buttoncancleTitle }}</el-button>
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
  import {Message} from 'element-ui';
  import editor from './Quilleditor.vue'
  import chooseuser from '../common/ChooseUser.vue';
  import showUser from '../common/ShowUser.vue';

  export default {
    data() {
      return {
        language: '',
        languages: [],//对白语言
        pretime: '',//预计时长
        checklist : [],
        keyName:'userName',
        isdisplayUsers:false,
        isdisplayUser: false,
        isdisplayWrite: false,
        isdisplayMaker: false,
        currentStr: '',
        currentIndex: 1,
        tempParams: [],
        deleteAnnexIds: [],
        name: '',//角色名称
        stage: '',
        stages: [],//项目阶段
        userId: '118',
        userName: '',
        userType: '',
        screenId: '118',
        screenName: '',
        topicimg : '',
        type: '',//项目一级类型
        sort: '',//项目二级类别
        sortArr: [],
        category: '',//项目三级分类
        cateArr: [],
        id: '',
        budget: '',//项目预算
        aims: '',//融资目标
        completeAmount: '',//融资占比
        voteScale: '',//起投金额
        cycle: '',//融资周期
        bootDate: '',//开机时间
        releaseDate: '',//上映日期
        czDetail: '',//创作阐述
        dyIntro: '',//导演简介
        bjIntro: '',//编剧简介
        gsIntro: '',//故事大纲
        gsDetail: '',//故事详纲
        dyDetail: '',//导演阐述
        intro: '',//项目简介

        moviePics: [],//电影海报
        productsList: [],//作品年表
        planList: [],//预算表
        finalScript: [],//电影剧本
        chooseWrite: [],//制片人 编剧选择
        writeDescList: [],//制片人年表
        writePics: [],//制片人照片
        makerDescList: [],//编剧年表
        makerPics: [],//编剧照片
        filesList: [],//其他相关文件

        moviePicsReal: [],//电影海报
        productsListReal: [],//作品年表
        planListReal: [],//预算表
        finalScriptReal: [],//电影剧本
        chooseWriteReal: [],//制片人 编剧选择
        writeDescListReal: [],//制片人 年表
        writePicsReal: [],//制片人 照片
        makerDescListReal: [],//编剧年表
        makerPicsReal: [],//编剧照片
        filesListReal: [],//其他相关文件

        canCrop: false,
        /*测试上传图片的接口，返回结构为{url:''}*/
        uploadUrl: window.baseUploadImgUrl,
        buttonSaveTitle: '提交',
        buttoncancleTitle: '取消',
//      /admin/project/category
        typeList: [],
        deleteProjectUserIds:[],
        newAddUserIds:[],
        childType:'',
        childTypeList:[],//题材
        isdisplayPubUser:false,
        projectName:"",
        pubUserName:""

      }
    },
    created() {
      this.getCate();

      let id = localStorage.getItem('proEditId');
      let isEditing = localStorage.getItem('proEditing');

      axios.get(window.baseURL + 'admin/project/' + id)
        .then(res => {
          console.log(JSON.stringify(res.data.body));

          let annexs = res.data.body.annexs;
          let userArr = res.data.body.projectUsers;
          let categorys = res.data.body.category;

          for(var i = 0; i < categorys.length; i++){
            this.checklist.push( categorys[i].categoryId);
          }




          for (var i = 0; i < annexs.length; i++) {
            var obj = annexs[i];

            switch (obj.businessType) {
              case 1:
                this.moviePics.push(obj.href);
                this.moviePicsReal.push({url: window.basePic + obj.href, name: obj.href, id: obj.id});
                break;
              case 2:
                this.productsList.push(obj.href);
                this.productsListReal.push({url: window.basePic + obj.href, name: obj.href, id: obj.id});
                break;
              case 3:
                this.planList.push(obj.href);
                this.planListReal.push({url: window.basePic + obj.href, name: obj.href, id: obj.id});
                break;
              case 4:
                this.finalScript.push(obj.href);
                this.finalScriptReal.push({url: window.basePic + obj.href, name: obj.href, id: obj.id});
                break;
              case 5:
                this.writeDescList.push(obj.href);
                this.writeDescListReal.push({url: window.basePic + obj.href, name: obj.href, id: obj.id});
                break;
              case 6:
                this.writePics.push(obj.href);
                this.writePicsReal.push({url: window.basePic + obj.href, name: obj.href, id: obj.id});
                break;
              case 7:
                this.filesList.push(obj.href);
                this.filesListReal.push({url: window.basePic + obj.href, name: obj.href, id: obj.id});
                break;
              case 8:
                this.makerDescList.push(obj.href);
                this.makerDescListReal.push({url: window.basePic + obj.href, name: obj.href, id: obj.id});
                break;
              case 9:
                this.makerPics.push(obj.href);
                this.makerPicsReal.push({url: window.basePic + obj.href, name: obj.href, id: obj.id});
                break;
              default:
                break;

            }
          }

          for (var i = 0; i < userArr.length; i++) {
            var obj = userArr[i];
            this.chooseWrite.push({id:obj.id,userName:obj.userName,userId:obj.userId})
          }

          let project = res.data.body.project;

          this.pubUserName = project.userName;
          this.projectName = project.name;
          this.aims = project.aims;
          this.releaseDate = project.releaseDateStr;
          this.gsDetail = project.gsDetail;
          this.intro = project.intro;
          this.type = project.type;
          this.cycle = project.cycle;
          this.userId = project.userId;
          this.userType = project.userType;
          this.userName = project.userName;
          this.screenId = project.screenId;
          this.screenName = project.screenName;
          this.completeAmount = project.completeAmount;
          this.dyDetail = project.dyDetail;
          this.bootDate = project.bootDateStr;
          this.czDetail = project.czDetail;
          this.stage = project.stage;
          this.dyIntro = project.dyIntro;
          this.gsIntro = project.gsIntro;
          this.bjIntro = project.bjIntro;
          this.name = project.name;
          this.voteScale = project.voteScale;
          this.sort = project.sort;
          this.category = project.category;
          this.budget = project.budget;
          this.id = project.id;
          this.currentStr = project.czDetail;
          this.childType =  project.childType;
          this.pretime =  project.pretime;
          this.language =  project.language;
          this.topicimg = window.basePic+project.img;
        });

    },
    computed: {},
    methods: {
      //展示制片人
      showSelectUsers(){
        this.isdisplayUsers = true;
      },

      closeShowUser() {

        this.isdisplayUsers = false;
      },
      deleteUser(obj){

        if(obj.id !=undefined ){
          this.deleteProjectUserIds.push(obj.id);
        }
        this.chooseWrite.splice(this.chooseWrite.indexOf(obj), 1);
        this.newAddUserIds.splice(this.newAddUserIds.indexOf(obj), 1);

      },

      //选择制片人
      showChooseW() {

        this.isdisplayWrite = true;
      },
      selectChooseW(user) {

        this.newAddUserIds.push({userId: user.userId, userName: user.userNickName});
        this.chooseWrite.push({userId: user.userId, userName: user.userNickName});

        this.isdisplayWrite = false;

      },
      //选择主创
      showCreatUser() {
        this.isdisplayUser = true;
      },
      seltedCreatUser(user) {
        this.userName = user.userNickName;
        this.userId = user.userId;
        this.userType = user.studioState;
        this.isdisplayUser = false;
      },
      //选择编剧
      showMaker() {
        this.isdisplayMaker = true;
      },
      seltedMaker(user) {
        this.screenName = user.userNickName;
        this.screenId = user.userId;
        this.isdisplayMaker = false;
      },
      toppic(data){
            this.topicimg = window.basePic+data.targetFileName;
            this.$message('设置主题海报成功');
      },
      releaseDateChange(val) {
        this.releaseDate = val + ' 00:00:00';
      },
      bootDateChange(val) {
        this.bootDate = val + ' 00:00:00';
      },
      //1：电影海报
      moviePicUrl(data) {
          data = data.targetFileName;
        this.tempParams.push({
          type: 1,
          businessType: 1,
          href: data,
        });
      },
      rmmoviePicUrl(data) {
        for (var i = 0; i < this.moviePicsReal.length; i++) {
          var obj = this.moviePicsReal[i].name;

          if (obj == data.name) {
            this.$lodash.pullAt(this.moviePicsReal, i);
            this.deleteAnnexIds.push(data.id);
            break;
          }
        }

      },
      //2：作品年表
      products(data) {

          data = data.targetFileName;
        this.tempParams.push({
          type: 1,
          businessType: 2,
          href: data,
        });
      },
      rmproducts(data) {

        for (var i = 0; i < this.productsListReal.length; i++) {
          var obj = this.productsListReal[i].name;

          if (obj == data.name) {
            this.$lodash.pullAt(this.productsListReal, i);
            this.deleteAnnexIds.push(data.id);
            break;
          }
        }
      },
      //3：预算表
      plan(data) {

          data = data.targetFileName;
        this.tempParams.push({
          type: 1,
          businessType: 3,
          href: data,
        });
      },
      rmplan(data) {

        for (var i = 0; i < this.planListReal.length; i++) {
          var obj = this.planListReal[i].name;

          if (obj == data.name) {
            this.$lodash.pullAt(this.planListReal, i);
            this.deleteAnnexIds.push(data.id);
            break;
          }
        }

      },
      //4：完整剧本
      finalS(data) {

          data = data.targetFileName;
        this.tempParams.push({
          type: 1,
          businessType: 4,
          href: data,
        });
      },
      rmfinalS(data) {

        for (var i = 0; i < this.finalScriptReal.length; i++) {
          var obj = this.finalScriptReal[i].name;

          if (obj == data.name) {
            this.$lodash.pullAt(this.finalScriptReal, i);
            this.deleteAnnexIds.push(data.id);
            break;
          }
        }


      },
      //5：制片人年表
      writeDesc(data) {

          data = data.targetFileName;
        this.tempParams.push({
          type: 1,
          businessType: 5,
          href: data,
        });
      },
      rmwriteDesc(data) {


        for (let i = 0; i < this.writeDescListReal.length; i++) {
          let obj = this.writeDescListReal[i].name;

          if (obj == data.name) {
            this.$lodash.pullAt(this.writeDescListReal, i);
            this.deleteAnnexIds.push(data.id);
            break;
          }
        }

      },
      //6：制片人照片
      writePic(data) {

          data = data.targetFileName;

        this.tempParams.push({
          type: 1,
          businessType: 6,
          href: data,
        });
      },
      rmwritePic(data) {


        for (let i = 0; i < this.writePicsReal.length; i++) {
          let obj = this.writePicsReal[i].name;

          if (obj == data.name) {
            this.$lodash.pullAt(this.writePicsReal, i);
            this.deleteAnnexIds.push(data.id);
            break;
          }
        }

      },

      //8：编剧年表
      makerDesc(data) {

          data = data.targetFileName;

        this.tempParams.push({
          type: 1,
          businessType: 8,
          href: data,
        });
      },
      rmmakerDesc(data) {


        for (let i = 0; i < this.makerDescListReal.length; i++) {
          let obj = this.makerDescListReal[i].name;

          if (obj == data.name) {
            this.$lodash.pullAt(this.makerDescListReal, i);
            this.deleteAnnexIds.push(data.id);
            break;
          }
        }

      },
      //9：编剧照片
      makerPic(data) {
          data = data.targetFileName;

        this.tempParams.push({
          type: 1,
          businessType: 9,
          href: data,
        });
      },
      rmmakerPic(data) {


        for (var i = 0; i < this.makerPicsReal.length; i++) {
          var obj = this.makerPicsReal[i].name;

          if (obj == data.name) {
            this.$lodash.pullAt(this.makerPicsReal, i);
            this.deleteAnnexIds.push(data.id);
            break;
          }
        }

      },

      //7：相关文件
      filesL(data) {

          data = data.targetFileName;

        this.tempParams.push({
          type: 1,
          businessType: 7,
          href: data,
        });
      },
      rmfilesL(data) {

        for (var i = 0; i < this.filesListReal.length; i++) {
          var obj = this.filesListReal[i].name;

          if (obj == data.name) {
            this.$lodash.pullAt(this.filesListReal, i);
            this.deleteAnnexIds.push(data.id);

            break;
          }
        }

      },
      //制片人 编剧选择

      projectCancle() {
        this.$router.push('/ProjectConfig')
      },
      projectUpdate() {

        let paramsT = this.makeparams();

        if (!paramsT){
          return;
        }

        console.log(paramsT);
        axios({
          method: 'PATCH',
          url: window.baseURL + 'admin/project',
          data: paramsT,

        }).then(res => {
          if (res.data.code == 200) {
            localStorage.setItem('proEditId', 0);
            localStorage.setItem('proEditing', false);
            this.$message('项目修改成功');
            this.$router.push('/ProjectConfig')
          }else {
            console.log(JSON.stringify(res.data));

          }
        }).catch(err => {
          console.log(JSON.stringify(err));

        })


      },
      makeparams(){
        let params = {projectEntity:{id:this.id}};
          var img = this.topicimg.substring(this.topicimg.lastIndexOf("/")+1,this.topicimg.length);
          params.projectEntity['img'] = img;


          var categoryidsstr = '';
          for(var i in this.checklist){
              categoryidsstr += this.checklist[i]+",";
          }
          params['categoryIds'] = categoryidsstr;


        if(this.newAddUserIds.length>0){
          params['projectUsers'] = this.newAddUserIds;
        }

        if(this.tempParams.length>0){
          params['annexs'] = this.tempParams;
        }

        if(this.deleteAnnexIds.length>0){
          params['deleteAnnexIds'] = this.deleteAnnexIds;
        }
        if(this.deleteProjectUserIds.length>0){
          params['deleteProjectUserIds'] = this.deleteProjectUserIds;
        }

        if(this.$lodash.isNumber(this.userId)){
          params.projectEntity['userId'] = this.userId;
          params.projectEntity['userName'] = this.userName;
          params.projectEntity['userType'] = this.userType;
        }else {
          this.$message('请选择主创人员');
          return false;
        }

        if(this.projectName != null){
          params.projectEntity['name'] = this.projectName;
        }else {
          params.projectEntity['name'] = '';
        }

        if(this.language !=null){
          params.projectEntity['language'] = this.language;
        }else {
          params.projectEntity['language'] = '';
        }

        if(this.pretime !=null){
          params.projectEntity['pretime'] = this.pretime;
        }else {
          params.projectEntity['pretime'] = '';
        }

        if(this.stage !=null){
          params.projectEntity['stage'] = this.stage;
        }else {
          params.projectEntity['stage'] = '';
        }
        if(this.type !=null){
          params.projectEntity['type'] = this.type;
        }else {
          params.projectEntity['type'] = '';
        }

        if(this.category !=null){
          params.projectEntity['category'] = this.category;
        }else {
          params.projectEntity['category'] = '';
        }
        if(this.sort !=null){
          params.projectEntity['sort'] = this.sort;
        }else {
          params.projectEntity['sort'] = '';
        }
        if(this.childType !=null){
          params.projectEntity['childType'] = this.childType;
        }else {
          params.projectEntity['childType'] = '';
        }

        if(this.budget !=null){
          params.projectEntity['budget'] = this.budget;
        }else {
          params.projectEntity['budget'] = '';
        }
        if(this.aims !=null){
          params.projectEntity['aims'] = this.aims;
        }else {
          params.projectEntity['aims'] = '';
        }

        if(this.completeAmount !=null){
          params.projectEntity['completeAmount'] = this.completeAmount;
        }else {
          params.projectEntity['completeAmount'] = '';
        }


        if(this.voteScale !=null){
          params.projectEntity['voteScale'] = this.voteScale;
        }else {
          params.projectEntity['voteScale'] = '';
        }


        if(this.cycle !=null){
          params.projectEntity['cycle'] = this.cycle;
        }else {
          params.projectEntity['cycle'] = '';
        }

        if(this.bootDate !=null){
          params.projectEntity['bootDate'] = this.bootDate;
        }else {
          params.projectEntity['bootDate'] = '';
        }

        if(this.releaseDate !=null){
          params.projectEntity['releaseDate'] = this.releaseDate;
        }else {
          params.projectEntity['releaseDate'] = '';
        }

        if(this.intro != null){
          params.projectEntity['intro'] = this.intro;
        }else {
          params.projectEntity['intro'] = '';
        }
        if(this.dyDetail !=null){
          params.projectEntity['dyDetail'] = this.dyDetail;
        }else {
          params.projectEntity['dyDetail'] = '';
        }
        if(this.gsDetail !=null){
          params.projectEntity['gsDetail'] = this.gsDetail;
        }else {
          params.projectEntity['gsDetail'] = '';

        }
        if(this.gsIntro !=null){
          params.projectEntity['gsIntro'] = this.gsIntro;
        }else {
          params.projectEntity['gsIntro'] = '';
        }

        if(this.bjIntro !=null){
          params.projectEntity['bjIntro'] = this.bjIntro;
        }else {
          params.projectEntity['bjIntro'] = '';
        }

        if(this.dyIntro !=null){
          params.projectEntity['dyIntro'] = this.dyIntro;
        }else {
          params.projectEntity['dyIntro'] = '';
        }

        if(this.czDetail !=null){
          params.projectEntity['czDetail'] = this.czDetail;
        }else {
          params.projectEntity['czDetail'] = '';
        }

        if(this.$lodash.isNumber(this.screenId)){
          params.projectEntity['screenId'] = this.screenId;
          params.projectEntity['screenName'] = this.screenName;
        }

        if(this.$lodash.isNumber(this.pubUserId)){
          params.projectEntity['userId'] = this.pubUserId;
          params.projectEntity['userName'] = this.pubUserName;
        }
        return params;
      },

      //几个富文本内容切换
      buttonClick(des) {

        if (this.currentIndex == des) {
          return;
        }
        let index = this.currentIndex;

        switch (index) {
          case 1:
            this.czDetail = this.currentStr;
            break;
          case 2:
            this.dyIntro = this.currentStr;
            break;
          case 3:
            this.dyDetail = this.currentStr;
            break;
          case 4:
            this.bjIntro = this.currentStr;
            break;
          case 5:
            this.gsIntro = this.currentStr;
            break;
          case 6:
            this.gsDetail = this.currentStr;
            break;
          case 7:
            this.intro = this.currentStr;
            break;
          default:
            break;
        }
        this.currentIndex = des

        switch (des) {
          case 1:
            this.currentStr = this.czDetail;
            break;
          case 2:
            this.currentStr = this.dyIntro;
            break;
          case 3:
            this.currentStr = this.dyDetail;
            break;
          case 4:
            this.currentStr = this.bjIntro;
            break;
          case 5:
            this.currentStr = this.gsIntro;
            break;
          case 6:
            this.currentStr = this.gsDetail;
            break;
          case 7:
            this.currentStr = this.intro;
            break;
          default:
            break;
        }

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
            code:'VIDEO_LANGUAGE',
            level:1
          }
        }).then(res =>{

          if (res.data.code == 200){

            this.languages =res.data.body;
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
            code:'VIDEO_CHILD_TYPE',
            level:1
          }
        }).then(res =>{

          if (res.data.code == 200){

            this.childTypeList =res.data.body;
          }else {
            this.$message('网络错误，请检查');
          }
        }).catch(err =>{
          this.$message('网络错误，请检查');

        });

        //childTypeList
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
      //选择发布人
      showPubUser() {
        this.isdisplayPubUser = true;
      },
      seltedPubUser(user) {
        this.pubUserName = user.userNickName;
        this.pubUserId = user.userId;
        this.isdisplayPubUser = false;
      },


    },


    components: {
      upload, editor, chooseuser,showUser

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
      currentStr(newV, oldV) {
        switch (this.currentIndex) {
          case 1:
            this.czDetail = newV;
            break;
          case 2:
            this.dyIntro = newV;
            break;
          case 3:
            this.dyDetail = newV;
            break;
          case 4:
            this.bjIntro = newV;
            break;
          case 5:
            this.gsIntro = newV;
            break;
          case 6:
            this.gsDetail = newV;
            break;
          case 7:
            this.intro = newV;
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
        margin-top: 8px;

    }
    .el-row{margin-bottom: 10px}

    .el-upload el-upload--1 {
        width: 150px;
        height: 150px;
    }
    #workarea{margin-bottom: 0}
    #editarea{width:93%;margin-left: 8px}
    #kjdata,#sydata{width: 170px}

</style>