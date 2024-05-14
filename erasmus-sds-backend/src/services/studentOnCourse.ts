import {FastifyInstance} from "fastify";
import {StudentOnCourse} from "@prisma/client";

export class StudentOnCourseService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async get(studentId: number, courseId: number): Promise<StudentOnCourse | null> {
        return this.app.prisma.studentOnCourse.findUnique({
            where: {
                studentUserId_courseId: {
                    studentUserId: studentId,
                    courseId: courseId
                },
            }
        });
    }

    public async create(studentId: number, courseId: number): Promise<StudentOnCourse> {
        return this.app.prisma.studentOnCourse.create({
            data: {
                studentUserId: studentId,
                courseId: courseId
            }
        });
    }

    public async delete(studentId: number, courseId: number): Promise<boolean> {
        const studentOnCourse: StudentOnCourse = await this.app.prisma.studentOnCourse.delete({
            where: {
                studentUserId_courseId: {
                    studentUserId: studentId,
                    courseId: courseId
                }
            }
        });

        if (!studentOnCourse) {
            return false;
        }

        return true;
    }
}