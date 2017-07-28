'use strict'

const fs = require('fs')
const dirs = process.argv.slice(2)
const path = require('path')

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
}

dirs.forEach(dir => {
  try {
    fs.readdirSync(dir)
      .forEach(cleanup)
  } catch (err) {
    console.error(err)
  }
})

/**
 *
 * @param {String} f
 * @return {F}
 */
const getStat = f => new F(f)

const toFullPath =
  dir => f =>
    path.resolve(dir, f)

/**
 *
 * @param {F} f
 */
const isDir = f => f.stat.isDirectory()

/**
 * @param {F} a
 * @param {F} b
 * @return {Number}
 */
const byBirthTime = (a, b) => b.stat.birthtime - a.stat.birthtimeMs

/**
 *
 * @param {F} f
 */
function unlink (f) {
  console.log('would remove', f)
  // fs.unlinkSync(f.path)
}

function cleanup (dir) {
  try {
    fs.readdirSync(dir)
      .map(toFullPath(dir))
      .map(getStat)
      .filter(isDir)
      .sort(byBirthTime)
      .slice(2)
      .forEach(unlink)
  } catch (err) {
    console.log(err)
  }
}
