// 等同于JAVA的 Character.digit(charStr, 16)
String.prototype.strToHex = function() {
  const i = parseInt(this, 16)
  return isNaN(i) ? -1 : i
}

// 等同于JAVA的getBytes
String.prototype.getBytes = function() {
  const bytes = new Array()
  let c
  const len = this.length
  for (let i = 0; i < len; i++) {
    c = this.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0)
      bytes.push(((c >> 12) & 0x3F) | 0x80)
      bytes.push(((c >> 6) & 0x3F) | 0x80)
      bytes.push((c & 0x3F) | 0x80)
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0)
      bytes.push(((c >> 6) & 0x3F) | 0x80)
      bytes.push((c & 0x3F) | 0x80)
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0)
      bytes.push((c & 0x3F) | 0x80)
    } else {
      bytes.push(c & 0xFF)
    }
  }
  return bytes
}

// 16进制字符串转byte数组 （byte数组长度为字符串长度的一半）
String.prototype.hexToByte = function() {
  const len = this.length

  if ((len & 0x01) != 0) {
    alert('bad parameter.')
  }

  const arr = []
  let off = 0

  for (let i = 0; i < (len >> 1); i++) {
    arr[i] = (((this.charAt(off++).strToHex() << 4) | this.charAt(off++).strToHex()) & 0xFF).hex2Byte()
  }

  return arr
}

// int 强转byte  相当于java  (byte)
Number.prototype.hex2Byte = function() {
  return this < 128 ? this : this - 256
}

// 数字取异或
Number.prototype.xor = function(num) {
  return (this ^ num).hex2Byte()
}

Number.prototype.int2Byte = function() {
  const arr = []
  arr[0] = (0xFF & (this >> 24)).hex2Byte()
  arr[1] = (0xFF & (this >> 16)).hex2Byte()
  arr[2] = (0xFF & (this >> 8)).hex2Byte()
  arr[3] = (0xFF & this).hex2Byte()
  return arr
}

// Word中bit位循环左移运算
Array.prototype.loopLeft = function(num) {
  const bit8 = Math.floor(num / 8)
  const buffer = []
  for (let i = 0; i < 4; i++) {
    buffer[i] = this[(bit8 + i) % 4]
  }

  const bit1 = num % 8
  const g0 = buffer[0]
  buffer[0] = (((buffer[0] & 0xFF) << bit1) | ((buffer[1] & 0xFF) >> (8 - bit1))).int2Byte()[3]
  buffer[1] = (((buffer[1] & 0xFF) << bit1) | ((buffer[2] & 0xFF) >> (8 - bit1))).int2Byte()[3]
  buffer[2] = (((buffer[2] & 0xFF) << bit1) | ((buffer[3] & 0xFF) >> (8 - bit1))).int2Byte()[3]
  buffer[3] = (((buffer[3] & 0xFF) << bit1) | ((g0 & 0xFF) >> (8 - bit1))).int2Byte()[3]
  return parseInt('0x' + buffer.byteToHexStr()).int2Byte()
}

Array.prototype.byteToHex = function() {
  const HEX_CHAR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
  const hex = []
  let off = 0
  for (let i = 0; i < this.length; i++) {
    hex[off++] = HEX_CHAR[(this[i] & 0xF0) >>> 4]
    hex[off++] = HEX_CHAR[this[i] & 0xF]
  }
  return hex
}

// 数组取异或
Array.prototype.xor = function(arr) {
  const resultLength = this.length >= arr.length ? arr.length : this.length
  const result = []
  for (var i = 0; i < resultLength; i++) {
    result[i] = this[i].xor(arr[i])
  }

  return result
}

Array.prototype.byteToHexStr = function() {
  return this.byteToHex().join('')
}

Array.prototype.byteToWord = function() {
  if (this.length % 4 !== 0) {
    alert('in mulity 4')
  }

  const buffer = []
  for (let i = 0; i < this.length;) {
    var b = []
    b[0] = this[i++]
    b[1] = this[i++]
    b[2] = this[i++]
    b[3] = this[i++]
    buffer[(i / 4) - 1] = b
  }
  return buffer
}

function SM4() {
  const FK = [0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc]

  const SboxTable = [0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05,
    0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99,
    0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62,
    0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6,
    0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8,
    0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35,
    0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87,
    0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e,
    0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1,
    0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3,
    0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f,
    0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51,
    0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8,
    0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0,
    0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84,
    0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48]

  const CK = [0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269,
    0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9,
    0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249,
    0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9,
    0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229,
    0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299,
    0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209,
    0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279]

  const encrypt = function(sk, data) {
    if (data.length != 4) {
      alert('data not padding')
    }

    var buffer = []

    for (var j = 0; j < 4; j++) {
      buffer[j] = data[j]
    }

    for (var i = 4; i < 36; i++) {
      buffer[i] = buffer[i - 4].xor(t(buffer[i - 3], buffer[i - 2], buffer[i - 1], sk[i - 4]))
    }

    var result = []
    for (var j = 0; j < 4; j++) {
      result[j] = buffer[j + 32]
    }
    console.log('result')
    console.log(result)
    return result
  }

  // mk 16位ascii码   返回sk为32为 16进制
  const calculateStepKey = function(mk) {
    var key = []
    var temp = []
    var sk = []
    var off = 0
    for (var i = 0; i < mk.length; off++) {
      for (var j = 0; j < 4; j++) {
        temp[j] = mk[i++]
      }
      key[off] = temp.xor(FK[off].int2Byte())
    }

    for (; off < 36; off++) {
      const ddd = t1(key[off - 3], key[off - 2], key[off - 1], CK[off - 4])
      key[off] = key[off - 4].xor(ddd)
    }

    for (var f = 0; f < 32; f++) {
      sk[f] = key[4 + f]
    }
    return sk
  }

  // SM4加密ECB
  const encryptECB = function(key, data) {
    // 补全数据 长度为16整数倍
    padding1(data)
    // key 16位ascii码   返回sk为32位16进制
    var sk = calculateStepKey(key)
    console.log('sk')
    console.log(sk)
    var outByte = []
    var off = 0
    while (off < data.length) {
      var b = []
      for (var i = 0; i < 16; i++) {
        b[i] = data[off + i]
      }

      // 加密 Word[] result = encrypt(sk, Word.byteToWord(b));
      var result = encrypt(sk, b.byteToWord())
      console.log(result)
      for (var index = result.length; index > 0; index--) {
        for (var j = 0; j < 4; j++) {
          outByte.push(result[index - 1][j])
        }
      }
      off += 16
    }
    console.log('outByte')
    console.log(outByte)
    return outByte
  }

  this.calculateANSIX9_9MAC = function(key, context) {
    if (key.length != 16) {
      alert('bad parameter key')
    }

    var dataLength = context.length
    var macLength = (dataLength & 0xF) == 0 ? dataLength : (((dataLength + 16) >> 4) << 4)
    var mac = []
    for (var i = 0; i < macLength;) {
      for (var j = 0; j < 16; j++) {
        mac[j] = (mac[j] ^ context[i++]).hex2Byte()
      }

      mac = encryptECB(key, mac)
    }
    console.log('最终数组')
    console.log(mac)
    return mac
  }

  const t = function(arr1, arr2, arr3, ck) {
    return l(r(arr1.xor(arr2).xor(arr3).xor(ck)))
  }

  const l = function(arr1) {
    var ddf = arr1.xor(arr1.loopLeft(2)).xor(arr1.loopLeft(10)).xor(arr1.loopLeft(18)).xor(arr1.loopLeft(24))
    return ddf
  }

  const t1 = function(arr1, arr2, arr3, ck4) {
    return ll(r(arr1.xor(arr2).xor(arr3).xor(ck4.int2Byte())))
  }

  const r = function(arr) {
    var out = []
    for (var i = 0; i < arr.length; i++) {
      out[i] = SboxTable[arr[i] & 0xFF].int2Byte()[3]
    }
    return out
  }

  const ll = function(arr1) {
    return arr1.xor(arr1.loopLeft(13)).xor(arr1.loopLeft(23))
  }

  // 补全数据 长度为16整数倍
  const padding1 = function(source) {
    var sLen = source.length
    var p = 16 - (sLen % 16)
    var padLen = (p & 0xFF).hex2Byte()

    for (var i = 0; i < p; i++) {
      source[sLen++] = padLen
    }
  }
}

// function Util() {
//   var sm4 = new SM4()

//   this.encode = function(key, context) {
//     var keyBytes = key.hexToByte()
//     var contextBytes = context.getBytes()

//     var encodeArray = sm4.calculateANSIX9_9MAC(keyBytes, contextBytes)
//     var encodeStr = encodeArray.byteToHex()
//     console.log(encodeStr.join(''))
//     return encodeStr.join('')
//   }
// }

export class Util {
  constructor(arg) {
    this.sm4 = new SM4()
  }
  encode(key, context) {
    const keyBytes = key.hexToByte()
    const contextBytes = context.hexToByte()
    console.log('----------')
    console.log(keyBytes)
    console.log(contextBytes)
    console.log('--------------------------------------------')
    const encodeArray = this.sm4.calculateANSIX9_9MAC(keyBytes, contextBytes)
    const encodeStr = encodeArray.byteToHex()
    return encodeStr.join('')
  }
}
