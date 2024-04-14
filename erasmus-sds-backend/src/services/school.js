"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
class SchoolService {
    constructor(app) {
        this.app = app;
    }
    async getAll() {
        return this.app.prisma.school.findMany();
    }
    async get(id) {
        return this.app.prisma.school.findUnique({
            where: {
                id: id,
            }
        });
    }
    async create(name, universityId) {
        return this.app.prisma.school.create({
            data: {
                name: name,
                universityId: universityId
            }
        });
    }
    async update(id, name, universityId) {
        return this.app.prisma.school.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                universityId: universityId
            }
        });
    }
    async delete(id) {
        return this.app.prisma.school.delete({
            where: {
                id: id
            }
        });
    }
}
exports.SchoolService = SchoolService;
