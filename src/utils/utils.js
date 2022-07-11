export default {
	install(Vue, options) {
    Vue.prototype.$userInfo = {}
		Vue.prototype.$handleUserInfo = function(obj = {}) {
      let temp = null;
      Object.defineProperty(this,"userInfo",{
        configurable:true,
        enumerable:false,
        get:()=> {
          return temp
        },
        set:obj=>{
          temp = obj
        }
      })
      if(Object.keys(obj).length !== 0) this.$userInfo = obj;
		}
	}
}
