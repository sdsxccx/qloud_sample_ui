import store from '@/store'

/**
 * @param String value
 * @returns {Boolean}
 */
export function checkresourcePermission(value) {
  if (value) {
    const permissions = store.getters.userDetail.permissions || []
    let hasPer = false
    permissions.map(pre =>{
      if (pre  === value){
        hasPer = true
      }
    })
    return hasPer
  } else {
    console.error(`当前无资源权限`)
    return false
  }
}
