<template>
    <div>
        <div class="table">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content ">版权名称：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="input_name" placeholder="请输入版权名称" icon="edit"></el-input>
                    </el-col>

                </el-col>
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content ">版权介绍 ：</div>
                    </el-col>

                    <el-col :span="14">
                        <el-input v-model="input_intro" placeholder="请输入版权简介" icon="edit"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="9">
                        <div class="grid-content ">类型  ：</div>
                    </el-col>

                    <el-col :span="15">
                        <el-select v-model="type01" placeholder="全版权">
                            <el-option
                                    v-for="item in sellTypeList"
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
                        <div class="grid-content ">类别：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-select v-model="type02" placeholder="全版权">
                            <el-option
                                    v-for="item in sortTypeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content ">分类：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-select v-model="type03" placeholder="全版权">
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
                    <el-col :span="9">
                        <div class="grid-content " >发布人 ：</div>
                    </el-col>
                    <el-col :span="13">
                        <el-input v-model="input_puber"  placeholder="请选择发布人" disabled="disabled"></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="showChooseW" >选择</el-button>
                        <chooseuser :dialogFormVisible.sync="isdisplayWrite" @selted="selectChooseW"></chooseuser>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content ">出售类型：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-select v-model="sellType" placeholder="电视">
                            <el-option
                                    v-for="item in sellTypeList1"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-col :span="10">
                        <div class="grid-content ">价格：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="input_price" placeholder="请输入价格" icon="edit"></el-input>
                    </el-col>
                </el-col>
            </el-row>
        </div><br/>
        <div>
<el-row>
            <div class="grid-content ">版本阐述：</div>
</el-row>
            <vue_editor v-model="editorStr"></vue_editor>
        </div>
        <br/><br/><br/>
        <div>
            <div class="grid-content ">上传文件：</div>
            <img width="200px" :src="file_img" alt="" class="pic">
            <div style="width: 600px;height: 200px" class="pic">
                <upload showtype="3" v-on:uploadSuccess="rightFileUrl"></upload>
            </div>
        </div>
        <div>
            <div class="grid-content ">封面图：</div>
            <img width="200px" :src="cover_img" alt="" class="pic">
            <div style="width: 600px;height: 200px" class="pic">
                <upload showtype="3" v-on:uploadSuccess="coverUrl"></upload>
            </div>
        </div>
        <div>
            <div class="grid-content ">海报图：</div>
            <img width="200px" :src="poster_img" alt="" class="pic">
            <div style="width: 600px;height: 200px" class="pic">
                <upload showtype="3" v-on:uploadSuccess="posterUrl"></upload>
            </div>
        </div>
        <div class="butt">
            <el-button type="primary" @click="add" class="sub">提交</el-button>
            <el-button  @click="clearAll">重置</el-button>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import upload from './UploadFile.vue';
  import vue_editor from './Quilleditor.vue';
  import chooseuser from '../common/ChooseUser.vue';

  export default {
    components: {
      upload,
      vue_editor,
      chooseuser
    },
    data: function () {
      return {
          sellTypeList1:[],
        chooseWrite: [],//发布人选择
        isdisplayWrite : false,
        input_name: '',
        input_intro: '',
        input_price: '',
        input_puber: '',
        input_puberId: '',
        sellType: '',
        sellTypeList: [],
        sortTypeList: [],
        categoryTypeList: [],
        type01: '',
        type02: '',
        type03: '',
        editorStr: '',
        filePath: '',
        cover: '',
        poster: '',
        file_img: '',
        cover_img: '',
        poster_img: '',

      }
    },
    created(){
      this.getData();
      this.getCate();
    },
    methods: {
      getData(){
        let token = localStorage.getItem('token');
        let flag = localStorage.getItem('rightIdFlag');
        if (flag == 'false') {

        }else {
          let rid = localStorage.getItem('rightId');
          self.url = window.baseURL + 'admin/copyRight/' + rid;
          axios.get(self.url, {
            // headers: {'X-XSRF-TOKEN': token},
          })
            .then((res) => {
            console.log(res);
              let self = this;
              self.input_name = res.data.body.name;
              self.input_intro = res.data.body.intro;
              self.type01 = res.data.body.type;
              self.type02 = res.data.body.sort;
              self.type03 = res.data.body.category;
              self.input_puber = res.data.body.userName;//发布人名字
              self.userId = self.chooseWrite[0];//发布用户
              self.userType = self.chooseWrite[1];//所属类型（1：影人，2：工作室，3：圈层机构）
              self.sellType = res.data.body.sellType;
              self.input_price = res.data.body.price;
              self.editorStr = res.data.body.detail;
              if(res.data.body.filePath != ''){
                self.file_img = window.basePic + res.data.body.filePath;
              }
              if(res.data.body.cover != ''){
                self.cover_img = window.basePic + res.data.body.cover;
              }
              if(res.data.body.poster != ''){
                self.poster_img = window.basePic + res.data.body.poster;
              }
              console.log(res);
            })
        }
      },
      //选择用户
      showChooseW(){
        this.isdisplayWrite = true;
      },
      selectChooseW(user){
        console.log(user);
        this.chooseWrite.push(user.userId);
        this.chooseWrite.push(user.studioState);
        this.input_puber = user.userNickName;
        this.input_puberId = user.userId;
        this.isdisplayWrite = false;
      },
      rightFileUrl(data) {
        const self = this;
        self.filePath = data;
        self.file_img = window.basePic + data;
      },
      coverUrl(data) {
        const self = this;
        self.cover = data;
        self.cover_img = window.basePic + data;
      },
      posterUrl(data) {
        const self = this;
        self.poster = data;
        self.poster_img = window.basePic + data;
      },
      add() {
        let token = localStorage.getItem('token');

        const self = this;
        //true:编辑  false:添加
        let flag = localStorage.getItem('rightIdFlag');
        if (flag == 'true') {
          let rid = localStorage.getItem('rightId');
          this.$axios({
            method: 'PATCH',
            url: window.baseURL + 'admin/copyRight',
            headers: {'X-XSRF-TOKEN': token,
               'Content-Type': 'application/json'},
            data: {
              id: rid,
              name: self.input_name,
              intro: self.input_intro,
              type: self.type01,
              sort: self.type02,
              category: self.type03,
              userName:self.input_puber,//发布人名字
              userId: self.chooseWrite[0],//发布用户
              userType: self.chooseWrite[1],//所属类型（1：影人，2：工作室，3：圈层机构）
              sellType: self.sellType,//出售类别
              price: self.input_price,
              detail: self.editorStr,
              filePath: self.filePath,
              cover: self.cover,
              poster: self.poster,
            }
          })
            .then(function (response) {
              const code = response.data.code;
              console.log(response);
              if (code == 200) {
                self.$message('编辑成功！');
                self.$router.push('/CopyrightManage');

              } else {
                self.$message('编辑失败！');
              }
            })
            .catch(function (error) {
              self.$message('编辑失败catch！');
            });
        } else {
          //添加
          const self = this;
          let typeName = '';
          let sortName = '';
          let categoryName = '';
          for (var i = 0; i < self.sellTypeList.length; i++) {
            var obj = self.sellTypeList[i].id;
            if(obj == self.type01){
              typeName = self.sellTypeList[i].name;
            }
          }
          for (var i = 0; i < self.sortTypeList.length; i++) {
            var obj = self.sortTypeList[i].id;
            if(obj == self.type02){
              sortName = self.sortTypeList[i].name;
            }
          }
          for (var i = 0; i < self.categoryTypeList.length; i++) {
            var obj = self.categoryTypeList[i].id;
            if(obj == self.type03){
              categoryName = self.categoryTypeList[i].name;

            }
          }
          this.$axios({
            method: 'POST',
            url: window.baseURL + 'admin/copyRight',
            headers: {'X-XSRF-TOKEN': token,
              'Content-Type': 'application/json'},
            data: {
              name: self.input_name,
              intro: self.input_intro,
              type: self.type01,
              typeName:typeName,
              sort: self.type02,
              sortName:sortName,
              category: self.type03,
              categoryName:categoryName,
              userId: self.chooseWrite[0],//发布用户
              userName:self.input_puber,//发布人名字
              userType: self.chooseWrite[1],//所属类型（1：影人，2：工作室，3：圈层机构）
              sellType: self.sellType,//出售类别
              price: self.input_price,
              detail: self.editorStr,
              filePath: self.filePath,
              cover: self.cover,
              poster: self.poster,
              state:0//版权状态（0：正常，1：已删除）
            }
          })
            .then(function (response) {
              const code = response.data.code;
              console.log(response);
              if (code == 200) {
                self.$message.success('添加成功！');
                self.$router.push('/CopyrightManage');
              } else {
                self.$message('添加失败！');
              }
            })
            .catch(function (error) {
              self.$message('添加失败catch！');
            });
        }
       /* add()
        {
          // self.$router.push('/AddCopyright');
          const self = this;
          this.$axios({
            method: 'post',
            url: window.baseURL + 'admin/copyRight',
            // headers: {'X-XSRF-TOKEN': token},
            params: {
              name: self.input_name,
              intro: self.input_intro,
              type: self.type01,
              sort: self.type02,
              category: self.type03,
              userId: self.chooseWrite[0],//发布用户
              userType: self.chooseWrite[1],//所属类型（1：影人，2：工作室，3：圈层机构）
              sellType: self.sellType,//出售类别
              price: self.input_price,
              detail: self.editorStr,
              filePath: self.filePath,
              cover: self.cover,
              poster: self.poster,
              state: 0,//版权状态（0：正常，1：已删除）
            }
          })
            .then(function (response) {
              const code = response.data.code;
              if (code == 200) {
                self.$message('添加成功！');
                self.$router.push('/CopyrightManage');

              } else {
                self.$message('添加失败！');
              }
            })
            .catch(function (error) {
              self.$message('添加失败catch！');
            });
        }*/
      },
      clearAll(){

      },

      clearAll(){

      },

      select(){
        const self = this;
        self.$router.push('/CopyrightManage');
      },

      handleCurrentChange(val){
        this.cur_page = val;
        this.getData();
      },

      search(){
        this.is_search = true;
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


        /*formatter(row, column) {
         return row.address;
         },*/
        /* filterTag(value, row) {
         return row.tag === value;
         },*/
        /* handleSelectionChange(val) {
         this.multipleSelection = val;
         }*/


    },

    computed: {
      data(){
        const self = this;
        return self.tableData.filter(function (d) {
          let is_del = false;
          for (let i = 0; i < self.del_list.length; i++) {
            if (d.name === self.del_list[i].name) {
              is_del = true;
              break;
            }
          }
          if (!is_del) {
            if (d.address.indexOf(self.select_cate) > -1 &&
              (d.name.indexOf(self.select_word) > -1 ||
              d.address.indexOf(self.select_word) > -1)
            ) {
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
  }
</script>
<style scoped>
    .grid-content{margin-top: 8px}
    .el-row{margin-bottom: 10px}
    .pic{margin-left: 120px}
.butt{margin-left: 100px}
    .sub{margin-left: 60px;margin-right: 20px}
</style>