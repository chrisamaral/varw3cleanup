#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const {F} = require('./F')

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
const byBirthTime = (a, b) => a.stat.birthtimeMs - b.stat.birthtimeMs

/**
 *
 * @param {F} f
 */
function unlink (f) {
  console.log('would remove', f.path)
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

process.argv.slice(2)
  .forEach(cleanup)
