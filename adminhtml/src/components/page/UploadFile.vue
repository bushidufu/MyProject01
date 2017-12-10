<template>


    <div v-if="picEditEnable">
        <vue-core-image-upload :class="['pure-button','pure-button-primary','backColor']"
                               :crop="true"
                               text="裁剪上传"
                               crop="local"
                               :url="this.urlUpload"
                               inputOfFile='file'
                               :extensions=editUpload.extensions
                               :max-file-size=editUpload.maxSize
                               :crop-ratio=editUpload.cropRatio
                               @imageuploaded="handleFileSuccess"
                               @errorhandle="handleError"
                               @imagechanged="imagechanged"
                               @imageuploading="imageuploading">
        </vue-core-image-upload>
    </div>
    <div v-else-if="this.normalUpload.listModel=='5'">
        <el-upload
                :action= "this.urlUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :show-file-list=normalUpload.showSuccessList
                :on-remove="handleRemove"
                :file-list="this.fileList"
                :disabled="this.disabled"
                :on-success="handleFileSuccess">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    <div v-else-if="this.normalUpload.listModel=='4'">
        <el-upload
                :action= "this.urlUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :show-file-list=normalUpload.showSuccessList
                :on-remove="handleRemove"
                :file-list="this.fileList"
                :disabled="this.disabled"
                :on-success="handleFileSuccess">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    <div v-else-if="this.normalUpload.listModel=='3'">

        <el-upload
                :action= "this.urlUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :show-file-list=normalUpload.showSuccessList
                :on-remove="handleRemove"
                :file-list="this.fileList"
                :disabled="this.disabled"
                :on-success="handleFileSuccess">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    <div v-else-if="this.normalUpload.listModel=='2'">
        <el-upload
                class="upload-demo"
                :action="this.urlUpload"
                :show-file-list= normalUpload.showSuccessList
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="this.fileList"
                :disabled="this.disabled"
                list-type="picture"
                :on-success="handleFileSuccess">
            <el-button size="small" type="primary">{{this.title}}</el-button>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
    </div>
    <div v-else>
        <el-upload
                :action="this.urlUpload"
                multiple
                :drag=normalUpload.dragAble
                :show-file-list=normalUpload.showSuccessList
                :file-list="this.fileList"
                :disabled="this.disabled"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-change='fileChanged'
                :on-success="handleFileSuccess"
                :on-error="handleFileError">

            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                <div v-if="candrag ">
                    将文件拖到此处，或<em>点击上传</em>
                </div>
                <div v-else>
                    <em>点击上传</em>
                </div>
                <!--<img v-bind:src="this.bgimg" style="width: 200px;height: 174px;margin-top: 0px;">-->

            </div>
            <!--<div class="el-upload__tip" slot="tip">只能上传{{ normalUpload.typeRealArr.join('，') }}文件，且不超过{{ normalUpload.sizeLimit }}M</div>-->
        </el-upload>
    </div>


</template>



<script>

  import {Message} from 'element-ui';
  import VueCoreImageUpload  from 'vue-core-image-upload';

  export default {

    data() {
      return {
            fileList:this.files,
            uploadUrl: this.urlUpload,
            dialogImageUrl: '',
            dialogVisible: false,
            picEditEnable:this.editEnable, // 是否可以裁剪图片 （如果可裁剪 采用editUpload 逻辑   不可裁剪 采用 normalUpload 逻辑）
            normalUpload:{
              dragAble: this.candrag,//是否可拖拽 （注意：listModel == picture-card 和 dragAble = true  会有样式冲突 ）
              sizeLimit: this.defaultSize,//图片大小限制 M 为单位
              typeArr: ['image/jpeg', 'image/bmp', 'image/png', 'image/pjpeg'],
              typeRealArr: ['jpg', 'bmp', 'png', 'jpeg'],
              showSuccessList: this.showSuccList, //是否显示上传成功的文件列表
              listModel: this.showtype,//   1 text  2  picture 3  picture-card  4项目封面图专用 上边列表展示样式 list-type="picture-card" "picture" "text"  如果picture-card 情况下最好不要支持 拖拽上传（即 candrag: false,），否则引起样式问题。
            },
            editUpload:{
              extensions:'png,jpg,gif',//支持的图片格式
              maxSize:1024 * 1024 * this.defaultSize,// 裁剪的图片大小  默认2M
              cropRatio:this.ratio,//裁剪框的图片比例

            }
      }

    },
    props: { ratio:{default:'750:362',type:String},bgimg:{default:window.basePic+'uploadbg.png',type:String},editEnable:{default:false,type:Boolean},showtype:{default:"1",type:String},defaultSize:{default:30,type:Number},candrag:{default:false,type:Boolean},showSuccList:{default:false,type:Boolean},title:{default:'点击上传',type:String},files:{default:function () { return [];},type:Array},disabled:{default:false,type:Boolean},urlUpload:{default:window.baseUploadImgUrl,type:String}},


    components:{
      VueCoreImageUpload
    },

    methods: {
      handleRemove(file, fileList) {
          if(this.showtype == 5){
              this.$emit("removesuc",file.name);
          }
        if(this.showtype == 4){
          this.$emit("removesuc",file.name);
        }
        if(this.showtype == 3){
          this.$emit("removesuc",file.name);
        }
        if(this.showtype == 2){
          this.$emit("removesuc",file.name);
        }
        if(this.showtype == 1){
          this.$emit("removesuc",file.name);
        }
      },
      handlePictureCardPreview(file) {

        if(this.showtype == 4){
            this.$emit("toppic",file.url);
        }else if(this.showtype == 5){
            this.$emit("toppic",file.name);
        } else{
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
      },
      handlePreview(file) {
        console.log(file);
      },
      //上传前的准备工作
      beforeAvatarUpload(file) {
        let isJPG = false;
        for (var i = 0; i < this.normalUpload.typeArr.length; i++) {
          var obj = this.normalUpload.typeArr[i];
          if (file.type === obj) {
            isJPG = true;
            break;
          }
        }

//        const isLt2M = file.size / 1024 / 1024 < parseFloat(this.normalUpload.sizeLimit);

//        if (!isJPG) {
//          this.$message.error('请上传jpg，bmp，png，jpeg格式图片!');
//        }
//        if (!isLt2M) {
//          this.$message.error('上传文件大小不能超过' + parseFloat(this.normalUpload.sizeLimit) + 'MB!');
//        }

        console.log(11111113);
        return true;
//        return isJPG && isLt2M;
      },
      //文件上传成功的回调
      handleFileSuccess(res, file) {
          if(this.showtype == 5){
              this.$emit("uploadSuccess",file.response.body);
          }else if(this.showtype == 6){
              this.$emit("uploadSuccess",res.body);
          }else{
              this.$emit("uploadSuccess",file.response.body);
              this.$message.success('上传文件成功');
          }
      },
      //文件上传失败的回调
      handleFileError(err, file, fileList) {
        console.log('上传图片失败回调');
        console.log(JSON.stringify(err));
        console.log(JSON.stringify(file));
        console.log(JSON.stringify(fileList));
      },
      //文件状态发生变化时候的回调
      fileChanged(file, fileList) {

        console.log(1111111);

//           file: {"status":"ready","name":"屏幕快照 2017-07-17 下午6.12.12.png","size":36932,"percentage":0,"uid":1500435482763,"raw":{"uid":1500435482763},"url":"blob:http://localhost:8081/1df43df1-a22d-477b-a109-54a2558adad5"}
        let state = file.state;
        if (state === 'ready') {
          console.log('准备上传文件');
        } else if (state === 'success') {
          console.log('上传文件成功');
        } else if (state === 'fail') {
          console.log('上传文件失败');
        }

      },
      imagechanged() {
        console.log(111111);
      },

      imageuploading() {

      },

      imageuploaded(res) {
        console.log(JSON.stringify(res));

      },
      handleError(err){
          alert(err);

        console.log(err);
      }
    }
  }
</script>

<style>
    .el-upload--text{width: 200px;height: 140px}
</style>