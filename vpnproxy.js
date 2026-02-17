import http from 'http'
import httpProxy from 'http-proxy'
import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch';
import axios from 'axios';

let startDate = '2026-2-15'
//const agent = new HttpsProxyAgent("http://100.65.247.60:3000")
//terminal node proxy.js
/*var proxy1 = httpProxy.createProxyServer({ "agent": agent });
console.log('proxy startDate', startDate)//must be startDate?
http.createServer(function (req, res) {
  proxy1.web(req, res, {
    changeOrigin: true,
    target: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`,
  }, (err) => console.log(err));
}).listen(3001);*/
const proxyUrl = "http://100.65.247.60:3000"//'http://67.201.35.145:4145';
const targetUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`;

//const targetUrl = 'http://67.201.35.145:4145';
//const proxyUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=3wa5hHgFuqhf6XiefvqzkcDQWZ01aOOK4vNZEXsP`;

const agent = new HttpsProxyAgent(proxyUrl);

//try {
    const res = await fetch(targetUrl, { agent }); // node fetch use proxy
    const status = res.status
    console.log('status', status)
    const data = await res.json();
    console.log('Response:', data);
/*} catch (err) {
    console.error('Fetch error:', err);
}*/