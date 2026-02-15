import styles from "./page.module.css";
import React, { Suspense, Activity } from "react";
import { parentPort, workerData, BroadcastChannel } from 'node:worker_threads';
//import statusMap from "../../statusMap";
//import { revalidateTag, revalidatePath } from 'next/cache';
import ButtonSubmit from '../../../components/ButtonSubmit/page'
//import Item from "../../Item";
import DataLength from "../../DataLength";
import Count from '../../../components/Count/page'

//import Mutex from "nasaapi/Mutex";

let resp
let endDate
let startPage
let res = ''
let search = ''
let page = 0
let viewtype = 'main'
let array3 = [];
let list
let newArr
let offset = []
let statusMap = new Map()
let count = 0
const channel = new BroadcastChannel('get_channel');
//const channelM = new BroadcastChannel('mutex_channel');
/*const buffer = new SharedArrayBuffer(1024);
const sharedMemory = new Int32Array(buffer);

const mutexBuffer = new SharedArrayBuffer(4)
const mutex = new Mutex(mutexBuffer)*/
//const ll = await createLinkedListInstance()

const options = {
    /*era: 'long',*/
    year: 'numeric',
    month: 'short',//long
    day: 'numeric',
    // weekday: 'long',
    timeZone: "UTC",
    //hour12: false,
    /*hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'*/
};
async function DataFormat(param, viewtype) {
    //let resultToggle
    let resultFormat
    if (viewtype === 'main') {
        const roundValue = Math.round(Number(param.kilometers))
        resultFormat = new Intl.NumberFormat("ru", { style: "unit", unit: "kilometer", unitDisplay: "short" }).format(roundValue);
    } else {
        const roundValue = Math.round(Number(param.lunar))
        const resultToggle = new Intl.NumberFormat("ru", { style: "decimal" }).format(roundValue);
        let map = new Map();
        map.set(/0|[5-9]$/, ["ых", ""]);
        map.set(/[2-4]$/, ["ые", "ы"]);
        map.set(/\d?[1][0-9]$/, ["ых", ""]);//10,11-19
        map.set(/\d?[1-9][0]{1,9}$/, ["ых", ""]);//20-90,100-900
        map.set(/[1]$/, ["ая", "а"]);

        const rootMoon = "лунн"
        const rootOrbit = "орбит"
        let fullResult = ''
        map.forEach((value, key) => {
            const result = resultToggle.match(key)
            if (result !== null) {
                fullResult = rootMoon + value[0] + " " + rootOrbit + value[1]
            }
        })
        resultFormat = resultToggle + " " + fullResult
    }
    return resultFormat
    //const ruDiameter = new Intl.NumberFormat("ru", { style: "unit", unit: "meter", unitDisplay: "short" }).format(roundDiameter);
}
async function CalcData(params) {
    //console.log('CalcData', await params)
    //const count = await CountPage.getCount();
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate());
    const page = params

    //if (Number(page) > 0) {
    const newPage = Number(currentDate.getDate()) + Number(page)
    currentDate.setDate(newPage);//+1
    //}
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    //console.log('page**', page)
    //if (Number(page) > 0) {
    const newPage1 = Number(tomorrow.getDate()) + Number(page)// + 1//+1 offset
    //console.log('if', tomorrow.getDate())
    tomorrow.setDate(newPage1);//+1
    //}
    //console.log('myDate', new Intl.DateTimeFormat('ru-RU', optionsDate).format(currentDate))
    let startDate = currentDate.getFullYear() + '-' +
        (currentDate.getMonth() + 1) + '-' +
        currentDate.getDate();
    let endDate = tomorrow.getFullYear() + '-' +
        (tomorrow.getMonth() + 1) + '-' +
        tomorrow.getDate();
    //console.log('return data', startDate, endDate)
    /*return new Promise((resolve) => {
        resolve([startDate, endDate])
    })*/
    return [startDate, endDate]
}
/*async function RenderProp(product, index) {
    console.log('RenderProp', product)
    const date = new Date(product.close_approach_data[0].epoch_date_close_approach)
    const prevDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
    const datSlice = prevDate.slice(0, -2)
    const dateString = datSlice.replace('.', '');
    new Item(Number(product.id), product)
    //const dateString = startDate;
    return <Suspense><Row
        key={product.id}
        obj={product}
        viewtype={viewtype}
        index={index}
        dates={dateString}
    /></Suspense>
}*/

async function FormatStatus(params) {
    //console.log('FormatStatus', params, statusMap)
    const status = statusMap.get(Number(params))
    let statusItem = 'ЗАКАЗАТЬ'
    if (status === undefined || status === false) {
        statusItem = 'ЗАКАЗАТЬ'
    }
    else {
        statusItem = 'В КОРЗИНЕ'
    }
    //console.log('format return', params, statusItem)
    return statusItem
}

async function List({ items, page, scroll, renderItem }) {
    let res
    if (scroll === 'start') {
        //mutex.executeLocked(() => {
        res = items.slice(page * 8, page * 8 + 8).map(async (item) => {
            if (item) {
                return await renderItem(item);
            }
        })
        //})
    }
    else if (scroll === 'bottom') {
        //mutex.executeLocked(() => {
        res = items.slice(Math.max((page * 8) - 2, 0), page * 10 + 6).map(async (item) => {
            if (item) {
                return await renderItem(item);
            }
        })
        //})
    } else if (scroll === 'top') {
        //mutex.executeLocked(() => {
        res = items.slice(page * 8, page * 8 + 8).map(async (item) => {
            if (item) {
                return await renderItem(item);
            }
        })
        //})
    }
    return (<Suspense>{res}
    </Suspense>
    )
}

async function Row(props) {
    //console.log('Row',props)
    /*<span>{props.obj.id}</span>
    <span>{props.key}</span>
    <span>{props.obj.absolute_magnitude_h}</span>*/
    //console.log('qwasxz', props)

    //const dataViewtype = props.obj.close_approach_data[0].miss_distance
    //const status = Number(statusMap.get(Number(props.obj.id)))
    //console.log('id', props.obj.id, 'status', status)
    const status = await FormatStatus(props.obj.id)
    // const formatData = await DataFormat(dataViewtype, props.viewtype)
    let Danger = ''
    //if (Number(props.obj.is_potentially_hazardous_asteroid) === 1) {
    Danger = 'Опасен'
    //}
    //conditional item.status render Link
    //const status1 = statusMap.get(Number(props.obj.id))
    //const item = props.item
    //console.log('item', item)
    //const status2 = await item.getStatus()
    //console.log('djkou', props.obj.id, statusMap.size, status1)
    return <Suspense>
        <li key={props.obj.id}>
            <div className={styles.flex_item}>
                <span className={styles.padding}>{props.dates}</span>
            </div>
            <span className={styles.name_link}>{props.obj.name}</span>
            <div className={styles.flex_container_row}>
                <span className={styles.name_link}>
                </span>
                <span className={styles.name_link}>
                </span>
            </div>
            <Suspense>
                <output className={styles.padding}>{props.obj.body}</output>
            </Suspense>
            <ButtonSubmit id={props.obj.id} obj={props.obj} status={status} />
            <div className={styles.flex_item}>
                <div className={styles.flex_container_row}>
                    <span className={styles.danger}>{Danger}</span>
                </div>
            </div>
        </li>
    </Suspense>
}
let data_items = []

export default async function Home({ searchParams }) {
    const search = await searchParams;
    const page = await search.page
    //let [startDate, endDate] = await CalcData(page)
    //const viewtype = await search.viewtype
    const scroll = await search.scroll
    const startDate = Number(page) * 8//offset +2 bottom,-2 top scroll
    //try {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/comments?_start=${startDate}&_limit=8`,
        { cache: 'force-cache' },
        { next: { tags: ['items'] } }
    );

    if (Number(resp.status) === 200) {
        //const data= read(resp.body)
        const data = await resp.json()

        const success = await DataLength.setArr(Number(page), data)
        if (success === true) {
            data_items = await DataLength.getArr()
            //channelM.postMessage({ mutex: mutexBuffer })
            channel.onmessage = (event) => {
                //console.log('Получено сообщение:', event.data);
                statusMap = event.data.statusMap
                count = event.data.count
            };
        }
        return <div>
            <List items={data_items} page={Number(page)} scroll={scroll}
                renderItem={async (product) => {
                    //}
                    return <Row
                        key={product.id}
                        obj={product}
                    />
                }} />
            <Count count={count} />
        </div>
    } else {
        console.log('resp', resp.status)
    }
    /* }
     catch (err) {
         console.log(err)
     }*/
}