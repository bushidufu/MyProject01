<template>
    <div>
        <el-dialog title="用户选择" size="small"  :before-close="closewin" :visible.sync="dialogFormVisible">
            <div class="table">
                <div class="handle-box">
                    <el-select v-model="select_cate" placeholder="选择类型" class="handle-select mr10">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-input
                            placeholder="输入名称"
                            icon="search"
                            v-model="searchname"
                            :on-icon-click="startsearch"
                            class="handle-select"
                    >
                    </el-input>
                </div>
                <el-table :data="userList" border style="width: 100%" ref="multipleTable">
                    <el-table-column prop="userNickName" label="影人昵称" width="150" show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="studioName" label="机构名称"  show-overflow-tooltip="true"  width="150">
                    </el-table-column>
                    <el-table-column prop="createDate" label="创建时间"  show-overflow-tooltip="true" width="150">
                    </el-table-column>
                    <el-table-column prop="studioState" label="类别" :formatter="formatter" width="65" show-overflow-tooltip="true" >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small"
                                       @click="handleUp(scope.$index, scope.row)">选择</el-button>
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
                <div slot="footer" class="dialog-footer" style="float:right;margin-top:-14px;">
                    <el-button @click="closewin">取 消</el-button>
                </div>
                <br/>
            </div>
        </el-dialog>
    </div>
</template>


<script>
  import {Message} from 'element-ui';
  import axios from 'axios';

  export default {
    data(){
      return {
        options : [
          {
            value: 1,
            label: '影人'
          },
          {
            value: 2,
            label: '工作室'
          },
          {
            value: 3,
            label: '圈层机构'
          }
        ],
        select_cate : '',
        searchname : '',
        userList : [],
        total_Count: 10,
        cur_page: 1,
        pageSize: 10,
        chooseUserId : '',
        chooseStudioId : '',
        isShowClose : false,
        categoryName : '',
        studioName : '',
      }
    },
    props: ['dialogFormVisible'],
    methods : {
      formatter(row,column){
        if(row.studioState == 1){
          return "影人"
        }else if(row.studioState == 2){
          return "工作室"
        }else if(row.studioState == 3){
          return "圈层机构"
        }else{
          return "未知类别"
        }
      },
      startsearch(){
        var category = this.select_cate;
        var searchname = this.searchname;
        const self = this;

        if('' == category){
          category = 0;
        }

        axios.post(window.baseURL + 'v2/studio/studiochoose', {
          start : this.cur_page,
          size : this.pageSize,
          searchname : searchname,
          category : category
        })
          .then(function (response) {
            const code = response.data.code;
            if (code == 200) {
              self.userList = response.data.body.userlist
              self.total_Count = response.data.body.count
            } else {
              this.$message("搜索失败");
            }
          })
      },
      handleCurrentChange(val) {
        this.cur_page = val;
        this.startsearch();
      },
      handleUp(index,row){
        var obj = {
          'userId' : row.userId,
          'studioId' : row.studioId,
          'categoryName' : row.categoryName,
          'studioName' : row.studioName,
          'userNickName' : row.userNickName,
          'studioState' : row.studioState
        }
        this.$emit('selted',obj);
      },

      closewin(obj){
        this.$emit('selted',false);
      },

    }
  }

</script>


<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 200px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

</style>