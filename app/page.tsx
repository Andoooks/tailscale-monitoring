"use client";

import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

export default function Dashboard() {

  const [data,setData] = useState<any>(null)

  async function load(){

    const res = await fetch("/api/metrics")
    const json = await res.json()

    setData(json)

  }

  useEffect(()=>{

    load()

    const interval = setInterval(load,10000)

    return ()=>clearInterval(interval)

  },[])

if(!data) return <div className="p-10 text-white">Loading...</div>

if(data.connected === false){
  return(
    <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center">
      <div className="bg-red-700 p-8 rounded text-center">
        <h2 className="text-xl mb-2">Tailscale Not Connected</h2>
        <p>{data.error}</p>
      </div>
    </div>
  )
}

  const latencyChart = {
    xAxis:{type:"category",data:["1","2","3","4","5"]},
    yAxis:{type:"value"},
    series:[{data:[120,150,160,170,165],type:"line",smooth:true}]
  }

  const speedChart = {
    xAxis:{type:"category",data:["1","2","3","4","5"]},
    yAxis:{type:"value"},
    series:[{data:[180,200,210,190,205],type:"bar"}]
  }

  return(

  <div className="bg-slate-900 min-h-screen text-white p-10">

    <h1 className="text-3xl mb-6">Network Monitoring Dashboard</h1>

    {/* KPI CARDS */}

    <div className="grid grid-cols-4 gap-6 mb-10">

      <div className="bg-slate-800 p-6 rounded">
        <h3>Latency</h3>
        <p className="text-2xl">{data.latency} ms</p>
      </div>

      <div className="bg-slate-800 p-6 rounded">
        <h3>UDP Status</h3>
        <p className="text-2xl">{data.udp ? "Active":"Blocked"}</p>
      </div>

      <div className="bg-slate-800 p-6 rounded">
        <h3>DERP Region</h3>
        <p className="text-2xl">{data.region}</p>
      </div>

      <div className="bg-slate-800 p-6 rounded">
        <h3>Download Speed</h3>
        <p className="text-2xl">{data.download} Mbps</p>
      </div>

    </div>

    {/* GRAPHS */}

    <div className="grid grid-cols-2 gap-10">

      <div className="bg-slate-800 p-6 rounded">
        <h2 className="mb-4">Latency Trend</h2>
        <ReactECharts option={latencyChart}/>
      </div>

      <div className="bg-slate-800 p-6 rounded">
        <h2 className="mb-4">Speed Trend</h2>
        <ReactECharts option={speedChart}/>
      </div>

    </div>

  </div>

  )

}