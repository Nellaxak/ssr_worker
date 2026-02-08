import styles from "./page.module.css";
import { parentPort, workerData, BroadcastChannel } from 'node:worker_threads';

//import Item from '../../Item'
//import http from '@/utils/http'

/*export interface Count {
  count: number;
}*/
const channelS = new BroadcastChannel('status_channel');
let count = 0
channelS.onmessage = (event) => {
    count = event.data.count
  };
async function Page() {
  return count
  //<footer className={styles.footer}>© Все права и планета защищены</footer>*/
}
export default Page