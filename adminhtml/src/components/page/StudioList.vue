<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 工作室列表页面</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="table">
            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">工作室名称：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="studioName" placeholder=""></el-input>
                </el-col>
            </el-col>


                <div class="grid-content ">
                    类型：
                <el-select v-model="form.region" placeholder="工作室">
                    <el-option key="bbk" label="工作室" value="bbk"></el-option>
                    <el-option key="xtc" label="圈层机构" value="xtc"></el-option>
                </el-select>

                    类别：
                    <el-select v-model="form.region" placeholder="工作室">
                        <el-option key="bbk" label="工作室" value="bbk"></el-option>
                        <el-option key="xtc" label="圈层机构" value="xtc"></el-option>
                    </el-select>

                    通过时间：
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </div>
            <br/>

            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">需求数量：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="studioName" placeholder="" class="rightname"></el-input>
                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">过往作品数量：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="studioName" placeholder="" class="rightname"></el-input>
                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">短视频数量：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="studioName" placeholder="" class="rightname"></el-input>
                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">承接数量：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="studioName" placeholder="" class="rightname"></el-input>
                </el-col>
            </el-col>
            <br/> <br/> <br/>

         <el-col :span="6">
                <el-col :span="8">
                    <div class="grid-content ">版权数量：</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="rightNum" placeholder=""></el-input>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-button type="primary"  icon="search" @click="searchRight">搜索</el-button>
            </el-col>
            <br/> <br/>
        <div>
            <el-button type="primary" icon="add" @click="add">添加</el-button>
        </div>
            <br/>

        </div>
        <el-table :data="studioList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="id" label="工作室id" width="150"></el-table-column>
            <el-table-column prop="title" label="工作室名称"  width="150"></el-table-column>
            <el-table-column prop="title" label="类型"  width="150"></el-table-column>
            <el-table-column prop="title" label="加入时间"  width="150"></el-table-column>
            <el-table-column prop="title" label="类别"  width="150"></el-table-column>
            <el-table-column prop="title" label="版权数量"  width="150"></el-table-column>
            <el-table-column prop="title" label="需求数量"  width="150"></el-table-column>
            <el-table-column prop="title" label="项目数量"  width="150"></el-table-column>
            <el-table-column prop="title" label="视频数量"  width="150"></el-table-column>
            <el-table-column prop="title" label="承接需求数量"  width="150"></el-table-column>
            <el-table-column prop="createDate" label="创建时间"  width="150" show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="操作"  width="150">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        value1: '',
        studioName:'',
        dialogTableVisible: false,
        formLabelWidth: '120px',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        total_Count: '10',
        studioList: [],
        cur_page: 1,
        pageSize: 10,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false,
        is_add: false,
        newoptions: [{
          value: '1',
          label: 'APP'
        }, {
          value: '2',
          label: 'WEB'
        }, {
          value: '3',
          label: '微信'
        }],
        newvalue: '',
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(){
        let token = localStorage.getItem('token');
        self.url = window.baseURL + 'admin/v1/user';
        var instance = axios.create({
          headers: {'X-XSRF-TOKEN': token},
        });
        instance.get(self.url, {
          params: {
            type:2,//1影人2工作室3圈层机构
            page: this.cur_page,
            size: this.pageSize,
          }
        })
          .then((res) => {
            let self = this;
            self.total_Count = res.data.body.total;
            self.userList = res.data.body.users;
          })
      },
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getData(val);
      },
      search() {
        var type = this.select_cate;
        const self = this;
        axios.get(window.baseURL + 'admin/banners', {
          // headers: {'X-XSRF-TOKEN': token},
          params: {
            serverType: type, //1-APP  2-PC 3-wechat
            page: this.cur_page,
            size: this.pageSize,
          }
        })
          .then(function (response) {
            const code = response.data.code;
            console.log(JSON.stringify(response.data.body.banners));
            if (code == 200) {
              console.log(code);
              self.total_Count = response.data.body.total;
              self.studioList = response.data.body.users;
            } else {
              this.$message("搜索失败");
            }
          })
      },
      add() {
        const self = this;
        self.$router.push('/AddStudio');
      },
      handleUp(index, row) {
        var type = this.select_cate;
        if (type != 1 && type != 2 && type != 3) {
          this.$message("请选择app、web、微信其中一个");
          return;
        }
        const self = this;
        var bid = JSON.stringify(row.id);
        let sort = JSON.stringify(self.bannerList[index - 1].sort);
        axios({
          method: 'PATCH',
          url: window.baseURL + 'admin/banners/move',
          // headers: {'X-XSRF-TOKEN': token},
          params: {
            id: bid,
            serverType: type,
            sort: sort,
          }
        })
          .then(function (response) {
            const code = response.data.code;
            console.log(JSON.stringify(response));
            if (code == 200) {
              axios.get(window.baseURL + 'admin/banners', {
                // headers: {'X-XSRF-TOKEN': token},
                params: {
                  serverType: type, //1-APP  2-PC 3-wechat
                }
              })
                .then(function (response) {
                  const code = response.data.code;
                  console.log(JSON.stringify(response.data.body.banners));
                  if (code == 200) {
                    console.log(code + "up()");
                    self.bannerList = response.data.body.banners;
                  } else {
                    this.$message("刷新数据失败");
                  }
                })
            } else {
              this.$message("上移失败");
            }
          });
      },
      handleDown(index, row) {
        var type = this.select_cate;
        if (type != 1 && type != 2 && type != 3) {
          this.$message("请选择app、web、微信其中一个");
          return;
        }
        const self = this;
        var bid = JSON.stringify(row.id);
        let sort = JSON.stringify(self.bannerList[index + 1].sort);
        axios({
          method: 'PATCH',
          url: window.baseURL + 'admin/banners/move',
          // headers: {'X-XSRF-TOKEN': token},
          params: {
            id: bid,
            serverType: type,
            sort: sort,
          }
        })
          .then(function (response) {
            const code = response.data.code;
            console.log(JSON.stringify(response));
            if (code == 200) {
              axios.get(window.baseURL + 'admin/banners', {
                // headers: {'X-XSRF-TOKEN': token},
                params: {
                  serverType: type, //1-APP  2-PC 3-wechat
                }
              })
                .then(function (response) {
                  const code = response.data.code;
                  console.log(JSON.stringify(response.data.body.banners));
                  if (code == 200) {
                    console.log(code + "search()");
                    self.bannerList = response.data.body.banners;
                  } else {
                    this.$message("刷新数据失败");
                  }
                })
            } else {
              this.$message("下移失败");
            }
          });
      },
      handleHidden(index, row) {
        var type = this.select_cate;
        if (type != 1 && type != 2 && type != 3) {
          this.$message("请选择app、web、微信其中一个");
          return;
        }
        const self = this;
        var bid = JSON.stringify(row.id);
        var bstate = self.bannerList[index].state;  //1在线 2 下线
        if (bstate == 1) {
          bstate = 2;
        } else {
          bstate = 1;
        }
        axios({
          method: 'PATCH',
          url: window.baseURL + 'admin/banners/check',
          // headers: {'X-XSRF-TOKEN': token},
          params: {
            id: bid,
            state: bstate,
          }

        })
          .then(function (response) {
            const code = response.data.code;
            if (code == 200) {
              self.bannerList[index].state = bstate;
            } else {
              this.$message("隐藏失败");
            }
          });
      },
      handleEdit(index, row) {
        const self = this;
        localStorage.setItem('bid', row.id);
        self.$router.push('/AddStudio');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>

    .grid-content{margin-top: 8px}
    .rightname{
        margin-right: 10px;
    }



    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>