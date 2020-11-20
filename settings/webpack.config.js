/*
 * @Author: ZerroRt
 * @lastEditors: ZerroRt
 * @Date: 2020-11-20 16:11:47
 * @LastEditTime: 2020-11-20 16:11:48
 * @FilePath: \hyd-example\settings\webpack.config.js
 */
const path = require('path');

 module.exports = {
   entry: {},
   output: {
     filename: '[name].[hash:10].js',
     path: path.resolve(__dirname, 'dist')
   },

   module: {

   }
 }