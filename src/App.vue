<template>
  <div id="app">
    <router-view></router-view>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import {Loading} from 'vux'
import {mapState} from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState({
      isLoading: state => state.loadModule.isLoading
    })
  },
  components: {
    Loading
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
