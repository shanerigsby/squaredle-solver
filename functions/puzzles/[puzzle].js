export async function onRequest(context) {
    var puzzle = validatePuzzle(context.params.puzzle);

    if (!puzzle) {
        return new Response('Invalid puzzle', { status: 400 });
    }

    let result = '';
    var solution = await context.env.NAMESPACE.get(puzzle);

    if (!solution) {
        try {
            const url = `https://wordfind.azurewebsites.net/api/solver?board=${puzzle}`;
            const response = await fetch(url);
            if (response.ok) {
                const text = await response.text();
                await context.env.NAMESPACE.put(puzzle, text);
                result = `The puzzle: ${puzzle} has solution: ${text}`;
            } else {
                result = `Failed to fetch: ${url}`;
            }
        } catch (err) {
            result = `Error: ${err}`;
        }
    } else {
        result = solution;
    }
    return new Response(result);
}

function validatePuzzle(puzzle) {
    const re = /^[a-zA-Z]{16}$/;
    if (re.test(puzzle)) {
        return puzzle.toLowerCase();
    }
    return null;
}