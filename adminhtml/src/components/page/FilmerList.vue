<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 影人管理</el-breadcrumb-item>
                <el-breadcrumb-item>影人列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="table">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">版权名称：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="rightName" placeholder=""></el-input>
                    </el-col>
                </el-col>


                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">类型：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="movieType" placeholder="电影类">
                            <el-option
                                    v-for="item in arr01"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                </el-col>
                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content">类别：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="cinemaType" placeholder="院线电影">
                            <el-option
                                    v-for="item in arr02"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">分类：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="types" placeholder="爱情">
                            <el-option
                                    v-for="item in arr03"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">

                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">所属：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="memberOf" placeholder="工作室">
                            <el-option
                                    v-for="item in menberOfList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">发布人：</div>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="puber" placeholder=" "></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="select">选择</el-button>
                    </el-col>
                </el-col>

            </el-row>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">观看量：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="watchNum" placeholder=""></el-input>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">收藏量：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="collectNum" placeholder=""></el-input>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">时长：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="times" placeholder=""></el-input>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary"  icon="search" @click="searchRight">搜索</el-button>
                </el-col>
            </el-row>
    </div>
                <div>
                        <el-button type="danger" @click="delAll">批量删除</el-button>
                        <el-button type="primary" @click="add">添加</el-button>
                </div>
        <br/>

        <el-table :data="bannerList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="影人id" width="150"></el-table-column>
            <el-table-column prop="title" label="圈层机构名称"  width="150"></el-table-column>
            <el-table-column prop="title" label="类型"  width="150"></el-table-column>
            <el-table-column prop="title" label="加入时间"  width="150"></el-table-column>
            <el-table-column prop="title" label="类别"  width="150"></el-table-column>
            <el-table-column prop="title" label="版权数量"  width="150"></el-table-column>
            <el-table-column prop="title" label="需求数量"  width="150"></el-table-column>
            <el-table-column prop="title" label="项目数量"  width="150"></el-table-column>
            <el-table-column prop="title" label="视频数量"  width="150"></el-table-column>
            <el-table-column prop="title" label="承接需求数量"  width="150"></el-table-column>
            <el-table-column prop="createDate" label="创建时间"  width="150"></el-table-column>
            <el-table-column label="操作"  width="150">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br/>

    </div>
</template>

<script>
  export default {
    components: {
     },
    data: function(){
      return {
        rightName:'',
        puber:'',
        watchNum:'',
        collectNum:'',
        times:'',
        movieType:'',
        cinemaType:'',
        types:'',
        arr01: [{
          value: 1,
          label: 'APP'
        }, {
          value: 2,
          label: 'WEB'
        }, {
          value: 3,
          label: '微信'
        }],
        arr02: [{
          value: 1,
          label: 'APP'
        }, {
          value: 2,
          label: 'WEB'
        }, {
          value: 3,
          label: '微信'
        }],
        arr03: [{
          value: 1,
          label: 'APP'
        }, {
          value: 2,
          label: 'WEB'
        }, {
          value: 3,
          label: '微信'
        }],
        memberOf:'',
        menberOfList: [{
          value: 1,
          label: '工作室'
        }, {
          value: 2,
          label: '影人'
        }, {
          value: 3,
          label: '圈层机构'
        }],



        url: './static/vuetable.json',
        tableData: [],
        cur_page: 1,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false,
        input:'',

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
      searchRight() {
        this.$message("根据条件搜索版权");
      },
      add() {
        const self = this;
        self.$router.push('/AddCopyright');
      },
        select(){
          const self = this;
          self.$router.push('/AddCopyright');
        },
      deleteSelect(){

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
        const self = this;
        self.$router.push('/AddCopyright');
      },
      handletihuan(index, row) {
        this.$message('替换'+(index+1)+'行');
      },
      handleDelete(index, row) {
        this.$message.error('删除第'+(index+1)+'行');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>
<style>
    .grid-content{margin-top: 8px}
    .rightname{
        margin-right: 10px;
    }
    .el-row{margin-bottom: 16px}
</style>