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
                user: true
            }
        });
        return this.app.prisma.user.findMany();
    }
    async get(id) {
        return this.app.prisma.user.findUnique({
            where: {
                id: id,
            }
        });
    }
    async create(email, password, name, surname, isVerified) {
        const hashedPassword = await this.app.bcrypt.hash(password);
        return this.app.prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                surname: surname,
                isVerified: isVerified,
            }
        });
    }
    async update(id, email, name, surname, isVerified) {
        return this.app.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                email: email,
                name: name,
                surname: surname,
                isVerified: isVerified,
            }
        });
    }
    async updatePassword(id, currentPassword, newPassword) {
        const user = await this.app.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!user || !(await this.app.bcrypt.compare(user.password, currentPassword))) {
            return false;
        }
        const hashedNewPassword = await this.app.bcrypt.hash(newPassword);
        await this.app.prisma.user.update({
            where: {
                id: id
            },
            data: {
                password: hashedNewPassword
            }
        });
        return true;
    }
    async delete(id) {
        return this.app.prisma.user.delete({
            where: {
                id: id
            }
        });
    }
}
exports.AdminService = AdminService;
