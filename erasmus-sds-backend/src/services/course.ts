import {Course} from "@prisma/client";
import {FastifyInstance} from "fastify";

export class CourseService {

    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(): Promise<Course[]> {
        return this.app.prisma.course.findMany();
    }

    public async get(id: number): Promise<Course | null> {
        return this.app.prisma.course.findUnique({
            where: {
                id: id,
            }
        });
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
}