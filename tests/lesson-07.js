const BASE = 'http://localhost:3000';
let pass = 0;
let fail = 0;
let skip = 0;

class Skip extends Error {}

async function test(label, fn) {
  try {
    await fn();
    console.log(`✅ ${label}`);
    pass++;
  } catch (err) {
    if (err instanceof Skip) {
      console.log(`○ ${label} — ${err.message}`);
      skip++;
    } else {
      console.log(`❌ ${label} — ${err.message}`);
      fail++;
    }
  }
}

function expect(value, label) {
  return {
    toBe(expected) {
      if (value !== expected) throw new Error(`${label}: se esperaba ${expected}, se obtuvo ${value}`);
    },
  };
}

async function run() {
  console.log('\nLección 07: ObjectID\n');

  const INVALID_ID = 'not-a-valid-id';

  await test('GET /books/invalid-id — devuelve 400', async () => {
    const res = await fetch(`${BASE}/books/${INVALID_ID}`);
    expect(res.status, 'estado').toBe(400);
  });

  await test('PATCH /books/invalid-id — devuelve 400', async () => {
    const res = await fetch(`${BASE}/books/${INVALID_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test' }),
    });
    expect(res.status, 'estado').toBe(400);
  });

  await test('DELETE /books/invalid-id — devuelve 400', async () => {
    const res = await fetch(`${BASE}/books/${INVALID_ID}`, { method: 'DELETE' });
    expect(res.status, 'estado').toBe(400);
  });

  console.log(`\n${pass} superadas, ${fail} fallidas, ${skip} omitidas`);
  if (fail === 0 && skip === 0) {
    const code = Buffer.from('Ym00LXRuanI=', 'base64').toString();
    console.log(`\nCódigo de verificación: ${code}`);
  }
  if (fail > 0) process.exit(1);
}

run().catch(() => {
  console.error('\nNo se pudo conectar con el servidor. Asegúrate de que esté corriendo en el puerto 3000.\n');
  process.exit(1);
});
