import {FastifyInstance} from "fastify";
import {Admin, User} from "@prisma/client";
import {UserDTO, UserService} from "./user";

export interface AdminDTO {
    userId: number,
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
}

export class AdminService {

    private app: FastifyInstance;
    private userService: UserService;

    constructor(app: FastifyInstance) {
        this.app = app;
        this.userService = new UserService(app);
    }

    public async getAll(): Promise<AdminDTO[]> {
        const admins: (Admin & { user: User })[] = await this.app.prisma.admin.findMany({
            include: {
                user: true,
            }
        });

        const adminsDTO: AdminDTO[] = admins.map((admin: (Admin & { user: User })) => this.adminToAdminDTO(admin));
        return adminsDTO;
    }

    public async get(id: number): Promise<AdminDTO | null> {
        const admin: (Admin & { user: User }) | null = await this.app.prisma.admin.findUnique({
            where: {
                userId: id
            },
            include: {
                user: true,
            }
        });

        return admin ? this.adminToAdminDTO(admin) : null;
    }

    public async create(email: string, password: string, name: string, surname: string, isVerified: boolean): Promise<AdminDTO> {
        const user: UserDTO = await this.userService.create(email, password, name, surname, isVerified);

        const admin: Admin & { user: User } = await this.app.prisma.admin.create({
            data: {
                userId: user.id
            },
            include: {
                user: true
            }
        });
        return this.adminToAdminDTO(admin);
    }

    public async update(id: number, email: string, name: string, surname: string, isVerified: boolean): Promise<AdminDTO> {
        await this.userService.update(id, email, name, surname, isVerified);
        return (await this.get(id))!;
    }

    public async updatePassword(id: number, currentPassword: string, newPassword: string): Promise<boolean> {
        return await this.userService.updatePassword(id, currentPassword, newPassword);
    }

    public async delete(id: number): Promise<UserDTO> {
        const admin: Admin = await this.app.prisma.admin.delete({
            where: {
                userId: id
            }
        });

        return await this.userService.delete(id);
    }

    private adminToAdminDTO(admin: Admin & { user: User }): AdminDTO {
        return {
            userId: admin.userId,
            email: admin.user.email,
            name: admin.user.name,
            surname: admin.user.surname,
            isVerified: admin.user.isVerified,
        }
    }
}