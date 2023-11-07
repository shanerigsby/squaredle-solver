export default {
    async fetch(request, env, ctx) {
      const value = await env.NAMESPACE.get("first-key");
  
      if (value === null) {
        return new Response("Value not found", { status: 404 });
      }
      return new Response(value);
    },
  };