<template>
    <div class="test">
        {{msg}}
        <span>test</span>
    </div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            default: '123'
        }
    }
}
</script>

<style lang="less">
@import './a.less';
</style>