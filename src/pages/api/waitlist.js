// src/pages/api/waitlist.js
export async function POST({ request }) {
  try {
    const { name, email } = await request.json();
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'Nombre y correo son obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payload = [{ Name: name, Email: email }];

    const nocodbResponse = await fetch(
      'https://app.nocodb.com/api/v2/tables/mze85bx95icc47h/records',
      {
        method: 'POST',
        headers: {
          'xc-token': 'kVUsJQS63vDxQXDqHlY6rAL1QVmFaYs1KvFUZELq',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!nocodbResponse.ok) {
      const text = await nocodbResponse.text();
      return new Response(text, { status: nocodbResponse.status });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Error interno' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
