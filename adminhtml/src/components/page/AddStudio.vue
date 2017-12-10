<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 工作室添加页面</el-breadcrumb-item>
                <el-breadcrumb-item>添加、编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div>
            <el-breadcrumb-item>工作室名称：</el-breadcrumb-item>
            <el-breadcrumb-item class="studioName">
                <el-input v-model="input" placeholder="必填"></el-input>
            </el-breadcrumb-item>

            <el-breadcrumb-item>电话：</el-breadcrumb-item>
            <el-breadcrumb-item class="mobile">
                <el-input v-model="input" placeholder="必填"></el-input>
            </el-breadcrumb-item>
        </div>
        <br/><br/><br/>

        <div>
            <el-breadcrumb-item>一句话简介：</el-breadcrumb-item>
            <el-breadcrumb-item class="oneword">
                <el-input v-model="input"  placeholder="必填（60字符）"></el-input>
            </el-breadcrumb-item>
        </div>
<br/><br/><br/>
        <div>
            <el-breadcrumb-item>详细简介：</el-breadcrumb-item>
            <vue_editor></vue_editor>
            <el-breadcrumb-item>必填</el-breadcrumb-item>
        </div>
        <br/><br/><br/>
        <div>
            <div class="grid-content ">头像：</div>
            <div style="width: 600px;height: 200px">
                <upload :showtype="3" v-on:uploadSuccess="videoFileUrl"></upload>
            </div>
        </div>
        <div>
            <div class="grid-content ">空间背景图：</div>
            <div style="width: 600px;height: 200px">
                <upload :showtype="3" v-on:uploadSuccess="videoFileUrl"></upload>
            </div>
        </div>
        <br/><br/>

        <div>
            <el-breadcrumb-item>工作室成员</el-breadcrumb-item>
            <el-button type="primary" @click="select">查看</el-button>
            <el-button type="primary" @click="select">选择</el-button>

        </div>
        <br/><br/>

        <div>
            <el-breadcrumb-item>工作室等级</el-breadcrumb-item>
            <el-radio-group v-model="radio2">
                <el-radio :label="3">铜G</el-radio>
                <el-radio :label="6">银G</el-radio>
                <el-radio :label="9">金G</el-radio>
            </el-radio-group>
        </div>
        <br/>

        <div>
            <el-breadcrumb-item>工作室类型
                <el-select v-model="form.region" placeholder="投资出品组">
                    <el-option key="imoo" label="投资出品组" value="imoo"></el-option>
                    <el-option key="bbk" label="创作" value="bbk"></el-option>
                    <el-option key="xtc" label="演员" value="xtc"></el-option>
                </el-select>

                <el-select v-model="form.region" placeholder="投资出品组">
                    <el-option key="imoo" label="投资出品组" value="imoo"></el-option>
                    <el-option key="bbk" label="创作" value="bbk"></el-option>
                    <el-option key="xtc" label="演员" value="xtc"></el-option>
                </el-select>
            </el-breadcrumb-item>
        </div>
        <br/><br/><br/>

        <div>
            <el-breadcrumb-item>关注数：</el-breadcrumb-item>
            <el-breadcrumb-item class="rightname">
                <el-input v-model="input" placeholder="必填"></el-input>
            </el-breadcrumb-item>

            <el-breadcrumb-item>粉丝数：</el-breadcrumb-item>
            <el-breadcrumb-item class="rightname">
                <el-input v-model="input" placeholder="必填"></el-input>
            </el-breadcrumb-item>
        </div>
        <br/><br/><br/>


        <div>
            <el-breadcrumb-item>工作室控制</el-breadcrumb-item>
            <el-button type="primary" @click="select">关闭</el-button>
        </div>
        <br/><br/>


        <div>
            <el-button type="primary" @click="add" style="line-height: 22px">添加</el-button>
        </div>

    </div>
</template>

<script>
  import upload from './UploadFile.vue';
  import vue_editor from './VueEditor_edit.vue';


  export default {
    components: {
      upload,
      vue_editor
     },
    data: function(){
      return {
        radio2: 3,
        studioName:'',
        mobile:'',
        oneword:'',




        url: './static/vuetable.json',
        tableData: [],
        cur_page: 1,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false,


        bannerList: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: true,
          type: ['步步高'],
          resource: '小天才',
          desc: ''
        }
      }
    },
    created(){
      this.getData();
    },
    computed: {
      data(){
        const self = this;
        return self.tableData.filter(function(d){
          let is_del = false;
          for (let i = 0; i < self.del_list.length; i++) {
            if(d.name === self.del_list[i].name){
              is_del = true;
              break;
            }
          }
          if(!is_del){
            if(d.address.indexOf(self.select_cate) > -1 &&
              (d.name.indexOf(self.select_word) > -1 ||
              d.address.indexOf(self.select_word) > -1)
            ){
              return d;
            }
          }
        })
      }
    },
    methods: {
      add() {
        const self = this;
        self.$router.push('/AddCopyright');
      },
select(){
  const self = this;
  self.$router.push('/CopyrightManage');
},

      handleCurrentChange(val){
        this.cur_page = val;
        this.getData();
      },
      getData(){
        let self = this;
        if(process.env.NODE_ENV === 'development'){
          self.url = '/ms/table/list';
        };
        self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
          self.tableData = res.data.list;
        })
      },
      search(){
        this.is_search = true;
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleEdit(index, row) {
        this.$message('编辑第'+(index+1)+'行');
      },
      handletihuan(index, row) {
        this.$message('替换'+(index+1)+'行');
      },
      handleDelete(index, row) {
        this.$message.error('删除第'+(index+1)+'行');
      },
      delAll(){
        const self = this,
          length = self.multipleSelection.length;
        let str = '';
        self.del_list = self.del_list.concat(self.multipleSelection);
        for (let i = 0; i < length; i++) {
          str += self.multipleSelection[i].name + ' ';
        }
        self.$message.error('删除了'+str);
        self.multipleSelection = [];
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>
<style>
    .rightname{
        margin-right: 10px;
    }
</style>