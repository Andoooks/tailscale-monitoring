import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function getDB() {
    return open ( {
        filename: "./database/monitor.db",
        driver: sqlite3.Database
    })
}