<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="item.index" class="tab-control-item" v-on:click="itemClick(index)">
            <span v-bind:class="{active:currentIndex===index}">{{item}}</span>
        </div>
    </div>
</template>
<script>

export default {
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data () {
        return {
            currentIndex :0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            this.$emit('tabClick',index);
        }
    }
}
</script>
<style scoped>
.tab-control{
    display: flex;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
}

.tab-control-item{
    flex: 1;
    text-align: center;
}

.tab-control-item span{
    /* background-color: rgb(243, 205, 205); */
    padding: 5px;
}

.active{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
}

</style>