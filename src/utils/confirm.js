/** confirm.js */
import { MessageBox } from 'element-ui'
import i18n from '../lang' // internationalization

export function handleDeleteConfirm(text) {
  return MessageBox.confirm(i18n.t("common.tip.deleteTo", [text]), i18n.t("common.tip.deleteBoxInfo"), {
    confirmButtonText: i18n.t('common.operate.confirm'),
    cancelButtonText: i18n.t('common.operate.cancel'),
    type: 'warning',
  })
}

export function errorPrompt(text) {
  return MessageBox.confirm(text, i18n.t("common.tip.deleteBoxInfo"), {
    confirmButtonText: i18n.t('common.operate.confirm'),
    type: 'warning',
    showCancelButton: false,
  })
}

export default (Vue) => {
  Vue.prototype.$handleDeleteConfirm = handleDeleteConfirm
  Vue.prototype.$errorPrompt = errorPrompt
}
