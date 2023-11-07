export async function onRequest(context) {
    let result = {};
    var puzzle = validatePuzzle(context.params.puzzle);

    if (!puzzle) {
        result = {
            success: false,
            message: 'invalid puzzle',
            solution: ''
        };
        return new Response(JSON.stringify(result), { status: 400 });
    }

    var solution = await context.env.NAMESPACE.get(puzzle);

    if (!solution) {
        try {
            const url = `https://wordfind.azurewebsites.net/api/solver?board=${puzzle}`;
            const response = await fetch(url);
            if (response.ok) {
                const text = await response.text();
                await context.env.NAMESPACE.put(puzzle, text);
                result = {
                    success: true,
                    message: '',
                    solution: text
                };
            } else {
                result = {
                    success: false,
                    message: `Failed to fetch: ${url}`,
                    solution: ''
                };
            }
        } catch (err) {
            console.error(err);
            result = {
                success: false,
                message: `Error: ${error}`,
                solution: ''
            };
        }
    } else {
        result = {
            success: true,
            message: '',
            solution: solution
        };
    }
    return new Response(JSON.stringify(result));
}

function validatePuzzle(puzzle) {
    const re = /^[a-zA-Z]{16}$/;
    if (re.test(puzzle)) {
        return puzzle.toLowerCase();
    }
    return null;
}