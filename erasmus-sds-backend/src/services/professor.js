"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorService = void 0;
const user_1 = require("./user");
class ProfessorService {
    constructor(app) {
        this.app = app;
        this.userService = new user_1.UserService(app);
    }
    async getAll() {
        const professors = await this.app.prisma.professor.findMany({
            include: {
                user: true,
            }
        });
        const professorDTOS = professors.map((professor) => this.professorToProfessorDTO(professor));
        return professorDTOS;
    }
    async get(id) {
        const professor = await this.app.prisma.professor.findUnique({
            where: {
                userId: id
            },
            include: {
                user: true,
            }
        });
        return professor ? this.professorToProfessorDTO(professor) : null;
    }
    async create(email, password, name, surname, isVerified) {
        const user = await this.userService.create(email, password, name, surname, isVerified);
        const professor = await this.app.prisma.professor.create({
            data: {
                userId: user.id
            },
            include: {
                user: true
            }
        });
        return this.professorToProfessorDTO(professor);
    }
    async update(id, email, name, surname, isVerified) {
        await this.userService.update(id, email, name, surname, isVerified);
        return (await this.get(id));
    }
    async updatePassword(id, currentPassword, newPassword) {
        return await this.userService.updatePassword(id, currentPassword, newPassword);
    }
    async delete(id) {
        const professor = await this.app.prisma.professor.delete({
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
    professorToProfessorDTO(professor) {
        return {
            userId: professor.userId,
            email: professor.user.email,
            name: professor.user.name,
            surname: professor.user.surname,
            isVerified: professor.user.isVerified,
        };
    }
}
exports.ProfessorService = ProfessorService;
