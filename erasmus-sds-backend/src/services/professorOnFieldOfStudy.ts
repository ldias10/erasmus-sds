import {FastifyInstance} from "fastify";
import {ProfessorOnFieldOfStudy} from "@prisma/client";

export class ProfessorOnFieldOfStudyService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async get(professorId: number, fieldOfStudyId: number): Promise<ProfessorOnFieldOfStudy | null> {
        return this.app.prisma.professorOnFieldOfStudy.findUnique({
            where: {
                fieldOfStudyId_professorUserId: {
                    professorUserId: professorId,
                    fieldOfStudyId: fieldOfStudyId
                },
            }
        });
    }

    public async create(professorId: number, fieldOfStudyId: number): Promise<ProfessorOnFieldOfStudy> {
        return this.app.prisma.professorOnFieldOfStudy.create({
            data: {
                professorUserId: professorId,
                fieldOfStudyId: fieldOfStudyId
            }
        });
    }

    public async delete(professorId: number, fieldOfStudyId: number): Promise<boolean> {
        if (!(await this.app.prisma.professorOnFieldOfStudy.delete({
            where: {
                fieldOfStudyId_professorUserId: {
                    professorUserId: professorId,
                    fieldOfStudyId: fieldOfStudyId
                }
            }
        }))) {
            return false;
        }

        return true;
    }
}