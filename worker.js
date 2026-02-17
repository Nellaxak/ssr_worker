import React, { Suspense } from "react";
import { parentPort, workerData, BroadcastChannel } from 'node:worker_threads';
//import Mutex from "nasaapi/Mutex";
const statusMap = new Map()
let count = 0
const channelP = new BroadcastChannel('post_channel');
const channelG = new BroadcastChannel('get_channel');
//const channelM = new BroadcastChannel('mutex_channel');
//let mutexSab = null
/*channelM.onmessage = (event) => {
    //console.log('Получено сообщение:', event.data.mutex);
    mutexSab = event.data.mutex
}*/
channelP.onmessage = (event) => {
    //console.log('Получено сообщение:', event.data);
    //console.log('mutex', mutex)
    //const mutex = new Mutex(mutexSab)
    //mutex.lock()
    const id = Number(event.data.params)
    const oldStatus = statusMap.get(id)
    //console.log('oldStatus', oldStatus)
    if (oldStatus === true) {
        statusMap.set(id, false)
        count = count - 1
        //console.log('count', count)
    } else {
        statusMap.set(id, true)
        count = count + 1
    }
    //mutex.unlock()
    channelG.postMessage({ statusMap: statusMap, count: count });
    //parentPort.postMessage(statusMap);
};
//all array concat
//console.log('arr', workerData.arr.length)//must be 6
let arr = []
/*arr = arr.concat(workerData.arr)
workerData.arr.map((item) => {
    statusMap.set(Number(item.id), false)
})*/
parentPort.postMessage({ statusMap: statusMap, concatArr: arr });
