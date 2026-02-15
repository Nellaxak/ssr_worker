import styles from "./page.module.css";
import Link from "next/link";
import { parentPort, workerData, BroadcastChannel } from 'node:worker_threads';

//import Item from '../../Item'
//import http from '@/utils/http'

/*export interface Count {
  count: number;
}*/
const channelS = new BroadcastChannel('get_channel');
let count = 0
channelS.onmessage = (event) => {
  //console.log('event', event.data.count)
  count = event.data.count
};
export default async function Home() {
  return <footer className={styles.footer}>
    <div className={styles.columnFooter}>
      <span className={styles.h3}>Корзина</span>
      <div>
        <output className={styles.padding_count}>{count}</output>
        <span className={styles.aster}>астероида</span>
      </div>
    </div>
    <nav className={styles.rrrr}>
      <Link href="/categories?viewtype=marked" scroll={false}
        className={styles.button}>
        <span className={styles.padding}>Отправить</span>
      </Link>
    </nav>
  </footer>
  //<footer className={styles.footer}>© Все права и планета защищены</footer>*/
}
//export default Home