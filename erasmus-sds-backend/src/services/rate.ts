import {FastifyInstance} from "fastify";
import {Course, Rate, Student, StudentOnCourse} from "@prisma/client";
import {isNull} from "../utils/utils";

type RateBeforeInclude = Rate & {
    StudentOnCourse: StudentOnCourse & {
        Student?: Student, Course?: Course
    }
};
type RateInclude = Rate & { Student?: Student, Course?: Course };

interface rateGetInclude {
    Student?: boolean,
    Course?: boolean,
}

interface rateGetWhere {
    studentId?: number,
    courseId?: number,
    rate?: number,
}

export class RateService {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(getInclude?: rateGetInclude, getWhere?: rateGetWhere): Promise<Rate[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        const ratesBeforeInclude: RateBeforeInclude[] = await this.app.prisma.rate.findMany({
            include: {
                StudentOnCourse: {
                    include
                }
            },
            where
        });

        const ratesInclude: RateInclude[] = ratesBeforeInclude.map((rateBefore: RateBeforeInclude) => this.rateBeforeIncludeToRateInclude(rateBefore)!);
        return ratesInclude;
    }

    public async get(studentId: number, courseId: number, getInclude?: rateGetInclude): Promise<Rate | null> {
        const include: any = this.generateGetInclude(getInclude);

        const rateBefore: RateBeforeInclude | null = await this.app.prisma.rate.findUnique({
            include: {
                StudentOnCourse: {
                    include
                }
            },
            where: {
                rateId: {
                    studentId: studentId,
                    courseId: courseId
                }
            }
        });

        return this.rateBeforeIncludeToRateInclude(rateBefore);
    }

    public async create(studentId: number, courseId: number, rate: number): Promise<Rate> {
        return this.app.prisma.rate.create({
            data: {
                studentId: studentId,
                courseId: courseId,
                rate: rate
            }
        });
    }

    public async update(studentId: number, courseId: number, rate: number): Promise<Rate> {
        return this.app.prisma.rate.update({
            where: {
                rateId: {
                    studentId: studentId,
                    courseId: courseId
                }
            },
            data: {
                rate: rate
            }
        });
    }

    public async delete(studentId: number, courseId: number): Promise<Rate> {
        return this.app.prisma.rate.delete({
            where: {
                rateId: {
                    studentId: studentId,
                    courseId: courseId
                }
            }
        });
    }

    private rateBeforeIncludeToRateInclude(rateBefore: RateBeforeInclude | null): RateInclude | null {
        if (!rateBefore) return null;

        const rate: RateInclude = {
            studentId: rateBefore.studentId,
            courseId: rateBefore.courseId,
            rate: rateBefore.rate
        };

        if (rateBefore.StudentOnCourse.Course) rate.Course = rateBefore.StudentOnCourse.Course;
        if (rateBefore.StudentOnCourse.Student) rate.Student = rateBefore.StudentOnCourse.Student;

        return rate;
    }

    private generateGetInclude(getInclude?: rateGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.Student)) include.Student = Boolean(getInclude.Student);
            if (!isNull(getInclude.Course)) include.Course = Boolean(getInclude.Course);
        }

        return include;
    }

    private generateGetWhere(getWhere?: rateGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.studentId) where.studentId = Number(getWhere.studentId);
            if (getWhere.courseId) where.courseId = Number(getWhere.courseId);
            if (getWhere.rate) where.rate = Number(getWhere.rate);
        }

        return where;
    }
}