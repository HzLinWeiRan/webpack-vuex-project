<template>
    <div id="app">
        <x-header :left-options="{showBack: !isHomePage}">
            {{title}}
        </x-header>
        <transition name="move" mode="out-in" appear>
            <keep-alive>
                <router-view>11111111111111111</router-view>
            </keep-alive>
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
      isLoading: state => state.appModule.isLoading,
      title: state => state.appModule.title,
      isHomePage: state => state.appModule.isHomePage
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
