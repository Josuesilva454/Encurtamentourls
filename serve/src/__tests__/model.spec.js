const request = require('supertest');
const app = require('../route/api.js'); // Arquivo principal do aplicativo

test('Testes de URLs encurtadas', () => {
  let insertedId;

  it('Deve criar uma nova URL encurtada', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({
        url: 'http://www.google.com'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.shortUrl).toBeDefined();
    insertedId = response.body.shortUrl;
  });

  it('Deve obter uma URL encurtada existente', async () => {
    const response = await request(app).get(`/${insertedId}`);

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('http://www.google.com');
  });

  it('Deve excluir uma URL encurtada existente', async () => {
    const response = await request(app).delete(`/urls/${insertedId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('URL excluída com sucesso');
  });
});

module.exports = app;
