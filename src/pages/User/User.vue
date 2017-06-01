<template>
    <div class="red">
        {{msg}}
        <p class="yellow">123</p>
    </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapState, mapGetters,mapActions} from 'vuex'

export default {
  components: {
    Group,
    Cell
  },
  created: function(){
    this.$store.dispatch('INIT_MSG')
    console.log(this.$route)
  },
  computed: {
    ...mapState({
      msg: state => state.msg,
      a: state => state.a
    })
  },
  methods: {
  },
  waitForData: true
}
</script>

<style lang='less'>
@import 'User.less';
</style>
