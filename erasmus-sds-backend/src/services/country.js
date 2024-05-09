"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
class CountryService {
    constructor(app) {
        this.app = app;
    }
    async getAll() {
        return this.app.prisma.country.findMany();
    }
    async get(id) {
        return this.app.prisma.country.findUnique({
            where: {
                id: id,
            }
        });
    }
    async create(name, tag) {
        return this.app.prisma.country.create({
            data: {
                name: name,
                tag: tag,
            }
        });
    }
    async update(id, name, tag) {
        return this.app.prisma.country.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                tag: tag
            }
        });
    }
    async delete(id) {
        return this.app.prisma.country.delete({
            where: {
                id: id
            }
        });
    }
}
exports.CountryService = CountryService;
