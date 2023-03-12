<template>
    <div class="login">
        <Header title="注册"/>
        <div class="img">米团</div>
        <van-form @submit="onSubmit">
         
           <van-field
             v-model="account"
             name="account"
             label="账号"
             placeholder="账号"
             :rules="[{
              required:true,
              message: '账号不能为空',
            },{
              validator: value => {
                return /^[1-9][0-9]{7,11}$/
                .test(value)
              },
              message: '请输入正确的账号格式(只能包含8-12位数字)',
              trigger: 'onBlur',
            }]"
           />
           <van-field
              v-model="password"
              type="password"
              name="pass"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' },{pattern,message:'密码必须包含数字和字母(6-12位)',trigger: 'onBlur',}]"
             />
            <div style="margin: 16px;">
              <van-button color="#ffc400" round block type="info" native-type="submit">
                 注册
              </van-button>
              <van-button @click="toLogin" color="#ffc400" round block type="info" class="register">
                 去登录
              </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import Header from '../../components/Header'
import { reactive,toRefs,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

export default {
    components:{Header},
    setup(){
        const router = useRouter()
        let data = reactive({
          account:'',
            password:'',
          pattern:/(?!\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,12}/,
        })
      
        
        // 注册提交
        const onSubmit =(value)=>{
            // console.log(value);
            if(localStorage.userInfo){
              let userInfo = JSON.parse(localStorage.getItem('userInfo'))
              if(userInfo['account'] === value['account']){
                Toast('该用户已存在')
                return;
              }
            }else{
                register(value)
              }
        }
        const register =(value)=>{
          localStorage.setItem("userInfo",JSON.stringify(value))
          Toast('注册成功')
          router.push('/login')
        }
        const toLogin =()=>{
            router.push('/login')
        }
        onMounted(() => {

        })
        return{
            ...toRefs(data),
            onSubmit,
            toLogin,
            
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