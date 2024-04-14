import {FastifyInstance} from "fastify";
import {University} from "@prisma/client";

export class UniversityService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(): Promise<University[]> {
        return this.app.prisma.university.findMany();
    }

    public async get(id: number): Promise<University | null> {
        return this.app.prisma.university.findUnique({
            where: {
                id: id,
            }
        });
    }

    public async create(name: string, countryId: number): Promise<University> {
        return this.app.prisma.university.create({
            data: {
                name: name,
                countryId: countryId
            }
        });
    }

    public async update(id: number, name: string, countryId: number): Promise<University> {
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

    public async delete(id: number): Promise<University> {
        return this.app.prisma.university.delete({
            where: {
                id: id
            }
        });
    }
}