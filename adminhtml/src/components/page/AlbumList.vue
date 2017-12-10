<template>
    <div>

        <el-row :gutter="15">
            <el-col :span="4">
                <el-input :disabled="true" v-model="pubUserName" placeholder="请选择发布人"></el-input>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" class="handle-del mr10" @click="showPubUser">选择发布人</el-button>
                <chooseuser :dialogFormVisible.sync="isdisplayPubUser" @selted="seltedPubUser"></chooseuser>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" class="handle-del mr10" @click="searchAlbum">搜索</el-button>
            </el-col>
        </el-row>
        <br/>
        <el-row :gutter="15">
            <el-col :span="24">
                <editlist showtype="5" :files="albumlist" :showSuccList=true v-on:uploadSuccess="childmsg"  v-on:removesuc="removesuc" v-on:toppic="recAlbum"></editlist>
            </el-col>
        </el-row>
    </div>







</template>

<script>
    import axios from 'axios';
    import editlist from './UploadFile.vue'
    import {Message} from 'element-ui';
    import chooseuser from '../common/ChooseUser.vue';



    export default{
        data(){
            return {
                albumlist : [],
                isdisplayPubUser : false,
                pubUserName : '',
                pubUserId : '',
                recid : ''
            }
        },
        components: {
            editlist,chooseuser
        },
        methods : {
            childmsg(data) {
                var banname = data.targetFileName;
                var width = data.width;
                var height = data.height;

                let lookpath = window.basePic+banname;
                this.albumlist.push(lookpath);

                this.recid = data;
                this.$message('上传成功!');
                let self = this;
                axios({
                    method: 'POST',
                    url: window.baseURL + 'admin/album',
                    params: {
                        width: this.width,
                        height: this.height,
                        img : banname,
                        userId : this.pubUserId
                    }
                })
                    .then(function (response) {
                        const code = response.data.code;
                        if (code == 200) {
                            self.searchAlbum();
                        } else {
                            self.$message("上传失败");
                        }
                    });
            },
            loadImg(){

            },
            showPubUser() {
                this.isdisplayPubUser = true;
            },
            seltedPubUser(user) {
                this.pubUserName = user.userNickName;
                this.pubUserId = user.userId;
                this.isdisplayPubUser = false;
            },
            searchAlbum(){ //搜索相册
                var len = this.albumlist.length;
                this.albumlist.splice(0,len);

                let self = this;
                if('' == this.pubUserId){
                    this.$message('请锁定查询的相册用户!');
                    return;
                }
                axios.get(window.baseURL + 'admin/album', {
                    params: {
                        userId: this.pubUserId
                    }
                })
                    .then(function (response) {
                        const code = response.data.code;
                        console.log(JSON.stringify(response.data.body.banners));
                        if (code == 200) {
                            var curlist = response.data.body;
                            if(curlist.length == 0){
                                self.$message("暂无图片，请添加相册");
                                return;
                            }
                            for(var i in curlist){
                               var curobj = curlist[i]
                                self.albumlist.push({name : curobj.albumId,url : curobj.img});
                            }
                        } else {
                            self.$message("搜索失败");
                        }
                    })
            },
            removesuc(remid){       //删除图片
                        let self = this;
                        axios({
                            method: 'DELETE',
                            url: window.baseURL + 'admin/album/'+remid,
                            params: {
                                id: remid
                            }
                        })
                            .then(function (response) {
                                const code = response.data.code;
                                if (code == 200) {
                                    self.$message("删除成功");
                                } else {
                                    self.$message("删除失败");
                                }
                            });
            },
            recAlbum(data){  //推荐
                this.recid = data;
                this.$message('推荐成功!');
                let self = this;
                axios({
                    method: 'PATCH',
                    url: window.baseURL + 'admin/album/isrecommend',
                    params: {
                        id: this.recid,
                        recommend: 1
                    }
                })
                    .then(function (response) {
                        const code = response.data.code;
                        if (code == 200) {
                            self.$message("推荐成功");
                        } else {
                            self.$message("推荐失败");
                        }
                    });
            }
        },
        created : {

        }
    }





</script>


<style scoped>
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        margin-top: 10px;
    }
    .wj{margin-top: 80px}
    .but{margin-top: 20px}
</style>
