import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getFirestoreStatus } from "../../../lib/firestore";

export async function GET() {
    const cwd = process.cwd();
    const dataPath = path.join(cwd, "data", "experiments.json");
    const fileExists = fs.existsSync(dataPath);

    // Force init check by calling the status function from the lib
    const firestoreStatus = getFirestoreStatus();

    let fileContentLength = 0;
    if (fileExists) {
        try {
            const content = fs.readFileSync(dataPath, "utf8");
            fileContentLength = content.length;
        } catch (e) { }
    }

    return NextResponse.json({
        debug: {
            cwd,
            dataPath,
            fileExists,
            fileContentLength,
            firestoreStatus,
            nodeEnv: process.env.NODE_ENV
        }
    });
}
