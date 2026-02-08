'use server'
import { BroadcastChannel } from 'node:worker_threads';
import { revalidateTag } from 'next/cache';
import DataLength from '../DataLength';

const channel = new BroadcastChannel('actions_channel');
export async function scrollDirection(params) {
    console.log('scrollDirection', DataLength.count)
    //const count = await DataLength.getCount()
    return true//count
}
export async function toggleClick(params) {
    channel.postMessage({ params: params});
    revalidateTag('items','max')
}