import {FastifyInstance} from "fastify";
import {Country} from "@prisma/client";

export class CountryService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(): Promise<Country[]> {
        return this.app.prisma.country.findMany();
    }

    public async get(id: number): Promise<Country | null> {
        return this.app.prisma.country.findUnique({
            where: {
                id: id,
            }
        });
    }

    public async create(name: string, tag: string): Promise<Country> {
        return this.app.prisma.country.create({
            data: {
                name: name,
                tag: tag,
            }
        });
    }

    public async update(id: number, name: string, tag: string): Promise<Country> {
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

    public async delete(id: number): Promise<Country> {
        return this.app.prisma.country.delete({
            where: {
                id: id
            }
        });
    }
}