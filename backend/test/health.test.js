const request = require('supertest');
const test = require('node:test');
const assert = require('node:assert/strict');

const app = require('../src/app');

test('GET /api/health returns service and database status', async () => {
  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.ok, true);
  assert.equal(response.body.service, 'meditrack-api');
  assert.ok(response.body.database.status);
  assert.ok(response.body.timestamp);
});

test('unknown API routes return a structured 404 response', async () => {
  const response = await request(app).get('/api/does-not-exist');

  assert.equal(response.status, 404);
  assert.equal(response.body.ok, false);
  assert.equal(response.body.error.code, 'NOT_FOUND');
});
