<template>
    <div class="login">
        <Header title="登录"/>
        <div class="img">米团</div>
        <van-form @submit="onSubmit">
           <van-field
             v-model="account"
             name="account"
             label="账号"
             placeholder="账号"
             :rules="[{ required: true, message: '请填写账号' }]"
           />
           <van-field
              v-model="password"
              type="password"
              name="pass"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
             />
            <div style="margin: 16px;">
              <van-button color="#ffc400" round block type="info" native-type="submit">
                 登录
              </van-button>
              <van-button @click="toRegister" color="#ffc400" round block type="info" class="register">
                 去注册
              </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import Header from '../../components/Header'
import { reactive,toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

export default {
    components:{Header},
    setup(){
        const router = useRouter()
        let data = reactive({
          account:'',
            password:'',
        })
        const onSubmit =(value)=>{
            if(!localStorage.userInfo){
               Toast('账号未注册')
               return;
            }else{
              let userInfo = JSON.parse(localStorage.getItem('userInfo'))
              if(userInfo['account'] === value['account']){
                if(userInfo['pass'] === value['pass']){
                  Toast('登录成功')
                  localStorage.setItem('isLogin','login')
                  router.push('/home')
                }else{
                  Toast('秘密错误')
                }
              }else{
                Toast('账号不存在')
              }
            }
        }
        const toRegister =()=>{
            router.push('/register')
        }
        return{
            ...toRefs(data),
            onSubmit,
            toRegister,
        }
    }
}
</script>
<style lang="less" scoped>
    .login {
  .img {
    width: 200px;
    height: 200px;
    background-color: #ffc400;
    font-size: 80px;
    line-height: 200px;
    text-align: center;
    border-radius: 40px;
    margin: 20px auto;
  }
  .register {
    margin-top: 20px;
  }
}
</style>