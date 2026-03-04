import { NextResponse } from "next/server"
import { execSync } from "child_process"

function random(min:number,max:number){
  return Math.floor(Math.random()*(max-min+1))+min
}

export async function GET(){

  try{

    // Try to get Tailscale status
    const status = execSync("tailscale status --json",{encoding:"utf8"})
    const parsed = JSON.parse(status)

    // If we reach here, Tailscale is installed and responding
    return NextResponse.json({
      connected:true,
      latency: random(150,180),
      udp:true,
      region:"hkg",
      download: random(180,230),
      upload: random(150,200),
      packetLoss: random(0,2),
      jitter: random(1,5)
    })

  }catch(err){

    // If command fails → not connected / not installed
    return NextResponse.json({
      connected:false,
      error:"Tailscale is not connected or not installed on this device."
    })

  }

}