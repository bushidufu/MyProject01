<template>
    <div class="table">



        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">选择用户</el-button>
        <chooseuser :dialogFormVisible.sync="isdisplay" @selted="seltedMethod"></chooseuser>


    </div>
</template>



<script>
    import chooseuser from '../common/ChooseUser.vue';
    export default {
        components: {
            chooseuser
        },
        data() {
            return {
                isdisplay : false
            }
        },
        methods: {
            delAll(){
                this.isdisplay = true;
            },
            seltedMethod(hh){
                //chooseuser.data().chooseUserId
                //chooseuser.data().chooseStudioId
                this.isdisplay = false;
            }
        }
    }
</script>