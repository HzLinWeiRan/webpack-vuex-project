<template>
    <div>
        <group>
            <cell v-for="user in users" :title="user.website" v-model:value="user.name" :key="user.id" is-link></cell>
        </group>
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
    console.log(this.$route.params.test)
    console.log(this.$route.query.test)
    this.$store.dispatch('USER_FETCH')
  },
  computed: {
    ...mapState({
      msg: state => state.msg,
      a: state => state.a,
      users: state => state.user.list
    })
  },
  methods: {
  },
  waitForData: true
}
</script>

<style lang='less'>
@import 'page2.less';
</style>
