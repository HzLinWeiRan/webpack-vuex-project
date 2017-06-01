<template>
    <div>
        {{msg}}
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