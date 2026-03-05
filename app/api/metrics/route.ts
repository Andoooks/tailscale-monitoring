import { NextResponse } from "next/server"
import { execSync } from "child_process"

const TAILSCALE = "/Applications/Tailscale.app/Contents/MacOS/tailscale"
const PEER = "100.76.204.94"

function run(cmd: string) {
  try {
    return execSync(cmd, { encoding: "utf8" })
  } catch {
    return ""
  }
}

function getStatus() {
  try {
    const output = run(`${TAILSCALE} status --json`)
    if (!output) return null

    const data = JSON.parse(output)

    // Check backend state
    if (data.BackendState === "Running") {
      return data
    }

    return null
  } catch {
    return null
  }
}

function getNetcheck() {
  try {
    const output = run(`${TAILSCALE} netcheck --json`)
    return output ? JSON.parse(output) : null
  } catch {
    return null
  }
}

function getLatency() {
  try {
    const output = run(`${TAILSCALE} ping ${PEER} --c 1`)
    const match = output.match(/time=(\d+\.?\d*)/)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

function getConnectionType() {
  try {
    const output = run(`${TAILSCALE} ping ${PEER} --c 1`)

    if (output.includes("direct")) return "direct"
    if (output.includes("DERP")) return "DERP"

    return "unknown"
  } catch {
    return "unknown"
  }
}

function getExternalPing() {
  try {
    const output = run(`ping -c 3 ${PEER}`)
    const match = output.match(/avg = .*?\/(.*?)\//)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const status = getStatus()

    if (!status) {
      return NextResponse.json({
        connected: false,
        error: "Tailscale not connected"
      })
    }

    const netcheck = getNetcheck()
    const latency = getLatency()
    const peerPing = getExternalPing()
    const connection = getConnectionType()

    return NextResponse.json({
      connected: true,
      connection,
      udp: netcheck?.UDP ?? null,
      region: netcheck?.NearestDERP ?? null,
      latency,
      peerPing
    })
  } catch {
    return NextResponse.json({
      connected: false,
      error: "Unable to collect metrics"
    })
  }
}
