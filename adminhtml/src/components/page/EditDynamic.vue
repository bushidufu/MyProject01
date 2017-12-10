<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path:'/DynamicList'}"><i class="el-icon-menu"></i> 动态管理</el-breadcrumb-item>
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

                <!--<el-button>选择</el-button>-->
            </el-col>
            </el-col>

        </el-row>
        <el-row :gutter="15">
            <el-col :span="14">
            <el-col :span="5">
                <div class="grid-content ">动态详情：</div>
            </el-col>
            <el-col :span="18">
                <el-input type="textarea" :rows="4" v-model="detail" placeholder="请输入动态详情"></el-input>
            </el-col>
            </el-col>
        </el-row><br/>

        <el-row :gutter="15">
            <el-col :span="14">

            <el-col :span="5">
                <div class="grid-content ">文件类型：</div>
            </el-col>
            <el-col :span="18">
                <el-radio-group v-model="radioSelect">
                    <el-radio :label="1">视频</el-radio>
                    <el-radio :label="2">音乐</el-radio>
                    <el-radio :label="3">图片</el-radio>
                </el-radio-group>
                <upload v-show="radioSelect==1" showtype="1" :disabled="isFullVideo" :showSuccList=true v-on:uploadSuccess="videoFileUrl" v-on:removeSuccess="rmvideoFileUrl" :files="videoReal"></upload>
                <upload v-show="radioSelect==2" showtype="1" :disabled="isFullMusic" :showSuccList=true v-on:uploadSuccess="musicFileUrl" v-on:removeSuccess="rmmusicFileUrl" :files="musicReal"></upload>
                <upload v-show="radioSelect==3" showtype="3" :disabled="isFullpic" :showSuccList=true v-on:uploadSuccess="picFileUrl" v-on:removeSuccess="rmpicFileUrl"
                        :files="picsReal"></upload>

            </el-col>
            </el-col>


        </el-row>

        <el-row :gutter="15">
            <el-col :span="6">
                <div></div>
            </el-col>
            <el-col :span="3" :offset="5">
                <el-button @click="Update" type="primary">修改</el-button>
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
        isFullpic: false,
        isFullMusic: false,
        isFullVideo: false,
        search_content: '',
        search_date: '',
        dynamicList: [],
        isdisplay: false,
        dialogFormVisible: false,
        radioSelect: 1,
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
        musicReal: [],
        videoReal: [],
        id:0,
        isEditing:false,
        deleteArr:[],
        hardIdArr:[],
        hardIdSelect:0,
      }
    },
    components: {
      chooseuser, upload, editor
    },
    created() {

      let id = localStorage.getItem('dynamicEditId');
      let isEditing = localStorage.getItem('dynamicEditing');
      this.id =id;
      this.isEditing =isEditing;

      this.getdata();
    },

    methods: {

      getdata(){
        axios({
          method: 'get',
          url: window.baseURL + 'admin/dynamic/'+this.id,

        }).then(res => {

          console.log(res);
          let dynamicEntity  = res.data.body.dynamicEntity;
          let annexs  = res.data.body.annexs;

          this.userId = dynamicEntity.userId;
          this.userName = dynamicEntity.userName;
          this.title = dynamicEntity.title;
          this.userType = dynamicEntity.userType;
          this.detail = dynamicEntity.detail;
          this.oneWord = dynamicEntity.oneWord;
          this.radioSelect = dynamicEntity.annexType;

          for (var i = 0; i < annexs.length; i++) {
            var obj = annexs[i];
            this.hardIdSelect = obj.businessType;
            this.hardIdArr.push(obj.id);
            switch (obj.businessType) {
              case 1:
                this.videoReal.push({url: window.basePic + obj.href, name: obj.href,id:obj.id})
                break;
              case 2:
                this.musicReal.push({url: window.basePic + obj.href, name: obj.href,id:obj.id})
                break;
              case 3:
                this.picsReal.push({url: window.basePic + obj.href, name: obj.href,id:obj.id})
                break;
              default:
                break;
            }

          }

        }).catch(err => {

          this.$message('数据获取失败');
        });
      },
      Update() {
         if(this.detail.trim() > 500){
             this.$message('详情文本最大允许字符500个');
             return;
         }

        let anx = [];
        switch (this.radioSelect) {
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

        if(this.radioSelect != this.hardIdSelect){
          this.deleteArr = this.hardIdArr;
        }
        let params = {
          dynamicEntity: {
            title: this.title,
            oneWord: this.oneWord,//一句话简介
            userId: this.userId,//用户编号
            userType: this.userType,//用户类型（1：影人，2：工作室，3：圈层机构）
            userName: this.userName,//工作室名称
            detail: this.detail,//详情
            id:this.id,
            annexType:this.radioSelect,
          },
          annexs: anx,
          annexIds:this.deleteArr,
        };

        axios({
          method: 'patch',
          url: window.baseURL + 'admin/dynamic',
          data: params
        }).then(res => {
          this.$message('动态保存成功');
          this.$router.push('/dynamicList');
        })
          .catch(err => {
            this.$message('网络出现错误');
          })
      },
      Cancle() {
        localStorage.setItem('dynamicEditId', 0);
        localStorage.setItem('dynamicEditing', false);
        this.$router.push('/dynamicList');

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

        this.picsReal.push({url: window.basePic + data, name: data,});

        if (this.picsReal.length == 9) {
            this.isFullpic = true;
           alert('已上传满9张，不可再上传');
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

        console.log(data);

        if (data.id != undefined){
          this.deleteArr.push(data.id);
        }

        for (var i = 0; i < this.picsReal.length; i++) {
          var obj = this.picsReal[i];

          if (data.name = obj.name) {
            this.$lodash.pullAt(this.picParams, i);
            this.$lodash.pullAt(this.picsReal, i);
            break;
          }
        }
        if (this.picParams.length < 9) {
          this.isFullpic = false;
        }

      },
      rmmusicFileUrl(data) {
        if (data.id != undefined){
          this.deleteArr.push(data.id);
        }
        this.musicParams = [];
        this.isFullMusic = false;

      },
      rmvideoFileUrl(data) {
        console.log(data);
        if (data.id != undefined){
          this.deleteArr.push(data.id);
        }
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