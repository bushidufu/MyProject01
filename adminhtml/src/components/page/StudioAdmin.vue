<template>

    <div class="table">
<!--面包屑导航-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>工作室管理</el-breadcrumb-item>
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
                                <div class="grid-content form_label">类型</div>
                            </el-col>
                            <el-col :span="18">
                                <el-select v-model="value" placeholder="用户类别">
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
                <el-table-column prop="phone" label="手机号码" width="125" align="center">
                </el-table-column>
                <el-table-column prop="mail" label="邮箱" width="200" align="center">
                </el-table-column>
                <el-table-column prop="studioname" label="工作室名称" width="130" align="center">
                </el-table-column>
                <el-table-column prop="type" label="类型" width="80" align="center">
                </el-table-column>
                <el-table-column prop="name" label="申请人姓名" width="110" align="center">
                </el-table-column>
                <el-table-column prop="state" label="状态" width="80" align="center">
                </el-table-column>
                <el-table-column prop="date" label="审核时间" width="143" align="center">
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
        <div>
            <el-dialog title="工作室管理/编辑" :visible.sync="dialogTableVisible" size="large">
                <el-row :gutter="15">
                    <el-col :span="3">
                        <div class="grid-content form_label">
                            <h3>账号信息</h3>
                        </div>
                    </el-col>
                </el-row>
                <!--ID 注册时间-->
                <el-row :gutter="15">
                    <el-col :span="8">
                        <el-col :span="4" >
                            <div class="grid-content form_label">ID</div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content form_label">12345(正常)</div>
                        </el-col>
                    </el-col>
                    <el-col :span="8">
                        <el-col :span="6" >
                            <div class="grid-content form_label">注册时间</div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content form_label">
                                2017-10-27  13:00:23
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="8">
                        <el-col :span="5" >
                            <div class="grid-content form_label">登录次数</div>
                        </el-col>
                        <el-col :span="19">
                            <div class="grid-content form_label">3次</div>
                        </el-col>
                    </el-col>
                </el-row>
                <!--设备码 最后登录-->
                <el-row :gutter="15">
                    <el-col :span="8">
                        <el-col :span="4" >
                            <div class="grid-content form_label">设备码</div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content form_label">
                                TTTTTTFFSSSSSSP
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="8">
                        <el-col :span="6" >
                            <div class="grid-content form_label">最后登录</div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content form_label">
                                2017-10-27  13:00:23
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="8">
                        <el-col :span="7" >
                            <div class="grid-content form_label">最后登录地址</div>
                        </el-col>
                        <el-col :span="17">
                            <div class="grid-content form_label">
                                123.456652/13.345542
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
                <hr>
                <!--工作室名称  手机号-->
                <el-row :gutter="15" class="row_1" >
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">工作室名称</div>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="工作室名称"></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">手机号码</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content form_label">+86 15030035200</div>
                        </el-col>
                    </el-col>
                </el-row>
                <!--logo  密码-->
                <el-row :gutter="15" class="row_1">
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">LOGO</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="logo">
                                <a href="#">头像</a>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-row :gutter="15">
                            <el-col :span="6">
                                <div class="grid-content form_label">邮箱</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content form_label">
                                    15030025100@163.com
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="6">
                                <div class="grid-content form_label">密码</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content form_label">
                                    ****************
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <el-button size="small">重置</el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="6" :offset="6">
                                <div class="grid-content form_label"
                                     style="color: gray;">
                                    默认密码为"123456"
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <hr>
                <!--工作室电话-->
                <el-row :gutter="15" class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">工作室电话</div>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="请输入电话"></el-input>
                    </el-col>
                </el-row>
                <!--工作室地址-->
                <el-row :gutter="15" class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">工作室地址</div>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="ProvinceValue" placeholder="省">
                            <el-option
                                    v-for="item in Province"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="CityValue" placeholder="市">
                            <el-option
                                    v-for="item in City"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <!--工作室简介-->
                <el-row :gutter="15"class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">工作室简介</div>
                    </el-col>
                    <el-col :span="12">
                        <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
                <!--工作室类型-->
                <el-row :gutter="15"class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">工作室类型</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content form_label">最多选5个</div>
                    </el-col>
                </el-row>
                <el-row :gutter="15"class="row_1">
                    <el-col :span="2" :offset="3">
                        <div class="grid-content form_lable">制作组</div>
                    </el-col>
                    <el-col :span="17" >
                        <el-checkbox-group
                                v-model="checkedCities1"
                                :min="1"
                                :max="5">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row :gutter="15"class="row_1">
                    <el-col :span="2" :offset="3">
                        <div class="grid-content form_lable">制作组</div>
                    </el-col>
                    <el-col :span="17" >
                        <el-checkbox-group
                                v-model="checkedCities1"
                                :min="1"
                                :max="5">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row :gutter="15"class="row_1">
                    <el-col :span="2" :offset="3">
                        <div class="grid-content form_lable">制作组</div>
                    </el-col>
                    <el-col :span="17" >
                        <el-checkbox-group
                                v-model="checkedCities1"
                                :min="1"
                                :max="5">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row :gutter="15"class="row_1">
                    <el-col :span="2" :offset="3">
                        <div class="grid-content form_lable">制作组</div>
                    </el-col>
                    <el-col :span="17" >
                        <el-checkbox-group
                                v-model="checkedCities1"
                                :min="1"
                                :max="5">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row :gutter="15"class="row_1">
                    <el-col :span="2" :offset="3">
                        <div class="grid-content form_lable">制作组</div>
                    </el-col>
                    <el-col :span="17" >
                        <el-checkbox-group
                                v-model="checkedCities1"
                                :min="1"
                                :max="5">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row :gutter="15"class="row_1">
                    <el-col :span="2" :offset="3">
                        <div class="grid-content form_lable">制作组</div>
                    </el-col>
                    <el-col :span="17" >
                        <el-checkbox-group
                                v-model="checkedCities1"
                                :min="1"
                                :max="5">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <hr>
                <!--申请人姓名 身份证号-->
                <el-row :gutter="15"class="row_1">
                    <el-col :span="12">
                        <el-col :span="4">
                            <div class="grid-content form_label">申请人姓名</div>
                        </el-col>
                        <el-col :span="15">
                            <el-input placeholder="请输入姓名"></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">
                                申请人身份证号码
                            </div>
                        </el-col>
                        <el-col :span="15">
                            <el-input placeholder="请输入身份证号码"></el-input>
                        </el-col>
                    </el-col>
                </el-row>
                <hr>
                <!--工作室成员-->
                <el-row :gutter="15" class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">
                            工作室成员
                            <span>66</span>
                            人
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <el-button>邀请成员</el-button>
                    </el-col>
                    <el-col :span="3" :offset="15">
                        <div class="grid-content form_label">
                            <a href="#">下载人员名单</a>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="15" class="row_1">
                    <el-col :span="20">
                        <el-table
                                :data="gridData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    label="序号"
                                    width="73"
                                    prop="xid"></el-table-column>
                            <el-table-column
                                    label="用户ID"
                                    width="150"
                                    prop="id"></el-table-column>
                            <el-table-column
                                    label="昵称"
                                    width="150"
                                    prop="name"></el-table-column>
                            <el-table-column
                                    label="联系方式"
                                    width="150"
                                    prop="phone"></el-table-column>
                            <el-table-column
                                    label="职业"
                                    width="150"
                                    prop="Occupation"></el-table-column>
                            <el-table-column
                                    label="加入时间"
                                    width="150"
                                    prop="time"></el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="150"
                                    prop="cao">
                                <template scope="scope">
                                    <el-button size="small">
                                        删除成员
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <!--统计信息-->
                <el-row :gutter="15" class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">
                            <h3>统计信息</h3>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="15" style="margin-bottom: 28px">
                    <el-col :span="17">
                        <el-table
                                :data="gridData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    label="旗下艺人"
                                    width="103"
                                    prop="xid"></el-table-column>
                            <el-table-column
                                    label="作品"
                                    width="103"
                                    prop="xid"></el-table-column>
                            <el-table-column
                                    label="同步作品"
                                    width="103"
                                    prop="xid"></el-table-column>
                            <el-table-column
                                    label="项目"
                                    width="103"
                                    prop="xid"></el-table-column>
                            <el-table-column
                                    label="同步项目"
                                    width="103"
                                    prop="xid"></el-table-column>
                            <el-table-column
                                    label="资源"
                                    width="103"
                                    prop="xid"></el-table-column>
                            <el-table-column
                                    label="市集"
                                    width="103"
                                    prop="xid"></el-table-column>
                            <el-table-column
                                    label="活动"
                                    width="103"
                                    prop="xid"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <hr>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    const cityOptions = [
        '导演', '影人', '助理', '制片人', '经纪人', '编剧', '道具', '替身', '主角'];
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
                    label: '宣发'
                }, {
                    value: '选项2',
                    label: '未宣发'
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
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'',
                        date:''
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'',
                        date:''
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'',
                        date:''
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'',
                        date:''
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'',
                        date:''
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'未通过',
                        date:'2017-11-03'
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'未通过',
                        date:'2017-11-03'
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'未通过',
                        date:'2017-11-03'
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'未通过',
                        date:'2017-11-03'
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'未通过',
                        date:'2017-11-03'
                    },{   xid: 1,
                        id: 12345,
                        phone: '15030035299',
                        mail: '15030035299@163.com',
                        studioname: '上海市普陀区',
                        type:'电影',
                        name:'杜瑞',
                        state:'未通过',
                        date:'2017-11-03'
                    }],
//表格-操作-编辑
                gridData: [

                    {   xid: 1,
                        id: 12345,
                        name:'王花花',
                        phone: '15030035299',
                        Occupation: '影人',
                        time:'2017-12-11 00:00:00',
                }],
                dialogTableVisible: false,
//表格-操作-编辑-工作室地址-省份
                Province:[
                    {
                        value: '选项1',
                        label: '北京'
                    }, {
                        value: '选项2',
                        label: '上海'
                    }, {
                        value: '选项3',
                        label: '河北'
                    },
                ],
                ProvinceValue:'',
//表格-操作-编辑-工作室地址-市
                City:[
                    {
                        value: '选项1',
                        label: '北京市'
                    }, {
                        value: '选项2',
                        label: '上海市'
                    }, {
                        value: '选项3',
                        label: '石家庄'
                    }, {
                        value: '选项4',
                        label: '青岛'
                    },
                ],
                CityValue:'',
                checkedCities1: [],
                cities: cityOptions
            };
        },
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
    .input11{
        width:145px;
    }
    .ttable{
        margin-top: 30px;
    }
    .logo{
        width:70px;
        height:70px;
        border:1px dashed #000;
        border-radius:50%;
        text-align:center;
        line-height:70px;
    }
</style>