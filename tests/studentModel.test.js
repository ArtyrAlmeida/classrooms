import Student from "../src/models/studentModel"
import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()


describe('Testes de validação do banco de dados', () => {

    beforeAll(async ()=> {
       await mongoose.connect(process.env.TEST_URI).catch(error => console.log(error));
    }) 

    test('Deve Criar um estudante no banco de testes com sucesso', async () => {
        
        const dummyStudent = new Student({
            name: 'nome',
            registration: '123456789',
            email: 'email@gmail.com',
            phoneNumber: '83993740785'
        })

        const studentResult = await dummyStudent.save()

        expect(studentResult.name).toBe('nome')
        expect(studentResult.registration).toBe('123456789')
        expect(studentResult.email).toBe('email@gmail.com')
        expect(studentResult.phoneNumber).toBe('83993740785')
        expect(studentResult._id).toBeDefined()

    })

    
    test('Deve falhar ao tentar criar um usuario com mesmo email', async () => {
        
        const dummyStudent1 = new Student({
            name: 'nome',
            registration: '123456789',
            email: 'email@gmail.com',
            phoneNumber: '83993740785'
        })

        const dummyStudent2 = new Student({
            name: 'nome',
            registration: '234567891',
            email: 'email@gmail.com',
            phoneNumber: '83993740785'
        })

            await dummyStudent1.save()
        try {
           await dummyStudent2.save()
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

     afterEach(async ()=> {
        await mongoose.connection.dropCollection('students')
    }) 

    afterAll(async () => {
        await mongoose.connection.close()
    })
})