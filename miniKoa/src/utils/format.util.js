// 处理 body 不同类型输出
function respond(ctx) {
    let res = ctx.res
    let body = ctx.body
    if (typeof body === 'string') {
        return res.end(body)
    }
    if (typeof body === 'object') {
        return res.end(JSON.stringify(body))
    }
}

module.exports = {
    respond
}