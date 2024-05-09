"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
class CommentService {
    constructor(app) {
        this.app = app;
    }
    async getAll() {
        return this.app.prisma.comment.findMany();
    }
    async get(id) {
        return this.app.prisma.comment.findUnique({
            where: {
                id: id,
            }
        });
    }
    async create(content, date, studentUserId, courseId) {
        return this.app.prisma.comment.create({
            data: {
                content: content,
                date: date,
                studentUserId: studentUserId,
                courseId: courseId
            }
        });
    }
    async update(id, content, date, studentUserId, courseId) {
        return this.app.prisma.comment.update({
            where: {
                id: id,
            },
            data: {
                content: content,
                date: date,
                studentUserId: studentUserId,
                courseId: courseId
            }
        });
    }
    async delete(id) {
        return this.app.prisma.comment.delete({
            where: {
                id: id
            }
        });
    }
}
exports.CommentService = CommentService;
