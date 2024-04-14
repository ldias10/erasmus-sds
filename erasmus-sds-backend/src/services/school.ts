import {FastifyInstance} from "fastify";
import {School} from "@prisma/client";

export class SchoolService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(): Promise<School[]> {
        return this.app.prisma.school.findMany();
    }

    public async get(id: number): Promise<School | null> {
        return this.app.prisma.school.findUnique({
            where: {
                id: id,
            }
        });
    }

    public async create(name: string, universityId: number): Promise<School> {
        return this.app.prisma.school.create({
            data: {
                name: name,
                universityId: universityId
            }
        });
    }

    public async update(id: number, name: string, universityId: number): Promise<School> {
        return this.app.prisma.school.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                universityId: universityId
            }
        });
    }

    public async delete(id: number): Promise<School> {
        return this.app.prisma.school.delete({
            where: {
                id: id
            }
        });
    }
}