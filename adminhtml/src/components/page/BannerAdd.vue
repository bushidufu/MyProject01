<template>
<div>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-breadcrumb-item class="sd">筛选三端:</el-breadcrumb-item>
            <el-select v-model="client" placeholder="选择三端">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        </el-col>
        <el-col :span="8">
            <el-breadcrumb-item class="sdf">轮播指向类型:</el-breadcrumb-item>
            <el-select v-model="bantype" placeholder="选择轮播指向类型">
                <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-col>


    </el-row>

    <el-row :gutter="20">
        <el-col :span="18">
            <el-breadcrumb-item>BANNER标题: </el-breadcrumb-item>
            <el-input v-model="title" placeholder="BANNER标题" icon="edit"></el-input>
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="18">
            <el-breadcrumb-item>图片的链接地址: </el-breadcrumb-item>
            <el-input v-model="href" placeholder="请输入内容" icon="edit"></el-input>

        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="18">
            <el-breadcrumb-item>指向对象的ID: </el-breadcrumb-item>
            <el-input v-model="objid" placeholder="指向对象的ID: " icon="edit"></el-input>
        </el-col>
    </el-row>

    <editlist :editEnable ='false' :candrag='true' :defaultSize="2.5" v-on:uploadSuccess="childmsg"></editlist>
        <el-button type="primary" @click="onSubmit" class="save">保存</el-button>
        <el-button id="cancle">取消</el-button>
    </div>
</template>

<script>
  import editlist from './UploadFile.vue';
  import {Message} from 'element-ui';

  export default {
    data() {
      return {
        options: [{
          value: 1,
          label: 'APP'
        }, {
          value: 2,
          label: 'WEB'
        }, {
          value: 3,
          label: '微信'
        }],
        client: '',
        options2: [{
          value: 1,
          label: '短视频'
        }, {
          value: 2,
          label: '工作室id'
        }, {
          value: 3,
          label: 'web地址'
        }],
        bantype: '',
        href:'',
        objid:'',
        title:'',
        banname:'',
        id_edit:''
      }
      },
    components:{
      editlist,
    },
    created(){
      this.getData();
    },
    methods: {
      getData(){
        const self = this;
        self.id_edit = localStorage.getItem('bid');
        localStorage.setItem('bid',null);

        if(self.id_edit != 'null'){
          self.url = window.baseURL+'admin/banners/'+self.id_edit;
          var instance = this.$axios.create({
            //headers: {'X-XSRF-TOKEN': token},
          });
          instance.get(self.url)
            .then((res) => {
              let self = this;
              console.log(res.data.body);
              self.bantype = res.data.body.type;
              self.href = res.data.body.href;
              self.client = res.data.body.serverType;
              self.objid = (res.data.body.target == 0 ? null : res.data.body.target);
              self.title = res.data.body.title;
            })
        }
      },
      childmsg(data) {
        const self = this;
        self.banname= data;
      },
      onSubmit() {
        const self = this;
        let param = self.id_edit;
        if(param != 'null'){
          this.$axios({
            method:'PATCH',
            url:window.baseURL+'admin/banners',
            // headers: {'X-XSRF-TOKEN': token},
            params: {
              img: self.banname,
              href:this.href,
              title:this.title,
              type:this.bantype,
              target:self.objid,
              id:param
            }
          })
            .then(function (response) {
              const code = response.data.code;
              if(code == 200){
                    this.$message('修改成功！');
                self.$router.push('/basetable_edit');

              }else {
                this.$message('修改失败！');
              }
            })
            .catch(function (error) {
              this.$message('修改失败catch！');
            });
        }else {
          this.$axios({
            method:'post',
            url:window.baseURL+'admin/banners',
            // headers: {'X-XSRF-TOKEN': token},
            params: {
              img: self.banname,
              serverType: this.client,//轮播服务类型  1-APP  2-PC 3-WECHAT
              href:this.href,
              state:1,//1在线 2 下线
              title:this.title,
              type:this.bantype,
              target:self.objid
            }
          })
            .then(function (response) {
              const code = response.data.code;
              if(code == 200){
                this.$message('添加成功！');
                self.$router.push('/basetable_edit');
              }else {
                this.$message('添加失败！');
              }
            });
        }
      }
    }
  }
</script>

<style>
    .el-row {
        margin-bottom: 20px;

    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .sd{margin-top: 8px}
    .sdf{margin-top: 8px}
    .save,#cancle{margin-top: 20px}
    .save{margin-left: 100px}
    #cancle{margin-left: 50px}
</style>