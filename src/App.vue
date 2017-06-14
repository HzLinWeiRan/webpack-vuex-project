<template>
    <div id="app">
        <transition name="move" mode="out-in" appear>
            <x-header>
                {{title}}
            </x-header>
        </transition>
        <transition name="move" mode="out-in" appear>
            <router-view></router-view>
        </transition>
        <loading v-model="isLoading"></loading>
    </div>
</template>

<script>
import {Loading,XHeader} from 'vux'
import {mapState} from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState({
      isLoading: state => state.loadModule.isLoading,
      title: state => state.loadModule.title
    })
  },
  components: {
    Loading,
    XHeader
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './App.less';

</style>
