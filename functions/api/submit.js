const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Corps de requête invalide' }, 400);
  }

  const { email, firstName, tags = [] } = body;

  if (!email || !firstName) {
    return json({ error: 'Email et prénom requis' }, 400);
  }

  const response = await fetch('https://api.systeme.io/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': env.SYSTEME_API_KEY,
    },
    body: JSON.stringify({
      email,
      firstName,
      tags: tags.map(name => ({ name })),
    }),
  });

  const data = await response.json();

  if (!response.ok && response.status !== 409) {
    return json({ error: data.message || 'Erreur Systeme.io' }, 500);
  }

  return json({ success: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}
