<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-row :gutter="15">
                <el-col :span="8">
                    <el-col :span="10">
                        <div class="grid-content form_label">名称：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="search_name" placeholder="模糊查询"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="9">
                        <div class="grid-content form_label">组类别：</div>
                    </el-col>

                    <el-col :span="14">
                        <el-select v-model="type01" placeholder="用户类型">
                            <el-option
                                    v-for="item in sellTypeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="5">
                        <div class="grid-content form_label">类别：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="type02" placeholder="用户类别">
                            <el-option
                                    v-for="item in sortTypeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="15">
                <el-col :span="8">
                    <el-col :span="10">
                        <div class="grid-content form_label">注册时间：</div>
                    </el-col>
                    <el-col :span="12">
                        <el-date-picker id="datatime"
                                v-model="search_createtime"
                                type="date"
                                placeholder="选择日期时间"
                                @change="bootDateChange"
                                :editable="false">
                        </el-date-picker>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="9">
                        <div class="grid-content form_label">需求数量：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="search_demandcount" placeholder="精确填写或区间逗号分割"></el-input>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="15">
                <el-col :span="8">
                    <el-col :span="10">
                        <div class="grid-content form_label">过往作品数量：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="search_historycount" placeholder="精确填写或区间逗号分割"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="9">
                        <div class="grid-content form_label">短视频数量：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="search_videocount" placeholder="精确填写或区间逗号分割"></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="8">
                    <el-col :span="10">
                        <div class="grid-content form_label">承接数量：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="search_receivecount" placeholder="精确填写或区间逗号分割"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="9">
                        <div class="grid-content form_label">版权数量：</div>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="search_copyrightcount" placeholder="精确填写或区间逗号分割"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary"  icon="search" @click="dosearch">搜索</el-button>
                    <el-button type="primary" @click="showaddwin">添加</el-button>
                </el-col>
            </el-row>

        </div>
        <el-table :data="userList" border style="width:100%" ref="multipleTable"
                  @selection-change="handleSelectionChange" @cell-click="showList">
            <el-table-column prop="id" label="影人ID" width="80">
            </el-table-column>
            <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" width="160">
            </el-table-column>
          <!--  <el-table-column prop="groupName" label="类型"  width="70" :show-overflow-tooltip="true">
            </el-table-column>-->
            <el-table-column prop="categoryNames" label="类别" width="180" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="createDate" label="加入时间" :show-overflow-tooltip="true" width="180">
            </el-table-column>
            <el-table-column prop="scriptCount" label="版权数" width="80">
            </el-table-column>
            <el-table-column prop="demandCount" label="需求数" width="80">
            </el-table-column>
            <el-table-column prop="beforeCount" label="项目数" width="80">
            </el-table-column>
            <el-table-column prop="videoCount" label="视频数" width="80">
            </el-table-column>
            <el-table-column prop="receiveCount" label="承接数" width="80">
            </el-table-column>
            <el-table-column prop="userId" label="" v-if="hide">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleHidden(scope.$index, scope.row)">{{scope.row.state == 0 ? "隐藏" : "显示"}}
                    </el-button>
                    <el-button size="small"
                               @click="showedit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="small"
                               @click="handleRec(scope.$index, scope.row)">{{scope.row.recommendType == 0 ? "推荐" : "撤推"}}
                    </el-button>
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
   <!--     <div class="container">
            <div class="imageBox" id="imageBox">
                <div class="thumbBox"></div>
                <div class="spinner" style="display: none" id="spinner"></div>
            </div>
            <div class="action">
                &lt;!&ndash; <input type="file" id="file" style=" width: 200px">&ndash;&gt;
                <div class="new-contentarea tc"> <a href="javascript:void(0)" class="upload-img">
                    <label for="upload-file">请先选择图片...</label>
                </a>
                    <input type="file" class="" name="upload-file" id="upload-file" />
                </div>
                <input type="button"   class="Btnsty_peyton" value="OK">
                <input type="button" id="btnZoomIn" class="Btnsty_peyton" value="+"  >
                <input type="button" id="btnZoomOut" class="Btnsty_peyton" value="-" >
            </div>
            <div class="cropped"></div>
        </div>-->



        <!--弹窗modal-->
        <el-dialog title="影人添加/编辑" :visible.sync="dialogFormVisible" size="small">
            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8" >
                        <div class="grid-content form_label">影人昵称:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="add_name" placeholder=""></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15" >
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">一句话简介:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="add_simpleintro" placeholder=""></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">影人类型:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="type01_add" placeholder="用户组">
                            <el-option
                                v-for="item in sellTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-checkbox-group v-model="checklist">
                            <el-checkbox v-for="item in sortTypeList" :label="item.id" :key="item.name">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>




            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">公司名称:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="add_company" placeholder=""></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">手机号:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="add_mobile" placeholder=""></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">性别:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="add_sex" placeholder="性别">
                            <el-option
                                    v-for="item in sexlist"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>



            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">关注数:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="add_attention" placeholder=""></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">粉丝数:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="add_fans" placeholder=""></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">空间模板:</div>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="add_displaytype" placeholder="选择模板">
                            <el-option
                                    v-for="item in arr01"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content ">简介：</div>
                    </el-col>
                    <el-col :span="16">
                        <el-input :rows="4" type="textarea" v-model="shadowmanIntro" placeholder="请输入影人简介"></el-input>

                    </el-col>
                </el-col>
            </el-row>
            <br/>
<!--            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">头像:</div>
                    </el-col>
                    <el-col :span="4">
                        <div style="display:inline-block">
                            <img width="150px" height="150px" :src="headImg" alt="">
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="change">
                            <upload showtype="2" :title="title2" v-on:uploadSuccess="shadImgUrl"
                                    style="width: 600px;height: 150px;overflow: hidden"></upload>
                        </div>
                    </el-col>
                </el-col>
            </el-row>-->

            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">头像:</div>
                    </el-col>
                    <el-col :span="4">
                        <div style="display:inline-block">
                            <img width="150px" height="150px" :src="headImg" alt="">
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="change">
                            <upload showtype="2" :title="title" v-on:uploadSuccess="shadImgUrl"></upload>
                        </div>
                    </el-col>
                </el-col>
            </el-row>


            <el-row :gutter="15">
                <el-col :span="12" :offset="6">
                    <el-col :span="8">
                        <div class="grid-content form_label">背景图:</div>
                    </el-col>
                    <el-col :span="4">
                        <div style="display:inline-block">
                            <img width="150px" height="150px" :src="bgImgFull" alt="">
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="change">
                            <upload showtype="2" :title="title2" v-on:uploadSuccess="shadBgimgUrl"
                                    style="width: 600px;height: 150px;overflow: hidden"></upload>
                        </div>
                    </el-col>
                </el-col>
            </el-row>
            <br/>
            <el-button type="primary" @click="doadd" class="sv">保存</el-button>
            <el-button @click="cancleEdit">取消</el-button>



        </el-dialog>


        <!--版权弹框-->
        <el-dialog title="版权列表" :visible.sync="copyrightFormVisible" size="small">
            <el-table :data="copyrightList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="id" label="视频ID"></el-table-column>
                <el-table-column prop="name" label="版权名称"  width="95"></el-table-column>
                <el-table-column prop="userType" label="所属" :formatter="formatter"></el-table-column>
                <el-table-column prop="typeName" label="类型"></el-table-column>
                <el-table-column prop="sortName" label="类别"></el-table-column>
                <el-table-column prop="categoryName" label="分类"></el-table-column>
                <el-table-column prop="sellType" label="出售类别"></el-table-column>
                <el-table-column prop="userName" label="发布人"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination  v-if="total_Count01 != 0"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="total_Count01">
                </el-pagination>
            </div>
        </el-dialog>
        <!--需求弹框-->
        <el-dialog title="需求列表" :visible.sync="demandFormVisible" size="small">
            <el-table   :data="demandList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="id" label="ID" width="80" align="center">
                </el-table-column>
                <el-table-column prop="userId" label="发布人Id" width="100" align="center">
                </el-table-column>
                <el-table-column prop="title" label="需求标题" width="150" align="center" :show-overflow-tooltip="showflow">
                </el-table-column>
                <el-table-column prop="detail" label="详情标题" width="150" :show-overflow-tooltip="showflow" align="center">
                </el-table-column>
                <el-table-column prop="typeName" label="需求名称" width="100" align="center">
                </el-table-column>
                <el-table-column prop="demandType" label="类型" width="65" align="center">
                </el-table-column>
                <el-table-column prop="pubDate" label="发布时间" width="100"align="center">
                </el-table-column>
                <el-table-column prop="rec" label="供需" width="100" align="center">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination  v-if="total_Count02 != 0"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="total_Count02">
                </el-pagination>
            </div>
        </el-dialog>
        <!--项目弹框-->
        <el-dialog title="项目列表" :visible.sync="projectFormVisible" size="small">
            <el-table :data="tableList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="id" label="ID" :show-overflow-tooltip="true" align="center">
                </el-table-column>
                <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" align="center" width="180">
                </el-table-column>
                <el-table-column prop="aims" label="融资目标" width="95" align="center">
                </el-table-column>
                <el-table-column prop="completeAmount" label="完成金额" width="95" align="center">
                </el-table-column>
                <el-table-column prop="voteScale" label="起投金额" width="95" align="center">
                </el-table-column>
                <el-table-column prop="cycle" label="融资周期" width="100" align="center">
                </el-table-column>
                <el-table-column prop="bootDate" label="开机时间" width="95" :show-overflow-tooltip="true" align="center">
                </el-table-column>
                <el-table-column prop="userId" label="编剧" width="100" align="center">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination v-if="total_Count03 != 0"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="total_Count03">
                </el-pagination>
            </div>






        </el-dialog>

        <!--视频弹框-->
        <el-dialog title="视频列表" :visible.sync="videoFormVisible" size="small">
            <el-table :data="videoList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label=" 视频ID" width="100" align="center">
                </el-table-column>
                <el-table-column prop="studioId" label="工作室ID" width="100" align="center">
                </el-table-column>
                <el-table-column prop="studioName" label="工作室名称" width="128" align="center">
                </el-table-column>
                <el-table-column prop="typeName" label="视频类别" width="100" align="center">
                </el-table-column>
                <el-table-column prop="type" label="类别" width="65" align="center">
                </el-table-column>
                <el-table-column prop="times" label="视频时长" width="100" align="center">
                </el-table-column>
                <el-table-column prop="name" label="视频名称" width="150" :show-overflow-tooltip="true" align="center">
                </el-table-column>
                <el-table-column prop="source" label="来源" width="70">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination  v-if="total_Count04 != 0"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="total_Count04">
                </el-pagination>
            </div>
        </el-dialog>

        <!--承接弹框-->
        <el-dialog title="承接列表" :visible.sync="receiveFormVisible" size="small">
            <el-table :data="copyrightList" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="id" label="视频ID"></el-table-column>
                <el-table-column prop="name" label="版权名称"  width="95"></el-table-column>
                <el-table-column prop="userType" label="所属" :formatter="formatter"></el-table-column>
                <el-table-column prop="typeName" label="类型"></el-table-column>
                <el-table-column prop="sortName" label="类别"></el-table-column>
                <el-table-column prop="categoryName" label="分类"></el-table-column>
                <el-table-column prop="sellType" label="出售类别"></el-table-column>
                <el-table-column prop="userName" label="发布人"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>



<script>
    import $ from 'jquery';
    import '../../../static/js/cropbox';

    import {Message} from 'element-ui';
    import axios from 'axios';
    import upload from './UploadFile.vue';

    $(window).load(function() {
        //$('#btnCrop').click();$("#idName").css("cssText","background-color:red!important");

        //$(".imageBox").css("cssText","background-position:88px 88px!important");$(".imageBox").css("cssText","background-size:222px 222px!important");
        var options =
            {
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: ''
            }
        var cropper = $('.imageBox').cropbox(options);
        var img="";
        $('#upload-file').on('change', function(){
            var reader = new FileReader();
            reader.onload = function(e) {
                options.imgSrc = e.target.result;
                cropper = $('.imageBox').cropbox(options);
                getImg();
            }
            reader.readAsDataURL(this.files[0]);
            this.files = [];
            //getImg();
        })
        $('#btnCrop').on('click', function(){
            alert("图片上传喽");
        })
        function getImg(){
            img = cropper.getDataURL();
            $('.cropped').html('');
            $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
            $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
            $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
        }

        $(".imageBox").on("click",function(){
            getImg();
            console.log(1000)
        });


        $('#btnZoomIn').on('click', function(){
            cropper.zoomIn();
        })
        $('#btnZoomOut').on('click', function(){
            cropper.zoomOut();
        })
    });
    export default {
        data : function(){
            return {
              hide:false,
              showflow:true,
              copyrightList:[],
              demandList:[],
              videoTypeList:[],
              tableList:[],
              videoList:[],
              title:'修改头像',
              title2:'修改背景图',
              headImg:'',
              bgImgFull:'',
              sellTypeList: [],
              sortTypeList: [],
              checklist : [],
              iscrop : true,
              type01: '',
              type02: '',
              type01_add:'',
              type02_add:'',
              add_company : '',
              add_user_id : '',
              add_studio_id : '',
              add_mobile : '',
              add_sex : '',
              img:'',
              bgimg:'',
              idEdit: false,
              headimgparent:'',
              bgimgparent : '',
              arr01:[{
                value: 1,
                label: '模板一'
              }, {
                value: 2,
                label: '模板二'
              }, {
                value: 3,
                label: '模板三'
              }],
                sexlist:[{
                    value: 1,
                    label: '女'
                }, {
                    value: 2,
                    label: '男'
                }],
              arr02:'',
                search_name : '',
                search_group : '',
                search_category : '',
                search_createtime : '',
                search_demandcount : '',
                search_historycount : '',
                search_videocount : '',
                search_receivecount : '',
                search_copyrightcount : '',
                add_name : '',
                add_simpleintro : '',
                shadowmanIntro : '',
                add_intro : '',
                add_image : '',
                add_bgimage : '',
                add_group : '',
                add_category : '',
                add_attention : 0,
                add_fans : 0,
                add_history : '',
                add_copyright : '',
                add_pubdemand : '',
                add_recdemand : '',
                add_usertype : '',
                add_displaytype : '',
                dialogFormVisible : false,
                copyrightFormVisible:false,
                demandFormVisible:false,
                projectFormVisible:false,
                videoFormVisible:false,
                receiveFormVisible:false,
                userList : [],
                total_Count: 10,
                cur_page: 1,
                pageSize: 10,
              total_Count01: 10,
              cur_page01:1,
              total_Count02: 10,
              cur_page02:1,
              total_Count03: 10,
              cur_page03:1,
              total_Count04: 10,
              cur_page04:1,
            }
        },
        created(){
       // this.getData();
        this.getCate();
        this.dosearch();
        this.getImg();

      },
      watch: {
        type01: {
          handler(newV, oldV) {
            this.updateSort();
          },
        },
        type01_add: {
            handler(newV, oldV) {
              this.updateSort();
            }
          },

      },
        methods : {
            resetForm(){
                this.add_name = '';
                this.add_simpleintro = '';
                this.shadowmanIntro = '';
                this.add_intro = 0;
                this.add_image = 0;
                this.add_bgimage = '';
                this.add_group = '';
                this.add_category = '';
                this.add_attention = '';
                this.add_fans = '';
                this.add_history = '';
                this.add_copyright = '';
                this.add_pubdemand = '';
                this.categoryName = '';
                this.categoryIds = '';
                this.add_user_id = '';
                this.add_studio_id = '';
                this.add_mobile = '';
                this.add_sex = '';
                this.img = '';
                this.bgimg = '';
                this.add_company = '';
                this.headImg = '';
                this.bgImgFull = '';
                this.type01_add = '';
                this.add_displaytype = '';
            },
            getImg(){
                img = cropper.getDataURL();
                $('.cropped').html('');
                $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
                $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
                $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
            },
          bootDateChange(val) {
            this.search_createtime = val;
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
            console.log(row.id);
            console.log(row.userId);
            console.log(column.label);
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
                  console.log(JSON.stringify(this.demandList));
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
          getData(){
            let self = this;
            let token = localStorage.getItem('token');
              self.$axios({
                  method:'GET',
                  url:window.baseURL + 'admin/v1/user',
                  params: {
                      name:self.search_name,
                      groupId:self.type01,
                      categoryId:self.type02,
                      createDate:self.search_createtime,
                      beforeCount:self.search_historycount,
                      videoCount:self.search_videocount,
                      demandCount:self.search_demandcount,
                      receiveCount:self.search_receivecount,
                      scriptCount:self.search_copyrightcount,
                      type:1,//1影人2工作室3圈层机构
                      page: this.cur_page,
                      size: this.pageSize,
                  }
              })
              .then((res) => {
                let self = this;
                self.total_Count = res.data.body.total;
                self.userList = res.data.body.users;

                length = self.userList.length;
                for (let i = 0; i < length; i++) {
                  // this.$message(self.bannerList[i].state);
                  var state = self.userList[i].state;
                }
              })
          },
          shadImgUrl(data) {
            this.img = data.targetFileName;
            this.headImg = window.basePic+data.targetFileName;
          },
          shadBgimgUrl(data) {
            this.bgimg = data.targetFileName;
            this.bgImgFull = window.basePic+data.targetFileName;
          },
          cancleEdit() {
            this.add_name = '',
              this.add_simpleintro = '',
              this.shadowmanIntro = '',
              this.add_fans = '',
              this.add_attention = '',
              this.add_displaytype = '',
              this.img = '',
              this.bgImgFull = '',
              this.headImg = '',
              this.bgImgFull = '',
              this.bgimg = '',
              this.groupName = '' ,
              this.categoryName = '',
              localStorage.setItem('cid', 0);
            this.dialogFormVisible=false;
          },
          showaddwin(){ //显示弹窗
                this.dialogFormVisible = true;
                this.idEdit = false;//添加
              this.resetForm();
            },
          showedit(index,row){
              this.dialogFormVisible = true;
              this.idEdit = true;//编辑
              this.title = '修改头像',
              this.title2 = '修改背景图',
            localStorage.setItem('sid', row.id);
            this.$axios({
              method: 'get',
              url: window.baseURL + 'admin/v1/user/' + row.id,
              // headers: {'X-XSRF-TOKEN': token},
            })
              .then((res) => {
                console.log(res.data.body);
                this.type01_add = res.data.body.groupId;
                this.type02_add = res.data.body.categoryId;
                this.add_name = res.data.body.name;
                this.add_simpleintro = res.data.body.oneWord;
                this.shadowmanIntro = res.data.body.intro;
                this.add_intro = res.data.body.intro;
                this.add_bgimage = window.basePic+res.data.body.background;
                this.add_group = res.data.body.groupName;
                this.add_category = res.data.body.categoryName;
                this.add_attention = res.data.body.attention;
                this.add_fans = res.data.body.fans;
                this.add_displaytype = res.data.body.template;
                this.add_sex = res.data.body.sex;
                this.add_mobile = res.data.body.mobile;
                this.add_company = res.data.body.companyName;
                this.add_user_id = res.data.body.userId
                this.add_studio_id = res.data.body.id
                var categoryids = res.data.body.categoryIds;
                this.checklist = categoryids.split(",");

                if(res.data.body.img != ''){

                  if(res.data.body.img.startsWith('http')){
                    this.headImg = res.data.body.img;
                  }else {
                    this.headImg = window.basePic+res.data.body.img;
                  }
                }
                if(res.data.body.background != ''){

                  if(res.data.body.background.startsWith('http')){
                    this.bgImgFull = res.data.body.background;
                  }else {
                    this.bgImgFull = window.basePic+res.data.body.background;
                  }
                }
              }).catch(err => {
              this.$message('数据获取失败');
            });
          },
          doadd(){
              if(this.checklist.length == 0){
                  this.$message('职业信息不可为空，至少勾选一个');
                  return;
              }
              if(undefined == this.add_name || '' == this.add_name){
                  this.$message('影人昵称不可为空');
                  return;
              }
              if(undefined == this.add_simpleintro || '' == this.add_simpleintro){
                  this.$message('一句话简介不可为空');
                  return;
              }
              if(undefined == this.shadowmanIntro || '' == this.shadowmanIntro){
                  this.$message('简介不可为空');
                  return;
              }
              const self = this;
              var categoryidsstr = '';
              for(var i in self.checklist){
                  categoryidsstr += self.checklist[i]+",";
              }

            let typeName = '';
            let sortName = '';
            for (var i = 0; i < self.sellTypeList.length; i++) {
              var obj = self.sellTypeList[i].id;
              if(obj == self.type01_add){
                typeName = self.sellTypeList[i].name;
              }
            }
            for (var i = 0; i < self.sortTypeList.length; i++) {
              var obj = self.sortTypeList[i].id;
              if(obj == self.type02_add){
                sortName = self.sortTypeList[i].name;
              }
            }
            if (self.idEdit) {
              //编辑
              let sid = localStorage.getItem('sid');
                this.$axios({
                  method: 'PATCH',
                  url: window.baseURL + 'admin/v1/user',
                  // headers: {'X-XSRF-TOKEN': token},
                  data: {
                    name:self.add_name,
                    oneWord:self.add_simpleintro,
                    intro:self.shadowmanIntro,
                    fans:this.add_fans,
                    attention:this.add_attention,
                    template:this.add_displaytype,
                    img:this.img,
                    background:this.bgimg,
                    type:1,
                    state : 0,
                    companyName:this.add_company,
                    mobile:this.add_mobile,
                    sex:this.add_sex,
                    id: sid,
                    groupName:typeName,
                    categoryName:sortName,
                      userId : this.add_user_id,
                      id : this.add_studio_id,
                    categoryIds : categoryidsstr,
                      groupId:self.type01_add,
                      categoryId:self.type02_add
                  }
                })
                  .then(function (response) {
                    const code = response.data.code;
                    if (code == 200) {
                      self.$message('修改成功！');
                      self.dialogFormVisible = false;
                      self.dosearch();
                    } else {
                      self.$message('修改失败！');
                    }
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
              } else {
                //保存信息

                    this.$axios({
                      method: 'POST',
                      url: window.baseURL + 'admin/v1/user',
                      //headers: {'Content-Type': 'application/json'},
                      data: {
                        name:self.add_name,
                        oneWord:self.add_simpleintro,
                        intro:self.shadowmanIntro,
                        fans:this.add_fans,
                        attention:this.add_attention,
                        template:this.add_displaytype,
                        img:this.img,
                        background:this.bgimg,
                        companyName:this.add_company,
                        mobile:this.add_mobile,
                        sex:this.add_sex,
                        groupId:self.type01_add,
                        categoryId:self.type02_add,
                        groupName:typeName,
                        categoryName:sortName,
                        type:1,//1影人2工作室3圈层机构
                        state:0,
                        categoryIds : categoryidsstr
                      }
                    })
                      .then(function (response) {
                        const code = response.data.code;
                        if (code == 200) {
                            self.$message.success('添加成功！');
                            self.resetForm();
                            self.dialogFormVisible = false;
                            self.dosearch();
                        }else {
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
          dosearch(){
            const self = this;
            this.$axios({
              method:'GET',
              url:window.baseURL + 'admin/v1/user',
              // headers: {'X-XSRF-TOKEN': token},
              params: {
                name:self.search_name,
                groupId:self.type01,
                categoryId:self.type02,
                createDate:self.search_createtime,
                beforeCount:self.search_historycount,
                videoCount:self.search_videocount,
                demandCount:self.search_demandcount,
                receiveCount:self.search_receivecount,
                scriptCount:self.search_copyrightcount,
                type:1,//1影人2工作室3圈层机构
                page: self.cur_page,
                size: self.pageSize,
              }
            })
              .then(function (response) {
                const code = response.data.code;
                if(code == 200){
                  self.total_Count = response.data.body.total;
                  self.userList = response.data.body.users;
                }else {
                  this.$message('搜索失败！');
                }
              })
          },
          handleSelectionChange(val) {
            this.multipleSelection = val;
          },
          videoFileUrl(data) {
            const self = this;
            self.banname = data;
            this.bgimgparent =  window.basePic+data;

          },
          handleCurrentChange(val) {
            this.cur_page = val;
            this.getData(val);
          },
          handleHidden(index, row) {
            const self = this;
            var bid = JSON.stringify(row.id);
            axios({
              method: 'DELETE',
              url: window.baseURL + 'admin/v1/user/' + bid,
            })
              .then(function (response) {
                const code = response.data.code;
                if (code == 200) {
                    self.dosearch();
                } else {
                  this.$message("隐藏失败");
                }
              });
          },
            handleRec(index, row){  //推荐，取消推荐

                var state_up = 0;
                if(row.recommendType == 0){
                    state_up = 1;
                }else{
                    state_up = 0;
                }
                const self = this;
                var userid = row.userId;
                axios({
                    method: 'PATCH',
                    url: window.baseURL + 'admin/v1/user/recommend',
                    data: {
                        id : userid,
                        state : state_up
                    }
                })
                    .then(function (response) {
                        const code = response.data.code;
                        console.log("code:"+code);
                        if (code == 200) {
                            self.$message("操作成功");
                            self.dosearch();
                        } else {
                            self.$message("隐藏失败");
                        }
                    });
            },
          getCate(){

            axios({
              method:'get',
              url:window.baseURL + 'admin/category',
              data:{
                code:'SHADOWMAN_TYPE',
              }
            }).then(res =>{

              let dataArr = res.data.body;
              let array1 = [];
              let tempObj = {};

              for (var i = 0; i < dataArr.length; i++) {
                var obj = dataArr[i];
                if (obj.level == 1){
                  obj['subs'] = [];
                  array1.push(obj);

                }else if (obj.level == 2){
                  obj['subs'] = [];
                  let str =  'pId'+obj.parentId;
                  if(this.$lodash.isEmpty(tempObj[str])){

                    tempObj[str]=[obj];
                  }else {
                    tempObj[str].push(obj);
                  }
                }
              }

              for (var i = 0; i < array1.length; i++) {
                var obj = array1[i];
                let str =  'pId'+obj.id;
                obj.subs = tempObj[str];
              }
              this.sellTypeList = array1;

            }).catch(err =>{

            })
          },
          //分类联动
          updateSort() {
            const self = this;
            for (var i = 0; i < this.sellTypeList.length; i++) {
              var obj = this.sellTypeList[i];

                if (self.type01_add == obj.id) {
                  self.sortTypeList = obj.subs;
                  self.type02_add = self.sortTypeList[0].id;
                  break;
                }

              if (this.type01 == obj.id) {
                this.sortTypeList = obj.subs;
                //this.categoryTypeList = obj.subs[0].subs;
                this.type02 = this.sortTypeList[0].id;
                break;
              }
            }
          },
          updateCategory() {
            for (var i = 0; i < this.sortTypeList.length; i++) {
              var obj = this.sortTypeList[i];
              if (this.type02 == obj.id) {
                this.categoryTypeList = obj.subs;
                break;
              }
            }
            for(var i = 0 ; i < categoryTypeList.length; i++){

            }
          },
        },
        components : {
           upload
        },
    }

</script>





<style scoped="">
    @import "../../../static/css/style.css";
    .el-row{margin-bottom: 10px}

    .form_label{
        margin-top:5px;
    }
.sv{margin-left: 260px;margin-right: 30px}
#datatime{width:176px}
    .saveadd{margin-left: 250px;margin-right: 40px}
    .change{margin-left: 120px}
/*#imageBox{z-index: 100}*/
    /*#spinner{z-index: 999}*/
    /*.cropped{z-index: 100;width: 100px;right: -130px}*/
    /*.imageBox{background: url(../../../static/img/img.jpg)}*/
    /*.thumbBox{z-index: 100;position: absolute;}*/

</style>