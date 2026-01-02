import { NextResponse } from "next/server";
import { saveExperiment } from "../../../lib/firestore";
import { INITIAL_EXPERIMENTS } from "../../../lib/seed-data";

export async function GET() {
    try {
        const experiments = INITIAL_EXPERIMENTS;
        let count = 0;
        const errors: string[] = [];

        for (const exp of experiments) {
            const result = await saveExperiment(exp);
            if (result.success) {
                count++;
            } else {
                errors.push(`Failed to save ${exp.slug}: ${result.error}`);
            }
        }

        return NextResponse.json({
            message: "Seeding run finished",
            total: experiments.length,
            seeded: count,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error) {
        return NextResponse.json({ error: "Seeding crashed", details: String(error) }, { status: 500 });
    }
}
