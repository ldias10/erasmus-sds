"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateService = void 0;
class RateService {
    constructor(app) {
        this.app = app;
    }
    async getAll() {
        return this.app.prisma.rate.findMany();
    }
    async get(studentId, courseId) {
        return this.app.prisma.rate.findUnique({
            where: {
                rateId: {
                    studentId: studentId,
                    courseId: courseId
                }
            }
        });
    }
    async create(studentId, courseId, rate) {
        return this.app.prisma.rate.create({
            data: {
                studentId: studentId,
                courseId: courseId,
                rate: rate
            }
        });
    }
    async update(studentId, courseId, rate) {
        return this.app.prisma.rate.update({
            where: {
                rateId: {
                    studentId: studentId,
                    courseId: courseId
                }
            },
            data: {
                rate: rate
            }
        });
    }
    async delete(studentId, courseId) {
        return this.app.prisma.rate.delete({
            where: {
                rateId: {
                    studentId: studentId,
                    courseId: courseId
                }
            }
        });
    }
}
exports.RateService = RateService;
