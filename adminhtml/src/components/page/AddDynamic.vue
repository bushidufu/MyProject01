<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/DynamicList' }"><i class="el-icon-menu"></i> 动态管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加动态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>


        <el-row :gutter="15">
            <el-col :span="12">
                <el-col :span="6">
                    <div class="grid-content ">发布人：</div>
                </el-col>
                <el-col :span="14">
                    <el-input :disabled="true" v-model="userName" placeholder="请选择发布人"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" class="handle-del mr10" @click="showchooseuser">选择发布人</el-button>
                    <chooseuser :dialogFormVisible.sync="isdisplay" @selted="seltedMethod"></chooseuser>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="14">
            <el-col :span="5">
                <div class="grid-content ">动态详情：</div>
            </el-col>
            <el-col :span="18">
                <el-input :rows="4" type="textarea" v-model="detail" placeholder="请输入动态详情"></el-input>

            </el-col>
            </el-col>
        </el-row><br/>

        <el-row :gutter="15">

            <el-col :span="4">
                <div class="grid-content ">文件类型：</div>
            </el-col>
            <el-col :span="20">
                <el-radio-group v-model="radio2">
                    <el-radio :label="1">视频</el-radio>
                    <el-radio :label="2">音乐</el-radio>
                    <el-radio :label="3">图片</el-radio>
                </el-radio-group>

                <upload v-show="radio2==1" showtype="1" :disabled="isFullVideo" :showSuccList=true v-on:uploadSuccess="videoFileUrl" v-on:removesuc="rmvideoFileUrl" :urlUpload="movieUrl"></upload>
                <upload v-show="radio2==2" showtype="1" :disabled="isFullMusic" :showSuccList=true v-on:uploadSuccess="musicFileUrl" v-on:removesuc="rmmusicFileUrl"></upload>
                <upload v-show="radio2==3" showtype="3" :disabled="isFullpic" :showSuccList=true v-on:uploadSuccess="picFileUrl" v-on:removesuc="rmpicFileUrl"
                        :files="picsReal"></upload>

            </el-col>


        </el-row><br/>

        <el-row :gutter="15">
            <el-col :span="6">
                <div></div>
            </el-col>
            <el-col :span="3" :offset="5">
                <el-button @click="Add" type="primary">保存</el-button>
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
  import chooseuser from '../common/ChooseUser.vue';
  import upload from './UploadFile.vue';
  import editor from './Quilleditor.vue'

  export default {
    data() {
      return {
        movieUrl :window.baseUploadVideoUrl,
        isFullpic: false,
        isFullMusic: false,
        isFullVideo: false,
        search_content: '',
        search_date: '',
        dynamicList: [],
        isdisplay: false,
        dialogFormVisible: false,
        radio2: 1,
        title: '',//名称
        oneWord: '',//一句话简介
        userId: '',//用户编号
        userType: '',//用户类型（1：影人，2：工作室，3：圈层机构）
        userName: '',//工作室名称
        detail: '',//详情
        videoParams: [],
        musicParams: [],
        picParams: [],
        picsReal: [],
      }
    },
    components: {
      chooseuser, upload, editor
    },
    methods: {

      Add() {

        let anx = [];

        switch (this.radio2) {
          case 1:
            anx = this.videoParams;
            break;
          case 2:
            anx = this.musicParams;
            break;
          case 3:
            anx = this.picParams;
            break;
          default:
            break;

        }
        let params = {
          dynamicEntity: {
            title: this.title,
            oneWord: this.oneWord,//一句话简介
            userId: this.userId,//用户编号
            userType: this.userType,//用户类型（1：影人，2：工作室，3：圈层机构）
            userName: this.userName,//工作室名称
            detail: this.detail,//详情
            annexType:this.radio2,
          },
          annexs: anx
        };
        axios({
          method: 'post',
          url: window.baseURL + 'admin/dynamic',
          data: params,
        }).then(res => {
          this.$message('动态保存成功');
          this.$router.push('/dynamicList');
        })
          .catch(err => {
            this.$message('网络出现错误');
          })
      },
      Cancle() {

      },

      showchooseuser() {
        this.isdisplay = true
      },
      seltedMethod(obj) {
        this.userId = obj.userId;
        this.userName = obj.userNickName;
        this.userType = obj.studioState;
        this.isdisplay = false
      },

      picFileUrl(data) {
        data = data.targetFileName;
        this.picParams.push({
          type: 4,
          businessType: 3,
          href: data,
        });

        this.picsReal.push({
          url: window.basePic + data,
          name: data,
        });
        for (var i = 0; i < this.picParams.length; i++) {
          var obj = this.picParams[i];
          var obj1 = this.picsReal[i];

        }

        if (this.picParams.length == 9) {
          this.isFullpic = true;
        }
      },
      musicFileUrl(data) {

          data = data.targetFileName;
        this.musicParams.push({
          type: 4,
          businessType: 2,
          href: data,
        });
        this.isFullMusic = true;

      },
      videoFileUrl(data) {
          data = data.targetFileName;
        this.videoParams.push({
          type: 4,
          businessType: 1,
          href: data,
        });
        this.isFullVideo = true;
      },
      rmpicFileUrl(data) {
        for (var i = 0; i < this.picParams.length; i++) {
          var obj = this.picParams[i];
          if (data = obj.href) {
            this.$lodash.pullAt(this.picParams, i);
            this.$lodash.pullAt(this.picsReal, i);
            this.picParams.splice(this.picParams.indexOf({
              type: 4,
              businessType: 3,
              href: data,
            }), 1);
           // break;
          }
        }
        if (this.picParams.length < 9) {
          this.isFullpic = false;
        }

      },
      rmmusicFileUrl(data) {
        this.musicParams = [];
        this.isFullMusic = false;

      },
      rmvideoFileUrl(data) {

        this.videoParams = [];
        this.isFullVideo = false;

      },
    }
  }


</script>


<style scoped>
    .form_label {
        margin-top: 5px;
    }
    .el-row{margin-bottom: 10px}
    .grid-content{margin-top: 8px}
</style>