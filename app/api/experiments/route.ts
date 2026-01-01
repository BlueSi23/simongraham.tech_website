import { NextResponse } from 'next/server';
import { getExperiments, saveExperiment } from '../../../lib/firestore';
import { Experiment } from '../../../lib/experiments-data';

export async function GET() {
    try {
        const data = await getExperiments();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Admin client currently sends the entire array
        if (Array.isArray(body)) {
            const experiments = body as Experiment[];
            let successCount = 0;

            for (const exp of experiments) {
                const saved = await saveExperiment(exp);
                if (saved) successCount++;
            }

            // If at least one saved, we consider it a success (or partial)
            // Ideally we'd optimize this batching
            return NextResponse.json({ success: true, count: successCount });
        } else {
            return NextResponse.json({ error: 'Expected array of experiments' }, { status: 400 });
        }

    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
