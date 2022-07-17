<template>
    <div class="detail-swiperr">
        <swiper class="swiperr">
            <swiper-item v-for="item in ctopImages" :key="item.index">
                <img :src="item">
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    data () {
        return {
            title: '111'
        }
    },
    props:{
        ctopImages:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem,
    }
}
</script>
<style scoped>
    .swiperr{
        height: 300px;
        overflow: hidden;
    }
</style>