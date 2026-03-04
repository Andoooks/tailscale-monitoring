import ping from "ping";
import speedtest from "speedtest-net";
import { getTailscaleStatus, getNetcheck, pingPeer } from "./tailscale";

export async function collectMetrics() {
    const peerIP = "100.76.204.94";
    const status = getTailscaleStatus();
    const netcheck = getNetcheck();
    const peer = pingPeer(peerIP);
    const external = await ping.promise.probe("8.8.8.8");
    
    return {
        udp: netcheck.UDP,
        derp:netcheck.NearesDERP,
        latency: peer.latencyMs,
        externalPing: external.time
    };
}