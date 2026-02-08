'use server'
//import { Suspense } from "react";//
//import Item from "./Item";
import { Worker } from 'node:worker_threads';
//proxy object
const activeWorkers = new Set();//WeakSet
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
      //DataLength.arr = DataLength.arr.concat(arrParams)
      const ssr_worker = new Worker('./worker.js', {
        workerData: {
          arr: arrParams//DataLength.arr,
        }
      })
      activeWorkers.add(ssr_worker);
      ssr_worker.on('message', (message) => {
        DataLength.arr = message.concatArr
      })
      DataLength.page = pageParam
    }
    return true
  }
}
export default DataLength