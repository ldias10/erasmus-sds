import {FastifyInstance} from "fastify";
import {FieldOfStudy} from "@prisma/client";

export class FieldOfStudyService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(): Promise<FieldOfStudy[]> {
        return this.app.prisma.fieldOfStudy.findMany();
    }

    public async get(id: number): Promise<FieldOfStudy | null> {
        return this.app.prisma.fieldOfStudy.findUnique({
            where: {
                id: id,
            }
        });
    }

    public async create(name: string): Promise<FieldOfStudy> {
        return this.app.prisma.fieldOfStudy.create({
            data: {
                name: name,
            }
        });
    }

    public async update(id: number, name: string): Promise<FieldOfStudy> {
        return this.app.prisma.fieldOfStudy.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            }
        });
    }

    public async delete(id: number): Promise<FieldOfStudy> {
        return this.app.prisma.fieldOfStudy.delete({
            where: {
                id: id
            }
        });
    }
}