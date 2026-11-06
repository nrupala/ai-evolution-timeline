import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const root = new URL('..', import.meta.url);

function loadData() {
  const src = readFileSync(new URL('data.js', root), 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx.window.TIMELINE_DATA;
}

test('dataset loads and is non-empty', () => {
  const data = loadData();
  assert.ok(Array.isArray(data), 'TIMELINE_DATA must be an array');
  assert.ok(data.length >= 5, `expected at least 5 events, got ${data.length}`);
});

test('every event is complete and well-typed', () => {
  const cats = new Set(['architecture', 'model', 'agent', 'product']);
  for (const e of loadData()) {
    assert.ok(Number.isInteger(e.id), `event id must be an integer: ${JSON.stringify(e)}`);
    assert.ok(typeof e.year === 'number' && e.year >= 2017 && e.year <= 2030, `year out of range: ${e.year}`);
    assert.ok(cats.has(e.category), `unknown category: ${e.category}`);
    assert.ok(typeof e.event === 'string' && e.event.length > 0, 'event title required');
    assert.ok(typeof e.description === 'string' && e.description.length > 20, `description too short for ${e.event}`);
    assert.ok(Array.isArray(e.citations) && e.citations.length >= 1, `citations required for ${e.event}`);
  }
});

test('event ids are unique and years are chronological by id order', () => {
  const data = loadData();
  const ids = data.map(d => d.id);
  assert.equal(new Set(ids).size, ids.length, 'ids must be unique');
  const sorted = [...data].sort((a, b) => a.id - b.id);
  for (let i = 1; i < sorted.length; i++) {
    assert.ok(sorted[i].year >= sorted[i - 1].year, `year regresses at id ${sorted[i].id}`);
  }
});

test('page shell wires the dataset and stamps the declared version', () => {
  const html = readFileSync(new URL('index.html', root), 'utf8');
  const version = readFileSync(new URL('VERSION', root), 'utf8').trim();
  assert.ok(html.includes('src="data.js"'), 'index.html must load data.js');
  assert.ok(html.includes(`<meta name="app-version" content="${version}"`), 'app-version meta must match VERSION');
  assert.ok(html.includes('cdn.plot.ly/plotly'), 'index.html must load Plotly');
});
