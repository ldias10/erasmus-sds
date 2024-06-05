import {FastifyInstance} from "fastify";
import {StudyLevel} from "@prisma/client";
import {isNull} from "../utils/utils";

export interface StudyLevelGetInclude {
    Students?: boolean,
    Courses?: boolean,
}

export interface StudyLevelGetWhere {
    name?: string,
}

export class StudyLevelService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(getInclude?: StudyLevelGetInclude, getWhere?: StudyLevelGetWhere): Promise<StudyLevel[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        return this.app.prisma.studyLevel.findMany({include, where});
    }

    public async get(id: number, getInclude?: StudyLevelGetInclude): Promise<StudyLevel | null> {
        const include: any = this.generateGetInclude(getInclude);

        return this.app.prisma.studyLevel.findUnique({
            include,
            where: {
                id: id,
            }
        });
    }

    public async create(name: string): Promise<StudyLevel> {
        return this.app.prisma.studyLevel.create({
            data: {
                name: name,
            }
        });
    }

    public async update(id: number, name: string): Promise<StudyLevel> {
        return this.app.prisma.studyLevel.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            }
        });
    }

    public async delete(id: number): Promise<StudyLevel> {
        return this.app.prisma.studyLevel.delete({
            where: {
                id: id
            }
        });
    }

    private generateGetInclude(getInclude?: StudyLevelGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.Students)) include.Students = Boolean(getInclude.Students);
            if (!isNull(getInclude.Courses)) include.Courses = Boolean(getInclude.Courses);
        }

        return include;
    }

    private generateGetWhere(getWhere?: StudyLevelGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.name) where.name = getWhere.name;
        }

        return where;
    }
}