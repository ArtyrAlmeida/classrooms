import dotenv from 'dotenv'
dotenv.config()
import { app } from "../src/app";
import request from "supertest";


describe('Teste de integração da função getAllClassrooms do classroomController', () => {
    jest.setTimeout(5000)

    it('Deve obter todas as salas de aula', async () => {
        const response = await request(app).get('/api/classroom').send();

        expect(response.statusCode).toBe(200);
    });
})