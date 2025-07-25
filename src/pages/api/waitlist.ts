// src/pages/api/waitlist.ts
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Nombre y correo son obligatorios' }), { status: 400 });
    }

    // Construimos el payload que espera NocoDB (array de objetos)
    const payload = [{ Name: name, Email: email }];

    const nocodbResponse = await fetch('https://app.nocodb.com/api/v2/tables/mze85bx95icc47h/records', {
      method: 'POST',
      headers: {
        // Usa un token de entorno para no exponerlo en el frontend
        'xc-token': import.meta.env.NOCODB_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!nocodbResponse.ok) {
      const text = await nocodbResponse.text();
      return new Response(text, { status: nocodbResponse.status });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
};
