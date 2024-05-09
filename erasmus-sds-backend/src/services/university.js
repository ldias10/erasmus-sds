"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityService = void 0;
class UniversityService {
    constructor(app) {
        this.app = app;
    }
    async getAll() {
        return this.app.prisma.university.findMany();
    }
    async get(id) {
        return this.app.prisma.university.findUnique({
            where: {
                id: id,
            }
        });
    }
    async create(name, countryId) {
        return this.app.prisma.university.create({
            data: {
                name: name,
                countryId: countryId
            }
        });
    }
    async update(id, name, countryId) {
        return this.app.prisma.university.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                countryId: countryId,
            }
        });
    }
    async delete(id) {
        return this.app.prisma.university.delete({
            where: {
                id: id
            }
        });
    }
}
exports.UniversityService = UniversityService;
