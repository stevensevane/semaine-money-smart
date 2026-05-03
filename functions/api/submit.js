const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestPost({ request, env, waitUntil }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Corps de requête invalide' }, 400);
  }

  const { email, firstName, whatsapp } = body;

  if (!email || !firstName) {
    return json({ error: 'Email et prénom requis' }, 400);
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': env.SYSTEME_API_KEY,
  };

  // Pays via Cloudflare
  const country = request.headers.get('CF-IPCountry') || null;

  const fields = [{ slug: 'first_name', value: firstName }];
  if (country) fields.push({ slug: 'country', value: country });
  if (whatsapp) fields.push({ slug: 'phone_number', value: whatsapp });

  const contactPayload = { email, fields };

  // 1. Créer le contact
  const createRes = await fetch('https://api.systeme.io/api/contacts', {
    method: 'POST',
    headers,
    body: JSON.stringify(contactPayload),
  });

  const createData = await createRes.json();

  let contactId;

  if (!createRes.ok) {
    const isDuplicate = createRes.status === 409 || createRes.status === 422;
    if (!isDuplicate) return json({ error: `Erreur ${createRes.status}: ${JSON.stringify(createData)}` }, 500);

    // Contact existant : on cherche son ID par email pour quand même ajouter les tags
    const searchRes = await fetch(`https://api.systeme.io/api/contacts?email=${encodeURIComponent(email)}`, { headers });
    const searchData = await searchRes.json();
    contactId = searchData.items?.[0]?.id;
  } else {
    contactId = createData.id;
  }

  if (!contactId) return json({ success: true });

  // 2. Ajouter les tags en arrière-plan (serveur Cloudflare, indépendant du navigateur)
  waitUntil(Promise.all([1791410, 1397916].map(tagId =>
    fetch(`https://api.systeme.io/api/contacts/${contactId}/tags`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ tagId }),
    })
  )));

  return json({ success: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}
