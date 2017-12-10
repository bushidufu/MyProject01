<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title
                            }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        items: [
          {
            icon: 'el-icon-more',
            title: '原生组件',
            index: '1',
            subs: [
              {
                icon: 'el-icon-setting',
                index: 'readme',
                title: '自述'
              },
              {
                icon: 'el-icon-setting',
                index: 'formRule',
                title: '表单验证'
              },
              {
                index: 'basetable',
                title: '选择用户'
              },
              {
                 index: 'choosevideoshow',
                 title: '选择视频'
              },
              {
                index: 'vuetable',
                title: 'Vue表格组件'
              },
              {
                index: 'baseform',
                title: '基本表单'
              },
              {
                index: 'vueeditor',
                title: '编辑器'
              },
              {
                index: 'markdown',
                title: 'markdown'
              },
              {
                index: 'upload',
                title: '文件上传'
              },
              {
                icon: 'el-icon-star-on',
                index: 'basecharts',
                title: '图表'
              },
              {
                icon: 'el-icon-upload2',
                index: 'drag',
                title: '拖拽'
              }
            ]
          },
          {
            icon: 'el-icon-setting',
            title: '开发组件',
            index: '2',
            subs: [
              {
                icon: 'el-icon-upload2',
                index: 'uploadFile',
                title: '上传图片'
              },
              {
                icon: 'el-icon-vueeditor_edit',
                index: 'vueeditor_edit',
                title: '富文本编辑器'
              },
                {
                    icon: 'el-icon-vueeditor_edit',
                    index: 'chooseuser',
                    title: '选择用户'

                }
            ]
          },
          {
            icon: 'el-icon-picture',
            title: '内容管理',
            index: '3',
            subs: [
              {
                icon: 'el-icon-banner',
                index: 'BannerList_pop',
                title: 'banner管理'
              },
              {
                index: 'VideoConfig',
                title: '短视频管理'
              },
              {
                index: 'ProjectConfig',
                title: '项目管理'
              },
              {
                icon: 'el-icon-copyright',
                index: 'CopyrightManage',
                title: '版权管理'
              },
                {
                    icon: 'el-icon-copyright',
                    index: 'AlbumList',
                    title: '相册管理'
                }
            ]
          }, {
                icon: 'el-icon-menu',
                title: '用户管理',
                index: '4',
                subs: [
                    {
                        icon: 'el-icon-banner',
                        index: 'shadowmanList',
                        title: '影人列表'
                    },
                    {
                        index: 'studioList',
                        title: '工作室列表'
                    },
                    {
                        index: 'companyList',
                        title: '圈层机构列表'
                    },
                    {
                        icon: 'el-icon-copyright',
                        index: 'dynamicList',
                        title: '动态管理'
                    },
                    {
                        icon: 'el-icon-copyright',
                        index: 'StudioAdmin',
                        title: '工作室管理'
                    },{
                        icon: 'el-icon-copyright',
                        index: 'StarAdmin',
                        title: '影人管理'
                    }
                ]
            },
            {
                 icon: 'el-icon-star-on',
                title: '认证相关',
                index: '5',
                subs: [
                    {
                        icon: 'el-icon-banner',
                        index: 'studioaccreditation',
                        title: '工作室认证'
                    },
                    {

                        index: 'qcjgaccreditation',
                        title: '圈层机构认证'

                    }
                ]
            },
            {
                icon: 'el-icon-warning',
                title: '需求管理',
                index: '6',
                subs: [
                    {
                        icon: 'el-icon-banner',
                        index: 'DemandList',
                        title: '需求列表'
                    },
                    {
                        index: 'AddNeed',
                        title: '供需添加'
                    }
//                    ,
//                    {
//                        index: 'AddSupply',
//                        title: '供给添加'
//                    }
                ]
            },
            {
                icon: 'el-icon-warning',
                title: '活动管理',
                index: '7',
                subs: [
                    {
                        icon: 'el-icon-banner',
                        index: 'activitymanage',
                        title: '活动列表'
                    },

                ]
            },
        ]
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }

    }
  }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
