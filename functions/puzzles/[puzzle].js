export async function onRequest(context) {
    var puzzle = validatePuzzle(context.params.puzzle);
    if (puzzle) {
        var val = await context.env.NAMESPACE.get(puzzle);
        return new Response(`The puzzle: ${puzzle} has value: ${val}`);
    }
}

function validatePuzzle(puzzle) {
    const re = /^[a-zA-Z]{16}$/;
    if (re.test(puzzle)) {
        return puzzle.toLowerCase();
    }
    return null;
}