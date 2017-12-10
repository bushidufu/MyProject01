<template>
    <div class="table">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="15">
            <el-col :span="6">
                <el-col :span="7">
                    <div class="grid-content" >片名：</div>
                </el-col>
                <el-col :span="16">
                        <el-input v-model="ruleForm.name" placeholder="请输入影片名" icon="edit"></el-input>
                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="7">
                    <div class="grid-content ">片长：</div>
                </el-col>
                <el-col :span="16">
                        <el-input v-model="ruleForm.times" placeholder="请输入片长" icon="edit" disabled="disabled"></el-input>
                </el-col>
            </el-col>
            <el-col :span="6"  style="display:none">
                <el-col :span="6">
                    <div class="grid-content ">类型：</div>
                </el-col>
                <el-col :span="16">
                        <el-select v-model="ruleForm.type" placeholder="请选择类型">
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
                <el-col :span="7">
                    <div class="grid-content ">语言：</div>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="ruleForm.language" placeholder="请选择语言">
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
                <el-col :span="7">
                    <div class="grid-content ">来源：</div>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="ruleForm.source" placeholder="请选择来源">
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
                <el-col :span="7">
                    <div class="grid-content ">出处：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="ruleForm.company" placeholder="请输入出处" icon="edit"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="6">
                <el-col :span="7">
                    <div class="grid-content ">票房：</div>
                </el-col>
                <el-col :span="16">
                        <el-input v-model="ruleForm.boxOffice" placeholder="请输入票房" icon="edit"></el-input>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="7">
                    <div class="grid-content ">导演：</div>
                </el-col>
                <el-col :span="16">
                        <el-input v-model="ruleForm.director" placeholder="请输入导演名字" icon="edit"></el-input>
                </el-col>
            </el-col>
        </el-row>

            <el-row :gutter="15">
                <el-col :span="6">
                    <el-col :span="7">
                        <div class="grid-content ">类别：</div>
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
                    <el-col :span="7">
                        <div class="grid-content ">类型：</div>
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

                <el-col :span="7">
                    <el-col :span="7">
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
            </el-row>

            <el-row :gutter="15">
                <el-col :span="20">
                    <el-checkbox-group v-model="checklist">
                        作品题材：<el-checkbox v-for="item in childTypeList" :label="item.id" :key="item.name">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>

            <el-row :gutter="15">
                <el-col :span="24">
                    <el-col :span="8">
                        <div class="grid-content ">一句话简介：</div>
                    </el-col>
                </el-col>
                <el-col :span="18">
                        <el-input v-model="ruleForm.oneword" placeholder="请输入一句话简介" icon="edit"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="24">
                    <el-col :span="8">
                        <div class="grid-content ">短片简介：</div>
                    </el-col>
                </el-col>
                <el-col :span="18">
                    <el-form-item prop="intro">
                        <el-input type="textarea" :rows="4" autosize v-model="ruleForm.intro" placeholder="请输入简介"></el-input>
                    </el-form-item>
                </el-col>
            </el-row><br/><br/>




        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">封面：</div>
            </el-col>
            <el-col :span="4">
                <div style="display:inline-block" v-show="isShow">
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
            <el-row :gutter="15">
                <el-col :span="8" :offset="4">
                    建议尺寸:1242*700
                </el-col>
            </el-row>
        <br/><br/>

        <el-row :gutter="15" class="wj">
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
                <el-button @click="videoAdd('ruleForm')" type="primary">{{ buttonSaveTitle }}</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button @click="videoCancle('ruleForm')" >{{ buttoncancleTitle }}</el-button>
            </el-col>
        </el-row>
        </el-form>
    </div>

</template>
<script>
  import axios from 'axios';
  import upload from './UploadFile.vue'
  import {Message} from 'element-ui';
  import chooseuser from '../common/ChooseUser.vue';



  export default {
    data() {
        //自定义表单验证
        var validateBoxOffice = (rule, value, callback) => {
            if (/^\d+\.\d+$|^$/.test(value)) {
                callback(new Error('亲 请输入数字'));
            } else if(value == ''){
                callback(new Error('请输入票房'));
            }else {
                callback();
            }
        };
      return {
        fullvideo:'',
        movieUrl :window.baseUploadVideoUrl,
        sellTypeList: [],
        sortTypeList: [],
        type01: '',
        type02: '',
        checklist : [],
        childTypeList:[],//题材
        //表单验证
          rules: {
              name: [
                  { required: true, message: '请输入活动名称', trigger: 'blur' }
              ],
              times: [
                  { required: true, message: '请输入片长', trigger: 'blur' }
              ],
              boxOffice:[
                  { validator: validateBoxOffice, trigger: 'blur' }
              ],
              director:[
                  { required: true, message: '请输入导演名字', trigger: 'blur' }
              ],
              oneword:[
                  { required: true, message: '请输入一句话简介', trigger: 'blur' },
                  { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
              ],
              intro:[
                  { required: true, message: '请输入短片简介', trigger: 'blur' },
                  { min: 8, message: '不能低于 8 个字符', trigger: 'blur' }
              ]
          },
        title:'点击上传',
        isShow:false,
        checked: true,
        languages: [],
        language: '',
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
        pubGenreList:[],
        pubTypeList:[],
        videoTypeList: [],
          ruleForm:{
            name: '',
            studioId: 117,
            times: '',
            director: '',//导演
            company: '',//出处
            boxOffice: '',//票房
            source: '',//视频分类（可能是1：原创，2：分享）
            type:[],//视频类型编号
            img: '',//图片路径
            language: '',//语言
            userId:'',//用户编号
            intro: '',
            adminId: 117,//操作人编号
            videoUrl: '',//视频路径
            oneword: '',
            pubTypeOne: '',
            pubTypeTwo: '',
            pubTypeThree:[],
            editData: {},
          },
          buttonSaveTitle: '添加',
          buttoncancleTitle: '取消',
        pubUserName: '',
        pubUserId: '',
        isdisplayPubUser: false,
        fullimg:'',

      }
    },
    created() {
      this.getCate();
      axios.get(window.baseURL + 'admin/videos/types')
        .then(res => {
          this.videoTypeList = res.data.body;

        }).catch(err => {

        this.$message('数据获取失败');
      });

      let id = localStorage.getItem('videoEditId');
      let isEditing = localStorage.getItem('videoEditing');
//
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
          code:'VIDEO_TYPE',
          level:1
        }
      }).then(res =>{
        if (res.data.code == 200){
          this.pubTypeList =res.data.body;
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
          code:'VIDEO_TYPE',
          level:2
        }
      }).then(res =>{
        if (res.data.code == 200){
          this.pubGenreList =res.data.body;
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

    },

    computed: {

    },
    watch: {
      type01: {
        handler(newV, oldV) {
          this.updateSort();
        },
      },

    },
    methods: {
      watchVideo(){
        window.open(this.fullvideo);
      },
      videoCover(data) {
            this.isShow = true;
            this.title = '修改封面';
            this.img = data.targetFileName;
            this.fullimg = window.basePic + data.targetFileName;
      },
      videoFileUrl(data) {
            this.videoUrl = data.targetFileName;
            this.fullvideo = window.baseVideo + data.targetFileName;
            this.ruleForm.times = data.duration/1000;
      },
      videoAdd(formName) {
          if(undefined == this.ruleForm.name || '' == this.ruleForm.name){
              this.$message('片名不可为空');
              return;
          }
          if(undefined == this.ruleForm.language || '' == this.ruleForm.language){
              this.$message('语言不可为空');
              return;
          }
          if(undefined == this.ruleForm.source || '' == this.ruleForm.source){
              this.$message('来源不可为空');
              return;
          }
          if(undefined == this.ruleForm.company || '' == this.ruleForm.company){
              this.$message('出处不可为空');
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
          if(undefined == this.pubUserName || '' == this.pubUserName){
              this.$message('发布人不可为空');
              return;
          }
          if(this.checklist.length == 0){
              this.$message('题材为必选');
              return;
          }
          if(undefined == this.ruleForm.oneword || '' == this.ruleForm.oneword){
              this.$message('一句话简介不可为空');
              return;
          }
          if(undefined == this.ruleForm.intro || '' == this.ruleForm.intro){
              this.$message('简介不可为空');
              return;
          }
          if(undefined == this.img || '' == this.img){
              this.$message('封面必须上传');
              return;
          }
          if(undefined == this.videoUrl || '' == this.videoUrl){
              this.$message('视频必须上传');
              return;
          }
          if(undefined == this.ruleForm.times || '' == this.ruleForm.times){
              this.$message('时长必须获取,请上传视频自动获取');
              return;
          }

          //题材多选
            var categoryidsstr = '';
            for(var i in this.checklist){
              categoryidsstr += this.checklist[i]+",";
            }

          this.$refs[formName].validate((valid) => {
              if (valid) {
                  axios({
                      method: 'post',
                      url: window.baseURL + 'admin/videos',
                      data: {
                          cateGoryIds:categoryidsstr,
                          studioId: this.ruleForm.studioId,
                          time: this.ruleForm.times,
                          director: this.ruleForm.director,
                          name: this.ruleForm.name,
                          company: this.ruleForm.company,
                          boxOffice: this.ruleForm.boxOffice,
                          source: this.ruleForm.source,
                          type: this.type02,
                          img: this.img,
                          language: this.ruleForm.language,
                          userId: this.pubUserId,
                          intro: this.ruleForm.intro,
                          adminId: this.ruleForm.adminId,
                          pubType: this.ruleForm.pubType,
                          href: this.videoUrl,
                          oneword: this.ruleForm.oneword,//一句话简介
                          state: 2,
                          type01: this.type01,
                      }
                  })
                      .then(res => {
                          this.$message.success('影片上传成功');
                          this.turnNomal();
                          this.$router.push('/VideoConfig');
                      }).catch(err => {
                      this.$message.error('提交失败,请检查内容，重新上传');

                  })
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      videoCancle(formName) {
        this.$refs[formName].resetFields();
        this.$router.push('/VideoConfig');
        this.turnNomal();
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
    },
    components: {
      upload,chooseuser
    }


  }

</script>

<style scoped>
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        margin-top: 10px;
    }
.wj{margin-top: 80px}
    .but{margin-top: 20px}
</style>

