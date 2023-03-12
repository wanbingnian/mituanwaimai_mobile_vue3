<template>
    <div class="cart">
        <Header title="购物车" :edit="true"/>
        <cartDetails v-if="isShow" :changeShow="changeShow"/>
        <Empty v-else/>
        <Footer />
    </div>
</template>

<script>
import Footer from '../../components/Footer.vue';
import Empty from '../../components/Empty.vue';
import Header from '../../components/Header.vue';
import cartDetails from './components/cartDetails.vue';
import {ref,onMounted} from 'vue'
import { useStore } from 'vuex';

export default {
    components: { Footer, Empty, cartDetails },
    setup() {
        let store = useStore()
        const isShow = ref(true)
        const init = ()=> {
            if(store.state.cartList.length === 0){
                isShow.value = false
            }
        }
        const changeShow =()=> {
            isShow.value = false
        }
        onMounted(() => {
            init()
        })
        return {
            isShow,
            init,
            changeShow
        }
    }
}

</script>

<style lang="less" scoped>
.cart {
    display: flex;
    flex-flow: column;
    height: 100%;

    .context {
        flex: 1;
        overflow-y: auto;
    }
}
</style>