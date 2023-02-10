import Teacher from "../src/models/teacherModel";
import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()


describe('Testes de validação de professor do banco de dados', () => {

    beforeAll(async ()=> {
       await mongoose.connect(process.env.TEST_URI).catch(error => console.log(error));
    }) 

    test('Deve criar um professor no banco de testes com sucesso', async () => {
        
        const dummyTeacher = new Teacher({
            name: 'nome',
            registration: '123456789',
            email: 'email@gmail.com',
            phoneNumber: '83993740785'
        })

        const teacherResult = await dummyTeacher.save()

        expect(teacherResult.name).toBe('nome')
        expect(teacherResult.registration).toBe('123456789')
        expect(teacherResult.email).toBe('email@gmail.com')
        expect(teacherResult.phoneNumber).toBe('83993740785')
        expect(teacherResult._id).toBeDefined()

    })

     afterEach(async ()=> {
        await mongoose.connection.dropCollection('teachers')
    }) 

    afterAll(async () => {
        await mongoose.connection.close()
    })
})