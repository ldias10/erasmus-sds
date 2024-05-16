import {FastifyInstance} from "fastify";
import {Comment, Country, Course, FieldOfStudy, School, Student, StudyLevel, User} from "@prisma/client";
import {UserDTO, UserService} from "./user";
import {isNull} from "../utils/utils";
import {professorGetWhere} from "./professor";
import {StudentOnFieldOfStudyService} from "./studentOnFieldOfStudy";
import {StudentOnCourseService} from "./studentOnCourse";

export type StudentIncludes = Student & { User: User } & {
    Country?: Country,
    School?: School,
    StudyLevel?: StudyLevel,
    FieldsOfStudy?: FieldOfStudy[],
    Courses?: Course[],
    Comments?: Comment[],
};

export interface StudentDTO {
    userId: number,
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
    countryId: number,
    schoolId: number,
    studyLevelId: number,
    Country?: Country,
    School?: School,
    StudyLevel?: StudyLevel,
    FieldsOfStudy?: FieldOfStudy[],
    Courses?: Course[],
    Comments?: Comment[],
}

export interface StudentGetInclude {
    Country?: boolean,
    School?: boolean,
    StudyLevel?: boolean,
    FieldsOfStudy?: boolean,
    Courses?: boolean,
    Comments?: boolean,
}

export interface StudentGetWhere {
    email?: string,
    name?: string,
    surname?: string,
    isVerified?: boolean,
    countryId?: number,
    schoolId?: number,
    studyLevelId?: number,
}

export class StudentService {

    private app: FastifyInstance;
    private userService: UserService;
    private studentOnFieldOfStudyService: StudentOnFieldOfStudyService;
    private studentOnCourseService: StudentOnCourseService;

    constructor(app: FastifyInstance) {
        this.app = app;
        this.userService = new UserService(app);
        this.studentOnFieldOfStudyService = new StudentOnFieldOfStudyService(app);
        this.studentOnCourseService = new StudentOnCourseService(app);
    }

    public async getAll(getInclude?: StudentGetInclude, getWhere?: StudentGetWhere): Promise<StudentDTO[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);
        const whereUser: any = this.generateGetWhereUser(getWhere);

        const users: UserDTO[] = await this.userService.getAll({}, whereUser);
        const usersId: number[] = users.map((user: UserDTO) => user.id);

        // @ts-ignore
        const students: StudentIncludes[] = await this.app.prisma.student.findMany({
            include: {
                User: true,
                ...include
            },
            where: {
                userId: {in: usersId},
                ...where
            },
        });

        students.forEach(student => {
            if (student.FieldsOfStudy) {
                //@ts-ignore
                const fieldsOfStudy = student.FieldsOfStudy.map(fieldOfStudy => fieldOfStudy.FieldOfStudy);
                student.FieldsOfStudy = fieldsOfStudy;
            }

            if (student.Courses) {
                //@ts-ignore
                const courses = student.Courses.map(course => course.Course);
                student.Courses = courses;
            }
        });

        const studentsDTO: StudentDTO[] = students.map((student: StudentIncludes) => this.studentToStudentDTO(student));
        return studentsDTO;
    }

    public async get(id: number, getInclude?: StudentGetInclude): Promise<StudentDTO | null> {
        const include: any = this.generateGetInclude(getInclude);

        //@ts-ignore
        const student: StudentIncludes | null = await this.app.prisma.student.findUnique({
            where: {
                userId: id
            },
            include: {
                User: true,
                ...include
            }
        });

        if (student && student.FieldsOfStudy) {
            //@ts-ignore
            const fieldsOfStudy = student.FieldsOfStudy.map(fieldOfStudy => fieldOfStudy.FieldOfStudy);
            student.FieldsOfStudy = fieldsOfStudy;
        }

        if (student && student.Courses) {
            //@ts-ignore
            const courses = student.Courses.map(course => course.Course);
            student.Courses = courses;
        }

        return student ? this.studentToStudentDTO(student) : null;
    }

    public async getByEmail(email: string): Promise<StudentDTO | null> {
        const user: UserDTO | null = await this.userService.getByEmail(email);
        if (!user) {
            return null;
        }

        return await this.get(user.id);
    }

    public async create(email: string, password: string, name: string, surname: string, isVerified: boolean, countryId: number, schoolId: number, studyLevelId: number): Promise<StudentDTO> {
        const user: UserDTO = await this.userService.create(email, password, name, surname, isVerified);

        const student: StudentIncludes = await this.app.prisma.student.create({
            data: {
                userId: user.id,
                countryId: countryId,
                schoolId: schoolId,
                studyLevelId: studyLevelId
            },
            include: {
                User: true
            }
        });
        return this.studentToStudentDTO(student);
    }

    public async update(id: number, email: string, name: string, surname: string, isVerified: boolean, countryId: number, schoolId: number, studyLevelId: number): Promise<StudentDTO> {
        const user: UserDTO = await this.userService.update(id, email, name, surname, isVerified);
        const student: StudentIncludes = await this.app.prisma.student.update({
            where: {
                userId: id
            },
            data: {
                countryId: countryId,
                schoolId: schoolId,
                studyLevelId: studyLevelId
            },
            include: {
                User: true
            }
        });

        return this.studentToStudentDTO(student);
    }

    public async updatePassword(id: number, currentPassword: string, newPassword: string): Promise<boolean> {
        return await this.userService.updatePassword(id, currentPassword, newPassword);
    }

    public async delete(id: number): Promise<UserDTO> {
        const student: Student = await this.app.prisma.student.delete({
            where: {
                userId: id
            }
        });

        return await this.userService.delete(id);
    }

    public async isEmailAddressAlreadyUsed(email: string): Promise<boolean> {
        return await this.userService.isEmailAddressAlreadyUsed(email);
    }

    public async isEmailAddressAlreadyUsedByAnotherUser(id: number, email: string): Promise<boolean> {
        return await this.userService.isEmailAddressAlreadyUsedByAnotherUser(id, email);
    }

    public async isStudentAlreadyJoinedFieldOfStudy(studentId: number, fieldOfStudyId: number): Promise<boolean> {
        if (!(await this.studentOnFieldOfStudyService.get(studentId, fieldOfStudyId))) {
            return false;
        }

        return true;
    }

    public async joinFieldOfStudy(studentId: number, fieldOfStudyId: number): Promise<boolean> {
        if (!await this.studentOnFieldOfStudyService.create(studentId, fieldOfStudyId)) {
            return false;
        }

        return true;
    }

    public async leaveFieldOfStudy(studentId: number, fieldOfStudyId: number): Promise<boolean> {
        return await this.studentOnFieldOfStudyService.delete(studentId, fieldOfStudyId);
    }

    public async isStudentAlreadyJoinedCourse(studentId: number, courseId: number): Promise<boolean> {
        if (!(await this.studentOnCourseService.get(studentId, courseId))) {
            return false;
        }

        return true;
    }

    public async joinCourse(studentId: number, courseId: number): Promise<boolean> {
        if (!await this.studentOnCourseService.create(studentId, courseId)) {
            return false;
        }

        return true;
    }

    public async leaveCourse(studentId: number, courseId: number): Promise<boolean> {
        return await this.studentOnCourseService.delete(studentId, courseId);
    }

    private studentToStudentDTO(student: StudentIncludes): StudentDTO {
        const studentDTO: StudentDTO = {
            userId: student.userId,
            email: student.User.email,
            name: student.User.name,
            surname: student.User.surname,
            isVerified: student.User.isVerified,
            countryId: student.countryId,
            schoolId: student.schoolId,
            studyLevelId: student.studyLevelId
        }

        if (!isNull(student.Country)) studentDTO.Country = student.Country;
        if (!isNull(student.School)) studentDTO.School = student.School;
        if (!isNull(student.StudyLevel)) studentDTO.StudyLevel = student.StudyLevel;
        if (!isNull(student.FieldsOfStudy)) studentDTO.FieldsOfStudy = student.FieldsOfStudy;
        if (!isNull(student.Courses)) studentDTO.Courses = student.Courses;
        if (!isNull(student.Comments)) studentDTO.Comments = student.Comments;


        return studentDTO;
    }

    private generateGetInclude(getInclude?: StudentGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.Country)) include.Country = Boolean(getInclude.Country);
            if (!isNull(getInclude.School)) include.School = Boolean(getInclude.School);
            if (!isNull(getInclude.StudyLevel)) include.StudyLevel = Boolean(getInclude.StudyLevel);
            if (!isNull(getInclude.FieldsOfStudy) && Boolean(getInclude.FieldsOfStudy)) include.FieldsOfStudy = {
                include: {FieldOfStudy: Boolean(getInclude.FieldsOfStudy)}
            }
            if (!isNull(getInclude.Courses) && Boolean(getInclude.Courses)) include.Courses = {
                include: {Course: Boolean(getInclude.Courses)}
            };
            if (!isNull(getInclude.Comments)) include.Comments = Boolean(getInclude.Comments);
        }

        return include;
    }

    private generateGetWhere(getWhere?: StudentGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.countryId) where.countryId = Number(getWhere.countryId);
            if (getWhere.schoolId) where.schoolId = Number(getWhere.schoolId);
            if (getWhere.studyLevelId) where.studyLevelId = Number(getWhere.studyLevelId);
        }

        return where;
    }

    private generateGetWhereUser(getWhere?: professorGetWhere): any {
        const where: any = {};
        if (getWhere) {
            if (getWhere.email) where.email = getWhere.email;
            if (getWhere.name) where.name = getWhere.name;
            if (getWhere.surname) where.surname = getWhere.surname;
            if (!isNull(getWhere.isVerified)) where.isVerified = Boolean(getWhere.isVerified);
        }

        return where;
    }
}