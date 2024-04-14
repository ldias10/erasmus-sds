import {FastifyInstance} from "fastify";
import {StudyLevel} from "@prisma/client";

export class StudyLevelService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(): Promise<StudyLevel[]> {
        return this.app.prisma.studyLevel.findMany();
    }

    public async get(id: number): Promise<StudyLevel | null> {
        return this.app.prisma.studyLevel.findUnique({
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
}