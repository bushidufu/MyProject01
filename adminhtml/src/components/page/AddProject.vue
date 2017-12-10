<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/projectConfig' }"><i class="el-icon-menu"></i>项目管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div><br/>
        <el-row :gutter="15">
            <el-col :span="7">
                <el-col :span="8">
                    <div class="grid-content ">项目名称：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="projectName" placeholder="例如:神的少年"></el-input>

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
        <el-row :gutter="15" style="display:none;">
            <el-col :span="7">
                <el-col :span="6">
                    <div class="grid-content ">编剧：</div>
                </el-col>
                <el-col :span="10">

                    <el-input :disabled="true" v-model="screenName" placeholder="请选择编剧"></el-input>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" class="handle-del mr10" @click="showMaker">选择编剧</el-button>
                    <chooseuser :dialogFormVisible.sync="isdisplayMaker" @selted="seltedMaker"></chooseuser>
                    <!--<el-button>选择</el-button>-->
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="15">

            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">融资目标：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="aims" placeholder="单位为万"></el-input>

                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">项目阶段：</div>
                </el-col>
                <el-col :span="14">
                    <el-select v-model="stage" placeholder="项目阶段">
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

                    <!--<el-button>选择</el-button>-->
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
                    <el-input v-model="cycle" placeholder="单位为月"></el-input>

                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">起投金额：</div>
                </el-col>
                <el-col :span="14">

                    <el-input v-model="voteScale" placeholder="单位为万"></el-input>
                </el-col>

            </el-col>



            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">开机时间：</div>
                </el-col>
                <el-col :span="14">
                    <el-date-picker id="kjdata"
                                    v-model="bootDate"
                                    type="date"
                                    placeholder="请选择开机时间"
                                    @change="bootDateChange"
                                    format="yyyy-MM-dd"
                                    :editable="false">
                    </el-date-picker>
                    <!--<el-input v-model="uptime" placeholder="请选择开机时间"></el-input>-->
                </el-col>

            </el-col>
        </el-row>

        <el-row :gutter="15">
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">项目预算：</div>
                </el-col>
                <el-col :span="14">

                    <el-input v-model="budget" placeholder="单位为万"></el-input>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">融资占比：</div>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="completeAmount" placeholder="无需填写%"></el-input>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="10">
                    <div class="grid-content ">上映日期：</div>
                </el-col>
                <el-col :span="14">
                    <el-date-picker  id="sydata"
                                     v-model="releaseDate"
                                     type="date"
                                     :editable="false"
                                     format="yyyy-MM-dd"
                                     @change="releaseDateChange"
                                     placeholder="请选择上映日期">
                    </el-date-picker>
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
            <el-col :span="7"  style="display: none">
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
        </el-row>
        <!-- 电影海报 -->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">当前主题海报：</div>
            </el-col>
            <el-col :span="20">
                <div>
                    <img v-bind:src="topicimg" style="width:150px;height:150px;">
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="8" :offset="4">
                建议尺寸:424*626
            </el-col>
        </el-row>

        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">电影海报：</div>
            </el-col>
            <el-col :span="20">
                <div>
                    <upload showtype="4" :files="moviePics" :showSuccList=true v-on:uploadSuccess="moviePicUrl" v-on:removesuc="rmmoviePicUrl" v-on:toppic="toppic"></upload>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="8" :offset="4">
                建议尺寸:424*626
            </el-col>
        </el-row>
        <!--编剧照片-->
        <el-row :gutter="15" style="display:none;">
            <el-col :span="4">
                <div class="grid-content ">编剧照片：</div>
            </el-col>
            <el-col :span="20">

                <div>
                    <upload showtype="3" :files="makerPics" :showSuccList=true v-on:uploadSuccess="makerPic" v-on:removeSuccess="rmmakerPic"></upload>
                </div>
            </el-col>
        </el-row>
        <!--制片人照片-->
        <el-row :gutter="15" style="display:none;">
            <el-col :span="4">
                <div class="grid-content ">制片人照片：</div>
            </el-col>
            <el-col :span="20">

                <div>
                    <upload showtype="3" :files="writePics" :showSuccList=true v-on:uploadSuccess="writePic" v-on:removeSuccess="rmwritePic"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--作品年表-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">作品年表：</div>
            </el-col>
            <el-col :span="10">

                <div>
                    <upload :showSuccList=true v-on:uploadSuccess="products" v-on:removeSuccess="rmproducts" :files="productsList"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--预算表-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">预算表：</div>
            </el-col>
            <el-col :span="10">

                <div>
                    <upload :showSuccList=true :files="planList" v-on:uploadSuccess="plan" v-on:removeSuccess="rmplan"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--完整剧本-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content">完整剧本：</div>
            </el-col>
            <el-col :span="10">

                <div>
                    <upload :showSuccList=true :files="finalScript" v-on:uploadSuccess="finalS" v-on:removeSuccess="rmfinalS"></upload>
                </div>
            </el-col>
        </el-row><br/>

        <!--编剧年表-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">编剧年表：</div>
            </el-col>
            <el-col :span="10">

                <div>
                    <upload :showSuccList=true :files="makerDescList"  v-on:uploadSuccess="makerDesc" v-on:removeSuccess="rmmakerDesc"></upload>
                </div>
            </el-col>
        </el-row><br/>


        <!--制片人年表-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">制片人年表：</div>
            </el-col>
            <el-col :span="10">

                <div>
                    <upload :showSuccList=true :files="writeDescList" v-on:uploadSuccess="writeDesc" v-on:removeSuccess="rmwriteDesc"></upload>
                </div>
            </el-col>
        </el-row><br/>

        <!--其他相关文件-->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">其他相关文件：</div>
            </el-col>
            <el-col :span="10">

                <div>
                    <upload showtype="1" :files="filesList" :showSuccList=true v-on:uploadSuccess="filesL" v-on:removeSuccess="rmfilesL"></upload>
                </div>
            </el-col>
        </el-row><br/>
        <!--保存 取消-->
        <el-row :gutter="15">
            <el-col :span="6">
                <div></div>
            </el-col>
            <el-col :span="3" :offset="6">
                <el-button @click="projectAdd" type="primary">{{ buttonSaveTitle }}</el-button>
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
  import ElRow from "../../../node_modules/element-ui/packages/row/src/row";



  export default {
    data() {
      return {
        checklist : [],
        keyName:'userName',
        isdisplayUser: false,
        isdisplayCreator: false,
        isdisplayWrite: false,
        isdisplayMaker: false,
        isdisplayPubUser: false,
        currentStr: '',
        currentIndex: 1,
        tempParams: [],
        name: '',//角色名称
        language: '',
        languages: [],//对白语言
        stage: '',
        stages: [],//项目阶段
        userName: '',
        userType: '',
        screenId: '',
        screenName: '',
        pubUserId: '',
        pubUserName: '',
        type: '',//项目一级类型
        sort: '',//项目二级类别
        userId: '',
        sortArr: [],
        category: '',//项目三级分类
        cateArr: [],
        demandCount: 0,
        topicimg : '',
        pretime: '',//预计时长
        budget: '',//项目预算
        aims: '',//融资目标
        completeAmount: '',//融资占比
        voteScale: '',//起投金额
        cycle: '',//融资周期
        projectName: '',//项目名称
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
        makerDescList: [],//编剧年表
        makerPics: [],//编剧照片
        chooseWrite: [],//主创选择
        writeDescList: [],//制片人年表
        writePics: [],//制片人照片
        filesList: [],//其他相关文件
        canCrop: false,
        /*测试上传图片的接口，返回结构为{url:''}*/
        uploadUrl: window.baseUploadImgUrl,
        buttonSaveTitle: '提交',
        buttoncancleTitle: '取消',
//      /admin/project/category
        typeList: [],
        childType:'',
        childTypeList:[],//题材
        isdisplayUsers:false,
        isdisplayCreators:false,

      }
    },
    created() {

      this.getCate();

      this.$lodash.isNumber()

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
        this.chooseWrite.splice(this.chooseWrite.indexOf(obj), 1);
      },

      showChooseW() {
        this.isdisplayWrite = true;
      },
      selectChooseW(user) {
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
      //选择发布人
      showPubUser() {
        this.isdisplayPubUser = true;
      },
      seltedPubUser(user) {
        this.pubUserName = user.userNickName;
        this.pubUserId = user.userId;
        this.isdisplayPubUser = false;
      },
      chooseW(data) {
      },
      releaseDateChange(val) {
        this.releaseDate = val;
      },
      bootDateChange(val) {
        this.bootDate = val;
      },
      //1：电影海报
      moviePicUrl(data) {
        data = data.targetFileName;
        this.tempParams.push({
          type: 1,
          businessType: 1,
          href: data,
        });
        this.moviePics.push({name:data,url:window.basePic+data})

      },
      toppic(data){
          this.topicimg = data;
          this.$message('设置主题海报成功');
      },
      rmmoviePicUrl(data) {
        alert(1);
        console.log(777);
        console.log(JSON.stringify(data));
        for (var i = 0; i < this.moviePics.length; i++) {
          var obj = this.moviePics[i];
          if (obj.name == data ){
            this.$lodash.pullAt(this.moviePics, i);
            this.tempParams.splice(this.tempParams.indexOf({
              type: 1,
              businessType: 1,
              href: obj.name,
            }), 1);

          }
        }
//        this.tempParams.push({
//          type: 1,
//          businessType: 1,
//          href: data,
//        });

      },
      //2：作品年表
      products(data) {

          data = data.targetFileName;

        this.tempParams.push({
          type: 1,
          businessType: 2,
          href: data,
        });
        this.productsList.push({name:data,url:window.basePic+data})

      },
      rmproducts(data) {

        for (var i = 0; i < this.productsList.length; i++) {
          var obj = this.productsList[i];

          if (obj.name == data.name) {
            this.$lodash.pullAt(this.productsList, i);

            this.tempParams.splice(this.tempParams.indexOf({
              type: 1,
              businessType: 2,
              href: obj.name,
            }), 1);

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
        this.planList.push({name:data,url:window.basePic+data})

      },
      rmplan(data) {
        for (var i = 0; i < this.planList.length; i++) {
          var obj = this.planList[i];

          if (obj.name == data.name) {
            this.$lodash.pullAt(this.planList, i);

            this.tempParams.splice(this.tempParams.indexOf({
              type: 1,
              businessType: 3,
              href: obj.name,
            }), 1);

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
        this.finalScript.push({name:data,url:window.basePic+data})

      },
      rmfinalS(data) {
        for (var i = 0; i < this.finalScript.length; i++) {
          var obj = this.finalScript[i];

          if (obj.name == data.name) {
            this.$lodash.pullAt(this.finalScript, i);

            this.tempParams.splice(this.tempParams.indexOf({
              type: 1,
              businessType: 4,
              href: obj.name,
            }), 1);

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
        this.writeDescList.push({name:data,url:window.basePic+data})

      },
      rmwriteDesc(data) {
        for (var i = 0; i < this.writeDescList.length; i++) {
          var obj = this.writeDescList[i];

          if (obj.name == data.name) {
            this.$lodash.pullAt(this.writeDescList, i);

            this.tempParams.splice(this.tempParams.indexOf({
              type: 1,
              businessType: 5,
              href: obj.name,
            }), 1);

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
        this.writePics.push({name:data,url:window.basePic+data})

      },
      rmwritePic(data) {
        for (var i = 0; i < this.writePics.length; i++) {
          var obj = this.writePics[i];

          if (obj.name == data.name) {
            this.$lodash.pullAt(this.writePics, i);

            this.tempParams.splice(this.tempParams.indexOf({
              type: 1,
              businessType: 6,
              href: obj.name,
            }), 1);

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
        this.filesList.push({name:data,url:window.basePic+data})

      },
      rmfilesL(data) {
        for (var i = 0; i < this.filesList.length; i++) {
          var obj = this.filesList[i];

          if (obj.name == data.name) {
            this.$lodash.pullAt(this.filesList, i);

            this.tempParams.splice(this.tempParams.indexOf({
              type: 1,
              businessType: 7,
              href: obj.name,
            }), 1);

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
        this.makerDescList.push({name:data,url:window.basePic+data})

      },
      rmmakerDesc(data) {
        for (var i = 0; i < this.makerDescList.length; i++) {
          var obj = this.makerDescList[i];

          if (obj.name == data.name) {
            this.$lodash.pullAt(this.makerDescList, i);

            this.tempParams.splice(this.tempParams.indexOf({
              type: 1,
              businessType: 8,
              href: obj.name,
            }), 1);

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
        this.makerPics.push({name:data,url:window.basePic+data})

      },
      rmmakerPic(data){

        for (var i = 0; i < this.makerPics.length; i++) {
          var obj = this.makerPics[i];

          if (obj.name == data.name) {
            this.$lodash.pullAt(this.makerPics, i);
            this.tempParams.splice(this.tempParams.indexOf({
              type: 1,
              businessType: 9,
              href: obj.name,
            }), 1);
          }
        }
      },

      projectCancle() {
        this.$router.push('/ProjectConfig')

      },
      projectAdd() {
        let self = this;
        let paramsT = this.makeparams();
console.log(paramsT);
        if (!paramsT){
          return;
        }
        axios({
          method: 'post',
          url: window.baseURL + 'admin/project',
          data: paramsT,
          headers: {
            'Content-Type': 'application/json'
          }

        }).then(res => {
          if (res.data.code == 200) {
            this.$message('项目添加成功');

            this.$router.push('/ProjectConfig')
          }

        }).catch(err => {
          console.log(JSON.stringify(err));

        })


      },
      makeparams(){
        let params = {projectEntity:{}};
          var img = this.topicimg.substring(this.topicimg.lastIndexOf("/")+1,this.topicimg.length);
          params.projectEntity['img'] = img;

        var categoryidsstr = '';
        for(var i in this.checklist){
          categoryidsstr += this.checklist[i]+",";
        }

        params['categoryIds'] = categoryidsstr;

        if(this.chooseWrite.length>0){
          params['projectUsers'] = this.chooseWrite;
        }

        if(this.tempParams.length>0){
          params['annexs'] = this.tempParams;
        }
        if(this.name !=''){
          params.projectEntity['name'] = this.name;
        }

        if(this.language !=''){
          params.projectEntity['language'] = this.language;
        }
        if(this.stage !=''){
          params.projectEntity['stage'] = this.stage;
        }
        if(this.type !=''){
          params.projectEntity['type'] = this.type;
        }
        if(this.category !=''){
          params.projectEntity['category'] = this.category;
        }
        if(this.sort !=''){
          params.projectEntity['sort'] = this.sort;
        }
        if(this.childType !=''){
          params.projectEntity['childType'] = this.childType;
        }

        if(this.pretime !=''){
          params.projectEntity['pretime'] = this.pretime;
        }
        if(this.budget !=''){
          params.projectEntity['budget'] = this.budget;
        }
        if(this.aims !=''){
          params.projectEntity['aims'] = this.aims;
        }
        if(this.completeAmount !=''){
          params.projectEntity['completeAmount'] = this.completeAmount;
        }
        if(this.voteScale !=''){
          params.projectEntity['voteScale'] = this.voteScale;
        }
        if(this.cycle !=''){
          params.projectEntity['cycle'] = this.cycle;
        }
        if(this.projectName !=''){
          params.projectEntity['name'] = this.projectName;
        }
        if(this.bootDate !=''){
          params.projectEntity['bootDateInsert'] = this.bootDate;
        }
        if(this.releaseDate !=''){
          params.projectEntity['releaseDateInsert'] = this.releaseDate;
        }

        if(this.intro !=''){
          params.projectEntity['intro'] = this.intro;
        }
        if(this.dyDetail !=''){
          params.projectEntity['dyDetail'] = this.dyDetail;
        }
        if(this.gsDetail !=''){
          params.projectEntity['gsDetail'] = this.gsDetail;
        }
        if(this.gsIntro !=''){
          params.projectEntity['gsIntro'] = this.gsIntro;
        }
        if(this.bjIntro !=''){
          params.projectEntity['bjIntro'] = this.bjIntro;
        }
        if(this.dyIntro !=''){
          params.projectEntity['dyIntro'] = this.dyIntro;
        }
        if(this.czDetail !=''){
          params.projectEntity['czDetail'] = this.czDetail;
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

    },


    components: {
      ElRow,
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
    /*#kjdata,#sydata{width: 170px}*/
</style>