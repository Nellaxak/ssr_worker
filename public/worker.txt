import { parentPort, BroadcastChannel } from 'node:worker_threads';
const statusMap = new Map()
let count = 0
const channelP = new BroadcastChannel('post_channel');
const channelG = new BroadcastChannel('get_channel');

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
parentPort.postMessage({ statusMap: statusMap });
