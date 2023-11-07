export async function onRequest(context) {
    var puzzle = validatePuzzle(context.params.puzzle);
    if (puzzle) {
        var solution = await context.env.NAMESPACE.get(puzzle);
        if (!solution) {
            fetch(`https://wordfind.azurewebsites.net/api/solver?board=${puzzle}`)
                .then(res => res.text())
                .then(text => solution = text)
                .catch(err => console.error(err));
        }
        return new Response(`The puzzle: ${puzzle} has solution: ${solution}`);
    }
    return new Response();
}

function validatePuzzle(puzzle) {
    const re = /^[a-zA-Z]{16}$/;
    if (re.test(puzzle)) {
        return puzzle.toLowerCase();
    }
    return null;
}