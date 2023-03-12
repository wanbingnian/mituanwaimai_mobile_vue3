module.exports = {
    plugins:{
        'postcss-pxtorem':{
            // rootValue({file}) {//1.如果设计稿是 750px + 使用Vant
            //   return file?.includes('vant') !== -1 ? 37.5 : 75
            // },
            rootValue : 37.5, // 2.如果设计稿是 750px + 不使用Vant
            // rootValue : 37.5, // 3.如果设计稿是 375px + 无论是否使用Vant
            propList: ['*','!font*','!line-height','!letter-spacing'],
        },
    },
}