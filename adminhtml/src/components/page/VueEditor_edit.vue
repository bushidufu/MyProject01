<template>
    <div id="app">
        <input type="button" value="切换2裁切" @click="canCrop=!canCrop">
        <editor ref="myTextEditor"
                :fileName="'myFile'"
                :canCrop="canCrop"
                :uploadUrl="uploadUrl"
                v-model="content">
        </editor>

    </div>
</template>

<script>
    import editor from './Quilleditor.vue'
    export default {
        name: 'app',
        data(){
          return {
            canCrop:false,
            /*测试上传图片的接口，返回结构为{url:''}*/
            uploadUrl:window.baseUploadImgUrl,
            content:''
          }
        },
        components: {
            editor
        }
    }
</script>

<style>

</style>
