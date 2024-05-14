import {FastifyInstance} from "fastify";
import {FieldOfStudy} from "@prisma/client";
import {isNull} from "../utils/utils";

export interface FieldOfStudyGetInclude {
    Professors?: boolean,
    Students?: boolean
    Courses?: boolean
}

export interface FieldOfStudyGetWhere {
    name?: string,
}

export class FieldOfStudyService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(getInclude?: FieldOfStudyGetInclude, getWhere?: FieldOfStudyGetWhere): Promise<FieldOfStudy[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        return this.app.prisma.fieldOfStudy.findMany({include, where});
    }

    public async get(id: number, getInclude?: FieldOfStudyGetInclude): Promise<FieldOfStudy | null> {
        const include: any = this.generateGetInclude(getInclude);

        return this.app.prisma.fieldOfStudy.findUnique({
            include,
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

    private generateGetInclude(getInclude?: FieldOfStudyGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.Professors)) include.Professors = Boolean(getInclude.Professors);
            if (!isNull(getInclude.Students)) include.Students = Boolean(getInclude.Students);
            if (!isNull(getInclude.Courses)) include.Courses = Boolean(getInclude.Courses);
        }

        return include;
    }

    private generateGetWhere(getWhere?: FieldOfStudyGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.name) where.name = getWhere.name;
        }

        return where;
    }
}