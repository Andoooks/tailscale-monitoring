import { execSync } from "child_process";

// Define the full path to the Tailscale binary on macOS
const TAILSCALE_PATH = "/Applications/Tailscale.app/Contents/MacOS/tailscale";

export function getTailscaleStatus() {
    // Note: We use the full path variable here
    const output = execSync(`${TAILSCALE_PATH} status --json`).toString();
    return JSON.parse(output);
}

export function getNetcheck() {
    const output = execSync(`${TAILSCALE_PATH} netcheck --json`).toString();
    return JSON.parse(output);
}

export function pingPeer(ip: string) {
    // Fixed: Use backticks (`) instead of double quotes (") for interpolation
    const output = execSync(`${TAILSCALE_PATH} ping --json ${ip}`).toString();
    return JSON.parse(output);
}