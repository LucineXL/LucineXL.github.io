function shallowClone = (target) => {
    if (typeof target === 'object' && target !== null) {
        return Array.isArray(target) ? [...target] : Object.assign({}, target);
    }
    return target;
}

////////////////_initCloneArray.js//////////

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

export default initCloneArray;


////////////////_initCloneArray.js//////////


function deepClone = (target) => {
  if (target === null) return target;
  if (typeof target !== 'object') return target;
  if (target instanceof RegExp) return new RegExp(target);
  if (target instanceof Date) return new Date(target);
  let result = new target.constructor;
  for (let key in target) {
    if(target.hasOwnProperty(key)) {
      result[key] = deepClone(target[key]);
    }
  }
  return result;
}



let arr = [
  1, '1', null, true, undefined, [1,2,3], new Date(), new RegExp(/a/), function() {}, Symbol('111')
]

let newArr = JSON.parse(JSON.stringify(arr));


// 只执行第一次
function debounce(func, dur) {
  let timer = null;
  return function(...params) {
    if(timer) clearTimeout(timer);
    let isNow = !timer;
    timer = setTimeout(() => {
      timer = null;
    }, dur);
    if(isNow) {
      func.call(this, ...params);
    }
  }
}

// 只执行最后一次
function debounce(func, dur) {
  let timer = null;
  return function(...params) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.call(this, ...params);
    }, dur)
  }
}


// 是否立即执行
function debounce(func, dur, immediate) {
  let timer = null;
  return function(...params) {
    if(timer) clearTimeout(timer);
    if (immediate) {
      let isNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, dur);
      if(isNow) {
        func.call(this, ...params);
      }
    } else {
      timer = setTimeout(() => {
        timer = null;
        func.call(this, ...params);
      }, dur)
    }
  }
}



function flat(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
  }, [])
}


function flat(arr) {
  const res = [];
  arr.forEach(element => {
    if (Array.isArray(element)) {
      res.push(...flat(element));
    } else {
      res.push(element)
    }
  });
  return res;
}


function unique(arr) {
  let obj = {};
  let res = [];
  arr.forEach((item, i) => {
    if (obj[item] === undefined) {
      obj[item] = item;
      res.push(item);
    }
  });
  obj = null;
  return res;
}

function unique(arr) {
  arr.sort((a,b)=> (a-b));
  let str = arr.join('@') + '@';
  let reg = /(\d+@)\1*/g;
  let res = [];
  str.replace(reg, (value, group) => {
    console.log(value, group)
    res.push(parseFloat(group))
  })
  return res;
}



const a = () => new Promise((resolve) => setTimeout(() => { console.log('a'), resolve() }, 1e3));
const b = () => new Promise((resolve) => setTimeout(() => { console.log('b'), resolve() }, 1e3));
const c = () => new Promise((resolve, reject) => setTimeout(() => { console.log('c'), reject('Oops!') }, 1e3));
const d = () => new Promise((resolve) => setTimeout(() => { console.log('d'), resolve() }, 1e3));

Promise.resolve()
  .then(a)
  .then(b)
  .then(c)
  .then(d)
  .catch((err) => console.error(err))



  let arr = [1,2,3, 4];
  Array.prototype.myRuduce = function (callback, initValue) {
    let prev = initValue;
    this.forEach((item, index) => {
      prev = callback(prev, item, index, this);
    })
    return prev;
  }

  let res = arr.myRuduce((pre, item, index, arrList) => {
    console.log(pre, item, index, arrList);
    pre += item;
    return pre;
  }, 0)



  function add (a,b,c,d) {
    return a+b+c+d
  }

  function currying (fn, ...args) {
    // fn.length 回调函数的参数的总和
    // args.length currying函数 后面的参数总和
    // 如：add (a,b,c,d)  currying(add,1,2,3,4)

    if (args.length < fn.length) {
      return function(...argments) {
        return currying(fn, ...args, ...argments);
      }
    }
    return fn(...args);
  }


  function check(reg, targetString) {
    console.log(targetString, reg);
    return reg.test(targetString);
  }

  const _check = currying(check);

  const checkPhone = _check(/^1[34578]\d{9}$/);



  function myFreeze(obj){
    if (obj instanceof Object) {
      Object.seal(obj);
      for(let key in obj) {
        Object.defineProperty(obj, key,{
          writable:false   // 设置只读
        });
        if(obj[key] instanceof Object) {
          myFreeze(obj[key]);
        }
      }
    }
  }