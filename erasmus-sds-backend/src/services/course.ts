import {Course} from "@prisma/client";
import {FastifyInstance} from "fastify";
import {isNull} from "../utils/utils";

export interface CourseGetInclude {
    FieldOfStudy?: boolean,
    StudyLevel?: boolean,
    Students?: boolean,
    Comments?: boolean,
}

export interface CourseGetWhere {
    name?: string,
    description?: string,
    ects?: number,
    hoursOfLecture?: number,
    hoursOfLabs?: number,
    numberOfExams?: number,
    isAvailable?: boolean,
    fieldOfStudyId?: number,
    studyLevelId?: number
}

export class CourseService {

    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(getInclude?: CourseGetInclude, getWhere?: CourseGetWhere): Promise<Course[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        const courses = await this.app.prisma.course.findMany({include, where});

        courses.forEach(course => {
            if (course.Students) {
                //@ts-ignore
                const students = course.Students.map(student => student.Student);
                course.Students = students;
            }
        });

        return courses;
    }

    public async get(id: number, getInclude?: CourseGetInclude): Promise<Course | null> {
        const include: any = this.generateGetInclude(getInclude);

        const course = await this.app.prisma.course.findUnique({
            include,
            where: {
                id: id,
            }
        });

        if (course && course.Students) {
            //@ts-ignore
            const students = course.Students.map(student => student.Student);
            //@ts-ignore
            course.Students = students;

        }

        return course;
    }

    public async create(name: string, description: string, ects: number, hoursOfLecture: number, hoursOfLabs: number, numberOfExams: number, isAvailable: boolean, fieldOfStudyId: number, studyLevelId: number): Promise<Course> {
        return this.app.prisma.course.create({
            data: {
                name: name,
                description: description,
                ects: ects,
                hoursOfLecture: hoursOfLecture,
                hoursOfLabs: hoursOfLabs,
                numberOfExams: numberOfExams,
                isAvailable: isAvailable,
                fieldOfStudyId: fieldOfStudyId,
                studyLevelId: studyLevelId,
            }
        });
    }

    public async update(id: number, name: string, description: string, ects: number, hoursOfLecture: number, hoursOfLabs: number, numberOfExams: number, isAvailable: boolean, fieldOfStudyId: number, studyLevelId: number): Promise<Course> {
        return this.app.prisma.course.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description,
                ects: ects,
                hoursOfLecture: hoursOfLecture,
                hoursOfLabs: hoursOfLabs,
                numberOfExams: numberOfExams,
                isAvailable: isAvailable,
                fieldOfStudyId: fieldOfStudyId,
                studyLevelId: studyLevelId,
            }
        });
    }

    public async delete(id: number): Promise<Course> {
        return this.app.prisma.course.delete({
            where: {
                id: id
            }
        });
    }

    private generateGetInclude(getInclude?: CourseGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.FieldOfStudy)) include.FieldOfStudy = Boolean(getInclude.FieldOfStudy);
            if (!isNull(getInclude.StudyLevel)) include.StudyLevel = Boolean(getInclude.StudyLevel);
            if (!isNull(getInclude.Students) && Boolean(getInclude.Students)) include.Students = {
                include: {
                    Student: Boolean(getInclude.Students),
                }
            };
            if (!isNull(getInclude.Comments)) include.Comments = Boolean(getInclude.Comments);
        }

        return include;
    }

    private generateGetWhere(getWhere?: CourseGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.name) where.name = getWhere.name;
            if (getWhere.description) where.description = getWhere.description;
            if (getWhere.ects) where.ects = Number(getWhere.ects);
            if (getWhere.hoursOfLecture) where.hoursOfLecture = Number(getWhere.hoursOfLecture);
            if (getWhere.hoursOfLabs) where.hoursOfLabs = Number(getWhere.hoursOfLabs);
            if (getWhere.numberOfExams) where.numberOfExams = Number(getWhere.numberOfExams);
            if (!isNull(getWhere.isAvailable)) where.isAvailable = Boolean(getWhere.isAvailable);
            if (getWhere.fieldOfStudyId) where.fieldOfStudyId = Number(getWhere.fieldOfStudyId);
            if (getWhere.studyLevelId) where.studyLevelId = Number(getWhere.studyLevelId);
        }

        return where;
    }
}