<template>
  <div>
    <div class="vux-demo">
      <img  class="logo" src="../../assets/vux_logo.png">
      <h1>{{ $t("hello world") }}</h1>
    </div>
    <group title="pages" >
      <cell :title='$t("page1")' :value='$t("page1")' link='page1' is-link></cell>
      <cell :title='$t("page2")' :value='$t("page2")' link='page2/1?test=2' is-link></cell>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" v-if="!userName" action-type="button" @click.native="loginClick">{{$t('login')}}</x-button>
      <x-button type="primary" v-else action-type="button" @click.native="loginOutClick">{{$t('logout')}}</x-button>
    </box>
  </div>
</template>

<script>
import { Group, Cell, Loading, XButton, Box} from 'vux'
import { mapState, mapGetters,mapActions} from 'vuex'

export default {
  beforeCreate(){
  },
  created(){
    console.log(this);
  },
  components: {
    Group,
    Cell,
    XButton,
    Box
  },
  computed: {
    ...mapState({
      homepage: state => state.homepage,
      isLoading: state => true,
      userName: state=> state.userName
    }),
  },
  methods: {
    loginClick: function(){
      this.$store.commit('LOGIN_ACTION');
    },
    loginOutClick: function() {
      this.$store.commit('LOGIN_OUT_ACTION');
    }
  },
  waitForData: true
}
</script>

<style lang="less" scoped>
@import './homepage.less';
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
