"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const utils_1 = require("../utils/utils");
class UserService {
    constructor(app) {
        this.app = app;
    }
    async getAll() {
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
    async isEmailAddressAlreadyUsed(email) {
        const user = await this.app.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return !(0, utils_1.isNull)(user);
    }
    async isEmailAddressAlreadyUsedByAnotherUser(id, email) {
        const userById = await this.app.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        const userByEmail = await this.app.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return (!(0, utils_1.isNull)(userById) && !(0, utils_1.isNull)(userByEmail)) && (userById === null || userById === void 0 ? void 0 : userById.id) !== (userByEmail === null || userByEmail === void 0 ? void 0 : userByEmail.id);
    }
}
exports.UserService = UserService;
