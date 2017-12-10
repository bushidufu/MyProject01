<template>


    <div v-if="picEditEnable">
        <vue-core-image-upload :class="['pure-button','pure-button-primary','backColor']"
                               :crop="true"
                               text="裁剪图片+上传"
                               crop="local"
                               url="uploadUrl"
                               inputOfFile='file'

                               :extensions=editUpload.extensions
                               :max-file-size=editUpload.maxSize
                               :crop-ratio=editUpload.cropRatio
                               @imageuploaded="imageuploaded"
                               @errorhandle="handleError"
                               @imagechanged="imagechanged"
                               @imageuploading="imageuploading">
        </vue-core-image-upload>

    </div>
    <div v-else-if="this.normalUpload.listModel=='picture-card'">

        <el-upload
                action="http://121.42.167.212:8080/upload/image"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleFileSuccess">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    <div v-else-if="this.normalUpload.listModel=='picture'">
        <el-upload
                class="upload-demo"
                action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture"
                :on-success="handleFileSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
    <div v-else>
        <el-upload
                action="uploadUrl"
                multiple
                :drag=normalUpload.dragAble
                :show-file-list=normalUpload.showSuccessList
                :list-type=normalUpload.listModel
                :before-upload="beforeAvatarUpload"
                :on-change='fileChanged'
                :on-success="handleFileSuccess"
                :on-error="handleFileError">


                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    <div v-if=" normalUpload.dragAble == true ">
                        将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <div v-else>
                        <em>点击上传</em>
                    </div>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传{{ normalUpload.typeRealArr.join('，') }}文件，且不超过{{ normalUpload.sizeLimit }}M</div>

        </el-upload>

    </div>


</template>



<script>

  import {Message} from 'element-ui';
  import VueCoreImageUpload  from 'vue-core-image-upload';

  export default {

    data() {
      return {
        fileList2:[],
        uploadUrl:window.baseUploadImgUrl,
        dialogImageUrl: '',
        dialogVisible: false,
        picEditEnable:this.editEnable, // 是否可以裁剪图片 （如果可裁剪 采用editUpload 逻辑   不可裁剪 采用 normalUpload 逻辑）
        normalUpload:{
          dragAble: this.candrag,//是否可拖拽 （注意：listModel == picture-card 和 dragAble = true  会有样式冲突 ）
          sizeLimit: this.defaultSize,//图片大小限制 M 为单位
          typeArr: ['image/jpeg', 'image/bmp', 'image/png', 'image/pjpeg'],
          typeRealArr: ['jpg', 'bmp', 'png', 'jpeg'],
          showSuccessList: this.showSuccessList, //是否显示上传成功的文件列表
          listModel: this.showtype,//上边列表展示样式 list-type="picture-card" "picture" "text"  如果picture-card 情况下最好不要支持 拖拽上传（即 candrag: false,），否则引起样式问题。
        },
        editUpload:{
          extensions:'png,jpg,gif',//支持的图片格式
          maxSize:1024 * 1024 * this.defaultSize,// 裁剪的图片大小  默认2M
          cropRatio:this.ratio,//裁剪框的图片比例

        }
      }

    },
    props: {editEnable:{default:false,type:Boolean},showtype:{default:'text',type:String},defaultSize:{default:30,type:Number},candrag:{default:false,type:Boolean},showSuccList:{default:false,type:Boolean}},


    components:{
      VueCoreImageUpload
    },

    methods: {
      handleRemove(file, fileList) {
        console.log(fileList);
        console.log(file);
      },
      handlePictureCardPreview(file) {
        console.log(11111);
        console.log(file.url);
        console.log(22222);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
        const isLt2M = file.size / 1024 / 1024 < parseFloat(this.normalUpload.sizeLimit);

        if (!isJPG) {
          this.$message.error('请上传jpg，bmp，png，jpeg格式图片!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过' + parseFloat(this.normalUpload.sizeLimit) + 'MB!');
        }
        return isJPG && isLt2M;
      },
      //文件上传成功的回调
      handleFileSuccess(res, file) {
        console.log(file.response.body.targetFileName);

        this.$emit("uploadSuccess",file.response.body.targetFileName);
        this.$message.success('上传图片成功');
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
        console.log(33333);
      },

      imageuploaded(res) {
        console.log(JSON.stringify(res));

      },
      handleError(err){
        console.log(2222);
        console.log(JSON.stringify(err));

      }
    }
  }
</script>

<style scoped>



</style>