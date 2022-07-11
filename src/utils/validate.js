/**
 * Created by liguanghui on 2020/11/8.
 */
import i18n from '../lang' // internationalization
/**
 * @param {string} path
 * @returns {Boolean}
 * 非表单校验方法
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 非表单校验方法
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

//去空格（非表单校验方法）
export function trim(value) {
  return value.replace(/(^\s*)|(\s*$)/g, "");
}


/**
 * 是否数组校验（非表单校验方法）
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/*
* 身份证校验
*/
export const VerificationIdCard = function (rule, value, callback) {
  if (value === "") {
    callback(new Error("不能为空"));
  } else {
    //18位身份证简单校验
    let IDCARD_18_SIMPLE_PATTERN = /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}(?:1[89]|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}(?:\d|[xX])$/;
    // debugger;
    if (IDCARD_18_SIMPLE_PATTERN.test(value)) {
      //校验日期时间是否合法
      var dateStr = value.substr(6, 8);
      var dateStrNew = dateStr.replace(/(\d{4})(\d{2})(\d{2})/, "$1/$2/$3");
      var dateObj = new Date(dateStrNew);
      var month = dateObj.getMonth() + 1;
      if (parseInt(dateStr.substr(4, 2)) === month) {
        var multiplier = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var idDatas = value.split("");
        var len = 17;
        var sum = 0;
        for (var i = 0; i < len; i++) {
          sum += idDatas[i] * multiplier[i];
        }
        var remainder = sum % 11;
        var checkCodeArr = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        var checkCode = checkCodeArr[remainder];
        if (checkCode === value[17]) {
          callback();
        } else {
          callback(new Error("请输入正确的身份证号码"));
        }
      } else {
        callback(new Error("请输入正确的身份证号码"));
      }
    } else {
      callback(new Error("请输入正确的身份证号码"));
    }
  }
}

// 手机号码验证
export const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    const patter = new RegExp('^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$')
    if (!patter.test(value)) {
      return callback(new Error('请输入正确格式的手机号！'))
    } else {
      callback() // 必须有此项回调，否则验证会一直不通过
    }
  }
}

// 邮箱的正则
export const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    const mailbox = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$')
    if (!mailbox.test(value)) {
      return callback(new Error('请输入正确格式的邮箱'))
    } else {
      callback()
    }
  }
}


//金额，只允许保留两位小数
export const validateFloat = function (rule, value, callback) {
  if (!value) {
    callback()
  } else {
    const float = new RegExp('^([0-9]*[.]?[0-9])[0-9]{0,1}$')
    if (!float.test(value)) {
      return callback(new Error('请输入正确的金额格式'))
    } else {
      callback()
    }
  }
}

//密码 8-20位的校验规则
export const validatePwd = function (rule, value, callback) {
  if (!value) {
    callback()
  } else {
    const checkPwd = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$')
    if (!checkPwd.test(value)) {
      return callback(new Error('请输入正确的密码格式'))
    } else {
      callback()
    }
  }
}


//是否全为数字
export const validateNum = function (rule, value, callback) {
  if (!value) {
    callback()
  } else {
    const isNum = new RegExp('^[0-9]+$')
    if (!isNum.test(value)) {
      return callback(new Error(i18n.t('common.placeholder.input') + i18n.t('common.digital')))
    } else {
      callback()
    }
  }
}


/**
 * 是否字母校验
 */
export const validateAlphabets = function (rule, value, callback) {
  if (!value) {
    callback()
  }else{
    const validAlphabets = new RegExp('^[A-Za-z]+$')
    if (!validAlphabets.test(value)) {
      return callback(new Error('请输入正确的格式'))
    } else {
      callback()
    }
  }
}

/**
 * 是否小写字母校验
 */
export const validateLowerCase = function (rule, value, callback) {
  if (!value) {
    callback()
  }else{
    const validLowerCase = new RegExp('^[a-z]+$')
    if (!validLowerCase.test(value)) {
      return callback(new Error('请输入正确的格式'))
    } else {
      callback()
    }
  }
}


/**
 * 是否大写字母校验
 */
export const validateUpperCase = function (rule, value, callback) {
  if (!value) {
    callback()
  }else{
    const validUpperCase = new RegExp('^[A-Z]+$')
    if (!validUpperCase.test(value)) {
      return callback(new Error('请输入正确的格式'))
    } else {
      callback()
    }
  }
}

/**
 * 是否 url 地址校验
 */
export const validateUrl = function (rule, value, callback) {
  if (!value) {
    callback()
  }else{
    const validURL = new RegExp('^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?\\+&%$#=~_-]+))*$')
    if (!validURL.test(value)) {
      return callback(new Error('请输入正确url地址'))
    } else {
      callback()
    }
  }
}


/**
 * 是否字符串校验
 */
export const validateString = function (rule, str, callback) {
  if (!value) {
    callback()
  }else{
    if (typeof str === 'string' || str instanceof String) {
      return callback(new Error('请输入正确的格式'))
    } else {
      callback()
    }
  }
}

//可输入小数，整数位最多14位,小数位最多4位
export const validateNumMax14Point4 = function (rule, value, callback) {
  if (!value) {
    callback()
  } else {
    var objRegExp = /(^[0-9]{1,14}$)|(^[0-9]{1,14}[\.]{1}[0-9]{1,4}$)/;
    if (!objRegExp.test(value)) {
      //return callback(new Error('数字，整数位最多14位,小数位最多4位'))
      return callback(new Error(i18n.t('common.placeholder.input') + i18n.t('common.tipAmount14and4')))
    } else {
      let pointArr = [];
      pointArr = value.split(".");
      //防止输入首字符是0（0XXX）的情况
      if (pointArr.length === 1) {  //表示值输入了整数
        let integerNum = pointArr[0];
        if (integerNum.length > 1 && integerNum.substr(0, 1) === "0") {
          return callback(new Error(i18n.t('common.placeholder.input') + i18n.t('common.tipAmount14and4')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  }
}

//是否正整数
export const validatePositiveInteger = function (rule, value, callback) {
  if (!value) {
    callback()
  } else {
    var objRegExp = /^[1-9]\d*$/;
    if (!objRegExp.test(value)) {
      return callback(new Error(i18n.t('common.placeholder.input') + i18n.t('common.positiveInteger')))
    } else {
      callback()
    }
  }
}
