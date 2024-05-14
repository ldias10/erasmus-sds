import {FastifyInstance} from "fastify";
import {FieldOfStudy, Professor, User} from "@prisma/client";
import {UserDTO, UserService} from "./user";
import {isNull} from "../utils/utils";
import {ProfessorOnFieldOfStudyService} from "./professorOnFieldOfStudy";

type ProfessorIncludes = Professor & { User: User } & { FieldsOfStudy?: FieldOfStudy[] };

export interface ProfessorDTO {
    userId: number,
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
    FieldsOfStudy?: FieldOfStudy[]
}

export interface professorGetInclude {
    FieldsOfStudy?: boolean,
}

export interface professorGetWhere {
    email?: string,
    name?: string,
    surname?: string,
    isVerified?: boolean,
}

export class ProfessorService {

    private app: FastifyInstance;
    private userService: UserService;
    private professorOnFieldOfStudyService: ProfessorOnFieldOfStudyService;

    constructor(app: FastifyInstance) {
        this.app = app;
        this.userService = new UserService(app);
        this.professorOnFieldOfStudyService = new ProfessorOnFieldOfStudyService(app);
    }

    public async getAll(getInclude?: professorGetInclude, getWhere?: professorGetWhere): Promise<ProfessorDTO[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        const users: UserDTO[] = await this.userService.getAll({}, where);
        const usersId: number[] = users.map((user: UserDTO) => user.id);

        // @ts-ignore
        const professors: ProfessorIncludes[] = await this.app.prisma.professor.findMany({
            include: {
                User: true,
                ...include,
            },
            where: {
                userId: {in: usersId}
            },
        });

        const professorDTOS: ProfessorDTO[] = professors.map((professor: ProfessorIncludes) => this.professorToProfessorDTO(professor));
        return professorDTOS;
    }

    public async get(id: number, getInclude?: professorGetInclude): Promise<ProfessorDTO | null> {
        const include: any = this.generateGetInclude(getInclude);

        // @ts-ignore
        const professor: ProfessorIncludes | null = await this.app.prisma.professor.findUnique({
            where: {
                userId: id
            },
            include: {
                User: true,
                ...include
            }
        });

        return professor ? this.professorToProfessorDTO(professor) : null;
    }

    public async create(email: string, password: string, name: string, surname: string, isVerified: boolean): Promise<ProfessorDTO> {
        const user: UserDTO = await this.userService.create(email, password, name, surname, isVerified);

        const professor: ProfessorIncludes = await this.app.prisma.professor.create({
            data: {
                userId: user.id
            },
            include: {
                User: true
            }
        });
        return this.professorToProfessorDTO(professor);
    }

    public async update(id: number, email: string, name: string, surname: string, isVerified: boolean): Promise<ProfessorDTO> {
        await this.userService.update(id, email, name, surname, isVerified);
        return (await this.get(id))!
    }

    public async updatePassword(id: number, currentPassword: string, newPassword: string): Promise<boolean> {
        return await this.userService.updatePassword(id, currentPassword, newPassword);
    }

    public async delete(id: number): Promise<UserDTO> {
        const professor: Professor = await this.app.prisma.professor.delete({
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

    public async isProfessorAlreadyJoinedFieldOfStudy(professorId: number, fieldOfStudyId: number): Promise<boolean> {
        if (!(await this.professorOnFieldOfStudyService.get(professorId, fieldOfStudyId))) {
            return false;
        }

        return true;
    }

    public async joinFieldOfStudy(professorId: number, fieldOfStudyId: number): Promise<boolean> {
        if (!await this.professorOnFieldOfStudyService.create(professorId, fieldOfStudyId)) {
            return false;
        }

        return true;
    }

    public async leaveFieldOfStudy(professorId: number, fieldOfStudyId: number): Promise<boolean> {
        return await this.professorOnFieldOfStudyService.delete(professorId, fieldOfStudyId);
    }

    private professorToProfessorDTO(professor: ProfessorIncludes): ProfessorDTO {
        const prof: ProfessorDTO = {
            userId: professor.userId,
            email: professor.User.email,
            name: professor.User.name,
            surname: professor.User.surname,
            isVerified: professor.User.isVerified,
        }

        if (!isNull(professor.FieldsOfStudy)) {
            prof.FieldsOfStudy = professor.FieldsOfStudy
        }

        return prof;
    }

    private generateGetInclude(getInclude?: professorGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.FieldsOfStudy)) include.FieldsOfStudy = Boolean(getInclude.FieldsOfStudy);
        }

        return include;
    }

    private generateGetWhere(getWhere?: professorGetWhere): any {
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