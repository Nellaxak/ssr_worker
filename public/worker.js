import React, { Suspense } from "react";
import { parentPort, workerData, BroadcastChannel } from 'node:worker_threads';
//console.log('worker_threads',worker_threads)
const statusMap = new Map()
let count = 0
const channel = new BroadcastChannel('actions_channel');
const channelS = new BroadcastChannel('status_channel');

channel.onmessage = (event) => {
    //console.log('Получено сообщение:', event.data);
    const id = Number(event.data.params)
    const oldStatus = statusMap.get(id)
    statusMap.set(id, !oldStatus)
    if (oldStatus === false) {
        count = count + 1
    } else {
        count = count - 1
    }
    channelS.postMessage({ statusMap: statusMap, count: count });
    //parentPort.postMessage(statusMap);
};
let data
let arr = []
arr = arr.concat(data)
workerData.arr.map((item) => {
    statusMap.set(Number(item.id), false)
})
parentPort.postMessage({ statusMap: statusMap, concatArr: arr });
