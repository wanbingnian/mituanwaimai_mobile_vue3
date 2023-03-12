<template>
    <div class="food-list" v-if="index === 0">
        <!-- select分类栏 -->
        <van-tree-select @click-nav="navClick" v-model:main-active-index="activeIndex" height="88vw" :items="items">
            <template #content>
                <div v-for="(item, index) in subItem">
                    <list-item :item="item" :handleAdd="handleAdd" :handleNum="handleNum"/>
                </div>
            </template>
        </van-tree-select>
    </div>
    <div v-else>
        {{ foodData.content }}
    </div>
</template>

<script>
import FoodListItem from './FoodListItem.vue'
import ListItem from '../../../components/ListItem.vue'
import { reactive, toRefs } from 'vue'
export default {
    props: ['index', 'foodData'],
    components: { FoodListItem ,ListItem},
    setup(props) {
      
        let data = reactive({
            activeIndex: 0,
            items: [{ text: '分组 1' }, { text: '分组 2' }],
            subItem: [],
        })
        // 初始化数据
        const initData = () => {
            let newArray = []
            props.foodData?.items?.forEach((item, index) => {
                newArray.push({
                    text: item.text,
                })
                if (data.activeIndex === index) {
                    data.subItem = item.children
                }
            })
            // 修改数据
            data.items = newArray
        }
        // 侧边栏点击获取index
        const navClick = (i) => {
            // 修改activeIndex
            data.activeIndex = i;
            initData()
        }
        
        // 自定义事件
        const handleAdd =(id)=> {
            data.subItem.forEach((item,index)=> {
                if(item.id === id){
                    item.add = false
                    item.num += 1
                }
            })
        }
        const handleNum = (value,details)=> {
            data.subItem.forEach(item => {
                if(item.id === details.name){
                    item.num = value
                }
                // console.log(data.subItem);
            })
        }
        initData()
       
        return {
            ...toRefs(data),
            initData,
            navClick,
            handleAdd,
            handleNum,
        }
    }
}
</script>

<style lang="less" scoped>
.food-list {
    margin-top: 20px;

    .item-bg {
        padding: 10px;
    }
}

/deep/ .van-tree-select__item--active {
    color: #ffc400;
}

/deep/ .van-sidebar-item--select::before {
    background-color: #ffc400;
}
</style>