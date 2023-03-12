<template>
    <Header title="账号管理" />
    <div class="form">
    <van-form>
        <van-field :rules="[{ required: true, message: '请输入账号' },{pattern2,message:'请输入正确的账号格式(只能包含8-12位数字)',trigger: 'onBlur',}]" v-model="account" label="账号" placeholder="请输入账号"/>
        <van-icon name="star" class="starone"/>
        <van-field :rules="[{ required: true, message: '请填写密码' },{pattern,message:'密码至少包含数字,字母,特殊字符其中两种(6-12位)',trigger: 'onBlur',}]" v-model="pass" label="密码" placeholder="请输入密码"/>
        <van-icon name="star" class="startwo"/>
        <van-field v-model="name" label="昵称" placeholder="请输入昵称" />
        <van-field v-model="sign" label="个性签名" placeholder="个性签名" />
    </van-form>
    </div>
    <div class="starInfo"><van-icon name="star" class="starthree"/>是必选项</div>
    <van-button type="primary" round block color="#ffc400" class="save-btn" @click="save">修改并保存</van-button>
    <van-button type="primary" round block color="#ffc400" class="save-btn" @click="logOut">退出登录</van-button>
</template>

<script>
import Header from '../../components/Header.vue'
import { reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import {useRouter} from 'vue-router'
export default {
    components: { Header },
    setup() {
        const router = useRouter()
        let data = reactive({
            name: '',
            account:'',
            sign: '',
            pass: '',
            tipShow:false,
            pattern:/(?!\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,12}/,
            pattern2:/^[1-9][0-9]{7,11}$/,
        })
        const TipShow= ()=>{
            data.tipShow = true
        }
        const TipDisable = ()=>{
            data.tipShow = false
        }
        const save = () => {
            if (data.account && data.pass) {
                let userInfo = JSON.parse(localStorage.userInfo)
                let newUserInfo = {
                    username:data.name || userInfo.name,
                    account:data.account || userInfo.account,
                    pass:data.pass || userInfo.pass,
                    sign:data.sign || userInfo.sign,
                }
                localStorage.setItem('userInfo',JSON.stringify(newUserInfo))
                Toast('修改成功')
                router.push('/mine')
            }else{
                Toast('请输入要修改的账号和密码')
            }
        }
        const logOut = () => {
            localStorage.removeItem('isLogin')
            Toast('退出成功')
            router.push('/login')
        }
        return {
            ...toRefs(data),
            save,
            logOut,
            TipShow,
            TipDisable,
        }
    }
}
</script>

<style lang="less" scoped>
.form{
    position: relative;
    .starone{
   color: rgb(226, 55, 55);
   font-size: 3px;
   top: 15px;
   position: absolute;
   right: 20px;
}
.startwo{
    color: rgb(226, 55, 55);
    font-size: 3px;
    position: absolute;
    top: 60px;
    right: 20px;
}
}
.in{
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.starInfo{
    display: flex;
    font-size: 10px;
    justify-content: right;
    margin-right: 10px;
    .starthree{
        display: flex;
        color: rgb(226, 55, 55);
        align-items: center;
        margin-right: 2px;
    }
}
.save-btn {
    width: 80%;
    margin: 20px auto;
   
}
</style>