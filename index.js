#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const {F} = require('./F')
const del = require('del')
const minimist = require('minimist')

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
const toS = f => `\t\t- ${f.path};`
/**
 *
 * @param {Array} ls
 * @return {String}
 */
const files = ls => ls.map(toS).join('\n')

function cleanup (dir) {
  console.log('>', dir)
  try {
    const subDirs = fs.readdirSync(dir)
      .map(toFullPath(dir))
      .map(getStat)
      .filter(isDir)
      .sort()
      .reverse()

    const deletable = subDirs.slice(2)
    const latest = subDirs.slice(0, 2)

    console.log('\twill keep:\n', files(latest))
    console.log('\tand DELETE:\n', files(deletable) || '\t\t (none)')

    del.sync(deletable.map(f => f.path))
  } catch (err) {
    console.log(err)
  }

  console.log('\n\n')
}

const {_: dirs, d} = minimist(process.argv.slice(2))

if (d) {
  process.chdir(d)
}

dirs.forEach(cleanup)
