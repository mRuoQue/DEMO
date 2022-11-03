
const Moa = require('./src/application.js')
const app = new Moa()
// const router = new Router()

// 应用中间件
app.use((ctx, next) => {
    // if (ctx.path == '/favicon.ico') {
    //     return
    // }
    console.log('ctx===', ctx)
    console.log('1 start')
    next()
    console.log('1 end')
})

app.use((ctx, next) => {
    console.log('2 start')
    ctx.body = "hello world";
    next()
    console.log('2 end')
})

// // 注册路由
// router.get('/', function (ctx) {
//     ctx.body = {
//         code: 200,
//         msg: 'index'
//     }
// })

// router.get('/test', function (ctx) {
//     ctx.body = {
//         code: 200,
//         msg: 'test'
//     }
// })

// // 使用路由中间件
// app.use(router.routes())

app.listen(3000, '127.0.0.1', () => {
    console.log('----------当前端口运行在：3000端口---------')
})