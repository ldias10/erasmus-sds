import {FastifyInstance} from "fastify";
import {Comment} from "@prisma/client";

export class CommentService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(): Promise<Comment[]> {
        return this.app.prisma.comment.findMany();
    }

    public async get(id: number): Promise<Comment | null> {
        return this.app.prisma.comment.findUnique({
            where: {
                id: id,
            }
        });
    }

    public async create(content: string, date: Date, studentUserId: number, courseId: number): Promise<Comment> {
        return this.app.prisma.comment.create({
            data: {
                content: content,
                date: date,
                studentUserId: studentUserId,
                courseId: courseId
            }
        });
    }

    public async update(id: number, content: string, date: Date, studentUserId: number, courseId: number): Promise<Comment> {
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

    public async delete(id: number): Promise<Comment> {
        return this.app.prisma.comment.delete({
            where: {
                id: id
            }
        });
    }
}