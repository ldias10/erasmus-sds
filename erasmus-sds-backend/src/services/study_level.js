"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyLevelService = void 0;
class StudyLevelService {
    constructor(app) {
        this.app = app;
    }
    async getAll() {
        return this.app.prisma.studyLevel.findMany();
    }
    async get(id) {
        return this.app.prisma.studyLevel.findUnique({
            where: {
                id: id,
            }
        });
    }
    async create(name) {
        return this.app.prisma.studyLevel.create({
            data: {
                name: name,
            }
        });
    }
    async update(id, name) {
        return this.app.prisma.studyLevel.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            }
        });
    }
    async delete(id) {
        return this.app.prisma.studyLevel.delete({
            where: {
                id: id
            }
        });
    }
}
exports.StudyLevelService = StudyLevelService;
