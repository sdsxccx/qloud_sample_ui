import Layout from "@/layout";
import store from "../store";
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} data '2019-01-03T00:18:21.000+0000'
 * @returns {Object}
 */

export function renderTime(date) {
  var dateJson = new Date(date).toJSON();
  return new Date(+new Date(dateJson) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return "";
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
  ).join("&");
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === "start") {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + "";
  const randomNum = parseInt((1 + Math.random()) * 65536) + "";
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * 数组转换树结构
 * @param {arry} data
 * @param {root} 根节点id
 * @param {idTxt} 节点id字段
 * @param {pidTxt} 节点显示名称
 *  @param {pushTxt} 构造的子节点名称
 */
export function arry2Tree(data, root, idTxt, pidTxt, pushTxt) {
  var idTxt = idTxt || "id";
  var pidTxt = pidTxt || "pId";
  var pushTxt = pushTxt || "children";
  // 递归方法
  function getNode(id) {
    var node = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i][pidTxt] == id) {
        data[i][pushTxt] = getNode(data[i][idTxt]);
        node.push(data[i]);
      }
    }
    if (node.length == 0) {
      return;
    } else {
      return node;
    }
  }
  // 使用根节点
  return getNode(root);
}

/**
 * 判断一个属性是否存在
 * @param obj 数据对象
 * @param key 要查找的键名
 * @returns {boolean}
 */
export function isInclude(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

//判断数据类型
export const isType = {
  isDataType(type) {
    return function (content) {
      return Object.prototype.toString.call(content) === `[object ${type}]`;
    };
  },
  init() {
    let arr = [
        "String",
        "Boolean",
        "Undefined",
        "Array",
        "Object",
        "Number",
        "Symbol",
        "Function",
      ],
      _self = this;
    arr.forEach((type) => {
      _self[`is${type}`] = _self.isDataType(type);
    });
  },
};
isType.init();

/**
 * 防抖搜索
 * @Author: liguanghui
 * @Descripttion:
 * @param {func}
 * @param {delay}
 * @return {Function}
 */
export function debounceMethods(func, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
/**
 * 数组转换vue格式routers
 * @param {arry} data
 */
export function getVUERouters(data) {
  var vueRouters = [];
  let layout = Layout;
  if (data && data.length > 0) {
    data.map((menu) => {
      //没有路径则不加载到录用中，防止单独启动工程配置其他工程中的路径
      //URL开窗跳转, 暂无处理
      if (isInclude(menu, "path")) {
        let component = menu.component;
        let routerObj = {
          path: menu.path,
          name: menu.path,
          meta: { title: menu.meta.title, icon: menu.meta.icon || "" },
          hidden: menu.hidden || false,
        };
        //判断是否配置了重定向路径
        if (isInclude(menu, "redirect") && menu.redirect !== "") {
          routerObj.redirect = menu.redirect;
        }
        if (menu.component.toLowerCase() === "layout") {
          routerObj.component = layout;
        } else {
          //处理多层级重定向，系统配置了部分访问路径，在截止找不到path的地方开始报404的错误
          if (
            menu.children &&
            menu.children.length === 0 &&
            isInclude(menu, "redirect")
          ) {
            routerObj.component = (resolve) =>
              require(["@/views/404"], resolve);
            delete routerObj["redirect"];
          } else {
            routerObj.component = (resolve, reject) => {
              require([`@/views/${component}`], resolve).then(
                () => {
                  // todo...
                },
                (err) => {
                  if (err.code === "MODULE_NOT_FOUND")
                    require([`@/views/404`], resolve);
                }
              );
            };
          }
        }
        if (isInclude(menu, "alwaysShow") && menu.alwaysShow === true) {
          routerObj.alwaysShow = true;
        }
        if (isInclude(menu, "meta") && isInclude(menu.meta, "activeMenu")) {
          routerObj.meta.activeMenu = menu.meta.activeMenu;
        }
        if (
          menu.children &&
          menu.children.length > 0 &&
          isInclude(menu.children[0], "path")
        ) {
          if (isInclude(menu.children[0], "redirect")) {
            let curPath = menu.children[0].path;
            routerObj.redirect = curPath;
          }
          routerObj.children = getVUERouters(menu.children);
        }
        vueRouters.push(routerObj);
      }
    });
  }
  return vueRouters;
}
