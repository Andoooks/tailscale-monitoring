import ReactEcharts from "echarts-for-react";

export default function Charts({data}:any) {
    const option = {
        xAxis: {type:"category", data:[Date.now()]},
        yAxis: {type:"value"},

        series: [
            {
                data:[data.latency],
                type:"line",
                smooth:true
            }
        ]
    }
    return <ReactEcharts option={option}/>
}