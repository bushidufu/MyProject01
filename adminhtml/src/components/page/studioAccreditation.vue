<template>
    <div class="table">

        <el-row :gutter="15">
            <el-col :span="4">
                <div>
                    <div class="grid-content ">用户信息：</div>

                </div>
            </el-col>

            <el-col :span="6">
                <div>
                    <img style="width: 150px;height: 150px;border-radius: 50%" :src="cover_img"
                         alt="" class="pic">
                </div>
            </el-col>
            <el-col :span="14">

                <div>
                    <el-tag color="#ccc" style="width: 55px;height: 30px; text-align: center;line-height: 30px;font-size: 18px">名称：</el-tag>
                    {{room_name}}
                </div>
                <br/>
                <div>
                    <el-tag color="#ccc" style="width: 55px;height: 30px; text-align: center;line-height: 30px;font-size: 18px">简介：</el-tag>
                    {{briefintroduction}}
                </div>
                <br/>
                <div>
                    <el-tag color="#ccc" style="width: 55px;height: 30px; text-align: center;line-height: 30px;font-size: 18px">电话：</el-tag>
                    {{telephone}}
                </div>
                <br/>
                <div>
                    <el-tag color="#ccc" style="width: 80px;height: 30px; text-align: center;line-height: 30px;font-size: 20px">发布人：</el-tag>
                    {{issuer}}
                </div>
                <br/>

            </el-col>
        </el-row>

        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">身份证：</div>
            </el-col>
            <el-col :span="8">
                <el-dialog
                        :visible.sync="dialogVisible1">
                    <img width="510px" height="324px" :src="cover_imgz" alt="" class="pic">

                </el-dialog>
                <img width="340px" height="216px" :src="cover_imgz" alt="" class="pic" @click="dialogVisible1 = true">

            </el-col>
            <el-col :span="8">
                <el-dialog
                        :visible.sync="dialogVisible2">
                    <img width="510px" height="324px" :src="cover_imgz" alt="" class="pic">
                </el-dialog>
                <img width="340px" height="216px" :src="cover_imgf" alt="" class="pic" @click="dialogVisible2 = true">
            </el-col>
        </el-row>
        <br/>
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="grid-content ">审核信息：</div>
            </el-col>
            <el-col :span="16">
                <el-input v-model="application_detail" :disabled="true" type="textarea" :rows="5"></el-input>
            </el-col>
        </el-row>
        <br/>


        <el-row :gutter="15">
            <el-col :span="8" :offset="4">
                <el-button type="primary" class="but" @click="pass">通过</el-button>
            </el-col>
            <el-col :span="8">
                <el-button @click="refuse">拒绝</el-button>
            </el-col>
        </el-row>


    </div>
</template>


<script>
  import upload from './UploadFile.vue';
  import vue_editor from './Quilleditor.vue';
  import axios from 'axios';

  export default {
    components: {
      upload
    },
    data: function () {
      return {
        org_id: '',
        room_name: '',//工作室名称
        cover_img: '',//工作室头像
        cover_imgz: '',//身份证正面
        cover_imgf: '',//身份证反面
        briefintroduction: '',//一句话简介
        issuer: '',
        telephone: '',
        dialogVisible1: false,
        dialogVisible2: false,
        application_detail: ''//申请详细内容

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
            type: 2,//2工作室3圈层机构
          }
        })
          .then((res) => {
            let self = this;
            console.log(111);
            console.log(JSON.stringify(res.data.body));
            if (res.data.body == '') {
              self.room_name = '';//工作室名称
              self.briefintroduction = '';
              self.cover_img = '';
              self.cover_imgz = '';
              self.cover_imgf = '';
              self.issuer = '';//发布人
              self.telephone = '';
              self.application_detail = '';
              self.org_id = '';
            } else {
              self.room_name = res.data.body.name;//工作室名称
              self.briefintroduction = res.data.body.intro;
              self.issuer = res.data.body.userName;//发布人
              self.telephone = res.data.body.mobile;
              self.application_detail = res.data.body.detail;
              self.org_id = res.data.body.id;
              if (res.data.body.img != '') {
                self.cover_img = window.basePic + res.data.body.img;
              }
              if (res.data.body.cardFront != '') {
                self.cover_imgz = window.basePic + res.data.body.cardFront;
              }
              if (res.data.body.cardBack != '') {
                self.cover_imgf = window.basePic + res.data.body.cardBack;
              }
            }
          })
      },

      pass() {
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
                  type: 2,//2工作室3圈层机构
                }
              })
                .then((res) => {
                  if (res.data.body == null) {
                    self.room_name = '';//工作室名称
                    self.briefintroduction = '';
                    self.cover_img = '';
                    self.cover_imgz = '';
                    self.cover_imgf = '';
                    self.issuer = '';//发布人
                    self.telephone = '';
                    self.application_detail = '';
                    self.org_id = '';
                  } else {
                    self.room_name = res.data.body.name;//工作室名称
                    self.briefintroduction = res.data.body.intro;
                    self.issuer = res.data.body.userName;//发布人
                    self.telephone = res.data.body.mobile;
                    self.application_detail = res.data.body.detail;
                    self.org_id = res.data.body.id;
                    if (res.data.body.img != '') {
                      self.cover_img = window.basePic + res.data.body.img;
                    }
                    if (res.data.body.cardFront != '') {
                      self.cover_imgz = window.basePic + res.data.body.cardFront;
                    }
                    if (res.data.body.cardBack != '') {
                      self.cover_imgf = window.basePic + res.data.body.cardBack;
                    }
                  }
                })

            } else {
                self.$message('网络出错，请检查');
            }
          })
      },

      refuse() {
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
                  type: 2,//2工作室3圈层机构
                }
              })
                .then((res) => {
                  if (res.data.body == null) {
                    self.room_name = '';//工作室名称
                    self.briefintroduction = '';
                    self.cover_img = '';
                    self.cover_imgz = '';
                    self.cover_imgf = '';
                    self.issuer = '';//发布人
                    self.telephone = '';
                    self.application_detail = '';
                    self.org_id = '';
                  } else {
                    self.room_name = res.data.body.name;//工作室名称
                    self.briefintroduction = res.data.body.intro;
                    self.issuer = res.data.body.userName;//发布人
                    self.telephone = res.data.body.mobile;
                    self.application_detail = res.data.body.detail;
                    self.org_id = res.data.body.id;
                    if (res.data.body.img != '') {
                      self.cover_img = window.basePic + res.data.body.img;
                    }
                    if (res.data.body.cardFront != '') {
                      self.cover_imgz = window.basePic + res.data.body.cardFront;
                    }
                    if (res.data.body.cardBack != '') {
                      self.cover_imgf = window.basePic + res.data.body.cardBack;
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



    .but {
        margin-left: 220px;
        margin-right: 20px
    }
</style>