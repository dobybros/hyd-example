const {app} = require('electron')
const path = require('path')
const {syncWithFile} = require('../general/FileSync')

let preferenceSingleton

class Preference {
  constructor() {
    this._values = require('./DefaultPreferences')
    this._syncWithFile('get')
  }

  _syncWithFile(type) {
    const values = syncWithFile(type, path.resolve(app.getPath('userData'), 'preferences.json'), this._values)
    if (type === 'get') {
      this._values = values
    }
  }

  getPreference(key) {
    this._syncWithFile('get')
    return this._values[key]
  }

  setPreference(preference, value) {
    if (typeof preference === 'string') {
      this._values[preference] = value
    } else if (typeof preference === 'object') {
      Object.assign(this._values, preference)
    }
    this._syncWithFile('set')
  }

  static getPreference(key) {
    if (!preferenceSingleton) {
      preferenceSingleton = new Preference()
    }
    return preferenceSingleton.getPreference(key)
  }

  static setPreference(preference, value) {
    if (!preferenceSingleton) {
      preferenceSingleton = new Preference()
    }
    preferenceSingleton.setPreference(preference, value)
  }
}

module.exports = Preference
