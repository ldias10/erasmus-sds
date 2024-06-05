import {FastifyInstance} from "fastify";
import {Country} from "@prisma/client";
import {isNull} from "../utils/utils";

export interface CountryGetInclude {
    Students?: boolean,
    Universities?: boolean
}

export interface CountryGetWhere {
    name?: string,
    tag?: string,
}

export class CountryService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(getInclude?: CountryGetInclude, getWhere?: CountryGetWhere): Promise<Country[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        return this.app.prisma.country.findMany({include, where});
    }

    public async get(id: number, getInclude?: CountryGetInclude): Promise<Country | null> {
        const include: any = this.generateGetInclude(getInclude);

        return this.app.prisma.country.findUnique({
            include,
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

    private generateGetInclude(getInclude?: CountryGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.Students)) include.Students = Boolean(getInclude.Students);
            if (!isNull(getInclude.Universities)) include.Universities = Boolean(getInclude.Universities);
        }

        return include;
    }

    private generateGetWhere(getWhere?: CountryGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.name) where.name = getWhere.name;
            if (getWhere.tag) where.tag = getWhere.tag;
        }

        return where;
    }
}