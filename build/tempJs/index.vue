<template>
  <div class="${className}">
    page ${fileName}
  </div>
</template>

<script>
export default {
  name: 'hello',
  components: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '${className}.less';
</style>
