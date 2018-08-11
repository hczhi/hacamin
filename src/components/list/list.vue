<template>
    <div id="demo">
        <p class="demo">这是list测试页面</p>
        <img :src="img" alt="">
        <y-payment :data="data" v-model="value1"  selectedColor="#09f"></y-payment>
    </div>
</template>
<script>
import $ from 'zepto';
import './list.scss';
import img from './images/icon_firm.png';
import ycf from 'ycf/ycf.js';
import 'ycf/ycf.css';
import travelcardpay from './images/order_submit_payment_travelcard_icon@2x.png';
export default {
    name: 'list',
    data() {
        return {
            img: img,
            data: [
                    {
                        title: '微信支付',
                        description: '推荐已安装微信的用户使用',
                        img: travelcardpay
                    },
                    {
                        title: '支付宝支付',
                        description: '推荐已安装支付宝的用户使用',
                        img: travelcardpay
                    }
            ],
            value1: 0
        }
    },
    methods: {

    },
    mounted:function(){
    	console.log(ycf)
    }

};
</script>