import dotenv from "dotenv"
dotenv.config()
import { app } from "../src/app";
import request from "supertest";

describe("classroom controller tests", () => {
    jest.setTimeout(10000);

    it("should create a new classroom", async () => {
        const admin = {
            name: "example admin",
            email: "admin@email.com",
            password: "adminPASSWORD2*"
        };
        let authorization;
        let teachers = await request(app).get("/api/teacher/").send();
        
        try {
            const adminResponse = await request(app).post("/api/admin/login").send(admin);
            if (adminResponse.body.error === "User not registered in the app") throw new Error();
            authorization = adminResponse.body.token;
        } catch (_) {
            await request(app).post("/api/admin/signup").send(admin);
            const adminResponse = await request(app).post("/api/admin/login").send(admin);
            authorization = adminResponse.body.token;
        }

        console.log(authorization);

        if (teachers.body.length < 1){
            const teacher = {
                name: "example teacher",
                registration: "2000200200",
                email: "example@institution.com",
                phoneNumber: "(00) 00000-0000"
            };

            await request(app).post("/api/teacher/").send(teacher).set({"authorization": authorization});
            teachers = await request(app).get("/api/teacher/").send();
        }
        
        const classroom = {
            name: "example classroom",
            image: "https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg",
            teacher: teachers.body[0].registration,
            students: [],
            semester: 1
        };
        const createdClassroom = await request(app).post("/api/classroom/").send(classroom).set({"authorization": authorization});

        expect(createdClassroom.body.name).toBe(classroom.name);
        expect(createdClassroom.body.image).toBe(classroom.image);
        expect(createdClassroom.body.teacher).toBe(classroom.teacher);
        expect(createdClassroom.body.students.length).toBe(classroom.students.length);
        expect(createdClassroom.body.semester).toBe(classroom.semester);
    });
});
