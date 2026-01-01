import { NextResponse } from "next/server";
import { saveExperiment } from "../../../lib/firestore";
import { INITIAL_EXPERIMENTS } from "../../../lib/seed-data";

export async function GET() {
    try {
        const experiments = INITIAL_EXPERIMENTS;
        let count = 0;

        for (const exp of experiments) {
            const success = await saveExperiment(exp);
            if (success) count++;
        }

        return NextResponse.json({
            message: "Seeding complete (from static data)",
            total: experiments.length,
            seeded: count
        });
    } catch (error) {
        return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
    }
}
