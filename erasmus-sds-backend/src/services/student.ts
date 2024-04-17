import {FastifyInstance} from "fastify";
import {Student, User} from "@prisma/client";
import {UserDTO, UserService} from "./user";

export interface StudentDTO {
    userId: number,
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
    countryId: number,
    schoolId: number,
    studyLevelId: number
}

export class StudentService {

    private app: FastifyInstance;
    private userService: UserService;

    constructor(app: FastifyInstance) {
        this.app = app;
        this.userService = new UserService(app);
    }

    public async getAll(): Promise<StudentDTO[]> {
        const students: (Student & { user: User })[] = await this.app.prisma.student.findMany({
            include: {
                user: true,
            }
        });

        const studentsDTO: StudentDTO[] = students.map((student: (Student & {
            user: User
        })) => this.studentToStudentDTO(student));
        return studentsDTO;
    }

    public async get(id: number): Promise<StudentDTO | null> {
        const student: (Student & { user: User }) | null = await this.app.prisma.student.findUnique({
            where: {
                userId: id
            },
            include: {
                user: true,
            }
        });

        return student ? this.studentToStudentDTO(student) : null;
    }

    public async create(email: string, password: string, name: string, surname: string, isVerified: boolean, countryId: number, schoolId: number, studyLevelId: number): Promise<StudentDTO> {
        const user: UserDTO = await this.userService.create(email, password, name, surname, isVerified);

        const student: Student & { user: User } = await this.app.prisma.student.create({
            data: {
                userId: user.id,
                countryId: countryId,
                schoolId: schoolId,
                studyLevelId: studyLevelId
            },
            include: {
                user: true
            }
        });
        return this.studentToStudentDTO(student);
    }

    public async update(id: number, email: string, name: string, surname: string, isVerified: boolean, countryId: number, schoolId: number, studyLevelId: number): Promise<StudentDTO> {
        const user: UserDTO = await this.userService.update(id, email, name, surname, isVerified);
        const student: Student & { user: User } = await this.app.prisma.student.update({
            where: {
                userId: id
            },
            data: {
                countryId: countryId,
                schoolId: schoolId,
                studyLevelId: studyLevelId
            },
            include: {
                user: true
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

    private studentToStudentDTO(student: Student & { user: User }): StudentDTO {
        return {
            userId: student.userId,
            email: student.user.email,
            name: student.user.name,
            surname: student.user.surname,
            isVerified: student.user.isVerified,
            countryId: student.countryId,
            schoolId: student.schoolId,
            studyLevelId: student.studyLevelId
        }
    }
}