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
 *
 * @param {F} f
 * @return {String}
 */
const toS = f => `\t\t- ${f.path}`
/**
 *
 * @param {Array} ls
 * @return {String}
 */
const files = ls => ls.map(toS).join(';\n')

function cleanup (dir) {
  console.log('* entering ~', dir)
  try {
    const subDirs = fs.readdirSync(dir)
      .map(toFullPath(dir))
      .map(getStat)
      .filter(isDir)
      .sort()
      .reverse()

    const deletable = subDirs.slice(2)
    const latest = subDirs.slice(0, 2)

    console.log('\twould keep:\n', files(latest))
    console.log('\tand DELETE:\n', files(deletable))

    // del.sync(deletable)
  } catch (err) {
    console.log(err)
  }

  console.log('\n\n')
}

process.argv.slice(2)
  .forEach(cleanup)
