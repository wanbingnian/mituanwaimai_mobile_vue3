import { createStore } from "vuex";
export default createStore({
    state:{
        cartList:[],//购物车数据
        isDelete:true,//判断点击Header组件中编辑按钮时cartDetails底部结算栏变为删除栏
        edit:true, //Header组件编辑按钮与完成切换相关数据
        orderList:[],//订单数据
        orderListEnd:[],//最终的订单
        userAddress:[
          {
            id: 1001,
            name: '张三',
            tel: '15874859777',
            province: '广东省',
            city: '深圳市',
            county: '南山区',
            addressDetail: '深圳湾',
            isDefault: true,
            areaCode: '110101',
          },
          {
            id: 1002,
            name: '李四',
            tel: '15874859685',
            province: '湖北省',
            city: '武汉市',
            county: '武昌区',
            addressDetail: '黄鹤楼',
            isDefault: false,
            areaCode: '110101',
          },
        ],
    },
    mutations:{
      addCart(state,value){
        state.cartList = value
      },
      changeDelete(state,value){
        state.isDelete = !state.isDelete
      },
      delete(state,value){
        state.cartList = value
      },
      edit(state,value){
        if(value){
          state.edit = true
        }else{
          state.edit = !state.edit
        }
        
      },
      pay(state,value){
        state.orderList = value
      },
      orderListEnd(state){
        state.orderListEnd = state.orderListEnd.concat(state.orderList)
      },
      addaddress(state,value){
        state.userAddress.map(item=>{
          if(value.isDefault){
            item.isDefault = false
          }
        })
        state.userAddress.push(value)
      },
      editaddress(state,value){
        state.userAddress = state.userAddress.map(item=>{
          if(value.isDefault){
            item.isDefault = false
          }
          return item.id === value.id?value:item
        })

      },
      deleteaddress(state,value){
        state.userAddress = state.userAddress.filter(item=>{
          return !(item.id === value.id)
        })
        if(value.isDefault){
          state.userAddress[0].isDefault = true
        }
      }
    },
    action:{}
})