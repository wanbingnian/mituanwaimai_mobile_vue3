<template>
  <Header :title="address"/>
  <van-address-edit
  :area-list="areaList"
  show-delete
  show-set-default
  show-search-result
  :address-info="addAddressInfo"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
  
/>
</template>

<script>
import Header from '../../components/Header.vue'
import {reactive,toRefs,onMounted, computed} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { Toast } from 'vant'
import {uuid} from 'vue-uuid'

export default {
    setup(){
      const route = useRoute()
      const router = useRouter()
      let store = useStore()
      const data = reactive({
        areaList:
        {
        province_list: {
          110000: "广东省",
          120000: "浙江省",
        },
        city_list: {
          110100: "广州市",
          110200: "深圳市",
          120100: "杭州市",
          120200: "宁波市",
        },
        county_list: {
          110101: "天河区",
          110102: "海珠区",
          120102: "上城区",
          130102: "下城区",
        }
      },
      addAddressInfo:{},
      })
      const getRandomNum = (min,max)=>{
        let range = max - min
        let rand = Math.random()
        return (min+Math.round(rand * range))
      }
      const address = computed(()=>{
        return route.query.type === 'add'?'地址新增':'地址编辑'
      })
      const onSave = (content)=> {
        //保存时 新增 或 编辑
        if(route.query.type ==='add'){
          // content.id = uuid.v1()
         const newContent = {...content,id:getRandomNum(1050,99999)}
          store.commit('addaddress',newContent)
          console.log(newContent);
        }else{
          store.commit('editaddress',content)
          console.log(content);
        }
        Toast('保存成功')
    
        setTimeout(() => {
          router.back()
        }, 500);
        
      }
      const onDelete = (content)=> {
        store.commit('deleteaddress',content)
        Toast('删除成功')
    
        setTimeout(() => {
          router.back()
        }, 500);
      }
      const init =()=>{
        // 点击编辑时让地址初始化限制在地址栏里头
        store.state.userAddress.forEach(item=>{
           if(item.id === Number(route.query.id)){
              data.addAddressInfo = item
           }
        })
      }
      onMounted(() => {
        init()
        
      })
      return{
        ...toRefs(data),
        onSave,
        onDelete,
        init,
        store,
        address,
        getRandomNum
      }
    }

}
</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-switch--on {
  background-color: #ffc400;
}
</style>