const fetch = globalThis.fetch;

async function testCMS() {
    const baseUrl = 'http://localhost:3000/api/experiments';
    console.log('Testing CMS API at ' + baseUrl);

    try {
        // 1. GET initial data
        const res1 = await fetch(baseUrl);
        if (!res1.ok) throw new Error(`GET failed: ${res1.status} ${res1.statusText}`);
        const data1 = await res1.json();
        console.log('Initial count:', data1.length);
        const initialCount = data1.length;

        // 2. Add new experiment
        const newItem = {
            id: "test-generated-" + Date.now(),
            slug: "api-test",
            title: "API Test Experiment",
            category: "Test",
            description: "Testing API",
            longDescription: "Testing...",
            image: "/images/experiments/audio-vis.png",
            tags: ["Test"],
            featured: false,
            layout: []
        };

        const newData = [...data1, newItem];

        const res2 = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        if (!res2.ok) throw new Error(`POST add failed: ${res2.status} ${res2.statusText}`);
        console.log('Added item via POST');

        // 3. GET verify
        const res3 = await fetch(baseUrl);
        const data3 = await res3.json();
        console.log('Count after add:', data3.length);
        if (data3.length !== initialCount + 1) console.error('ERROR: Count mismatch after add');
        else console.log('SUCCESS: Item added');

        // 4. Restore original list
        const res4 = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data1)
        });

        if (!res4.ok) throw new Error(`POST restore failed: ${res4.status} ${res4.statusText}`);
        console.log('Restored original list via POST');

        // 5. GET final verify
        const res5 = await fetch(baseUrl);
        const data5 = await res5.json();
        console.log('Count after restore:', data5.length);
        if (data5.length !== initialCount) console.error('ERROR: Count mismatch after restore');
        else console.log('SUCCESS: State restored');

    } catch (err) {
        console.error('Test failed:', err);
        process.exit(1);
    }
}

testCMS();
