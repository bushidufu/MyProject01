


<template>
    <div>
        <el-dialog title="内容查看" size="small" :before-close="closewin" :visible.sync="dialogFormVisible">
            <div v-if="userList.length==0">
                <h4>数据为空,请检查</h4>
            </div>
            <div v-else="">
                <div v-for="(item, index) in userList">
                    <el-tag v-for="tag in item" class="table_bq"
                            :key="tag[key]"
                            :closable="true"
                            @close="handleClose(tag)">
                        {{tag[key]}}
                    </el-tag>
                </div>
            </div>

            <div slot="footer" class="dialog-footer" style="float:right;margin-top:-14px;">
                <el-button @click="closewin">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
  import {Message} from 'element-ui';

  export default {
    data() {
      return {
        chooseUserId: '',
        key:this.keyName,
      }
    },
    props:{
      needShowUserArr:{default:[],type:Array},
      dialogFormVisible:{default:false,type:Boolean},
      linelength:{ default:6,type:Number},
      keyName:{default:'name',type:String}
      },
    methods: {

      closewin() {
        this.$emit('selted', false);
      },
      handleClose(tag){

        this.$emit('delUeritem',tag);

      }

    },
    computed:{
      userList:function(){

        let Arr = this.$lodash.chunk(this.needShowUserArr,this.linelength);
        return Arr;
      }
    }
  }

</script>


<style scoped>
.table_bq{margin-right: 10px;margin-bottom: 10px}
</style>