const request = require('supertest');
const app = require('../index'); // Import the Express app

describe('GET /api/', () => {
  it('responds with an array of keyboard objects', async () => {
    const response = await request(app).get('/api/');

    // Check if the response status code is 200 (OK)
    expect(response.status).toBe(200);

    // Check if the response body is an array
    expect(Array.isArray(response.body)).toBe(true);

    // Check if the response array contains objects with the expected keys
    response.body.forEach((keyboard) => {
        // Check if key exists
        expect(keyboard).toHaveProperty('name');
        expect(keyboard).toHaveProperty('brand');
        expect(keyboard).toHaveProperty('desc');
        expect(keyboard).toHaveProperty('price');
        expect(keyboard).toHaveProperty('img');
        expect(keyboard).toHaveProperty('layout');
        expect(keyboard).toHaveProperty('userId');

        // Check if data type match
        expect(typeof keyboard.name).toBe('string');
        expect(typeof keyboard.brand).toBe('string');
        expect(typeof keyboard.desc).toBe('string');
    });
  });
});