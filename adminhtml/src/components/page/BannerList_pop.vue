<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="table">

        <chooseuser :dialogFormVisible.sync="isdisplay" @selted="seltedMethod"></chooseuser>
        <choosevideo :dialogFormVisible.sync="isdisplayvideo" @selVideo="selVideo"></choosevideo>



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
        <el-table :data="bannerList" border style="width: 100%" ref="multipleTable"
                  @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="id" label="序号" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="title" label="标题" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="serverType" label="终端" :show-overflow-tooltip="true" :formatter="formatter">
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="操作" width="280">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleUp(scope.$index, scope.row)">上移
                    </el-button>
                    <el-button size="small"
                               @click="handleDown(scope.$index, scope.row)">下移
                    </el-button>
                    <el-button size="small"
                               @click="handleHidden(scope.$index, scope.row)">{{scope.row.state == 1 ? "隐藏" : "显示"}}
                    </el-button>
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="Banner添加/编辑" :visible.sync="dialogFormVisible" size="small">
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content ">筛选三端:</div>
                    </el-col>
                    <el-col :span="16"><el-select v-model="client" placeholder="选择三端">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select></el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content ">轮播图指向型:</div>
                    </el-col>
                    <el-col :span="16"><el-select v-model="bantype" placeholder="选择轮播指向类型">
                        <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select></el-col>
                </el-col>
                <el-col :span="4" v-if="bantype == 1">
                    <el-button type="primary" @click="showVideo">选择短视频</el-button>
                </el-col>
                <el-col :span="8" v-if="bantype == 1">
                    <el-input
                            placeholder="选中的短视频名称"
                            v-model="bannerVideoName"
                            :disabled="true">
                    </el-input>
                </el-col>
                <el-col :span="4" v-if="bantype == 2">
                    <el-button type="primary" @click="showChooseUser">选择工作室</el-button>
                </el-col>
                <el-col :span="8" v-if="bantype == 2">
                    <el-input
                            placeholder="选中的工作室名称"
                            v-model="bannerUserName"
                            :disabled="true">
                    </el-input>
                </el-col>
                <el-col :span="10" v-if="bantype == 3">
                    <el-input v-model="href" placeholder="请输入网页的链接地址" icon="edit"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-col :span="8">
                        <div class="grid-content ">BANNER标题:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="title" placeholder="BANNER标题" icon="edit"></el-input>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="15">
                <el-col :span="3" :offset="4">
                    <img v-bind:src="bgimgparent" style="width:150px;height:150px;" v-show="browerimg">
                </el-col>
                <el-col :span="8" :offset="4">
                    <editlist :bgimg='bgimgparent' v-on:uploadSuccess="childmsg"></editlist>
                </el-col>

            </el-row>
            <el-row :gutter="15">
                <el-col :span="8" :offset="4">
                    {{attention}}
                </el-col>
            </el-row>
            <el-button type="primary" @click="onSubmit" class="sv">保存</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
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
    import axios from 'axios';
    import editlist from './UploadFile.vue';
    import {Message} from 'element-ui';
    import chooseuser from '../common/ChooseUser.vue';
    import choosevideo from '../common/ChooseVideo.vue';



    export default {
        data() {
            return {
                bannerUserid : '',
                bannerUserName : '',
                bannerVideoId : '',
                bannerVideoName : '',
                category:'',
                attention : '',
                isdisplayvideo : false,
                isdisplay : false,
                bgimgparent : '',
                idEdit: false,
                moviename:'',
                browerimg : false,
                options: [{
                    value: 1,
                    label: 'APP发现页'
                }, {
                    value: 2,
                    label: 'WEB'
                }, {
                    value: 3,
                    label: '微信'
                }, {
                    value: 4,
                    label: 'APP需求页'
                }],
                client: '',
                options2: [{
                    value: 1,
                    label: '短视频'
                }, {
                    value: 2,
                    label: '工作室'
                }, {
                    value: 3,
                    label: 'web地址'
                },{
                    value: 4,
                    label: '需求列表页'
                },{
                    value: 5,
                    label: '发现页'
                }],
                bantype: '',
                href: '',
                objid: '',
                title: '',
                banname: '',
                id_edit: '',
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
                total_Count: 10,
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
                    value: 1,
                    label: 'APP发现页'
                }, {
                    value: 2,
                    label: 'WEB'
                }, {
                    value: 3,
                    label: '微信'
                },{
                    value: 4,
                    label: 'APP需求页'
                }],
                newvalue: '',
            }
        },

        watch : {
            client : {
                handler(newVal,oldVal){
                    if(newVal == 1){
                        this.attention = '建议上传图片尺寸为720*304';
                    }else if(newVal == 2){
                        this.attention = '暂不支持';
                    }else if(newVal == 3){
                        this.attention = '暂不支持';
                    }else if(newVal == 4){
                        this.attention = '建议上传图片尺寸为720*304';
                    }
                },
                deep:true
            }
        },
        components: {
            editlist,chooseuser,choosevideo
        },
        created(){
            this.getData();
        },
        methods: {
            formatter(row, column) {
                if(row.serverType == 1){
                    return "APP发现页";
                }else if(row.serverType == 2){
                    return "Web";
                }else if(row.serverType == 3){
                    return "微信";
                }else if(row.serverType == 4){
                    return "APP需求页";
                }else{
                    return "未知";
                }
            },
            showVideo(){
                this.isdisplayvideo = true;
            },
            selVideo(obj){
                this.bannerVideoId = obj.videoId;
                this.bannerVideoName = obj.videoName;
                this.isdisplayvideo = false;
            },

            workRoomid(){
                this.$router.push('/workRoomid')
            },
            shortVideo(){
                this.$router.push('/shortVideo')
            },
            getData(){
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
            search(){
                const self = this;
                axios.get(window.baseURL + 'admin/banners', {
                    // headers: {'X-XSRF-TOKEN': token},
                    params: {
                        serverType: this.select_cate, //1-APP  2-PC 3-wechat
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
            add(){
                const self = this;
                self.dialogFormVisible = true;
                self.idEdit = false;
                self.href = '';
                self.objid = '';
                self.title = '';
                self.client = '';
                self.bantype = '';
                self.bgimgparent = '';
                self.browerimg = false
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
//                var type = this.select_cate;
//                if (type != 1 && type != 2 && type != 3) {
//                    this.$message("请选择app、web、微信其中一个");
//                    return;
//                }
                const self = this;
                self.idEdit = true;
                self.dialogFormVisible = true;
                localStorage.setItem('bid', row.id);
                this.$axios({
                    method: 'get',
                    url: window.baseURL + 'admin/banners/' + row.id,
                    // headers: {'X-XSRF-TOKEN': token},
                })
                    .then((res) => {
                        let self = this;
                        self.bantype = res.data.body.type;
                        self.href = res.data.body.href;
                        self.client = res.data.body.serverType;
                        self.objid = (res.data.body.target == 0 ? null : res.data.body.target);
                        self.title = res.data.body.title;
                        self.bgimgparent =  res.data.body.domainImg;
                        self.browerimg = true;
                        self.banname = res.data.body.img;

                        if(self.bantype == 2){
                            self.bannerUserid = self.objid;
                        }
                        if(self.bantype == 1){
                            self.bannerVideoId = self.objid;
                        }
                    }).catch(err => {
                    this.$message('数据获取失败');
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            childmsg(data) {
                const self = this;
                self.banname = data.targetFileName;
                this.$message(data);
                this.bgimgparent =  window.basePic+data.targetFileName;
                this.browerimg = true;
            },
            showChooseUser(){
                this.isdisplay = true;
            },
            seltedMethod(obj){
                this.bannerUserid = obj.userId;
                this.bannerUserName = obj.userNickName;
                this.isdisplay = false;
            },
            formReset(){
                this.img = '';
                this.serverType = 1;
                this.href = '';
                this.state = 1;
                this.title = '';
                this.type = 1;
                this.target = '';
            },
            onSubmit() {
                const self = this;

                if(this.bantype == 2){
                    this.objid = this.bannerUserid;
                }
                if(this.bantype == 1){
                    this.objid = this.bannerVideoId;
                }


                if(null == this.banname || '' == this.banname){
                    this.$message("请首先上传图片");
                    return;
                }else if(null == this.bantype || '' == this.bantype){
                    this.$message("请选择您的指向类型");
                    return;
                }else if(this.bantype == 3 && (null == this.href || '' == this.href)){
                    this.$message("请输入您的指向地址");
                    return;
                }else if(null == this.title || '' == this.title){
                    this.$message("请输入您的标题");
                    return;
                }else if(this.bantype == 2 && (null == this.objid || '' == this.objid)){
                    this.$message("选择您的指向对象");
                    return;
                }else if(null == this.client || '' == this.client){
                    this.$message("请选择您的终端");
                    return;
                }




                if (self.idEdit) {
                    //编辑
                    let bid = localStorage.getItem('bid');
                    self.$axios({
                        method: 'PATCH',
                        url: window.baseURL + 'admin/banners',
                        // headers: {'X-XSRF-TOKEN': token},
                        params: {
                            img: self.banname,
                            href: self.href,
                            title: self.title,
                            type: self.bantype,
                            target: self.objid,
                            id: bid,
                            serverType : self.client
                        }
                    })
                        .then(function (response) {
                            const code = response.data.code;
                            if (code == 200) {
                                self.$message('修改成功！');
                                self.search();
                                self.formReset();
                                self.dialogFormVisible = false;
                            }
                        })
                        .catch(function (error) {
                          self.$message('修改失败！');
                        });
                } else {
                    //保存信息
                    this.$axios({
                        method: 'post',
                        url: window.baseURL + 'admin/banners',
                        // headers: {'X-XSRF-TOKEN': token},
                        params: {
                            img: this.banname,//上传图片的名字，通过childmsg获取
                            serverType: this.client,//轮播服务类型  1-APP  2-PC 3-WECHAT
                            href: this.href,
                            state: 1,//1在线 2 下线
                            title: this.title,
                            type: this.bantype,
                            target: this.objid
                        }
                    })
                        .then(function (response) {
                            const code = response.data.code;
                            if (code == 200) {
                                self.$message('添加成功！');
                                self.dialogFormVisible = false;
                                self.search();
                                self.formReset();
                            }
                        });
                }
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
    .el-row{margin-bottom: 10px}
    .grid-content{margin-top: 8px}
    .sv{margin-left: 100px;margin-right: 20px}
</style>