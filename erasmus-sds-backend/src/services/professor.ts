import {FastifyInstance} from "fastify";
import {Professor, User} from "@prisma/client";
import {UserDTO, UserService} from "./user";

export interface ProfessorDTO {
    userId: number,
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
}

export class ProfessorService {

    private app: FastifyInstance;
    private userService: UserService;

    constructor(app: FastifyInstance) {
        this.app = app;
        this.userService = new UserService(app);
    }

    public async getAll(): Promise<ProfessorDTO[]> {
        const professors: (Professor & { user: User })[] = await this.app.prisma.professor.findMany({
            include: {
                user: true,
            }
        });

        const professorDTOS: ProfessorDTO[] = professors.map((professor: (Professor & {
            user: User
        })) => this.professorToProfessorDTO(professor));
        return professorDTOS;
    }

    public async get(id: number): Promise<ProfessorDTO | null> {
        const professor: (Professor & { user: User }) | null = await this.app.prisma.professor.findUnique({
            where: {
                userId: id
            },
            include: {
                user: true,
            }
        });

        return professor ? this.professorToProfessorDTO(professor) : null;
    }

    public async create(email: string, password: string, name: string, surname: string, isVerified: boolean): Promise<ProfessorDTO> {
        const user: UserDTO = await this.userService.create(email, password, name, surname, isVerified);

        const professor: Professor & { user: User } = await this.app.prisma.professor.create({
            data: {
                userId: user.id
            },
            include: {
                user: true
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

    private professorToProfessorDTO(professor: Professor & { user: User }): ProfessorDTO {
        return {
            userId: professor.userId,
            email: professor.user.email,
            name: professor.user.name,
            surname: professor.user.surname,
            isVerified: professor.user.isVerified,
        }
    }
}