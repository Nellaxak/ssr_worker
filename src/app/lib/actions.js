'use server'
import { BroadcastChannel } from 'node:worker_threads';
import { revalidateTag } from 'next/cache';
import DataLength from '../DataLength';
//import Mutex from '../.';
const statusMap = new Map()
const channel = new BroadcastChannel('post_channel');
const channelG = new BroadcastChannel('get_channel');
let count = 0
export async function scrollDirection(params) {
    console.log('scrollDirection', DataLength.count)
    //const count = await DataLength.getCount()
    return true//count
}
export async function toggleClick(params) {
    /*channel.postMessage({ params: params});
    revalidateTag('items','max')*/
    //console.log('toggleClick', params)
    const id = Number(params)
    const oldStatus = statusMap.get(id)
    //console.log('oldStatus', oldStatus)
    if (oldStatus === true) {
        statusMap.set(id, false)
        count = count - 1
        //console.log('count', count)
    } else {
        statusMap.set(id, true)
        count = count + 1
        //console.log('count2', count)
    }
    revalidateTag('items','max')
    channelG.postMessage({ statusMap: statusMap, count: count });
}