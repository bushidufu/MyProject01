<template>
    <div class="table">

        <div>
            <label >邮箱：</label>
            <input v-validate ="'required|email'" type="text"  name="email">
        </div>
        <span v-show="errors.has('email')">{{ errors.first('email')}}</span>
        <div>
            <label >文件：</label>
            <input v-validate ="'required|numeric'" type="text"  name="num">
        </div>
        <span v-show="errors.has('num')">{{ errors.first('num')}}</span>

    </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    created() {

    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>


</style>