<template>
    <div class="table">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="showVideo">选择视频</el-button>
        <choosevideo :dialogFormVisible.sync="isdisplayvideo" @selVideo="selVideo"></choosevideo>
    </div>
</template>



<script>
    import choosevideo from '../common/ChooseVideo.vue';
    export default {
        components: {
            choosevideo
        },
        data() {
            return {
                isdisplayvideo : false
            }
        },
        methods: {
            showVideo(){
                this.isdisplayvideo = true;
            },
            selVideo(hh){
                //chooseuser.data().chooseUserId
                //chooseuser.data().chooseStudioId
                this.isdisplayvideo = false;
            }
        }
    }
</script>