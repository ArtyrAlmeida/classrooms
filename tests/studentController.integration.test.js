import dotenv from 'dotenv'
dotenv.config()
import { app } from "../src/app";
import request from "supertest";


describe('Testes de integração do controller de alunos', () => {
    jest.setTimeout(5000)

    it('Deve obter todos os alunos', async () => {
        const response = await request(app).get('/api/student').send();

        expect(response.statusCode).toBe(200);
    });
})