"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const user_1 = require("./user");
class AdminService {
    constructor(app) {
        this.app = app;
        this.userService = new user_1.UserService(app);
    }
    async getAll() {
        const admins = await this.app.prisma.admin.findMany({
            include: {
                user: true,
            }
        });
        const adminsDTO = admins.map((admin) => this.adminToAdminDTO(admin));
        return adminsDTO;
    }
    async get(id) {
        const admin = await this.app.prisma.admin.findUnique({
            where: {
                userId: id
            },
            include: {
                user: true,
            }
        });
        return admin ? this.adminToAdminDTO(admin) : null;
    }
    async create(email, password, name, surname, isVerified) {
        const user = await this.userService.create(email, password, name, surname, isVerified);
        const admin = await this.app.prisma.admin.create({
            data: {
                userId: user.id
            },
            include: {
                user: true
            }
        });
        return this.adminToAdminDTO(admin);
    }
    async update(id, email, name, surname, isVerified) {
        return await this.userService.update(id, email, name, surname, isVerified);
    }
    async updatePassword(id, currentPassword, newPassword) {
        return await this.userService.updatePassword(id, currentPassword, newPassword);
    }
    async delete(id) {
        const admin = await this.app.prisma.admin.delete({
            where: {
                userId: id
            }
        });
        return await this.userService.delete(id);
    }
    adminToAdminDTO(admin) {
        return {
            userId: admin.userId,
            email: admin.user.email,
            name: admin.user.name,
            surname: admin.user.surname,
            isVerified: admin.user.isVerified,
        };
    }
}
exports.AdminService = AdminService;
