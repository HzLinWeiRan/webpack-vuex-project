<template>
  <div id="app">
    <mainfest title="appMainfest"></mainfest>
    <router-view></router-view>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import {Loading} from 'vux'
import {mapState} from 'vuex'
import Mainfest from '@/components/mainfest/mainfest'

export default {
  name: 'app',
  computed: {
    ...mapState({
      isLoading: state => state.loadModule.isLoading
    })
  },
  components: {
    Loading,
    Mainfest
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
