<template>
    <div class="cartDetail">
        <div class="content">
            <van-checkbox-group v-model="checked" @change="groupCheck">
                <div v-for="(item, index) in store.state.cartList">
                    <list-item :item="item" :handleNum="handleNum" :showCheckBox="true" />
                </div>
            </van-checkbox-group>
        </div>
        <!-- 结算按钮 -->
        <van-submit-bar v-if="store.state.isDelete" :price="allPrice" button-text="结算" @submit="onSubmit" class="submit-all" button-color="#ffc400">
            <van-checkbox v-model="submitChecked" checked-color="#ffc400" @click="checkAll">全选</van-checkbox>
        </van-submit-bar>
        <div class="buy" v-else>
            <div class="left">
                <van-checkbox v-model="submitChecked" checked-color="#ffc400" @click="checkAll">全选</van-checkbox>
            </div>
            <div class="delete" @click="handleDelete">删除</div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { reactive, toRefs, onMounted ,computed} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ListItem from '../../../components/ListItem.vue'
export default {
    props:['changeShow'],
    components: { ListItem },
    setup(props) {
        const router = useRouter()
        const store = useStore()
        const data = reactive({
            checked: [],
            submitChecked:true,
        })
        const handleNum = (value, details) => {
            store.state.cartList.map(item => {
                if (item.id === details.name) {
                    item.num = value
                }
            })
        }
        const init = () => {
            data.checked = store.state.cartList.map(item => item.id)
        }
        // 全选按钮
        const checkAll =()=>{
            if(data.checked.length !== store.state.cartList.length){
                init()
            }else{
                data.checked = []
            }
        }
        const groupCheck = (res)=> { 
            if(res.length === store.state.cartList.length){
                data.submitChecked = true
            }else{
                data.submitChecked = false
            }
            data.checked = res
        }
        // 返回计算出的总价
        const allPrice = computed(()=>{
            let countList = updateData()
            let sum = 0
            countList.forEach(item =>{
                sum += item.num * item.price *100
            })
            return sum
        })
        const updateData = (type)=>{
            return store.state.cartList.filter(item =>{
                return type === 'delete'?!data.checked.includes(item.id):data.checked.includes(item.id)
            })
        }
        //购物车删除
        const handleDelete = ()=> {
            //判断checked是否有值
            if(data.checked.length){
                store.commit('delete',updateData('delete'))
                data.checked = []
                // 如果购物车没有数据显示 Empty 组件
                if(!store.state.cartList.length){
                    props.changeShow()
                    //下边第一步让购物车删除完后Header组件显示编辑按钮显示，
                    //第二步是解决第一步带来的bug，
                    // （购物车删除空后 再次加入购物车多次点击编辑，完成切换导致结算，删除按钮和编辑，完成按钮出现不匹配的bug）
                    store.commit('edit','done')
                    store.commit('changeDelete')
                }
            }else{
                Toast.fail('请选择要删除的商品')
            }
        }
        // 结算按钮
        const onSubmit =()=> {
            if(data.checked.length){
                store.commit('pay',updateData())
                router.push({
                    path:"/createorder",
                    query:{list:data.checked},
                })
            }
        }
        onMounted(() => {
            init()
        })
        return {
            ...toRefs(data),
            handleNum,
            store,
            init,
            onSubmit,
            checkAll,
            groupCheck,
            allPrice,
            handleDelete,
            updateData
        }
    }
}
</script>

<style lang="less" scoped>
.cartDetail {
    font-size: 14px;
    flex: 1;
    position: relative;
    overflow-y: auto;
    padding: 20px 20px 55px;

    .submit-all {
        position: fixed;
        bottom: 46px;
    }

    .buy {
        position: fixed;
        bottom: 46px;
        right: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        height: 50px;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        .left {
            display: flex;
            align-items: center;
        }

        .delete {
            color: #fff;
            background-color: #ffc400;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            width: 110px;
            height: 40px;
            text-align: center;
            line-height: 40px;
        }
    }

    .content {
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
    }
}
</style>