<template>
    <div class="table">
        <!--<chooseuser :dialogFormVisible.sync="isdisplay" @selted="seltedMethod"></chooseuser>-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-row :gutter="15">
                <el-col :span="8" >
                    <el-col :span="9">
                        <div class="grid-content form_label">活动名称：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="title"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="7" hidden = 'true'>
                    <el-col :span="9">
                        <div class="grid-content form_label">活动类型：</div>
                    </el-col>

                    <el-col :span="14">
                        <el-select v-model="type01" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="8" hidden = 'true'>
                    <el-col :span="8">
                        <el-select v-model="type02">
                            <el-option
                                    v-for="item in sortTypeLists"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="15">
                <el-col :span="8">
                    <el-col :span="9">
                        <div class="grid-content form_label">活动人数：</div>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="minNumber"></el-input>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="maxNumber"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col :span="5">
                        <div class="grid-content form_label">活动时间：</div>
                    </el-col>
                    <el-col :span="9">
                        <el-date-picker id="datatime"
                                        v-model="activitystartdata"
                                        type="datetime"
                                        placeholder="选择起始日期"
                                        @change="bootDateChange"
                                        :editable="false">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="8">
                        <el-date-picker id="datatime"
                                        v-model="activityenddata"
                                        type="datetime"
                                        placeholder="选择结束日期"
                                        @change="bootDateChange"
                                        :editable="false">
                        </el-date-picker>
                    </el-col>
                </el-col>

            </el-row>

            <el-row :gutter="15">
                <el-col :span="8">
                    <el-col :span="9">
                        <div class="grid-content form_label">活动发起人：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="search_username" placeholder="" disabled="true"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary"  @click="chooseuserlist">选择用户列表</el-button>
                    <chooseuser :dialogFormVisible.sync="isdisplayPub" @selted="seltedUserMethod"></chooseuser>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary"  @click="showaddwin">添加</el-button>
                </el-col>
            </el-row>


        </div>
        <el-table :data="activesList" border style="width:100%" ref="multipleTable"
                  @selection-change="handleSelectionChange" @cell-click="showList">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="activityId" label="项目ID" width="80">
            </el-table-column>
            <el-table-column prop="title" label="活动名称" :show-overflow-tooltip="true" width="100">
            </el-table-column>
            <el-table-column prop="initiator" label="发起人"  width="80" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column prop="createDate" label="发起时间" width="100" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="signPeople" label="报名人" :show-overflow-tooltip="true" width="100">
            </el-table-column>
            <el-table-column prop="scriptCount" label="类型" width="80" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="demandCount" label="类别" width="80" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="address" label="地点" width="80" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleHidden(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button size="small"
                               @click="showedit(scope.$index, scope.row)">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--弹窗modal-->
        <el-dialog title="活动添加/编辑" :visible.sync="dialogFormVisible" size="small">
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content form_label">发布人:</div>
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="add_username" placeholder="" disabled="true"></el-input>
                    </el-col>
                    <el-col :span="8" hidden="true">
                        <el-input v-model="add_userId"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button @click="chooseuserlist" type="primary">选择列表</el-button>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15" >
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content form_label">活动名称:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="add_title" placeholder="请输入活动名称"></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content form_label">活动时间:</div>
                    </el-col>
                    <el-col :span="8">
                        <el-date-picker
                                v-model="add_createDate"
                                type="datetimerange"
                                :picker-options="pickerOptions2"
                                placeholder="请选择时间范围"
                                align="right">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content form_label">{{dataF}}</div>
                    </el-col>

                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content form_label">活动地点:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="add_address" placeholder=""></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content form_label">活动人数:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="add_number" placeholder=""></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content form_label">活动描述:</div>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <!--<vue_editor v-model="add_detail" style="width:500px"></vue_editor>-->

                <vue_editor ref="myTextEditor" id="editarea"
                        :fileName="'myFile'"
                        :canCrop="canCrop"
                        :uploadUrl="uploadUrl"
                        v-model="add_detail">
                </vue_editor>

            </el-row><br/>
            <el-row :gutter="15" hidden='true'>
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content form_label">活动分类:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="addclassify" placeholder="选择分类">
                            <el-option
                                    v-for="item in arr01"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row><br/>
            <el-row :gutter="15" hidden='true'>
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content form_label">活动类型:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="addclassifytype">
                            <el-option
                                    v-for="item in types"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row><br/>

            <el-row :gutter="15">
                <el-col :span="4">
                    <div class="grid-content ">封面图：</div>
                </el-col>
                <el-col :span="4">
                    <div style="display:inline-block" v-show="isShow">
                        <img width="150px" height="150px" :src="fullimg" alt="">
                    </div>
                </el-col>
                <el-col :span="10">
                    <div>
                        <upload showtype="2" :title="title" v-on:uploadSuccess="videoCover"
                                style="width: 600px;height: 150px;overflow: hidden"></upload>
                    </div>
                </el-col>
            </el-row>
            <br/>
            <el-button type="img" @click="doadd" class="sv">完成</el-button>
        </el-dialog>



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

    import {Message} from 'element-ui';
    import axios from 'axios';
    import upload from './UploadFile.vue';
    import chooseuser from '../common/ChooseUser.vue';
    import vue_editor from './Quilleditor.vue';


    export default {
        data : function(){
            return {
              canCrop: false,
                /*测试上传图片的接口，返回结构为{url:''}*/
              uploadUrl: window.baseUploadImgUrl,
              dataF:'',
                add_username:"",
                search_username:"",
                search_userid : "",
                activitystartdata:"",
                activityenddata:"",
                minNumber:'',
                maxNumber:'',
                peoplestart:'',
                type01:'沙龙',
                type02:'免费',
                options:[{
                    value: 1,
                    label: '沙龙'
                },{
                    value: 2,
                    label: '看片会'
                },{
                    value: 3,
                    label: '路演'
                }
                ],
                sortTypeLists:[{
                    value: 1,
                    label: '免费'
                },{
                    value: 2,
                    label: '收费'
                }],
                isdisplayPub:false,
                dialogFormVisible : false,//添加编辑弹窗

                //活动编辑数据
                add_userId : '',
                add_title : '',
                add_createDate : '',
                add_address : '',
                add_number : '',
                add_detail : '',
                add_poster_img : '',
                fullimg:'',
                isShow:false,
                activesList : [],
                total_Count: 10,
                cur_page: 1,
                pageSize: 10,
                img:''
            };
        },

        created(){
            this.getData();
        },
        watch: {
            type01: {
                handler(newV, oldV) {
                    this.updateSort();
                },
            },
        },
        methods : {

            videoCover(data) {
                this.isShow = true;
                this.img = data.targetFileName;
                this.fullimg = window.basePic + data.targetFileName;
            },
            //=============================活动列表================================================//
            getData(){
                let self = this;
                let token = localStorage.getItem('token');
                self.url = window.baseURL + 'admin/activity/';
                var instance = axios.create({
                    headers: {'X-XSRF-TOKEN': token},
                });
                instance.get(self.url, {
                    params: {
                        page: self.cur_page,
                        size: self.pageSize
                    }
                })
                    .then((res) => {
                    console.log(res);
                        let self = this;
                        self.total_Count = res.data.body.total;
                        self.activesList = res.data.body.Actives;
                    })
            },
            //==============================================================================================//
            seltedUserMethod(obj){

                this.search_userid = obj.userId;
                this.search_username =  obj.userNickName
                this.add_username = obj.userNickName;
                this.add_userId = obj.userId;
                this.isdisplayPub = false;
            },
            seltedMethod(obj){
                this.bannerUserid = obj.userId;
                this.peoplestart = obj.userNickName;
                this.isdisplayPub = false;
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },

            search() {
                let params = {
                    page: this.cur_page,
                    size: this.pageSize,
                }
                if (this.title !== '') {
                    params['title'] = this.title;
                }
                if (this.minNumber !== '') {
                    params['minNumber'] = this.minNumber;
                }
                if (this.maxNumber !== '') {
                    params['maxNumber'] = this.maxNumber;
                }
                if (this.peoplestart !== '') {
                    params['initiator'] = this.peoplestart;
                }
                if (this.search_userid !== '') {
                    params['initiator'] = this.search_userid;
                }
                if (this.activitystartdata !== '') {
                    params['startDate'] = this.activitystartdata;
                }
                if (this.activityenddata !== '') {
                    params['endDate'] = this.activityenddata;
                }


                axios.get(window.baseURL + 'admin/activity/', {params})
                    .then(res => {
                        let self = this;
                        self.total_Count = res.data.body.total;
                        self.activesList = res.data.body.Actives;
                        length = self.activesList.length;
                    }).catch(err => {

                    this.$message('数据获取失败');
                });
            },

            bootDateChange(val) {
                this.search_createtime = val;
            },
            chooseuserlist() {
                self=this;
                self.isdisplayPub = true;
            },
            addlist(){
                self=this;
                self.dialogFormVisible = true;

            },
            seltedPubUser(user){
                this.demandPuberName = user.userNickName;
                this.demandPuber = user.userId;
                this.isdisplayPub = false;
            },
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
            showList(row, column, cell, event){
                const self = this;
                let uid = row.userId;
                let cond = column.label;
                switch (cond) {
                    case '版权数':
                        self.copyrightFormVisible = true;
                        let token = localStorage.getItem('token');
                        self.url = window.baseURL + 'admin/copyRight';
                        var instance = axios.create({
                            headers: {'X-XSRF-TOKEN': token},
                        });
                        instance.get(self.url, {
                            params: {
                                userId:uid,
                                page: this.cur_page01,
                                size: this.pageSize,
                            }
                        })
                            .then((res) => {
                                let self = this;
                                self.total_Count01 = res.data.body.total;
                                self.copyrightList = res.data.body.copyRights;
                                /*  for (var i = 0; i < self.copyrightList.length; i++) {
                                 var obj = self.copyrightList[i].userType;
                                 console.log(obj);
                                 }*/
                            })
                            .catch(err => {
                                this.$message('数据获取失败');
                            });
                        break;
                    case '需求数':
                        self.demandFormVisible = true;
                        let para =  {
                            demandPuber : uid,
                            curPage : this.cur_page02,
                            pageSize : this.pageSize,
                        };
                        axios({
                            method:'get',
                            url:window.baseURL+'admin/demands',
                            params:{
                                demandCondition:JSON.stringify(para)
                            }
                        }).then(res=>{
                            this.total_Count02 = res.data.body.count;
                            this.demandList = res.data.body.body;
                        }).catch(err =>{
                            console.log(JSON.stringify(err));
                        })
                        break;
                    case '项目数':
                        self.projectFormVisible = true;
                        axios({
                            methods:'get',
                            url:window.baseURL+'admin/project',
                            params:{
                                userId:uid,
                                page:this.cur_page03,
                                size: this.pageSize,
                            }
                        }).then(res=>{
                            this.tableList = res.data.body.projects;
                            this.total_Count03 = res.data.body.total;
                        }).catch(err=>{
                            this.$message('获取数据失败，请刷新');
                        });
                        break;
                    case '视频数':
                        self.videoFormVisible = true;

                        let params = {
                            userId:uid,
                            page: this.cur_page04,
                            size: this.pageSize,
                        }

                        axios.get(window.baseURL + 'admin/videos', {params})
                            .then(res => {

                                this.total_Count04 = res.data.body.total;
                                this.videoList = res.data.body.videos;

                            }).catch(err => {

                            this.$message('数据获取失败');
                        });

                        break;
                    case '承接数':
                        //self.receiveFormVisible = true;
                        this.$message(暂无列表);
                        break;
                }
            },

            cancleEdit() {
                this.add_name = '',
                    this.add_simpleintro = '',
                    this.add_fans = '',
                    this.add_attention = '',
                    this.add_displaytype = '',
                    this.img = '',
                    this.bgImgFull = '',
                    this.headImg = '',
                    this.bgimg = '',
                    this.groupName = '' ,
                    this.categoryName = '',
                    localStorage.setItem('cid', 0);
                this.dialogFormVisible=false;
            },
            showaddwin(){ //显示弹窗
                this.add_userId ='',
                this.add_username = '',
                this.type01_add = '';
                this.type02_add = '';
                this.add_userId = '';
                this.add_title = '';
                this.add_createDate = '';
                this.add_address = '';
                this.add_number = '';
                this.add_detail = '';
                this.add_poster_img = '';
                this.img = '';
                this.fullimg = '';

                this.dialogFormVisible = true;
                this.idEdit = false;//添加
            },
            showedit(index,row){
                this.dialogFormVisible = true;
                this.idEdit = true;//编辑
                localStorage.setItem('activityId', row.activityId);
                this.$axios({
                    method: 'get',
                    url: window.baseURL + 'admin/activity/' + row.activityId,
                    // headers: {'X-XSRF-TOKEN': token},
                })
                    .then((res) => {
                        console.log(res.data.body.activity);
                        this.add_username = res.data.body.activity.initiator;
                        this.add_title = res.data.body.activity.title;
                        this.add_address = res.data.body.activity.address;
                        this.add_number = res.data.body.activity.number;
                        this.add_detail = res.data.body.activity.detail;
                        this.isShow = true;
                        this.fullimg = window.basePic+res.data.body.activity.img;
                    }).catch(err => {
                    this.$message('数据获取失败');
                });
            },


            doadd(){
                const self = this;
                this.dialogFormVisible = false;
                if (self.idEdit) {
                    //编辑
                    let activityId = localStorage.getItem('activityId');

                    this.$axios({
                        method: 'PATCH',
                        url: window.baseURL + 'admin/activity/',
                        // headers: {'X-XSRF-TOKEN': token},
                        data: {
                            activityId :activityId,
                            userId:self.add_userId,
                            title:self.add_title,
                            startDate:this.add_createDate[0],
                            endDate:this.add_createDate[1],
                            address:this.add_address,
                            number:this.add_number,
                            detail:this.add_detail,
                            img:this.add_poster_img
                        }
                    }).then(function (response) {
                        const code = response.data.code;
                        if (code == 200) {
                            self.$message.success('修改成功！');
                            axios.get(window.baseURL + 'admin/activity/', {
                                params: {
                                }
                            }).then(function (response) {
                                const code = response.data.code;
                                if (code == 200) {
                                    self.total_Count = response.data.body.total;
                                    self.activesList = response.data.body.Actives;
                                    length = self.activesList.length;
                                }
                            })

                        } else {
                            this.$message('修改失败！');
                        }
                    })
                        .catch(function (error) {
                            this.$message('修改失败catch！');
                        });
                } else {
                    //保存信息

                    this.type01_add = '';
                    this.type02_add = '';
                    this.$axios({
                        method: 'POST',
                        url: window.baseURL + 'admin/activity/',
                        // headers: {'X-XSRF-TOKEN': token},
                        data: {
                            userId:self.add_userId,
                            title:self.add_title,
                            startDate:this.add_createDate[0],
                            endDate:this.add_createDate[1],
                            address:this.add_address,
                            number:this.add_number,
                            detail:this.add_detail,
                            img:this.img
                        }
                    })
                        .then(function (response) {
                            const code = response.data.code;
                            if (code == 200) {
                                self.$message.success('添加成功！');
                                axios.get(window.baseURL + 'admin/activity/', {
                                    // headers: {'X-XSRF-TOKEN': token},
                                    params: {
                                        page: self.cur_page,
                                        size: self.pageSize,
                                    }
                                })
                                    .then(function (response) {
                                        const code = response.data.code;
                                        if (code == 200) {
                                            self.total_Count = response.data.body.total;
                                            self.activesList = response.data.body.Actives;
                                            length = self.activesList.length;
                                        } else {
                                            this.$message("添加影人失败");
                                        }
                                    })
                            } else {
                                this.$message('添加失败！');
                            }
                        });
                }

            },
            handleEdit(index, row) {
                const self = this;
                localStorage.setItem('shadmanId', row.id);
                localStorage.setItem('shadmanIdFlag', true);
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            videoFileUrl(data) {
                const self = this;
                self.banname = data;
                this.bgimgparent =  window.basePic+data;

            },

            deletVideo( id,isAll){
                let delUrl = '';
                let params = {};
                const self = this;
                this.$confirm('此操作将删除本条信息', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios({
                        method: 'DELETE',
                        url: window.baseURL + 'admin/activity/' + id,
                        // headers: {'X-XSRF-TOKEN': token},
                    })
                        .then(function (response) {
                            const code = response.data.code;
                            if (code == 200) {
                                axios.get(window.baseURL + 'admin/activity/', {
                                    // headers: {'X-XSRF-TOKEN': token},
                                    params: {
                                    }
                                })
                                    .then(function (response) {
                                        console.log( response.data.body);
                                        const code = response.data.code;
                                        if (code == 200) {
                                            self.total_Count = response.data.body.total;
                                            self.activesList = response.data.body.Actives;
                                        }
                                    })
                            } else {
                                this.$message("隐藏失败");
                            }
                        });
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '已取消删除'
                    });
                });
            },
            handleHidden(index, row) {
              this.deletVideo(row.activityId,false);
            },

            updateCategory() {
                for (var i = 0; i < this.sortTypeList.length; i++) {
                    var obj = this.sortTypeList[i];
                    if (this.type02 == obj.id) {
                        this.categoryTypeList = obj.subs;
                        break;
                    }

                }
            },
        },
        components : {
            upload,chooseuser,vue_editor
        },


    }









</script>





<style scoped="">
    .el-row{margin-bottom: 10px}

    .form_label{
        margin-top:5px;
    }
    .sv{margin-left: 260px;margin-right: 30px;width:160px}
    #datatime{width:176px}
    .saveadd{margin-left: 250px;margin-right: 40px}
    .change{margin-left: 120px}
    #editarea{width:93%;margin-left: 8px}

</style>