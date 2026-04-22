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

  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': env.SYSTEME_API_KEY,
  };

  // 1. Créer le contact
  const createRes = await fetch('https://api.systeme.io/api/contacts', {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, firstName }),
  });

  const createData = await createRes.json();

  if (!createRes.ok && createRes.status !== 409) {
    return json({ error: createData.message || 'Erreur création contact' }, 500);
  }

  const contactId = createData.id;
  if (!contactId) return json({ success: true });

  // IDs des tags Systeme.io (fixes)
  const TAG_IDS = [1791410, 1397916]; // La semaine Money Smart, Newsletter

  for (const tagId of TAG_IDS) {
    await fetch(`https://api.systeme.io/api/contacts/${contactId}/tags`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ tagId }),
    });
  }

  return json({ success: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}
