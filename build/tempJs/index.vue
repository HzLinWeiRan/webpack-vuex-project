<template>
    <div class="{{name}}">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: '{{name}}',
    components: {
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '{{name}}.less';
</style>