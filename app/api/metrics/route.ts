import { NextResponse } from "next/server"
import { execSync } from "child_process"

const TAILSCALE = "/Applications/Tailscale.app/Contents/MacOS/tailscale"
const PEER = "100.76.204.94"

function run(cmd: string) {
  return execSync(cmd, { encoding: "utf8" })
}

function getStatus() {
  try {
    const output = run(`${TAILSCALE} status --json`)
    const status = JSON.parse(output)

    if (status.BackendState === "Running") {
      return status
    }

    return null
  } catch {
    return null
  }
}

function getNetcheck() {
  try {
    const output = run(`${TAILSCALE} netcheck --json`)
    return JSON.parse(output)
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

function getPeerPing() {
  try {
    const output = run(`ping -c 3 ${PEER}`)
    const match = output.match(/avg = .*?\/(.*?)\//)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

function getSpeed() {
  try {
    const output = run("speedtest-cli --simple")

    const downloadMatch = output.match(/Download:\s+(\d+\.?\d*)/)
    const uploadMatch = output.match(/Upload:\s+(\d+\.?\d*)/)

    return {
      download: downloadMatch ? Number(downloadMatch[1]) : null,
      upload: uploadMatch ? Number(uploadMatch[1]) : null
    }
  } catch {
    return { download: null, upload: null }
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
    const peerPing = getPeerPing()
    const speed = getSpeed()

    return NextResponse.json({
      connected: true,
      udp: netcheck?.UDP ?? null,
      region: netcheck?.NearestDERP ?? null,
      latency,
      peerPing,
      download: speed.download,
      upload: speed.upload
    })
  } catch {
    return NextResponse.json({
      connected: false,
      error: "Unable to collect metrics"
    })
  }
}    const output = run(`${TAILSCALE} ping ${PEER} --c 1`)
    const match = output.match(/time=(\d+\.?\d*)/)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

function getPeerPing() {
  try {
    const output = run(`ping -c 3 ${PEER}`)
    const match = output.match(/avg = .*?\/(.*?)\//)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

function getSpeed() {
  try {
    const output = run("speedtest-cli --simple")

    const downloadMatch = output.match(/Download:\s+(\d+\.?\d*)/)
    const uploadMatch = output.match(/Upload:\s+(\d+\.?\d*)/)

    return {
      download: downloadMatch ? Number(downloadMatch[1]) : null,
      upload: uploadMatch ? Number(uploadMatch[1]) : null
    }
  } catch {
    return { download: null, upload: null }
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
    const peerPing = getPeerPing()
    const speed = getSpeed()

    return NextResponse.json({
      connected: true,
      udp: netcheck?.UDP ?? null,
      region: netcheck?.NearestDERP ?? null,
      latency,
      peerPing,
      download: speed.download,
      upload: speed.upload
    })
  } catch {
    return NextResponse.json({
      connected: false,
      error: "Unable to collect metrics"
    })
  }
}    const output = run(`${TAILSCALE} ping ${PEER} --c 1`)
    const match = output.match(/time=(\d+\.?\d*)/)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

function getPeerPing() {
  try {
    const output = run(`ping -c 3 ${PEER}`)
    const match = output.match(/avg = .*?\/(.*?)\//)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
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
    const status = getStatus()

    if (!status) {
      return NextResponse.json({
        connected: false,
        error: "Tailscale not connected"
      })
    }

    const netcheck = getNetcheck()
    const latency = getLatency()
    const peerPing = getPeerPing()
    const speed = getSpeed()

    return NextResponse.json({
      connected: true,
      udp: netcheck?.UDP ?? null,
      region: netcheck?.NearestDERP ?? null,
      latency,
      peerPing,
      download: speed.download,
      upload: speed.upload
    })

  } catch {
    return NextResponse.json({
      connected: false,
      error: "Unable to collect metrics"
    })
  }
}    const output = run(`${TAILSCALE} ping ${PEER} --c 1`)
    const match = output.match(/time=(\d+\.?\d*)/)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

function getPeerPing() {
  try {
    const output = run(`ping -c 3 ${PEER}`)
    const match = output.match(/avg = .*?\/(.*?)\//)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

function getSpeed() {
  try {
    const output = run("speedtest-cli --simple")

    const downloadMatch = output.match(/Download:\s+(\d+\.?\d*)/)
    const uploadMatch = output.match(/Upload:\s+(\d+\.?\d*)/)

    return {
      download: downloadMatch ? Number(downloadMatch[1]) : null,
      upload: uploadMatch ? Number(uploadMatch[1]) : null
    }
  } catch {
    return { download: null, upload: null }
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
    const peerPing = getPeerPing()
    const speed = getSpeed()

    return NextResponse.json({
      connected: true,
      udp: netcheck?.UDP ?? null,
      region: netcheck?.NearestDERP ?? null,
      latency,
      peerPing,
      download: speed.download,
      upload: speed.upload
    })

  } catch {
    return NextResponse.json({
      connected: false,
      error: "Unable to collect metrics"
    })
  }
}}

function getExternalPing() {
  try {
    const output = run("ping -c 3 8.8.8.8")
    const match = output.match(/avg = .*?\/(.*?)\//)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

function getSpeed() {
  try {
    const output = run("speedtest-cli --simple")

    const downloadMatch = output.match(/Download:\s+(\d+\.?\d*)/)
    const uploadMatch = output.match(/Upload:\s+(\d+\.?\d*)/)

    return {
      download: downloadMatch ? Number(downloadMatch[1]) : null,
      upload: uploadMatch ? Number(uploadMatch[1]) : null
    }
  } catch {
    return { download: null, upload: null }
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
    const externalPing = getExternalPing()
    const speed = getSpeed()

    return NextResponse.json({
      connected: true,
      udp: netcheck?.UDP ?? null,
      region: netcheck?.NearestDERP ?? null,
      latency,
      externalPing,
      download: speed.download,
      upload: speed.upload
    })
  } catch {
    return NextResponse.json({
      connected: false,
      error: "Unable to collect metrics"
    })
  }
}
