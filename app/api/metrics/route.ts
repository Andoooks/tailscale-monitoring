import { NextResponse } from "next/server"
import { execSync } from "child_process"

const TAILSCALE = "/Applications/Tailscale.app/Contents/MacOS/tailscale"
const PEER = "100.76.204.94"

function run(cmd:string){
  return execSync(cmd,{encoding:"utf8"})
}

function getStatus(){
  try{
    const output = run(`${TAILSCALE} status --json`)
    return JSON.parse(output)
  }catch{
    return null
  }
}

function getNetcheck(){
  try{
    const output = run(`${TAILSCALE} netcheck --json`)
    return JSON.parse(output)
  }catch{
    return null
  }
}

function getLatency(){
  try{
    const output = run(`${TAILSCALE} ping ${PEER} --c 1`)
    const match = output.match(/time=(\d+\.?\d*)/)
    return match ? Number(match[1]) : null
  }catch{
    return null
  }
}

function getExternalPing(){
  try{
    const output = run("ping -c 3 8.8.8.8")
    const match = output.match(/avg = .*?\/(.*?)\//)
    return match ? Number(match[1]) : null
  }catch{
    return null
  }
}

function getSpeed(){
  try{

    const output = run("speedtest-cli --simple")

    const download = output.match(/Download:\s+(\d+\.?\d*)/)
    const upload = output.match(/Upload:\s+(\d+\.?\d*)/)

    return {
      download: download ? Number(download[1]) : null,
      upload: upload ? Number(upload[1]) : null
    }

  }catch{
    return {download:null,upload:null}
  }
}

export async function GET(){

  try{

    const status = getStatus()

    if(!status){
      return NextResponse.json({
        connected:false,
        error:"Tailscale not connected"
      })
    }

    const netcheck = getNetcheck()
    const latency = getLatency()
    const externalPing = getExternalPing()
    const speed = getSpeed()

    return NextResponse.json({
      connected:true,
      udp: netcheck?.UDP,
      region: netcheck?.NearestDERP,
      latency: latency,
      externalPing: externalPing,
      download: speed.download,
      upload: speed.upload
    })

  }catch(err){

    return NextResponse.json({
      connected:false,
      error:"Unable to collect metrics"
    })

  }

}  }
}

function getSpeed() {
  try {

    const output = run("speedtest-cli --simple")

    const downloadMatch = output.match(/Download:\s+(\d+\.?\d*)/)
    const uploadMatch = output.match(/Upload:\s+(\d+\.?\d*)/)

    const download = downloadMatch ? Number(downloadMatch[1]) : null
    const upload = uploadMatch ? Number(uploadMatch[1]) : null

    return { download, upload }

  } catch {
    return { download: null, upload: null }
  }
}

export async function GET() {

  try {

    const netcheck = getNetcheck()

    if (!netcheck) {
      return NextResponse.json({
        connected: false,
        error: "Tailscale not connected"
      })
    }

    const latency = getLatency()
    const externalPing = getExternalPing()
    const speed = getSpeed()

    return NextResponse.json({
      connected: true,
      udp: netcheck.UDP,
      region: netcheck.NearestDERP,
      latency: latency,
      externalPing: externalPing,
      download: speed.download,
      upload: speed.upload
    })

  } catch (err) {

    return NextResponse.json({
      connected: false,
      error: "Unable to collect metrics"
    })

  }

}
