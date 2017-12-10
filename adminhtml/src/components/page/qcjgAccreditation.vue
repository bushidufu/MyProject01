<template>
    <div class="table">

        <el-row :gutter="15">
            <el-col :span="4">
                <div>
                    <div class="grid-content ">机构信息：</div>

                </div>
            </el-col>

            <el-col :span="6">
                <div>
                    <img style="width: 150px;height: 150px;border-radius: 50%" :src="org_img"
                         alt="" class="pic">
                </div>
            </el-col>
            <el-col :span="14">

                <div>
                    <el-tag color="#ccc" style="width: 55px;height: 30px; text-align: center;line-height: 30px;font-size: 18px">名称：</el-tag>
                    {{org_name}}
                </div>
                <br/>
                <div>
                    <el-tag color="#ccc" style="width: 55px;height: 30px; text-align: center;line-height: 30px;font-size: 18px">简介：</el-tag>
                    {{org_oneword}}
                </div>
                <br/>
                <div>
                    <el-tag color="#ccc" style="width: 55px;height: 30px; text-align: center;line-height: 30px;font-size: 18px">电话：</el-tag>
                    {{telephone}}
                </div>
                <br/>
                <div>
                    <el-tag color="#ccc" style="width: 80px;height: 30px; text-align: center;line-height: 30px;font-size: 18px">发布人：</el-tag>
                    {{fb_name}}
                </div>
                <br/>

            </el-col>
        </el-row>

        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">营业执照：</div>
            </el-col>
            <el-col :span="8">

                <el-dialog
                        :visible.sync="dialogVisible3">

                    <img width="400px" height="600px" :src="license01" alt="" class="pic">

                </el-dialog>
                <img width="340px" height="216px" :src="license01" alt="" class="pic" @click="dialogVisible3 = true">


            </el-col>

        </el-row>
        <br/>

        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">身份证：</div>
            </el-col>
            <el-col :span="8">

                <el-dialog
                        :visible.sync="dialogVisible1">

                    <img width="510px" height="324px" :src="identity01" alt="" class="pic">

                </el-dialog>
                <img width="340px" height="216px" :src="identity01" alt="" class="pic" @click="dialogVisible1 = true">


            </el-col>
            <el-col :span="8">

                <el-dialog
                        :visible.sync="dialogVisible2">

                    <img width="510px" height="324px" :src="identity02" alt="" class="pic">

                </el-dialog>
                <img width="340px" height="216px" :src="identity02" alt="" class="pic" @click="dialogVisible2 = true">


            </el-col>
        </el-row>
        <br/>

        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">审核信息：</div>
            </el-col>
            <el-col :span="16">
                <el-input v-model="applayDetails" :disabled="true" type="textarea" :rows="5"></el-input>
            </el-col>
        </el-row>
        <br/>

        <el-row :gutter="15">
            <el-col :span="8" :offset="4">
                <el-button type="primary" class="but" @click="passYes">通过</el-button>
            </el-col>
            <el-col :span="8">
                <el-button @click="passN0">拒绝</el-button>
            </el-col>
        </el-row>


    </div>
</template>


<script>
  import upload from './UploadFile.vue';
  import vue_editor from './Quilleditor.vue';
  import axios from 'axios';
  import {Message} from 'element-ui';

  export default {
    components: {
      upload

    },
    data: function () {
      return {
        org_img: '',
        org_id: '',
        org_name: '',
        org_oneword: '',
        license01: '',
        //license02:'',
        identity01: '',
        identity02: '',
        fb_name: '',
        telephone: '',
        applayDetails: '',
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
      }
    },
    created() {
      this.getData();
    },
    computed: {
      data() {

      }
    },
    methods: {
      getData() {
        let self = this;
        let token = localStorage.getItem('token');
        self.url = window.baseURL + 'admin/approve';
        var instance = axios.create({
          headers: {'X-XSRF-TOKEN': token},
        });
        instance.get(self.url, {
          params: {
            type: 3,//2工作室3圈层机构
          }
        })
          .then((res) => {
            console.log(res);
            if (res.data.body == null) {
              self.org_name = '';
              self.org_oneword = '';
              self.license01 = '';
              self.identity01 = '';
              self.identity02 = '';
              self.fb_name = '';
              self.telephone = '';
              self.applayDetails = '';
              self.org_id = '';
              self.org_img = '';
            } else {
              self.org_name = res.data.body.name;//圈层机构名称
              self.org_oneword = res.data.body.intro;
              self.fb_name = res.data.body.userName;//发布人
              self.telephone = res.data.body.mobile;
              self.applayDetails = res.data.body.detail;
              self.org_id = res.data.body.id;
              if (res.data.body.img != '') {
                self.org_img = window.basePic + res.data.body.img;
              }
              if (res.data.body.license != '') {
                self.license01 = window.basePic + res.data.body.license;
              }
              if (res.data.body.cardFront != '') {
                self.identity01 = window.basePic + res.data.body.cardFront;
              }
              if (res.data.body.cardBack != '') {
                self.identity02 = window.basePic + res.data.body.cardBack;
              }
            }
          })
      },

      passYes() {
        let self = this;

        this.$axios({
          method: 'PATCH',
          url: window.baseURL + 'admin/approve',
          // headers: {'X-XSRF-TOKEN': token},
          params: {
            id: self.org_id,
            state: 1,
          }
        })
          .then(function (response) {
            const code = response.data.code;
            if (code == 200) {
              self.$message('已通过');

              //重新请求数据
              axios.get(window.baseURL + 'admin/approve', {
                // headers: {'X-XSRF-TOKEN': token},
                params: {
                  type: 3,//1工作室2圈层机构
                }
              })
                .then((res) => {
                  console.log(res);
                  if (res.data.body == null) {
                    self.org_name = '';
                    self.org_oneword = '';
                    self.license01 = '';
                    self.identity01 = '';
                    self.identity02 = '';
                    self.fb_name = '';
                    self.telephone = '';
                    self.applayDetails = '';
                    self.org_id = '';
                    self.org_img = '';

                  } else {
                    self.org_name = res.data.body.name;//圈层机构名称
                    self.org_oneword = res.data.body.intro;
                    self.fb_name = res.data.body.userName;//发布人
                    self.telephone = res.data.body.mobile;
                    self.applayDetails = res.data.body.detail;
                    self.org_id = res.data.body.id;
                    if (res.data.body.img != '') {
                      self.org_img = window.basePic + res.data.body.img;
                    }
                    if (res.data.body.license != '') {
                      self.license01 = window.basePic + res.data.body.license;
                    }
                    if (res.data.body.cardFront != '') {
                      self.identity01 = window.basePic + res.data.body.cardFront;
                    }
                    if (res.data.body.cardBack != '') {
                      self.identity02 = window.basePic + res.data.body.cardBack;
                    }
                  }
                })

            } else {
              self.$message('网络出错，请检查');

            }
          })
      },

      passN0() {
        let self = this;

        this.$axios({
          method: 'PATCH',
          url: window.baseURL + 'admin/approve',
          // headers: {'X-XSRF-TOKEN': token},
          params: {
            id: self.org_id,
            state: 2,
          }
        })
          .then(function (response) {
            const code = response.data.code;
            if (code == 200) {
              self.$message('已拒绝');
              //重新请求数据
              axios.get(window.baseURL + 'admin/approve', {
                // headers: {'X-XSRF-TOKEN': token},
                params: {
                  type: 3,//1工作室2圈层机构
                }
              })
                .then((res) => {
                  console.log(res);
                  if (res.data.body == null) {
                    self.org_name = '';
                    self.org_oneword = '';
                    self.license01 = '';
                    self.identity01 = '';
                    self.identity02 = '';
                    self.fb_name = '';
                    self.telephone = '';
                    self.applayDetails = '';
                    self.org_id = '';
                    self.org_img = '';

                  } else {
                    self.org_name = res.data.body.name;//圈层机构名称
                    self.org_oneword = res.data.body.intro;
                    self.fb_name = res.data.body.userName;//发布人
                    self.telephone = res.data.body.mobile;
                    self.applayDetails = res.data.body.detail;
                    self.org_id = res.data.body.id;
                    if (res.data.body.img != '') {
                      self.org_img = window.basePic + res.data.body.img;
                    }
                    if (res.data.body.license != '') {
                      self.license01 = window.basePic + res.data.body.license;
                    }
                    if (res.data.body.cardFront != '') {
                      self.identity01 = window.basePic + res.data.body.cardFront;
                    }
                    if (res.data.body.cardBack != '') {
                      self.identity02 = window.basePic + res.data.body.cardBack;
                    }

                  }
                })

            } else {
              self.$message('网络出错，请检查');

            }
          })
      },

    }
  }
</script>

<style scoped>
    .grid-content {
        margin-top: 8px
    }

    .el-row {
        margin-bottom: 10px
    }

    .but {
        margin-left: 220px;
        margin-right: 20px
    }
</style>