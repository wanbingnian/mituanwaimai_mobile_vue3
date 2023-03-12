<template>
    <div class="home">
        <div class="context">
            <!-- 头部 -->
            <div class="header">
                <div class="text">外卖</div>
                <div class="location">
                    <van-icon name="location-o" class="icon"/>
                    <span @click="toAddress">{{spanData}}</span>
                    <van-icon name="arrow" class="icon"/>
                </div>
            </div>
            <!-- 主要内容区域 -->
            <div class="main">
                <div class="main-bg">
                    <!-- 搜索框 -->
                    <div class="search">
                        <input type="text">
                        <div class="search-text">搜索</div>
                    </div>
                    <!-- 分类 -->
                    <div class="sort">
                        <div class="big-sort">
                            <div v-for="(item, index) in big_sort" :key="index">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="`#${item.icon}`"></use>
                                </svg>
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="small-sort">
                            <div v-for="(item, index) in small_sort" :key="index">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="`#${item.icon}`"></use>
                                </svg>
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- tab栏 -->
                <van-tabs v-model:active="active" class="van-tabs">
                    <van-tab v-for="(item, index) in centent_nav_list" :key="index" :title="item.tab">
                        <nav-list :navList="item.data" />
                    </van-tab>

                </van-tabs>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { toRefs, reactive, ref ,onMounted} from 'vue';
import Footer from '../../components/Footer.vue';
import NavList from './components/NavList.vue';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router'
// import axios from 'axios'
import {getApiHomeData} from '../../api/api'

export default {
    setup() {
        const router = useRouter()
        let store = useStore()
        const dates = reactive(
            {
                big_sort: [],
                small_sort:[],
                centent_nav_list: [],
                spanData:'',//首页地址数据
            })
        const active = ref(0)
        // 首页右上角地址span
        const span = ()=>{
            store.state.userAddress.forEach(item=>{
                if(item.isDefault){
                    dates.spanData = `${item.province}${item.city}${item.county}${item.addressDetail}`
                }
            })
        }
        // 首页地址跳转
        const toAddress =()=>{
            router.push('/address')
        }
        //axios结合mockjs请求数据
        const getHomeData =()=>{
            getApiHomeData().then((res)=>{
                    dates.big_sort = res.big_sort
                    dates.small_sort = res.small_sort
                    dates.centent_nav_list = res.centent_nav_list
                    console.log(res);
            })
            // axios.get("/home/getHomeData").then((res)=>{
            //     const {code,homeData} = res.data
            //     if(code==200){
            //         dates.big_sort = homeData.big_sort
            //         dates.small_sort = homeData.small_sort
            //         dates.centent_nav_list = homeData.centent_nav_list
            //     }
            // })
            //mockjs

        }
        onMounted(() => {
            getHomeData(),
            span()
        })
        return {
            ...toRefs(dates),
            active,
            toAddress
        }
    },
    components: { Footer, NavList },
}

</script>

<style lang="less" scoped>
.home {
    display: flex;
    flex-flow: column;
    height: 100%;
    font-size: 12px;

    .context {
        flex: 1;
        overflow-y: auto;

        // 头部样式
        .header {
            background-image: linear-gradient(#ffc400, #fff);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 20px 40px 20px;

            .text {
                font-size: 20px;
                font-weight: 600;
            }

            .location {
                display: flex;
                justify-content: space-around;
                .icon{
                    flex: 1;
                    text-align:center;
                    margin-top: 3px;
                    
                }
                span {
                    flex: 4;
                    // display:inline-block;
                    margin: 0 7px;
                    width: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: center;
                    
                }

                font-size: 14px;
            }
        }

        // 主体样式
        .main {
            margin-top: -30px;

            // 背景样式
            .main-bg {
                background-image: linear-gradient(#fff, #f5f5f5);
                padding: 10px 20px 0 20px;
                border-radius: 30px 30px 0 0;

                //  搜索框
                .search {
                    position: relative;

                    input {
                        width: 100%;
                        border: 1px solid #ffc400;
                        border-radius: 20px;
                        height: 30px;
                    }

                    .search-text {
                        position: absolute;
                        right: -6px;
                        top: 1px;
                        font-size: 14px;
                        background-color: #ffc400;
                        border-radius: 16px;
                        line-height: 32px;
                        text-align: center;
                        width: 50px;
                    }
                }

                // 分类栏
                .sort {
                    padding: 20px 0;

                    .big-sort {
                        display: flex;

                        div {
                            flex: 1;
                            display: flex;
                            flex-flow: column;
                            align-items: center;
                            justify-content: center;

                            .icon {
                                width: 50px;
                                height: 50px;
                                margin-bottom: 5px;
                            }
                        }
                    }

                    .small-sort {
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 20px;

                        div {
                            display: flex;
                            flex-flow: column;
                            align-items: center;
                            justify-content: center;
                            width: 20%;
                            margin-bottom: 10px;

                            .icon {
                                width: 30px;
                                height: 30px;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
            }

            // tab栏
            .van-tabs {
                padding: 0 20px 10px;
            }
        }
    }
}

/deep/ .van-tabs__wrap {
    border-radius: 10px;
}
</style>