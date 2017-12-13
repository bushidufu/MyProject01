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
                                    v-model="registervalue1"
                                    type="date"
                                    placeholder="选择日期" class="input11">
                            </el-date-picker> -
                            <el-date-picker
                                    v-model="registervalue2"
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
                            <div class="grid-content form_label">昵称</div>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入昵称"></el-input>
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
                <!--空间背景图片-->
                <el-row :gutter="15" class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">空间背景图片</div>
                    </el-col>
                    <el-col :span="7">
                        <div class="bgd">
                            <a href="#">请上传背景图片</a>
                        </div>
                    </el-col>
                    <el-col :span="7" :offset="2">
                        <el-row :gutter="15">
                            <el-col :span="10">
                                <div class="grid-content form_label">
                                    微信:
                                    <span>已绑定</span>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <el-button size="small">解绑</el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="10">
                                <div class="grid-content form_label">
                                    微博:
                                    <span>已绑定</span>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <el-button size="small">解绑</el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="10">
                                <div class="grid-content form_label">
                                    QQ:
                                    <span> 已绑定</span>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <el-button size="small">解绑</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!--所属工作室 所属公司-->
                <el-row :gutter="15" class="row_1">
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">所属工作室</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">所属公司</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input></el-input>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="15" class="row_1">
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">获得奖项</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">毕业院校</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input></el-input>
                        </el-col>
                    </el-col>
                </el-row>
                <!--工作室简介-->
                <el-row :gutter="15"class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">个人简介</div>
                    </el-col>
                    <el-col :span="12">
                        <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
                <!--职业类型-->
                <el-row :gutter="15"class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">职业</div>
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
                <!--标签-->
                <el-row :gutter="15"class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">标签</div>
                    </el-col>
                    <el-col :span="10">
                        <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </el-col>
                </el-row>
                <hr>
                <el-row :gutter="15" class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">相册</div>
                    </el-col>
                </el-row>
                <hr>
                <!--花名 真实姓名-->
                <el-row :gutter="15" class="row_1">
                    <el-col :span="12">
                        <el-col :span="3">
                            <div class="grid-content form_label">花名</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content form_label">王花花</div>
                        </el-col>
                        <el-col :span="3">
                            <el-button size="small">更换</el-button>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">真实姓名</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input></el-input>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="15" class="row_1">
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">国籍</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">性别</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="grid-content form_label">
                                <el-radio v-model="radio" label="1">男</el-radio>
                                <el-radio v-model="radio" label="2">女</el-radio>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="15" class="row_1">
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">祖籍</div>
                        </el-col>
                        <el-col :span="10">
                            <el-select v-model="zuvalue" placeholder="请选择">
                                <el-option
                                        v-for="item in zuoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">出生日期</div>
                        </el-col>
                        <el-col :span="10">
                            <el-date-picker
                                    v-model="Birthvalue3"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content form_label">
                                <span>22岁</span>,
                                <span>白羊座</span>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="15" class="row_1">
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">名族</div>
                        </el-col>
                        <el-col :span="10">
                            <el-select v-model="mingvalue" placeholder="请选择">
                                <el-option
                                        v-for="item in mingoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">从业年限</div>
                        </el-col>
                        <el-col :span="18">
                            <el-date-picker
                                    v-model="dovalue4"
                                    type="date"
                                    placeholder="选择日期" class="input11">
                            </el-date-picker> -
                            <el-date-picker
                                    v-model="dovalue5"
                                    type="date"
                                    placeholder="选择日期" class="input11">
                            </el-date-picker>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="15" class="row_1">
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">现居地</div>
                        </el-col>
                        <el-col :span="18">
                            <el-col :span="7">
                                <el-select v-model="ProvinceValue" placeholder="省">
                                    <el-option
                                            v-for="item in Province"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="7">
                                <el-select v-model="CityValue" placeholder="市">
                                    <el-option
                                            v-for="item in City"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="15" class="row_1">
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">身高</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input></el-input>
                        </el-col>
                        <el-col :span="1">
                            <div class="grid-content form_label">cm</div>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="6">
                            <div class="grid-content form_label">体重</div>
                        </el-col>
                        <el-col :span="10">
                            <el-input></el-input>
                        </el-col>
                        <el-col :span="1">
                            <div class="grid-content form_label">kg</div>
                        </el-col>
                    </el-col>
                </el-row>
                <!--特长-->
                <el-row :gutter="15"class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">特长</div>
                    </el-col>
                    <el-col :span="10">
                        <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </el-col>
                </el-row>
                <hr>
                <!--语种-->
                <el-row :gutter="15"class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">语种</div>
                    </el-col>
                    <el-col :span="10">
                        <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </el-col>
                </el-row>
                <hr>
                <el-row :gutter="15"class="row_1">
                    <el-col :span="3">
                        <div class="grid-content form_label">方言</div>
                    </el-col>
                    <el-col :span="10">
                        <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
                registervalue1: '',
                registervalue2: '',
                Birthvalue3:'',
                dovalue4:'',
                dovalue5:'',
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
                //职业类型
                checkedCities1: [],
                cities: cityOptions,
                //标签
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',
//                单选性别
                radio: '1',
//                祖籍
                zuoptions:[
                    {
                        value: '选项1',
                        label: '北京'
                    },{
                        value: '选项2',
                        label: '河北'
                    },
                ],
                zuvalue:'',
//                民族
                mingoptions:[
                    {
                        value: '选项1',
                        label: '汉族'
                    },{
                        value: '选项2',
                        label: '满族'
                    },
                ],
                mingvalue:'',
//表格-操作-编辑--省份
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
//表格-操作-编辑--市
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
            };
        },
        methods: {
//表格-操作-编辑
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
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
    .input11{
        width:145px;
    }
    .ttable{
        margin-top: 30px;
    }
    .bgd{
        width:335px;
        height:100px;
        border:1px dashed gray;
        text-align:center;
        line-height:100px;
    }
    /*编辑-标签样式*/
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>