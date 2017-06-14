<template>
    <div>
        <div class="mainfest">
            {{title}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '123'
        }
    }
}
</script>

<style lang="less">
@import './mainfest.less';
</style>