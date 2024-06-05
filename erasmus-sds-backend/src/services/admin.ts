import {FastifyInstance} from "fastify";
import {Admin, User} from "@prisma/client";
import {UserDTO, UserService} from "./user";
import {isNull} from "../utils/utils";

type AdminIncludes = Admin & { User: User };

export interface AdminDTO {
    userId: number,
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
}

export interface AdminGetWhere {
    email?: string,
    name?: string,
    surname?: string,
    isVerified?: boolean,
}

export class AdminService {

    private app: FastifyInstance;
    private userService: UserService;

    constructor(app: FastifyInstance) {
        this.app = app;
        this.userService = new UserService(app);
    }

    public async getAll(getWhere?: AdminGetWhere): Promise<AdminDTO[]> {
        const where: any = this.generateGetWhere(getWhere);

        const users: UserDTO[] = await this.userService.getAll({}, where);
        const usersId: number[] = users.map((user: UserDTO) => user.id);

        const admins: AdminIncludes[] = await this.app.prisma.admin.findMany({
            where: {
                userId: {in: usersId}
            },
            include: {
                User: true
            }
        });

        const adminsDTO: AdminDTO[] = admins.map((admin: AdminIncludes) => this.adminToAdminDTO(admin));
        return adminsDTO;
    }

    public async get(id: number): Promise<AdminDTO | null> {
        const admin: AdminIncludes | null = await this.app.prisma.admin.findUnique({
            where: {
                userId: id
            },
            include: {
                User: true,
            }
        });

        return admin ? this.adminToAdminDTO(admin) : null;
    }

    public async create(email: string, password: string, name: string, surname: string, isVerified: boolean): Promise<AdminDTO> {
        const user: UserDTO = await this.userService.create(email, password, name, surname, isVerified);

        const admin: AdminIncludes = await this.app.prisma.admin.create({
            data: {
                userId: user.id
            },
            include: {
                User: true
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

    public async isEmailAddressAlreadyUsed(email: string): Promise<boolean> {
        return await this.userService.isEmailAddressAlreadyUsed(email);
    }

    public async isEmailAddressAlreadyUsedByAnotherUser(id: number, email: string): Promise<boolean> {
        return await this.userService.isEmailAddressAlreadyUsedByAnotherUser(id, email);
    }

    private adminToAdminDTO(admin: AdminIncludes): AdminDTO {
        return {
            userId: admin.userId,
            email: admin.User.email,
            name: admin.User.name,
            surname: admin.User.surname,
            isVerified: admin.User.isVerified,
        }
    }

    private generateGetWhere(getWhere?: AdminGetWhere): any {
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