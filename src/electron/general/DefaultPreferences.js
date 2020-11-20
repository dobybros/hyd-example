/*
 * @Author: your name
 * @Date: 2020-07-30 18:44:22
 * @LastEditTime: 2020-10-28 11:30:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tc-class-client-electronjs\electron\general\DefaultPreferences.js
 */
const Preferences = require("./Preference")
const path = require('path')
const parseLocal = (lc) => {
  if (lc) {
    if (lc.indexOf('en') !== -1) {
      return 'en'
    } else if (lc.indexOf('zh') !== -1) {
      return 'zh-CN'
    }
  }
  return 'en'
}
const {app} = require('electron')

let lang = parseLocal(app.getLocale().toLowerCase())
if (process.platform !== 'darwin') {
  app.on('ready', () => {
    lang = parseLocal(app.getLocale().toLowerCase())
  })
}

module.exports = {
  recordPath: path.resolve(app.getPath('videos'), app.name, 'record'),
  lang,
  // recordResolution: '720',
  // recordClarity: 'HD',
  autoRecord: false,
  showStopRecordDialog: true
}
