/*
 * @Author: your name
 * @Date: 2020-07-24 18:07:57
 * @LastEditTime: 2021-01-27 11:24:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tc-conference-new\main.js
 */

import FeatureView from 'acu-web-library/components/src/vue/feature/FeatureView.vue';
/**
 * Register synced Features
 */
// 必须要明确引入的feature依赖才会被hyd-loader解析到,入口文件一定要引入入口feature
import '../features/mainFeature/Main.feature.js';
/**
 * Register global components
 */
hyd.component('FeatureView', FeatureView);

// 明确入口feature

const mainFeature = 'Main';

const elmnt = document.querySelector('body');
const container = document.createElement('div');
container.setAttribute('name', mainFeature);
container.setAttribute('hyd', 'feature');
elmnt.appendChild(container);

// initFeatures初始化会收集所有的.feature.js的class
hyd.initFeatures();
