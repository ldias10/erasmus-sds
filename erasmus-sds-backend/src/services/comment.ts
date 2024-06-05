import {FastifyInstance} from "fastify";
import {Comment} from "@prisma/client";
import {isNull} from "../utils/utils";

export interface CommentGetInclude {
    Student?: boolean,
    Course?: boolean
}

export interface CommentGetWhere {
    content?: string,
    date?: Date,
    studentUserId?: number,
    courseId?: number,
}

export class CommentService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(getInclude?: CommentGetInclude, getWhere?: CommentGetWhere): Promise<Comment[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        return this.app.prisma.comment.findMany({include, where});
    }

    public async get(id: number, getInclude?: CommentGetInclude): Promise<Comment | null> {
        const include: any = this.generateGetInclude(getInclude);

        return this.app.prisma.comment.findUnique({
            include,
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

    private generateGetInclude(getInclude?: CommentGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.Student)) include.Student = Boolean(getInclude.Student);
            if (!isNull(getInclude.Course)) include.Course = Boolean(getInclude.Course);
        }

        return include;
    }

    private generateGetWhere(getWhere?: CommentGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.content) where.content = getWhere.content;
            if (getWhere.date) where.date = new Date(getWhere.date);
            if (getWhere.courseId) where.courseId = Number(getWhere.courseId);
            if (getWhere.studentUserId) where.studentUserId = Number(getWhere.studentUserId);
        }

        return where;
    }
}