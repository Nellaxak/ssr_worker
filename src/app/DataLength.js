'use server'
//import { Suspense } from "react";//
//import Item from "./Item";
import { Worker, parentPort, BroadcastChannel } from 'node:worker_threads';
//import Script from 'next/script'//for jsx
//import Mutex from 'nasaapi/Mutex';
//import Worker from '../../worker.mjs?worker'//?url';
//proxy object
//const activeWorkers = new Set();//WeakSet
//const channel = new BroadcastChannel('post_channel');
//new Worker(new URL("../../worker.js", import.meta.url))
//import { parentPort, BroadcastChannel } from 'node:worker_threads';
//let count = 0;

const channelG = new BroadcastChannel('get_channel');
//channelG.postMessage({ statusMap: statusMap, count: count });
//const { parentPort, BroadcastChannel } = require('worker_threads');

const workerCode = `
import { parentPort, BroadcastChannel } from 'node:worker_threads';
const channelP = new BroadcastChannel('post_channel');
const channelG = new BroadcastChannel('get_channel');
let count=0
const statusMap = new Map()
channelP.onmessage = (event) => {
    const id = Number(event.data.params)
    const oldStatus = statusMap.get(id)
    if (oldStatus === true) {
        statusMap.set(id, false)
        count = count - 1
    } else {
        statusMap.set(id, true)
        count = count + 1
    }   
    channelG.postMessage({ statusMap: statusMap, count: count });
};
`;
const ssr_worker = new Worker(workerCode, { eval: true })
//const ssr_worker = new Worker('./public/worker.js', { type: "module" })
/*, {
        workerData: {
          arr: DataLength.arr,
        }
      })*/
class DataLength {
  static arr = [];
  static page = -1;
  //static forRender = null
  constructor(id, obj) {
    //console.log('constructor', id, typeof id)

  }
  static async getArr() {
    return DataLength.arr
  }
  static async setArr(pageParam, arrParams) {
    if (pageParam !== DataLength.page) {
      //delete worker
      DataLength.arr = DataLength.arr.concat(arrParams)
      /*const ssr_worker = new Worker('./worker.js', {
        workerData: {
          arr: DataLength.arr,
        }
      })*/
      //activeWorkers.add(ssr_worker);
      /*ssr_worker.on('message', (message) => {
        DataLength.arr = message.concatArr
      })*/
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength