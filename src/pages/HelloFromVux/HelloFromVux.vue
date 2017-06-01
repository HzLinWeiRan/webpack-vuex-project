<template>
  <div>
    <div class="vux-demo">
      <img  class="logo" src="../../assets/vux_logo.png">
      <h1 @click='handlerClick("test")' >{{msg}}{{getLength}}{{a.msg}}</h1>
      <h1 @click='handlerClick2' >{{msg}}{{getLength}}{{a.msg}}</h1>
    </div>
    <router-link :to='{name:"user",params:{test:1},query:{test:2}}'>123123</router-link>
    <group title="cell demo" >
      <cell title="Vux" value='cool' link='hello' is-link></cell>
      <cell title="Vux" value='user' link='{name:"user",params:{test:1}}' is-link></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapState, mapGetters,mapActions} from 'vuex'
import * as constants from '@/store/constants'

export default {
  beforeCreate(){
    console.log(1);
  },
  created(){
    console.log(this)
      this.$store.dispatch(constants['DO_ACTION'])
  },
  components: {
    Group,
    Cell
  },
  created: function(){
    this.$store.dispatch('INIT_MSG')
  },
  computed: {
    ...mapState({
      a: state => state.a,
      msg: state => state.msg
    }),
    ...mapGetters([
      'getLength'
    ]),
    ...mapActions({
      doAction2:constants['DO_ACTION2']
    })
  },
  methods: {
    handlerClick: function (a) {
      let thiz = this;
      this.$store.dispatch(constants['DO_ACTION'])
      // Promise.all([this.$http({
      //   url:"/api/users/1"
      // })]).then(function(data){
      //   debugger;
        
      // });
    },
    async handlerClick2(){
      console.log(await this.$store.dispatch(constants['DO_ACTION2']));
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      // msg: 'Hello World!111'
    }
  },
  waitForData: true
}
</script>

<style lang="less">
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
