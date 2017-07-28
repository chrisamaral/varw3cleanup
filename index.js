#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const {F} = require('./F')
// const del = require('del')

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
 * @return {String}
 */
const toS = f => f.path
/**
 *
 * @param {Array} ls
 * @return {String}
 */
const files = ls => ls.map(toS).join(', ')

function cleanup (dir) {
  try {
    const subDirs = fs.readdirSync(dir)
      .map(toFullPath(dir))
      .map(getStat)
      .filter(isDir)
      .sort(byBirthTime)

    const deletable = subDirs.slice(2)
    const latest = subDirs.slice(0, 2)

    console.log('would keep:', files(latest))
    console.log('and DELETE:', files(deletable))

    // del.sync(deletable)
  } catch (err) {
    console.log(err)
  }
}

process.argv.slice(2)
  .forEach(cleanup)
