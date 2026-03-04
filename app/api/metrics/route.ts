import { NextResponse } from "next/server"
import { execSync } from "child_process"

const TAILSCALE_PATH = "/Applications/Tailscale.app/Contents/MacOS/tailscale"
const PEER = "100.76.204.94"

function run(cmd:string){
  return execSync(cmd,{encoding:"utf8"})
}

function getLatency(){
  try{
    const result = run(`${TAILSCALE_PATH} ping ${PEER} --c 1`)
    const match = result.match(/time=(\d+\.?\d*)/)
    return match ? Number(match[1]) : null
  }catch{
    return null
  }
}

function getNetcheck(){
  try{
    const output = run(`${TAILSCALE_PATH} netcheck --json`)
    return JSON.parse(output)
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

export async function GET(){

  try{

    const netcheck = getNetcheck()

    if(!netcheck){
      return NextResponse.json({
        connected:false,
        error:"Tailscale not connected"
      })
    }

    const latency = getLatency()
    const externalPing = getExternalPing()

    return NextResponse.json({
      connected:true,
      udp: netcheck.UDP,
      region: netcheck.NearestDERP,
      latency: latency,
      externalPing: externalPing
    })

  }catch(err){

    return NextResponse.json({
      connected:false,
      error:"Unable to collect metrics"
    })

  }

}
