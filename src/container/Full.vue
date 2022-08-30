<template>
    <div class="main-container">
        <Navigation></Navigation>
        <router-view class="mt-110"></router-view>
        <div class="footer">
          XCHNG | total exchange solution
        </div>
    </div>
</template>


<script>
    import Navigation from '@/components/share/navigation/navigation.vue'

    export default {
        name: 'Full',
        components: {Navigation},
    }
</script>


<style>
    .main-container {
        height: calc(100vh - 75px); /* will cover the 100% of viewport */
        overflow: hidden;
        display: block;
        position: relative;
        padding-bottom: 75px; /* height of your footer */
    }

    .mt-110 {
        margin-top: -110px !important;
    }

    .footer {
        /*height: 75px;*/
        right: 13%;
        position: absolute;
        bottom: 0;
        width: 1108px;
        box-shadow: 0 -1px 0 0 #eaecee;
        font-size: 12px;
        color: #9ea0a5;
        line-height: 1.92;
        padding: 15px 0;
        text-align: right;
        margin-top: 50px !important;
        margin: auto;
    }
</style>
