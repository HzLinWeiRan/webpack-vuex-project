<template>
  <div>
    <div class="vux-demo">
      <img  class="logo" src="../../assets/vux_logo.png">
      <h1>{{homepage.title}}</h1>
    </div>
    <group title="pages" >
      <cell title="page1" value='page1' link='page1' is-link></cell>
      <cell title="page2" value='page2' link='page2/1?test=2' is-link></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Loading} from 'vux'
import { mapState, mapGetters,mapActions} from 'vuex'

export default {
  beforeCreate(){
  },
  created(){
  },
  components: {
    Group,
    Cell
  },
  created: function(){
  },
  computed: {
    ...mapState({
      homepage: state => state.homepage,
      isLoading: state => true
    })
  },
  methods: {
  },
  waitForData: true
}
</script>

<style lang="less">
@import './homepage.less';
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
