import {FastifyInstance} from "fastify";
import {Rate} from "@prisma/client";

export class RateService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(): Promise<Rate[]> {
        return this.app.prisma.rate.findMany();
    }

    public async get(studentId: number, courseId: number): Promise<Rate | null> {
        return this.app.prisma.rate.findUnique({
            where: {
                rateId: {
                    studentId: studentId,
                    courseId: courseId
                }
            }
        });
    }

    public async create(studentId: number, courseId: number, rate: number): Promise<Rate> {
        return this.app.prisma.rate.create({
            data: {
                studentId: studentId,
                courseId: courseId,
                rate: rate
            }
        });
    }

    public async update(studentId: number, courseId: number, rate: number): Promise<Rate> {
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

    public async delete(studentId: number, courseId: number): Promise<Rate> {
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