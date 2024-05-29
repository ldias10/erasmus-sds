"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfStudyService = void 0;
class FieldOfStudyService {
    constructor(app) {
        this.app = app;
    }
    async getAll() {
        return this.app.prisma.fieldOfStudy.findMany();
    }
    async get(id) {
        return this.app.prisma.fieldOfStudy.findUnique({
            where: {
                id: id,
            }
        });
    }
    async create(name) {
        return this.app.prisma.fieldOfStudy.create({
            data: {
                name: name,
            }
        });
    }
    async update(id, name) {
        return this.app.prisma.fieldOfStudy.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            }
        });
    }
    async delete(id) {
        return this.app.prisma.fieldOfStudy.delete({
            where: {
                id: id
            }
        });
    }
}
exports.FieldOfStudyService = FieldOfStudyService;
