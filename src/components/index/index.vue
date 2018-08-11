<template>
    <div id="index">
        <v-head></v-head>
        <div class="banner_box" v-bind:style="{height:670+'px'}">
            <a class="banner" href="#" :class="{setFixed:isFixed}"  v-bind:style="{height:banner_height+'px'}">
                <div class="banner_time">25/Jul.2018
                </div>
                <div class="banner_name">格鲁吉亚·土耳其半月，车马都</div>
                <img :src="banner" alt="">
            </a>
        </div>
        
        <div class="banner2 clearfix" >
            <div class="banner2_pic">
                <img :src="banner2" alt="">
            </div>
            <div class="banner2_text">
                <a href="#" class="name">ISUX世界杯表情壁纸大汇</a>
                <a href="#" class="type">#设计</a>
            </div>
        </div>
        <div class="content clearfix">
            <div class="indexlist">
                <v-list></v-list>
            </div>
        </div>
        <v-foot></v-foot>
    </div>
</template>
<script>
import $ from 'zepto';
import './index.scss';
import head from 'commons/head/head.vue';
import foot from 'commons/foot/foot.vue';
import list from 'commons/list/list.vue';
import banner from './images/banner.png';
import banner2 from './images/banner2.png';
export default {
    name: 'index',
    data() {
        return {
            banner: banner,
            banner2:banner2,
            banner_height:670,
            isFixed:false,
            banner_top:0
        }
    },
    methods: {
        handleScroll: function(e) {
            // if (!this.hide) {
            //     if ($("html").scrollTop() >= 50) {
            //         this.hide = true;
            //     }
            // }
            var scrollTop = $("html").scrollTop();
            if (scrollTop>200){
                this.isFixed = true;
                this.banner_height = 670- (scrollTop -200);
                // if (scrollTop < 50) {
                //     this.hide = false;
                // }
                if(scrollTop>884){
                    this.banner_height = 0;
                }
            }else{
                this.isFixed = false;
                this.banner_height = 670;
            }
            // console.log($("html").scrollTop())
        }
    },
    components: {
        'v-head': head,
        'v-list':list,
        'v-foot':foot
    },
    mounted: function() {
        window.addEventListener('scroll', this.handleScroll)
    }

};
</script>