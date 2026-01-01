import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import * as admin from "firebase-admin";

export async function GET() {
    const cwd = process.cwd();
    const dataPath = path.join(cwd, "data", "experiments.json");
    const fileExists = fs.existsSync(dataPath);

    const envVarPresent = !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const adminApps = admin.apps.length;

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
            envVarPresent,
            adminApps,
            nodeEnv: process.env.NODE_ENV
        }
    });
}
