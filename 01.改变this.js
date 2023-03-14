// 1.改变this    call apply  bind 
/*
    区别：
    1、 call和apply 都是立即执行函数  bind则是返回一个函数 
    2、 call 和 bind 传参都可多个参数 ， apply里面传参只能是一个数组 然后在里面放内容
*/

// 开始手写  注意：三个都是函数上面的方法，所以要通过原型链的方式来创建

// call apply 大体类似 一起写 
Function.prototype.myCall = function myCall(obj, ...args) {
    // 1. 先判断传进来的是不是一个对象，并且在对象上创建一个this占位，
    obj = obj ? Object(obj) : window;
    // let fn = Symbol("xxx");
    obj.fn = this;
    //  2. 开始使用方法 设一个参数接收结果 然后删除掉上面的this占位 在return结果
    let res = obj.fn(...args)
    delete obj.fn;
    return res;
}

// apply和call一样 就是传入参数不同  传入一个数组 
Function.prototype.myApply = function myApply(obj, args = []) {
    // 1. 先判断传进来的是不是一个对象， 然后利用symbol来存一个内容 卡一个位置 代替this
    obj = obj ? Object(obj) : window;
    let fn = Symbol("xxx");
    obj[fn] = this;

    //  2. 开始使用方法 设一个参数接收结果 然后删除掉上面的symbol占位 在return结果
    let res = obj[fn](...args)
    delete obj[fn];
    return res;
}

// bind 更简单 不需要占位this 直接设置this即可 因为要返回一个回调函数 在回调函数里面要利用call或者apply方法
Function.prototype.myBind = function myBind(obj, ...args) {
    let fn = this;
    // 区别： 注意这里要返回一个函数 然后里面也可以传参
    return function (...args2) {
        // 注意调用call或者apply方法 然后里面第一个是this，第二个是参数 因为传了两个参数 记得用concat链接起来
        return fn.myCall(obj, ...(args.concat(args2)))
    }
}

// 手写完成 我们来进行测试  这里写两个简单的对象 

let obj = {
    a: 1,
    b: 2,
}


function fn(a, b, c) {
    // console.log(this)
    console.log(this.a, a, b, c)
    return "xxx"
}


// 我们利用这些方法 进行一些修改

fn.myCall(obj, 1, 2, 3)
// apply里面传参是数组
fn.myApply(obj, [1, 2, 3])

// bind 需要定义一下，然后在调用
let bd = fn.myBind(obj, 1, 2, 3)
bd()
