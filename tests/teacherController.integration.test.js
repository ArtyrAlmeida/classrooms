import dotenv from 'dotenv'
dotenv.config()
import { app } from "../src/app";
import request from "supertest";


describe('Testes de integração do controller de professores', () => {
    jest.setTimeout(20000)

    it('Deve obter todos os professores', async () => {
        const response = await request(app).get('/api/teacher').send();

        expect(response.statusCode).toBe(200);
    });
})