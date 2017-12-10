import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/readme',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/Readme.vue'], resolve)
        },
        {
          path: '/FormRule',
          component: resolve => require(['../components/page/FormRule.vue'], resolve)
        },

        {
          path: '/chooseuser',
          component: resolve => require(['../components/common/ChooseUser.vue'], resolve)
        },
        {
          path: '/showuser',
          component: resolve => require(['../components/common/ShowUser.vue'], resolve)
        },
        {
          path: '/studioList',
          component: resolve => require(['../components/page/StudioListManage.vue'], resolve)
        },
        {
          path: '/companyList',
          component: resolve => require(['../components/page/CompanyList.vue'], resolve)
        },
        {
          path: '/choosevideoshow',
          component: resolve => require(['../components/others/choosevideoshow.vue'], resolve)
        },
        {
          path: '/basetable',
          component: resolve => require(['../components/page/BaseTable.vue'], resolve)
        },
        {
          path: '/BannerList_pop',
          component: resolve => require(['../components/page/BannerList_pop.vue'], resolve),
        },
        {
          path: '/vuetable',
          component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
        },
        {
          path: '/baseform',
          component: resolve => require(['../components/page/BaseForm.vue'], resolve)
        },
        {
          path: '/vueeditor',
          component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
        },
        {
          path: '/markdown',
          component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
        },
        {
          path: '/upload',
          component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
        },
        {
          path: '/basecharts',
          component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
        },
        {
          path: '/drag',
          component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
        },
        {
          path: '/uploadFile',
          component: resolve => require(['../components/page/UploadFile.vue'], resolve)    // 编辑这里
        },
        {
          path: '/addVideo',
          component: resolve => require(['../components/page/AddVideo.vue'], resolve)
        },
        {
          path: '/editVideo',
          component: resolve => require(['../components/page/editVideo.vue'], resolve)
        },
        {
          path: '/videoconfig',
          component: resolve => require(['../components/page/VideoConfig.vue'], resolve)
        },
        {
          path: '/vueeditor_edit',
          component: resolve => require(['../components/page/VueEditor_edit.vue'], resolve)    // Vue-Quill-Editor组件
        },
        {
          path: '/banner_add',
          component: resolve => require(['../components/page/BannerAdd.vue'], resolve)
        },
        {
          path: '/AddProject',
          component: resolve => require(['../components/page/AddProject.vue'], resolve)
        },
        {
          path: '/EditProject',
          component: resolve => require(['../components/page/EditProject.vue'], resolve)
        },
        {
          path: '/ProjectConfig',
          component: resolve => require(['../components/page/ProjectConfig.vue'], resolve)
        },
        {
          path: '/shadowmanList',
          component: resolve => require(['../components/page/shadowmanList.vue'], resolve)
        },
        {
          path: '/CopyrightManage',
          component: resolve => require(['../components/page/CopyrightManage.vue'], resolve)
        },
        {
          path: '/AddCopyright',
          component: resolve => require(['../components/page/AddCopyright.vue'], resolve)
        },
        {
          path: '/AtudioApprove',
          component: resolve => require(['../components/page/StudioApprove.vue'], resolve)
        },
        {
          path: '/studioCircleApprove',
          component: resolve => require(['../components/page/studioCircleApprove.vue'], resolve)
        },
        {
          path: '/AddNeed',
          component: resolve => require(['../components/page/AddNeed.vue'], resolve)
        },
        {
          path: '/EditNeed',
          component: resolve => require(['../components/page/EditNeed.vue'], resolve)
        },
        {
          path: '/EditSupply',
          component: resolve => require(['../components/page/EditSupply.vue'], resolve)
        },
        {
          path: '/AddSupply',
          component: resolve => require(['../components/page/AddSupply.vue'], resolve)
        },
        {
          path: '/BehaviorConfig',
          component: resolve => require(['../components/page/BehaviorConfig.vue'], resolve)
        },
        {
          path: '/StudioList',
          component: resolve => require(['../components/page/StudioList.vue'], resolve)
        },
        {
          path: '/OrgList',
          component: resolve => require(['../components/page/OrgList.vue'], resolve)
        },
        {
          path: '/AddDynamic',
          component: resolve => require(['../components/page/AddDynamic.vue'], resolve)
        },
        {
          path: '/EditDynamic',
          component: resolve => require(['../components/page/EditDynamic.vue'], resolve)
        },
        {
          path: '/DemandList',
          component: resolve => require(['../components/page/DemandList.vue'], resolve)
        },
        {
          path: '/dynamicList',
          component: resolve => require(['../components/page/DynamicList.vue'], resolve)
        },
        {
          path: '/AddStudio',
          component: resolve => require(['../components/page/AddStudio.vue'], resolve)
        },
        {
          path: '/shortVideo',
          component: resolve => require(['../components/page/shortVideo.vue'], resolve)
        },

        {
          path: '/studioaccreditation',
          component: resolve => require(['../components/page/studioAccreditation.vue'], resolve)
        },
        {
          path: '/qcjgaccreditation',
          component: resolve => require(['../components/page/qcjgAccreditation.vue'], resolve)
        },
          {
              path: '/activitymanage',
              component: resolve => require(['../components/page/activityManage.vue'], resolve)
          },
        {
          path: '/FilmerList',
          component: resolve => require(['../components/page/FilmerList.vue'], resolve)
        },
        {
              path: '/AlbumList',
              component: resolve => require(['../components/page/AlbumList.vue'], resolve)
        },{
              path: '/StudioAdmin',
              component: resolve => require(['../components/page/StudioAdmin.vue'], resolve)
          },{
              path: '/StarAdmin',
              component: resolve => require(['../components/page/StarAdmin.vue'], resolve)
          },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login_admin.vue'], resolve)
    }
  ]
})
