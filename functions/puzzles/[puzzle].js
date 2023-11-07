export async function onRequest(context) {
    var val = await context.env.NAMESPACE.get("first-key");
    return new Response(`The puzzle: ${context.params.puzzle} has value: ${val}`);
  }