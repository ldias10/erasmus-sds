import {FastifyInstance} from "fastify";
import {University} from "@prisma/client";
import {isNull} from "../utils/utils";

export interface UniversityGetInclude {
    Country?: boolean,
    Schools?: boolean,
}

export interface UniversityGetWhere {
    name?: string,
    countryId?: number
}

export class UniversityService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(getInclude?: UniversityGetInclude, getWhere?: UniversityGetWhere): Promise<University[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        return this.app.prisma.university.findMany({include, where});
    }

    public async get(id: number, getInclude?: UniversityGetInclude): Promise<University | null> {
        const include: any = this.generateGetInclude(getInclude);

        return this.app.prisma.university.findUnique({
            include,
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

    private generateGetInclude(getInclude?: UniversityGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.Country)) include.Country = Boolean(getInclude.Country);
            if (!isNull(getInclude.Schools)) include.Schools = Boolean(getInclude.Schools);
        }

        return include;
    }

    private generateGetWhere(getWhere?: UniversityGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.name) where.name = getWhere.name;
            if (getWhere.countryId) where.countryId = Number(getWhere.countryId);
        }

        return where;
    }
}