"use client";

import { useState } from "react";

export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    async function login() {
        const res = await fetch ("/api/login", {
            method:"POST",
            body: JSON.stringify({
                username:user,
                password:pass
            })
        });
        if(res.ok) {
            window.location.href="/";
        }
        else {
            alert("Invalid login");
        }
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded">
                <h1 className="text-x1 mb-4">Login</h1>
                <input
                    type="password"
                    className="block mb-4 text-black"
                    placeholder="Password"
                    onChange={e=>setPass(e.target.value)}/>
                <button onClick={login}>
                    Login
                </button>
            </div>
        </div>
    );
}