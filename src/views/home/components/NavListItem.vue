<template>
    <div class="item" @click="toStore">
        <img :src="itemContent.pic">
        <div class="item-right">
            <div class="title">{{itemContent.title}}</div>
            <div class="sales">月售额：{{itemContent.sales}}</div>
            <div class="price">售价：{{itemContent.price}}</div>
            <div class="label">
                <div v-for="(i,index) in itemContent.label" :key="index">
                    {{i}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
   export default {
      props:['itemContent'],
      setup(props) {
        const router = useRouter()
        const  toStore = () => {
           router.push("/store")
        }
      
        return {
            toStore,
        }
      }
   }
</script>

<style lang="less" scoped>
.item{
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    padding: 10px;
    img{
        width: 120px;
        height: 120px;
        border-radius: 10px;
        margin-right: 20px;
    }
    .item-right{
        display: flex;
        flex-flow: column;
        justify-content:space-between;
        .title{
            font-size: 18px; 
        }
        .label{
            display: flex;
            div{
                background-color: #ffc400;
                border-radius: 5px;
                padding: 2px 5px;
            }
            div:not(:first-child){
                margin-left: 5px;
            }
        }
    }
}
.item:not(:first-child){
    margin-top: 20px;
}
</style>