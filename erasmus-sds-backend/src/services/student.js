"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const user_1 = require("./user");
class StudentService {
    constructor(app) {
        this.app = app;
        this.userService = new user_1.UserService(app);
    }
    async getAll() {
        const students = await this.app.prisma.student.findMany({
            include: {
                user: true,
            }
        });
        const studentsDTO = students.map((student) => this.studentToStudentDTO(student));
        return studentsDTO;
    }
    async get(id) {
        const student = await this.app.prisma.student.findUnique({
            where: {
                userId: id
            },
            include: {
                user: true,
            }
        });
        return student ? this.studentToStudentDTO(student) : null;
    }
    async create(email, password, name, surname, isVerified, countryId, schoolId, studyLevelId) {
        const user = await this.userService.create(email, password, name, surname, isVerified);
        const student = await this.app.prisma.student.create({
            data: {
                userId: user.id,
                countryId: countryId,
                schoolId: schoolId,
                studyLevelId: studyLevelId
            },
            include: {
                user: true
            }
        });
        return this.studentToStudentDTO(student);
    }
    async update(id, email, name, surname, isVerified, countryId, schoolId, studyLevelId) {
        const user = await this.userService.update(id, email, name, surname, isVerified);
        const student = await this.app.prisma.student.update({
            where: {
                userId: id
            },
            data: {
                countryId: countryId,
                schoolId: schoolId,
                studyLevelId: studyLevelId
            },
            include: {
                user: true
            }
        });
        return this.studentToStudentDTO(student);
    }
    async updatePassword(id, currentPassword, newPassword) {
        return await this.userService.updatePassword(id, currentPassword, newPassword);
    }
    async delete(id) {
        const student = await this.app.prisma.student.delete({
            where: {
                userId: id
            }
        });
        return await this.userService.delete(id);
    }
    async isEmailAddressAlreadyUsed(email) {
        return await this.userService.isEmailAddressAlreadyUsed(email);
    }
    async isEmailAddressAlreadyUsedByAnotherUser(id, email) {
        return await this.userService.isEmailAddressAlreadyUsedByAnotherUser(id, email);
    }
    studentToStudentDTO(student) {
        return {
            userId: student.userId,
            email: student.user.email,
            name: student.user.name,
            surname: student.user.surname,
            isVerified: student.user.isVerified,
            countryId: student.countryId,
            schoolId: student.schoolId,
            studyLevelId: student.studyLevelId
        };
    }
}
exports.StudentService = StudentService;
