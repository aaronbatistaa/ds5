const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

async function generateResponse(prompt) {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: {
                text: prompt,
            },
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        console.error('API Error:', errorDetails);
        throw new Error(`Failed to generate response: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].output;
}