'use strict'

const fs = require('fs')

class F {
  constructor (path) {
    /**
     * @type {String}
     */
    this.path = path
    /**
     * @type {Stats}
     */
    this.stat = fs.lstatSync(path)
  }

  toString () {
    return this.stat.birthtime.toISOString()
  }
}

exports.F = F
