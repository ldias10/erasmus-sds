"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
class CourseService {
    constructor(app) {
        this.app = app;
    }
    async getAll() {
        return this.app.prisma.course.findMany();
    }
    async get(id) {
        return this.app.prisma.course.findUnique({
            where: {
                id: id,
            }
        });
    }
    async create(name, description, ects, hoursOfLecture, hoursOfLabs, numberOfExams, isAvailable, fieldOfStudyId, studyLevelId) {
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
    async update(id, name, description, ects, hoursOfLecture, hoursOfLabs, numberOfExams, isAvailable, fieldOfStudyId, studyLevelId) {
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
    async delete(id) {
        return this.app.prisma.course.delete({
            where: {
                id: id
            }
        });
    }
}
exports.CourseService = CourseService;
