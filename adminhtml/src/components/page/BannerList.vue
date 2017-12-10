<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 首页轮播图设计</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="select_cate" placeholder="筛选三端" class="handle-select mr10">
                <el-option
                        v-for="item in newoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>

        <el-button type="primary" icon="add" @click="add">添加</el-button>

        </div>
        <el-table :data="bannerList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="序号" width="150">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" >
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleUp(scope.$index, scope.row)">上移</el-button>
                    <el-button size="small"
                               @click="handleDown(scope.$index, scope.row)">下移</el-button>
                    <el-button size="small"
                               @click="handleHidden(scope.$index, scope.row)">{{scope.row.state == 1 ? "隐藏" : "显示"}}</el-button>
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        bannerList: [],
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
      getData() {
        let token = localStorage.getItem('token');
        self.url = window.baseURL + 'admin/banners';
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
            self.bannerList = res.data.body.banners;
            length = self.bannerList.length;
            for (let i = 0; i < length; i++) {
              // this.$message(self.bannerList[i].state);
              var state = self.bannerList[i].state;
            }
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
              self.bannerList = response.data.body.banners;
            } else {
              this.$message("搜索失败");
            }
          })
      },
      add() {
        const self = this;
        self.$router.push('/banner_add');
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
        self.$router.push('/banner_add');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>
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