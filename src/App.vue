<template>
    <div id="app">
        <x-header :left-options="{showBack: !isHomePage}" transition="move" :title="$t(title)">
        </x-header>
        <div class="pd-15">
          <button-tab v-model="langIndex">
            <button-tab-item v-for="language in languages" :key="language" @on-item-click="choseLang(language)">{{$t(language)}} </button-tab-item>
          </button-tab>
        </div>
        <transition name="move" >
          <router-view></router-view>
        </transition>
        <loading v-model="isLoading"></loading>
    </div>
</template>

<script>
import {Loading,XHeader,ButtonTab,ButtonTabItem} from 'vux'
import {mapState} from 'vuex'

export default {
  name: 'app',
  beforeCreate() {
    this.$store.commit('INIT_STATUS');
  },
  data () { 
    return {
      langIndex: Object.keys(this.$i18n.messages).indexOf(localStorage.locale),
      locale: localStorage.locale,
      languages: Object.keys(this.$i18n.messages)
    } 
  },
  watch: {
    locale (val) {
      localStorage.locale = val;
      this.$i18n.locale = val;
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.appModule.isLoading,
      title: state => state.appModule.title,
      isHomePage: state => state.appModule.isHomePage
    })
  },
  methods: {
    choseLang: function(lang) {
      this.locale = lang;
    }
  },
  components: {
    Loading,
    XHeader,
    ButtonTab,
    ButtonTabItem
  }
}
</script>

<style lang="less" >
@import '~vux/src/styles/reset.less';
@import './styles/App.less';

</style>
