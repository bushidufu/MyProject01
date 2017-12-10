<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 版权</el-breadcrumb-item>
                <el-breadcrumb-item>版权管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="table">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content ">版权名称：</div>
                    </el-col>

                    <el-col :span="14">
                        <el-input v-model="rightName" placeholder=""></el-input>
                    </el-col>
                </el-col>


                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">类型：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="type01" placeholder="请选择..">
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
                        <div class="grid-content">类别：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="type02" placeholder="请选择..">
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
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content ">分类：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-select v-model="type03" placeholder="请选择..">
                            <el-option
                                    v-for="item in categoryTypeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="8">
                        <div class="grid-content ">所属：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="memberOf" placeholder="选择工作室">
                            <el-option
                                    v-for="item in menberOfList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="6">
                        <div class="grid-content ">发布人：</div>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="puber" placeholder=" " disabled="disabled"></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="showChooseW">选择</el-button>
                        <chooseuser :dialogFormVisible.sync="isdisplayWrite" @selted="selectChooseW"></chooseuser>
                    </el-col>
                </el-col>

            </el-row>
            <el-row :gutter="15">
                <el-col :span="6" style="float:right;">
                    <el-button type="primary"  icon="search" @click="searchRight">搜索</el-button>
                    <el-button type="primary" @click="add">添加</el-button>
                </el-col>
            </el-row>
    </div><br/>

                    <el-row id="det" >
                        <el-col>
                        <el-button type="danger" @click="delAll" style="display:none;">批量删除</el-button>
                        </el-col>
                    </el-row>

        <el-table :data="copyrightList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection"  width="55"></el-table-column>-->
            <el-table-column prop="id" label="视频ID"></el-table-column>
            <el-table-column prop="name" label="版权名称" :show-overflow-tooltip="true"  width="95"></el-table-column>
            <el-table-column prop="userType" label="所属" :formatter="formatter"></el-table-column>
            <el-table-column prop="typeName" label="类型"></el-table-column>
            <el-table-column prop="sortName" label="类别"></el-table-column>
            <el-table-column prop="categoryName" label="分类"></el-table-column>
            <el-table-column prop="sellType" label="出售类别"></el-table-column>

            <el-table-column prop="userName" label="发布人"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column label="操作"  >
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!--<el-button size="small" type="danger"-->
                               <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="total_Count">
            </el-pagination>
        </div>

        <br/>

    </div>
</template>

<script>
  import axios from 'axios';
  import chooseuser from '../common/ChooseUser.vue';

  export default {
    components: {
      chooseuser
     },
    data: function(){
      return {
        sellTypeList: [],
        sortTypeList: [],
        categoryTypeList: [],
        type01: '',
        type02: '',
        type03: '',
        watchNum:'',
        colNum:'',
        times:'',
        pubTypeName:'',
        chooseWrite: [],//发布人选择
        isdisplayWrite : false,
        copyrightList:[],
        rightName:'',
        puber:'',
        watchNum:'',
        collectNum:'',
        times:'',
        movieType:'',
        cinemaType:'',
        types:'',
        memberOf:'',
        menberOfList: [{
          value: 1,
          label: '影人'
        }, {
          value: 2,
          label: '工作室'
        }, {
          value: 3,
          label: '圈层机构'
        }],
       // url: './static/vuetable.json',
        tableData: [],
        total_Count: 10,
        cur_page: 1,
        pageSize:10,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false,
        input:'',

      }
    },
    created(){
      this.getData();
      this.getCate();
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
    watch: {

      type01: {
        handler(newV, oldV) {
          this.updateSort();
          this.updateCategory();
        }
      },
      type02: {
        handler(newV, oldV) {
          this.updateCategory();

        }
      },

    },
    methods: {
      formatter(row,column){
        if(row.userType == 1){
          return "影人"
        }else if(row.userType == 2){
          return "工作室"
        }else if(row.userType == 3){
          return "圈层机构"
        }else{
          return "未知类别"
        }
      },
      //选择用户
      showChooseW(){
        this.isdisplayWrite = true;
      },
      selectChooseW(user){
        this.chooseWrite.push(user.userId);
        this.puber = user.userNickName;
        this.isdisplayWrite = false;
      },
      getData() {
        let token = localStorage.getItem('token');
        self.url = window.baseURL + 'admin/copyRight';
        var instance = axios.create({
          headers: {'X-XSRF-TOKEN': token},
        });
        instance.get(self.url, {
          params: {
            page: this.cur_page,
            size: this.pageSize,
          }
        })
          .then((res) => {
            let self = this;
            self.total_Count = res.data.body.total;
            self.copyrightList = res.data.body.copyRights;
            for (var i = 0; i < self.copyrightList.length; i++) {
              var obj = self.copyrightList[i].userType;
              console.log(obj);
            }
          })
          .catch(err => {
          this.$message('数据获取失败');
        });
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
      searchRight() {
        const self = this;
        this.$axios({
          method:'GET',
          url:window.baseURL + 'admin/copyRight',
          // headers: {'X-XSRF-TOKEN': token},
          params: {
            name:self.rightName,
            userId: self.chooseWrite[0],
            type:self.type01,
            sort:self.type02,
        category:self.type03,
            userType:self.memberOf,
            page: this.cur_page,
            size: this.pageSize,
          }
        })
          .then(function (response) {
            console.log(response);
            const code = response.data.code;
            if(code == 200){
              self.copyrightList = response.data.body.copyRights;
            }else {
              this.$message('搜索失败！');
            }
          })
      },
      add() {
        const self = this;
        localStorage.setItem('rightIdFlag', false);
        self.$router.push('/AddCopyright');
      },
        select(){
          const self = this;
          self.$router.push('/AddCopyright');
        },
      handleCurrentChange(val){
        this.cur_page = val;
        this.getData();
      },
      search(){
        this.is_search = true;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleEdit(index, row) {
        const self = this;
        localStorage.setItem('rightId', row.id);
        localStorage.setItem('rightIdFlag', true);
        self.$router.push('/AddCopyright');
      },
      //删除某一行记录
      handleDelete(index, row) {
        const self = this;
        this.$axios({
          method:'DELETE',
          url:window.baseURL+'admin/copyRight/' + row.id,
          // headers: {'X-XSRF-TOKEN': token},
        })
          .then(function (response) {
            const code = response.data.code;
            if(code == 200){
              this.$message('删除成功！');
              self.$router.push('/CopyrightManage');

            }else {
              this.$message('删除失败！');
            }
          })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分类联动
      updateSort() {

        for (var i = 0; i < this.sellTypeList.length; i++) {
          var obj = this.sellTypeList[i];
          if (this.type01 == obj.id) {
            this.sortTypeList = obj.subs;
            this.categoryTypeList = obj.subs[0].subs;
            this.type02 = this.sortTypeList[0].id;
            this.type03 = this.categoryTypeList[0].id;
            break;
          }
        }
      },
      updateCategory() {

        for (var i = 0; i < this.sortTypeList.length; i++) {
          var obj = this.sortTypeList[i];
          if (this.type02 == obj.id) {
            this.categoryTypeList = obj.subs;
            this.type03 = this.categoryTypeList[0].id;
            break;
          }

        }
      },

      getCate(){

        axios({
          method:'get',
          url:window.baseURL + 'admin/category',
          params:{
            code:'PROJECT_TYPE',
          }
        }).then(res =>{
          let dataArr = res.data.body;

          let array2 = [];
          let array1 = [];
          let tempObj = {};
          let tempObj2 = {};

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
              array2.push(obj);

            }else if (obj.level == 3){

              let str =  'pId'+obj.parentId;
              if(this.$lodash.isEmpty(tempObj[str])){
                tempObj[str]=[obj];
              }else {
                tempObj[str].push(obj);
              }
            }
          }

          for (var i = 0; i < array2.length; i++) {
            var obj = array2[i];
            let str =  'pId'+obj.id;
            obj.subs = tempObj[str];

          }

          for (var i = 0; i < array2.length; i++) {
            var obj = array2[i];

            let str =  'pId'+obj.parentId;

            if(this.$lodash.isEmpty(tempObj2[str])){
              tempObj2[str]=[obj];
            }else {
              tempObj2[str].push(obj);
            }
          }

          for (var i = 0; i < array1.length; i++) {
            var obj = array1[i];
            let str =  'pId'+obj.id;
            obj.subs = tempObj2[str];
          }

          this.sellTypeList = array1;

        }).catch(err =>{

        })
      },
    }
  }
</script>
<style scoped="">
    .grid-content{margin-top: 8px}
    .el-row{margin-bottom: 10px}
    #det{margin-bottom: 0}
</style>