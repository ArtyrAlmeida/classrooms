import { inputValidationFunctions } from "../../front/js/validations";

describe("validation functions tests", () => {
    let validationFunctions;

    beforeEach(() => validationFunctions = inputValidationFunctions());

    
    /* IMAGE */
    it("should return false when image doesn't start with https://", async () => {
        const data = {image: "http://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"};
        const response = validationFunctions["image"](data);
        
        expect(response).toBeFalsy();
    });

    it("should return false when image doesn't has a .com", async () => {
        const data = {image: "https://cdn.pixabay.br/photo/2015/04/23/22/00/tree-736885__480.jpg"};
        const response = validationFunctions["image"](data);
        
        expect(response).toBeFalsy();
    });

    it("should return true when the image is valid", async () => {
        const data = {image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"};
        const response = validationFunctions["image"](data);
        
        expect(response).toBeTruthy();
    });


    /* PASSWORD */
    it("should return false when the password is empty", async () => {
        const data = {password: ""};
        const response = validationFunctions["password"](data);
        
        expect(response).toBeFalsy();
    });

    it("should return false when the password doesn't have an uppercase character", async () => {
        const data = {password: "a1!"};
        const response = validationFunctions["password"](data);
        
        expect(response).toBeFalsy();
    });

    it("should return false when the password doesn't have a lowercase character", async () => {
        const data = {password: "A1!"};
        const response = validationFunctions["password"](data);
        
        expect(response).toBeFalsy();
    });

    it("should return false when the password doesn't have a number", async () => {
        const data = {password: "aA!"};
        const response = validationFunctions["password"](data);
        
        expect(response).toBeFalsy();
    });
    
    it("should return false when the password doesn't have a special character", async () => {
        const data = {password: "aA1"};
        const response = validationFunctions["password"](data);
        
        expect(response).toBeFalsy();
    });
    
    it("should return true when the password has uppercase, lowercase and special characters and numbers", async () => {
        const data = {password: "aA1!"};
        const response = validationFunctions["password"](data);
        
        expect(response).toBeTruthy();
    });


    /* CONFIRM PASSWORD */
    it("should return false when password and confirmPassword are different", async () => {
        const data = {password: "aA1!", confirmPassword: "aA2!"};
        const response = validationFunctions["confirmPassword"](data);

        expect(response).toBeFalsy();
    });

    it("should return true when password and confirmPassword are the same", async () => {
        const data = {password: "aA1!", confirmPassword: "aA1!"};
        const response = validationFunctions["confirmPassword"](data);

        expect(response).toBeTruthy();
    });


    /* EMAIL */
    it("should return false when the email field is empty", async () => {
        const data = {email: "   "};
        const response = validationFunctions["email"](data);

        expect(response).toBeFalsy();
    });
    
    it("should return false when the email hasn't an @", async () => {
        const data = {email: "email.com"};
        const response = validationFunctions["email"](data);

        expect(response).toBeFalsy();
    });

    it("should return false when the email hasn't a .", async () => {
        const data = {email: "email@com"};
        const response = validationFunctions["email"](data);

        expect(response).toBeFalsy();
    });

    it("shoud return true when the email has an @ and .", async () => {
        const data = {email: "email@email.com"};
        const response = validationFunctions["email"](data);
        
        expect (response).toBeTruthy();
    });
    /* PHONE NUMBER */
    it("should return false when the phone number hasn't 11 numbers", async () => {
        const data = {phoneNumber: "1234567891"};
        const response = validationFunctions["phoneNumber"](data);

        expect(response).toBeFalsy();
    });

    it("should return true when the number has 11 numbers", async () => {
        const data = {phoneNumber: "12345678901"};
        const response = validationFunctions["phoneNumber"](data);

        expect(response).toBeTruthy();
    });

    it("should return true when the number has 11 numbers and it's formatted", async () => {
        const data = {phoneNumber: "(12) 34567-8901"};
        const response = validationFunctions["phoneNumber"](data);

        expect(response).toBeTruthy();
    });


    /* SEMESTER */
    it("should return false when semester is invalid", async () => {
        const data = {semester: 0};
        const response = validationFunctions["semester"](data);

        expect(response).toBeFalsy();
    });

    it("should return true when semester is at least 1", async () => {
        const data = {semester: 1};
        const response = validationFunctions["semester"](data);

        expect(response).toBeTruthy();
    });
});
 