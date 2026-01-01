import { NextResponse } from "next/server";
import { getExperiments } from "../../../lib/experiments-server";
import { saveExperiment } from "../../../lib/firestore";

export async function GET() {
    try {
        const experiments = getExperiments();
        let count = 0;

        for (const exp of experiments) {
            const success = await saveExperiment(exp);
            if (success) count++;
        }

        return NextResponse.json({
            message: "Seeding complete",
            total: experiments.length,
            seeded: count
        });
    } catch (error) {
        return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
    }
}
