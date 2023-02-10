import { getAllStudents, createStudent } from "../src/controllers/studentController"
import Student from "../src/models/studentModel"

jest.mock("../src/models/studentModel")

describe("Funções de controller de estudantes", () => {

    test('Recupera todos os estudantes com sucesso', async () => {
        
        Student.find.mockResolvedValue([])

        const req = {}
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await getAllStudents(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith([])
    })

    test('Deve criar um estudante com sucesso', async () => {

        const dummyStudentRequest = {
            name: 'Immanuel Testes',
            registration: '123456789',
            email: 'testes@gmail.com',
            phoneNumber: '83993740785', 
        }

        const dummyStudentResponse = {
            _id: '63d6d5cd6072f3d5db5f78h6',
            name: 'Immanuel Testes',
            registration: '123456789',
            email: 'testes@gmail.com',
            phoneNumber: '83993740785', 
            createdAt: '2023-02-09T20:23:41.746+00:00',
            updatedAt: '2023-02-09T20:23:41.746+00:00',
            __v: 0
        }
        
        Student.create.mockResolvedValue(dummyStudentResponse)

        const req = {
            body: dummyStudentRequest
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await createStudent(req,res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(dummyStudentResponse)
    })

    test('Deve retornar um erro ao criar um estudante com dados invalidos', async () => {

        const dummyError = new Error('')
        
        Student.create.mockRejectedValue(dummyError)

        const req = {
            body: {}
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await createStudent(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
    })

})