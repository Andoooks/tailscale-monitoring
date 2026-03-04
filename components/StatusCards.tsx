export default function StatusCards ({data}:any) {
    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-4">
                UDP: {data.udp ? "Enabled": "Blocked"}
            </div>
            <div className="bg-gray-800 p-4">
                DERP: {data.derp}
            </div>
            <div className="bg-gray-800 p-4">
                Latency: {data.latency} ms
            </div>
            <div className="bg-gray-800 p-4">
                External Ping: {data.externalPing}
            </div>
        </div>
    )
}