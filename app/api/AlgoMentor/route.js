// app/api/AlgoMentor/route.js

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":
        "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Authorization",
    },
  });
}

export async function POST(request) {
  const data = await request.json();
  // ...your logic...
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":
        "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Authorization",
    },
  });
}
