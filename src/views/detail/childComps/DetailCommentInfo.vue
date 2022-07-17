<template>
    <div>
        <!-- {{ title }} -->
    </div>
</template>
<script>

export default {
    data () {
        return {
            title: '1'
        }
    },
    props:{
        commentInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style>

</style>