let Book;
let Review;
let pass = 0;
let fail = 0;

async function loadModels() {
  try {
    const b = await import('../src/models/book.js');
    const r = await import('../src/models/review.js');
    Book = b.default;
    Review = r.default;
  } catch (error) {
    throw new Error('No se pudieron cargar los modelos');
  }
}

function test(label, fn) {
  try {
    fn();
    console.log(`✅ ${label}`);
    pass++;
  } catch (err) {
    console.log(`❌ ${label} — ${err.message}`);
    fail++;
  }
}

function expectError(doc, path) {
  const err = doc.validateSync();
  if (!err || !err.errors[path]) {
    throw new Error(`se esperaba un error de validación en '${path}', pero no hubo ninguno`);
  }
}

function expectNoError(doc, path) {
  const err = doc.validateSync();
  if (err && err.errors[path]) {
    throw new Error(`no se esperaba un error de validación en '${path}', pero se obtuvo: ${err.errors[path].message}`);
  }
}

console.log('\nLección 05: Esquemas y modelos\n');

// ── Modelo Review ──────────────────────────────────────────────────────────────

await loadModels();

test('Review — el modelo está definido', () => {
  if (typeof Review !== 'function') throw new Error('El modelo Review exportado no es válido');
});

test('Review — text es obligatorio', () => {
  expectError(new Review({ rating: 4 }), 'text');
});

test('Review — text exige una longitud mínima de 5', () => {
  expectError(new Review({ text: 'hi', rating: 4 }), 'text');
});

test('Review — text exige una longitud máxima de 500', () => {
  expectError(new Review({ text: 'x'.repeat(501), rating: 4 }), 'text');
});

test('Review — rating es obligatorio', () => {
  expectError(new Review({ text: 'Great book!' }), 'rating');
});

test('Review — un documento válido pasa la validación', () => {
  expectNoError(new Review({ text: 'Great book!', rating: 5 }), 'text');
  expectNoError(new Review({ text: 'Great book!', rating: 5 }), 'rating');
});

// ── Modelo Book ────────────────────────────────────────────────────────────────
test('Book — el modelo está definido', () => {
  if (typeof Book !== 'function') throw new Error('El modelo Book exportado no es válido');
});

test('Book — title es obligatorio', () => {
  expectError(new Book({ genre: 'fiction' }), 'title');
});

test('Book — title exige una longitud mínima de 2', () => {
  expectError(new Book({ title: 'X', genre: 'fiction' }), 'title');
});

test('Book — title exige una longitud máxima de 100', () => {
  expectError(new Book({ title: 'x'.repeat(101), genre: 'fiction' }), 'title');
});

test('Book — genre es obligatorio', () => {
  expectError(new Book({ title: 'Dune' }), 'genre');
});

test('Book — genre rechaza valores fuera del enum', () => {
  expectError(new Book({ title: 'Dune', genre: 'fantasy' }), 'genre');
});

test('Book — genre acepta todos los valores válidos del enum', () => {
  for (const g of ['fiction', 'non-fiction', 'biography', 'science', 'history']) {
    expectNoError(new Book({ title: 'Dune', genre: g }), 'genre');
  }
});

test('Book — year es opcional', () => {
  expectNoError(new Book({ title: 'Dune', genre: 'fiction' }), 'year');
});

test('Book — tags es un arreglo', () => {
  const doc = new Book({ title: 'Dune', genre: 'fiction', tags: ['scifi', 'epic'] });
  const err = doc.validateSync();
  if (err) throw new Error(`error de validación inesperado: ${err.message}`);
  if (!Array.isArray(doc.tags)) throw new Error('tags no es un arreglo');
});

console.log(`\n${pass} superadas, ${fail} fallidas`);

if (fail === 0) {
  const code = Buffer.from('cGsyLXJqeXQ=', 'base64').toString();
  console.log(`\nCódigo de verificación: ${code}`);
}
if (fail > 0) process.exit(1);
