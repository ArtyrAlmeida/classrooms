import dotenv from "dotenv"
dotenv.config()
import { app } from "../src/app";
import request from "supertest";

describe("teacher controller tests", () => {
    jest.setTimeout(5000);

    it("should create a new teacher", async () => {
        const admin = {
            name: "example teacher",
            email: "teacher@email.com",
            password: "adminPASSWORD2*"
        };
        let authorization;
        const currentRegistrations = await request(app).get("/api/teacher/").send().then(response => response.body.map(teacher => teacher.registration));

        try {
            const adminResponse = await request(app).post("/api/admin/login").send(admin);
            if (adminResponse.body.error === "User not registered in the app") throw new Error();
            authorization = adminResponse.body.token;
        } catch (_) {
            await request(app).post("/api/admin/signup").send(admin);
            const adminResponse = await request(app).post("/api/admin/login").send(admin);
            authorization = adminResponse.body.token;
        }

        let randomNumber;
        do {
            randomNumber = (Math.random() * 13526851).toString();
        } while (currentRegistrations.includes(randomNumber));

        const teacher = {
            name: "example teacher",
            registration: randomNumber,
            email: `example${randomNumber}@institution.com`,
            phoneNumber: "(00) 00000-0000"
        };

        const createdTeacher = await request(app).post("/api/teacher/").send(teacher).set({"authorization": authorization});
        
        expect(createdTeacher.body.name).toBe(teacher.name);
        expect(createdTeacher.body.registration).toBe(teacher.registration);
        expect(createdTeacher.body.email).toBe(teacher.email);
        expect(createdTeacher.body.phoneNumber).toBe(teacher.phoneNumber);
    });
});
