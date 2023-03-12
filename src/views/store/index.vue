<template>
    <div class="storeDetails">
        <Header title="店铺" />
        <div class="content">
            <div class="img"></div>
            <div class="foodSort">
                <div class="name">
                        {{ title }}
                       <img :src="img" alt="" class="store-img">
                </div>
                <van-tabs color="#ffc400">
                    <van-tab v-for="(item, index) in storeData" :title="item.name">
                      
                            <FoodList :index="index" :foodData="item.data" /> 
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <!-- 加入购物车ActionBar栏 -->
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服"/>
            <van-action-bar-icon icon="cart-o" text="购物车" :badge="store.state.cartList.length" @click="goCart"/>
            <van-action-bar-icon icon="shop-o" text="店铺" badge="2" />
            <van-action-bar-button type="warning" text="加入购物车" @click="handleAddCart"/>
            <van-action-bar-button type="danger" text="立即购买" @click="goBuy"/>
        </van-action-bar>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import FoodList from './components/FoodList.vue';
import { useRouter } from 'vue-router';
import { reactive, toRefs,onMounted } from 'vue';
import { useStore } from 'vuex'
import { Toast } from 'vant';
import {getApiStoreData} from '../../api/api'
export default {
    components: { Header, FoodList },
    setup() {
        let store = useStore() 
        const router = useRouter()
        const date = reactive({
            title: '鱼拿酸菜鱼',
            img: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
            storeData: [],
        })
        const getStoreData = ()=>{
            getApiStoreData().then((res)=>{
                console.log(res);
               date.storeData = res
              
            })
        }
              //axios结合mockjs请求数据
        // axios.get("/store/getStoreData").then((res)=>{
        //     console.log(res);
        //     const {code,storeData} = res.data
        //     if(code == 200){
        //         data.storeData = storeData
        //     }
        // })
        
      
        // 加入购物车
        const handleAddCart = (type)=> {
            let newList = store.state.cartList || []
            date.storeData.forEach(item =>{
                item.data.items?.forEach(item => {
                    item.children.forEach(item => {
                        if(item.num > 0){
                            newList.push(item)
                        }
                    })
                })
            })
            if(newList.length === 0){
                Toast('请选择商品')
                return
            }
            store.commit("addCart",newList)
            type === 'buy'? goCart():""
        }
        const goCart = () => {
            router.push("/cart")
        }
        const goBuy = ()=> {
            handleAddCart('buy')
        }
        onMounted(()=>{
            getStoreData()
        })
        return {
            ...toRefs(date),
            handleAddCart,
            store,
            goCart,
            goBuy,
        }
    }
}
</script>

<style lang="less" scoped>
.storeDetails {
    width: 100%;
    display: flex;
    flex-flow: column;

    .content {
        flex: 1;
        overflow-y: auto;

        .img {
            background: url("../../assets/yuna.jpg") no-repeat center/cover;
            width: 100%;
            height: 150px;
        }

        .foodSort {
            background-color: #fff;
            height: 500px;
            border-radius: 20px 20px 0 0;
            margin-top: -25px;

            .sort {
                margin-top: 10px;
            }

            .name {
                display: flex;
                justify-content: space-between;
                padding: 20px;

                // align-items: center;
                .store-img {
                    width: 80px;
                    height: 80px;
                    margin-top: -25px;
                    border-radius: 20px;
                }
            }
        }
    }
}
</style>