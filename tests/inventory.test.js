const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Your Express application file
const { MongoMemoryServer } = require('mongodb-memory-server');
const connection = require('../database/database')

let mongoServer;

beforeAll(async () => {
    // await connection.disconnectFromDatabase()
    mongoServer = new MongoMemoryServer();
    await mongoServer.start();
    const mongoUri = mongoServer.getUri();
  
    await connection.connectToDatabase(mongoUri);
});
  
afterAll(async () => {
    await connection.disconnectFromDatabase()
    await mongoServer.stop();
});

describe('App', () => {

    it('should return status 200 for GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should return status 400 for POST /inventory', async () => {
        const response = await request(app).post('/inventory');
        expect(response.status).toBe(400);
    });

    it('should return status 200 for GET /inventory', async () => {
        const response = await request(app).get('/inventory?sort=1');
        expect(response.status).toBe(200);
    });

    it('should return status 200 for GET /inventory', async () => {
        const response = await request(app).get('/inventory?sort=-1');
        expect(response.status).toBe(200);
    });

    it('should return status 200 for GET /inventory', async () => {
        const response = await request(app).get('/inventory');
        expect(response.status).toBe(200);
    });

    it('should return status 201 for POST /inventory', async () => {
        const newInv = {
            name: 'John Doe',
            price: 2,
            description: '124',
            imageURL: "asdfasd"
        };
        const response = await request(app).post('/inventory').send(newInv);
        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.name).toBe(newInv.name);
        expect(response.body.price).toBe(newInv.price);
        expect(response.body.description).toBe(newInv.description);
        expect(response.body.imageURL).toBe(newInv.imageURL);
        expect(response.body.id).toBeDefined(); 
        console.log(response.body);
    });

    it('should return status 200 for GET /inventory', async () => {
        const response = await request(app).get('/inventory');
        console.log(response.body);
        expect(response.status).toBe(200);
    });

    it('should return status 200 for DELETE /inventory', async () => {
        const newInv = {
            name: 'John Doe',
            price: 2,
            description: '124',
            imageURL: "asdfasd"
        };
        const response_post = await request(app).post('/inventory').send(newInv);
        const response = await request(app).delete('/inventory/'+ response_post.body.id);
        expect(response.status).toBe(200);
    });

    it('should return status 404 for DELETE /inventory', async () => {
        const response = await request(app).delete('/inventory/3');
        expect(response.status).toBe(404);
    });

    it('should return status 200 for GET one /inventory', async () => {
        const newInv = {
            name: 'John Doe',
            price: 2,
            description: '124',
            imageURL: "asdfasd"
        };
        const response_post = await request(app).post('/inventory').send(newInv);
        const response = await request(app).get('/inventory/'+ response_post.body.id);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.name).toBe(newInv.name);
        expect(response.body.price).toBe(newInv.price);
        expect(response.body.description).toBe(newInv.description);
        expect(response.body.imageURL).toBe(newInv.imageURL);
    });

    it('should return status 404 for GET one /inventory', async () => {
        const response = await request(app).get('/inventory/3');
        expect(response.status).toBe(404);
    });

    it('should return status 200 for PATCH /inventory', async () => {
        const newInv = {
            name: 'John Doe',
            price: 2,
            description: '124',
            imageURL: "asdfasd"
        };
        const response_post = await request(app).post('/inventory').send(newInv);
        const newerInv = {
            price: 5,
            imageURL: "test"
        };
        const response = await request(app).patch('/inventory/'+ response_post.body.id).send(newerInv);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.name).toBe(newInv.name);
        expect(response.body.price).toBe(newerInv.price);
        expect(response.body.description).toBe(newInv.description);
        expect(response.body.imageURL).toBe(newerInv.imageURL);
    });

    it('should return status 404 for PATCH /inventory', async () => {
        const response = await request(app).get('/inventory/3');
        expect(response.status).toBe(404);
    });
  
    it('should return status 404 for non-existent route', async () => {
      const response = await request(app).get('/non-existent-route');
      expect(response.status).toBe(404);
    });
  });