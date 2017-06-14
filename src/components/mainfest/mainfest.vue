<template>
    <div>
        <div class="mainfest">
            <slot>no-title</slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style lang="less">
@import './mainfest.less';
</style>