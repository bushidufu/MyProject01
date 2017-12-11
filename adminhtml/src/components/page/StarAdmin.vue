<template>

    <div class="table">
        <!--面包屑导航-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>影人列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--input 搜索 添加区域-->
        <div>
            <el-row :gutter="15">
                <!--第一行-->
                <el-col :span="20">
                    <el-row :gutter="15">
                        <!--关键字input-->
                        <el-col :span="3">
                            <div class="grid-content form_label">关键字</div>
                        </el-col>
                        <el-col :span="9">
                            <el-input v-model="input" placeholder="ID，手机号码，邮箱，工作室名称，申请人姓名"></el-input>
                        </el-col>
                        <!--用户类型及状态-->
                        <el-col :span="6">
                            <el-col :span="6">
                                <div class="grid-content form_label">职业</div>
                            </el-col>
                            <el-col :span="18">
                                <el-select v-model="value" placeholder="用户职业">
                                    <el-option  v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                        <el-col :span="6">
                            <el-col :span="6">
                                    <div class="grid-content form_label">状态</div>
                            </el-col>
                            <el-col :span="18">
                                <el-select v-model="statevalue" placeholder="用户状态">
                                    <el-option v-for="item in stateoptions"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                    </el-row>
                    <!--****************************-->
                    <!--第二行-->
                    <el-row :gutter="15" class="row_1">
                        <!--注册时间-->
                        <el-col :span="3">
                            <div class="grid-content form_label">注册时间</div>
                        </el-col>
                        <el-col :span="9">
                            <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期" class="input11">
                            </el-date-picker> -
                            <el-date-picker
                                    v-model="value2"
                                    type="date"
                                    placeholder="选择日期" class="input11">
                            </el-date-picker>
                        </el-col>
                        <!--搜索按钮-->
                        <el-col :push="6" :span="6">
                            <el-button type="primary" class="btn2">搜索</el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <!--添加按钮-->
                <el-col :span="4">
                    <el-button type="primary" class="btn1">添加</el-button>
                </el-col>
            </el-row>

        </div>
        <!--表格部分-->
        <div class="ttable">
            <!--**************************************************-->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="xid" label="序号" width="70">
                </el-table-column>
                <el-table-column prop="id" label="ID" width="80">
                </el-table-column>
                <el-table-column prop="time" label="注册时间" width="200" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码" width="125" align="center">
                </el-table-column>
                <el-table-column prop="name" label="昵称" width="93" align="center">
                </el-table-column>
                <el-table-column prop="Occupation" label="职业" width="130" align="center">
                </el-table-column>
                <el-table-column prop="studioname" label="所属工作室" width="120" align="center">
                </el-table-column>
                <el-table-column prop="type" label="所属公司" width="120" align="center"  @click="dialogTableVisible = true">
                </el-table-column>
                <el-table-column prop="state" label="状态" width="80" align="center">
                </el-table-column>
                <el-table-column label="操作"  width="150">
                    <template scope="scope">
                        <el-button size="small">
                            查看
                        </el-button>
                        <el-button size="small" @click="dialogTableVisible = true">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
        <!--弹出框-->
        <el-dialog title="账号信息" :visible.sync="dialogTableVisible">
            <el-row :gutter="15" class="form_label">
                <el-col :span="8">
                    <el-row :gutter="15">
                        <el-col :span="4">ID</el-col>
                        <el-col :span="20">12345(正常)</el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row :gutter="15">
                        <el-col :span="8">注册时间</el-col>
                        <el-col :span="16">2017-10-27  13:00:23</el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row :gutter="15">
                        <el-col :span="8">登录次数</el-col>
                        <el-col :span="16">3次</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="15" class="row_1 form-label">
                <el-col :span="8">
                    <el-row :gutter="15">
                        <el-col :span="6">设备码</el-col>
                        <el-col :span="18">TTTTTTFFSSSSSSP</el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row :gutter="15">
                        <el-col :span="8">最后登录</el-col>
                        <el-col :span="16">2017-10-27  13:00:23</el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row :gutter="15">
                        <el-col :span="10">最后登录地址</el-col>
                        <el-col :span="14">123.456652/13.345542</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="50" class="ttable form_label">
                <el-col :span="4">工作室名称</el-col>
                <el-col :span="8">
                    <el-input v-model="input" placeholder="工作室名称"></el-input>
                </el-col>
                <el-col :span="4">手机号码</el-col>
                <el-col :span="8">+86 15030035299</el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>



    export default {
        data() {
            return {
                //注册时间
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
//                ****************************************************************
//                用户类型,状态
                options: [
                    {
                    value: '选项1',
                    label: '影人'
                }, {
                    value: '选项2',
                    label: '经纪人'
                }, {
                    value: '选项3',
                    label: '导演'
                }, {
                    value: '选项4',
                    label: '制片人'
                }],
                value: '',
//                状态
                stateoptions:[
                    {
                    value: '选项1',
                    label: '已通过'
                },{
                    value: '选项2',
                    label: '未通过'
                },{
                    value: '选项3',
                    label: '待审核'
                },{
                    value: '选项4',
                    label: '已封号'
                }],
                statevalue: '',
//                *************************************************************
//                表格数据
                tableData: [
                    {   xid: 1,
                        id: 12345,
                        time: '2017-11-03 23:00:00',
                        phone: '15030035299',
                        name:'杜瑞',
                        Occupation:'影人',
                        studioname: '上海市普陀区',
                        type:'蓝莓影业',
                        state:'已封号'
                    },{   xid: 1,
                        id: 12345,
                        time: '2017-11-03 23:00:00',
                        phone: '15030035299',
                        name:'杜瑞',
                        Occupation:'影人',
                        studioname: '上海市普陀区',
                        type:'蓝莓影业',
                        state:'已封号'
                    },{   xid: 1,
                        id: 12345,
                        time: '2017-11-03 23:00:00',
                        phone: '15030035299',
                        name:'杜瑞',
                        Occupation:'影人',
                        studioname: '上海市普陀区',
                        type:'蓝莓影业',
                        state:'已封号'
                    },{   xid: 1,
                        id: 12345,
                        time: '2017-11-03 23:00:00',
                        phone: '15030035299',
                        name:'杜瑞',
                        Occupation:'影人',
                        studioname: '上海市普陀区',
                        type:'蓝莓影业',
                        state:'已封号'
                    },{   xid: 1,
                        id: 12345,
                        time: '2017-11-03 23:00:00',
                        phone: '15030035299',
                        name:'杜瑞',
                        Occupation:'影人',
                        studioname: '上海市普陀区',
                        type:'蓝莓影业',
                        state:'已封号'
                    },{   xid: 1,
                        id: 12345,
                        time: '2017-11-03 23:00:00',
                        phone: '15030035299',
                        name:'杜瑞',
                        Occupation:'影人',
                        studioname: '上海市普陀区',
                        type:'蓝莓影业',
                        state:'已封号'
                    },{   xid: 1,
                        id: 12345,
                        time: '2017-11-03 23:00:00',
                        phone: '15030035299',
                        name:'杜瑞',
                        Occupation:'影人',
                        studioname: '上海市普陀区',
                        type:'蓝莓影业',
                        state:'已封号'
                    },{   xid: 1,
                        id: 12345,
                        time: '2017-11-03 23:00:00',
                        phone: '15030035299',
                        name:'杜瑞',
                        Occupation:'影人',
                        studioname: '上海市普陀区',
                        type:'蓝莓影业',
                        state:'已封号'
                    }],
//表格-操作-编辑
                gridData: [
//                   弹出框数据
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }],
                dialogTableVisible: false,
//                clickme:false
            };
        },
        methods: {
//表格-操作-编辑

        }
    };
</script>

<style scoped>
    .form_label{
        line-height:36px;
    }
    .btn1{
        width:100px;
        height:100px;
        margin-left:70px;
    }
    .btn2{
        width:100px;
        margin-left:70px;
    }
    .row_1{
        margin-top:28px;
    }
    /*.input11{*/
        /*width:170px;*/
    /*}*/
    .ttable{
        margin-top: 30px;
    }
</style>