<template>
    <div id="head" class="clearfix">
        <div class="headBox" :class="{hideHead:hide}">
            <a href="#" class="logo">
            <img :src=logo>
        </a>
            <div class="nav">
                <a href="#">首页</a>
                <a href="#">分类</a>
                <a href="#">关于</a>
            </div>
            <i class="iconfont icon-sousuo"></i>
        </div>
    </div>
</template>
<script>
import './head.scss';
import $ from 'zepto';
import logo from './logo.png';

export default {
    name: 'head',
    data() {
        return {
            logo: logo,
            scrollTop: 0,
            hide: false
        }
    },
    methods: {
        handleScroll: function(e) {
            if (!this.hide) {
                if ($("html").scrollTop() >= 50) {
                    this.hide = true;
                }
            }

            if (this.hide) {
                if ($("html").scrollTop() < 50) {
                    this.hide = false;
                }
            }


        }
    },
    mounted: function() {
        window.addEventListener('scroll', this.handleScroll)
    }

};
</script>