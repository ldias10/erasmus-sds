import {FastifyInstance} from "fastify";
import {StudentOnFieldOfStudy} from "@prisma/client";

export class StudentOnFieldOfStudyService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async get(studentId: number, fieldOfStudyId: number): Promise<StudentOnFieldOfStudy | null> {
        return this.app.prisma.studentOnFieldOfStudy.findUnique({
            where: {
                fieldOfStudyId_studentUserId: {
                    studentUserId: studentId,
                    fieldOfStudyId: fieldOfStudyId
                }
            }
        });
    }

    public async create(studentId: number, fieldOfStudyId: number): Promise<StudentOnFieldOfStudy> {
        return this.app.prisma.studentOnFieldOfStudy.create({
            data: {
                studentUserId: studentId,
                fieldOfStudyId: fieldOfStudyId
            }
        });
    }

    public async delete(studentId: number, fieldOfStudyId: number): Promise<boolean> {
        const studentOnFieldOfStudy: StudentOnFieldOfStudy = await this.app.prisma.studentOnFieldOfStudy.delete({
            where: {
                fieldOfStudyId_studentUserId: {
                    studentUserId: studentId,
                    fieldOfStudyId: fieldOfStudyId
                },
            }
        });

        if (!studentOnFieldOfStudy) {
            return false;
        }

        return true;
    }
}