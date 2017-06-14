<template>
  <div class="hello">
    页面自定义公共标题
    <mainfest>
        <span>title</span>
    </mainfest>
    没参数时
    <mainfest/>
    keepAlive component demo 
    <keep-alive>
        <component :is="currentView">
            component
        </component>
    </keep-alive>
    transition demo
    
  </div>
</template>

<script>
import Mainfest from '@/components/mainfest/mainfest' 
export default {
  name: 'hello',
  components: {
    Mainfest
  },
  data () {
    return {
      currentView: 'Mainfest',
      show: true
    }
  },
  methods: {
    hide:function(){
      this.show= false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
