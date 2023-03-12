<template>
    <div class="create-order">
        <Header title="生成订单" />
        <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
        <div class="content">
            <div v-for="(item, index) in store.state.orderList">
                <van-card :num="item.num" :price="item.price" :title="item.title" :thumb="item.pic" />
            </div>
        </div>
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{ allPrice }}</span>
            </div>
            <van-button class="pay-btn" type="primary" color="#ffc400" @click="handleCreateOrder">生成订单</van-button>
        </div>
    </div>
</template>
<script>
import Header from '../../components/Header.vue'
import { reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'vant';
import {useRouter,useRoute} from 'vue-router'
export default {
    components: { Header },
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        let data = reactive({
            tel: '',
            name: '',
            allPrice: 0,
        })
        // 更新用户地址信息
        const initUser = () => {
            store.state.userAddress.forEach(item => {
                if (item.isDefault) {
                    data.tel = item.tel
                    data.name = item.name
                }
            })
        }
        const initPrice = () => {
            let price = 0
            if (store.state.orderList.length) {
                store.state.orderList.forEach(item => {
                    price += item.num * item.price
                })
            }
            data.allPrice = price
        }
        const handleCreateOrder = () => {
            // 要想出现提示框  记得在main.js里按需引入一下
            Dialog({
                title: '提示',
                message: '生成订单成功',
                theme: 'round-button',
            }).then(() => {
                // 利用路由传参 在cartDetail组件点击结算时传参 以此来完成对购物车中结算了的订单剔除
                let newList = store.state.cartList.filter(item=>{
                    return !route.query.list.includes(item.id + "")
                })
                store.commit('delete',newList)
                store.commit('orderListEnd')
                // 路由跳转之前要让购物车已经被提交的订单出去，更新购物车
                router.push('/order')
            });
        }
        const onEdit = () => {
            router.push('/address')
        }
        onMounted(() => {
            initPrice()
            initUser()
        })
        return {
            ...toRefs(data),
            store,
            onEdit,
            initPrice,
            initUser,
            handleCreateOrder
        }
    }
}
</script>
<style lang="less" scoped>
.create-order {
    display: flex;
    flex-flow: column;
    height: 100%;

    .content {
        flex: 1;
        overflow-y: auto;
    }

    .pay-wrap {
        padding: 10px 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #e9e9e9;

        >div {
            display: flex;
            justify-content: space-between;
            padding: 0 5%;
            margin: 10px 0;
            font-size: 14px;

            span:nth-child(2) {
                color: red;
                font-size: 18px;
            }
        }

        .pay-btn {
            display: block;
            width: 90%;
            margin: 0 auto;
        }
    }
}
</style>