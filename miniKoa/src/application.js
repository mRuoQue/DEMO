const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
const { respond } = require('./utils/format.util')

module.exports = class Moa {
    constructor() {
        this.middleware = []
        this.context = context
        this.request = request
        this.response = response
    }

    use(fn) {

        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        console.log('添加成功Funtion：', fn.name)
        this.middleware.push(fn)
        console.log(this.middleware.length)
        return this
    }

    listen(...args) {
        console.log('this.callback()', this.callback())
        const server = http.createServer(this.callback())
        server.listen(...args)
    }

    callback() {
        return (req, res) => {
            let ctx = this.createContext(req, res);
            let respond = () => this.response(ctx);
            let onerror = (err) => { console.log(err) };
            let fn = this.compose(this.middleware);
            // return fn(ctx).then(respond).catch(onerror);
            return fn(ctx)
        };
    }

    // 创建上下文
    createContext(req, res) {
        const ctx = Object.create(this.context)
        // 处理过的属性
        const request = ctx.request = Object.create(this.request)
        const response = ctx.response = Object.create(this.response)
        // 原生属性
        ctx.app = request.app = response.app = this;
        ctx.req = request.req = response.req = req
        ctx.res = request.res = response.res = res

        request.ctx = response.ctx = ctx;
        request.response = response;
        response.request = request;

        return ctx
    }

    // 中间件处理逻辑实现
    compose(middleware) {
        return function (ctx) {
            return dispatch(0)
            function dispatch(i) {
                let fn = middleware[i]
                if (!fn) {
                    return Promise.resolve()
                }
                // dispatch.bind(null, i + 1) 为应用中间件接受到的 next
                // next 即下一个应用中间件
                try {
                    return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
                } catch (error) {
                    return Promise.reject(error)
                }
            }
        }
    }
    // compose() {
    //     return async ctx => {
    //         function createNext(middleware, oldNext) {
    //             return async () => {
    //                 await middleware(ctx, oldNext);
    //             }
    //         }
    //         let len = this.middleware.length;
    //         let next = async () => {
    //             return Promise.resolve();
    //         };
    //         for (let i = len - 1; i >= 0; i--) {
    //             let currentMiddleware = this.middleware[i];
    //             next = createNext(currentMiddleware, next);
    //         }
    //         await next();
    //     };
    // }

}

