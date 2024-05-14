import {FastifyInstance} from "fastify";
import {School} from "@prisma/client";
import {isNull} from "../utils/utils";

export interface SchoolGetInclude {
    University?: boolean,
    Students?: boolean,
}

export interface SchoolGetWhere {
    name?: string,
    universityId?: number
}

export class SchoolService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(getInclude?: SchoolGetInclude, getWhere?: SchoolGetWhere): Promise<School[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        return this.app.prisma.school.findMany({include, where});
    }

    public async get(id: number, getInclude?: SchoolGetInclude): Promise<School | null> {
        const include: any = this.generateGetInclude(getInclude);

        return this.app.prisma.school.findUnique({
            include,
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

    private generateGetInclude(getInclude?: SchoolGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.University)) include.University = Boolean(getInclude.University);
            if (!isNull(getInclude.Students)) include.Students = Boolean(getInclude.Students);
        }

        return include;
    }

    private generateGetWhere(getWhere?: SchoolGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.name) where.name = getWhere.name;
            if (getWhere.universityId) where.universityId = Number(getWhere.universityId);
        }

        return where;
    }
}