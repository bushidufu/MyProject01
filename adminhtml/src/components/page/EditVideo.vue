<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/videoConfig' }"><i class="el-icon-menu"></i>视频管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑视频</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="15">
            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">片名：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="name" placeholder="请输入片名" icon="edit"></el-input>
                </el-col>

            </el-col>
            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">片长：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="times" placeholder="请输入片长" icon="edit" disabled="disabled"></el-input>
                </el-col>
            </el-col>
            <el-col :span="6"  style="display:none">
                <el-col :span="8">
                    <div class="grid-content ">类型：</div>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="type" placeholder="请选择类型">
                        <el-option
                                v-for="item in videoTypeList"
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
                <el-col :span="8">
                    <div class="grid-content ">语言：</div>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="language" placeholder="请选择语言">
                        <el-option
                                v-for="item in languages"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">来源：</div>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="source" placeholder="请选择来源">
                        <el-option
                                v-for="item in sourceTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">出处：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="company" placeholder="请输入出处" icon="edit"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">票房：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="boxOffice" placeholder="请输入票房" icon="edit"></el-input>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">导演：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="director" placeholder="请输入导演名字" icon="edit"></el-input>
                </el-col>
            </el-col>
            <el-col :span="7">
                <el-col :span="8">
                    <div class="grid-content ">发行类型：</div>
                </el-col>
                <el-col :span="14">
                    <el-select v-model="pubType" placeholder="请选择发行类型">
                        <el-option
                                v-for="item in pubTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>

        </el-row>

        <el-row>
            <el-col :span="7">
                <el-col :span="6">
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
        </el-row>

        <el-row  :gutter="15">
            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">作品类别：</div>
                </el-col>
                <el-col :span="16">
                        <el-select v-model="type01" placeholder="请选择">
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
                <el-col :span="8">
                    <div class="grid-content ">作品类型：</div>
                </el-col>

                <el-col :span="16">
                    <el-select v-model="type02" placeholder="请选择">
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
            <el-col :span="20">
                <el-checkbox-group v-model="checklist">
                    题材：<el-checkbox v-for="item in childTypeList" :label="item.id" :key="item.name">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>

        <el-row :gutter="15">
           <!-- <el-checkbox-group  v-model="ruleForm.pubTypeThree" placeholder="请选择">
                <el-checkbox
                        v-for="item in pubTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-checkbox >
            </el-checkbox-group>-->
        </el-row>

        <el-row :gutter="15">
            <el-col :span="24">
                <el-col :span="8">
                    <div class="grid-content ">一句话简介：</div>
                </el-col>
            </el-col>
            <el-col :span="18">
                <el-col :span="24">
                    <el-input v-model="oneword" placeholder="请输入一句话简介" icon="edit"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="24">
                <el-col :span="8">
                    <div class="grid-content ">短片简介：</div>
                </el-col>
            </el-col>
            <el-col :span="18">
                <el-input type="textarea" :rows="4" autosize v-model="intro" placeholder="请输入简介"></el-input>
            </el-col>
        </el-row><br/><br/>

        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">封面：</div>
            </el-col>
            <el-col :span="4">
                <div style="display:inline-block">
                    <img width="150px" height="150px" :src="fullimg" alt="">
                </div>
            </el-col>
                <el-col :span="10">
                <div>

                    <upload showtype="2" :title="title" v-on:uploadSuccess="videoCover"
                            style="width: 600px;height: 150px;overflow: hidden"></upload>
                </div>
                </el-col>

        </el-row>
        <br/><br/>
        <el-row :gutter="15" class="wz">
            <el-col :span="4">
                <div class="grid-content ">短片：</div>
            </el-col>
            <el-col :span="8">
                <div style="width: 200px;">
                    <upload v-on:uploadSuccess="videoFileUrl" :urlUpload="movieUrl"></upload>

                </div>
            </el-col>

            <el-col :span="3">
                <el-button type="primary" @click="watchVideo">查看</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="10" class="but">

            <el-col :span="2" :offset="4">
                <el-button @click="videoAdd" type="primary">{{ buttonSaveTitle }}</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button @click="videoCancle" >{{ buttoncancleTitle }}</el-button>
            </el-col>

        </el-row>

    </div>
</template>

<script>
  import axios from 'axios';
  import upload from './UploadFile.vue'
  import {Message} from 'element-ui';
  import ElRow from "../../../node_modules/element-ui/packages/row/src/row";
  import chooseuser from '../common/ChooseUser.vue';



  export default {
    data() {
      return {
        fullvideo:'',
        movieUrl :window.baseUploadVideoUrl,
        sellTypeList: [],
        sortTypeList: [],
        type01: '',
        type02: '',
        isdisplayPubUser: false,
        pubUserName: '',
        pubUserId:'',
        checklist : [],
        childTypeList:[],//题材
        languages: [],
        title:'修改封面',
        language:'',
        sourceType: '',
        sourceTypes: [
          {
            value: 1,
            label: '原创'
          },
          {
            value: 2,
            label: '分享'
          },
        ],
        pubTypeList: [
          {
            value: 0,
            label: '未知'
          },
          {
            value: 1,
            label: '院线'
          },
          {
            value: 2,
            label: '新媒体'
          },
        ],
        videoTypeList: [],
        name: '',
        studioId: '',
        times: '',
        director: '',//导演
        company: '',//出处
        boxOffice: '',//票房
        source: '',//视频分类（可能是1：原创，2：分享）
        type: '',//视频类型编号
        img: '',//图片路径
        userId: '',//用户编号
        intro: '',
        adminId: '',//操作人编号
        videoUrl: '',//视频路径
        oneword: '',
        pubType: '',
        buttonSaveTitle: '提交',
        buttoncancleTitle: '取消',
        editData: {},
        isEditing: true,
        dialogVisible: true,
        fullimg:'',
        editId:"",

      }
    },
    created() {
      this.getCate();
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

      axios.get(window.baseURL + 'admin/videos/types')
        .then(res => {
          this.videoTypeList = res.data.body;

        }).catch(err => {

        this.$message('数据获取失败');
      });
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

      let id = localStorage.getItem('videoEditId');
      this.editId = id;
      let isEditing = localStorage.getItem('videoEditing');

      axios.get(window.baseURL + 'admin/videos/' + id)
        .then(res => {
console.log(res.data.body.adminVideo);
          this.editData = res.data.body;
          let categorys  = res.data.body.adminVideoCategors;
          for(var i = 0; i < categorys.length; i++){
            this.checklist.push( categorys[i].categoryId);
          }
          this.studioId = res.data.body.adminVideo.studioId;
          this.times = res.data.body.adminVideo.time;
          this.director = res.data.body.adminVideo.director;
          this.name = res.data.body.adminVideo.name;
          this.company = res.data.body.adminVideo.company;
          this.boxOffice = res.data.body.adminVideo.boxOffice;
          this.source = res.data.body.adminVideo.source;
          this.type = res.data.body.adminVideo.type;
          this.img = res.data.body.adminVideo.img;
          this.fullimg = window.basePic + res.data.body.adminVideo.img;
          this.language = res.data.body.adminVideo.language;
          this.userId = res.data.body.adminVideo.userId;
          this.pubUserId = res.data.body.adminVideo.userId;
          this.intro = res.data.body.adminVideo.intro;
          this.adminId = res.data.body.adminVideo.adminId;
          this.pubType = res.data.body.adminVideo.pubType;
          this.videoUrl = res.data.body.adminVideo.href;
          this.oneword = res.data.body.adminVideo.oneword;
          this.pubUserName = res.data.body.adminVideo.userNickName;
          this.type01 = res.data.body.adminVideo.type01;
          this.type02 = res.data.body.adminVideo.type;
          this.fullvideo = window.baseVideo + this.videoUrl;
        }).catch(err => {
            this.$message('数据获取失败');
      });


    },
    computed: {},
    watch: {
      type01: {
        handler(newV, oldV) {
          this.updateSort();
        },
      },

    },
    methods: {
      getCate(){

        axios({
          method:'get',
          url:window.baseURL + 'admin/category',
          params:{
            code:'VIDEO_TYPE',
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

        }).catch(err =>{

        })
      },
      //分类联动
      updateSort() {
        const self = this;
        for (var i = 0; i < this.sellTypeList.length; i++) {
          var obj = this.sellTypeList[i];
          if (this.type01 == obj.id) {
            this.sortTypeList = obj.subs;
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

        //遍历所选
        for(var i = 0 ; i < categoryTypeList.length; i++){

        }
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

      videoCover(data) {
            this.img = data.targetFileName;
            this.fullimg = window.basePic + data.targetFileName;
      },
      videoFileUrl(data) {
            this.videoUrl = data.targetFileName;
            this.fullvideo = window.baseVideo + data.targetFileName;
            this.times = data.duration/1000;
      },
      videoAdd() {
          if(undefined == this.name || '' == this.name){
              this.$message('片名不可为空');
              return;
          }
          if(this.checklist.length == 0){
              this.$message('题材为必选');
              return;
          }
          if(undefined == this.company || '' == this.company){
              this.$message('出处不可为空');
              return;
          }
          if(undefined == this.videoUrl || '' == this.videoUrl){
              this.$message('视频必须上传');
              return;
          }
          if(undefined == this.times || '' == this.times){
              this.$message('时长必须获取,请上传视频自动获取');
              return;
          }
          if(undefined == this.oneword || '' == this.oneword){
              this.$message('一句话简介不可为空');
              return;
          }
          if(undefined == this.pubUserName || '' == this.pubUserName){
              this.$message('发布人必选');
              return;
          }
          if(undefined == this.type01 || '' == this.type01){
              this.$message('类别不可为空');
              return;
          }
          if(undefined == this.type02 || '' == this.type02){
              this.$message('类型不可为空');
              return;
          }
          if(undefined == this.intro || '' == this.intro){
              this.$message('简介不可为空');
              return;
          }
          if(undefined == this.language || '' == this.language){
              this.$message('语言不可为空');
              return;
          }

        //题材多选
        var categoryidsstr = '';
        for(var i in this.checklist){
          categoryidsstr += this.checklist[i]+",";
        }
        axios({
          method: 'PATCH',
          url: window.baseURL + 'admin/videos',
          data: {
            cateGoryIds:categoryidsstr,
            studioId: this.studioId,
            time: this.times,
            director: this.director,
            name: this.name,
            company: this.company,
            boxOffice: this.boxOffice,
            source: this.source,
            type: this.type02,
            img: this.img,
            language: this.language,
            intro: this.intro,
            adminId: this.adminId,
            pubType: this.pubType,
            href: this.videoUrl,
            oneword: this.oneword,//一句话简介
            userId: this.pubUserId,
            state: 2,
            id: this.editId,
            type01: this.type01,

          }
        })
          .then(res => {
            this.$message.success('影片编辑成功');
            this.turnNomal();
            this.$router.push('/VideoConfig');
          }).catch(err => {
          this.$message.error('提交失败,请检查内容，重新上传');

        })

      },
      watchVideo(){
        window.open(this.fullvideo);
      },
      videoCancle() {

        this.turnNomal();
        this.$router.push('/VideoConfig');

      },
      turnNomal() {
        this.studioId = '';
        this.times = '';
        this.director = '';
        this.name = '';
        this.company = '';
        this.boxOffice = '';
        this.source = '';
        this.type = '';
        this.img = '';
        this.language = '';
        this.userId = '';
        this.intro = '';
        this.adminId = '';
        this.pubType = '';
        this.videoUrl = '';
        this.oneword = '';
        let id = localStorage.setItem('videoEditId', 0);
        let isEditing = localStorage.setItem('videoEditing', false);
      }

    },
    components: {
      ElRow,
      upload,
      chooseuser
    }
  }
</script>

<style scoped>

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        margin-top: 10px;

    }
.wz{margin-top: 100px}
    .but{margin-top: 20px}
</style>