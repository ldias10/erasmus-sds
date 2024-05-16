import {FastifyInstance} from "fastify";
import {Admin, Professor, Student, User} from "@prisma/client";
import {isNull} from "../utils/utils";

type UserIncludes = User & {
    Admin?: Admin,
    Professor?: Professor,
    Student?: Student
};

export interface UserDTO {
    id: number,
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
    Admin?: Admin,
    Professor?: Professor,
    Student?: Student
}

export interface UserGetInclude {
    Admin?: boolean,
    Professor?: boolean,
    Student?: boolean
}

export interface UserGetWhere {
    email?: string,
    name?: string,
    surname?: string,
    isVerified?: boolean,
}

export class UserService {

    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(getInclude?: UserGetInclude, getWhere?: UserGetWhere): Promise<UserDTO[]> {
        const include: any = this.generateGetInclude(getInclude);
        const where: any = this.generateGetWhere(getWhere);

        const users: UserIncludes[] = await this.app.prisma.user.findMany({include, where});
        const usersDTO: UserDTO[] = users.map(((user: UserIncludes) => this.userToUserDTO(user)));
        return usersDTO;
    }

    public async get(id: number, getInclude?: UserGetInclude): Promise<UserDTO | null> {
        const include: any = this.generateGetInclude(getInclude);

        const user: UserIncludes | null = await this.app.prisma.user.findUnique({
            include,
            where: {
                id: id,
            }
        });

        return user ? this.userToUserDTO(user) : null;
    }

    public async getByEmail(email: string, getInclude?: UserGetInclude): Promise<UserDTO | null> {
        const include: any = this.generateGetInclude(getInclude);

        const user: UserIncludes | null = await this.app.prisma.user.findUnique({
            include,
            where: {
                email: email
            }
        });

        return user ? this.userToUserDTO(user) : null;
    }

    public async create(email: string, password: string, name: string, surname: string, isVerified: boolean): Promise<UserDTO> {
        const hashedPassword: string = await this.app.bcrypt.hash(password);

        return this.app.prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                surname: surname,
                isVerified: isVerified,
            }
        });
    }

    public async update(id: number, email: string, name: string, surname: string, isVerified: boolean): Promise<UserDTO> {
        return this.app.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                email: email,
                name: name,
                surname: surname,
                isVerified: isVerified,
            }
        });
    }

    public async updatePassword(id: number, currentPassword: string, newPassword: string): Promise<boolean> {
        const user: User | null = await this.app.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user || !(await this.app.bcrypt.compare(currentPassword, user.password))) {
            return false;
        }

        const hashedNewPassword: string = await this.app.bcrypt.hash(newPassword);
        await this.app.prisma.user.update({
            where: {
                id: id
            },
            data: {
                password: hashedNewPassword
            }
        });

        return true;
    }

    public async delete(id: number): Promise<UserDTO> {
        return this.app.prisma.user.delete({
            where: {
                id: id
            }
        });
    }

    public async isEmailAddressAlreadyUsed(email: string): Promise<boolean> {
        const user: User | null = await this.app.prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return !isNull(user);
    }

    public async isEmailAddressAlreadyUsedByAnotherUser(id: number, email: string): Promise<boolean> {
        const userById: User | null = await this.app.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        const userByEmail: User | null = await this.app.prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return (!isNull(userById) && !isNull(userByEmail)) && userById?.id !== userByEmail?.id;
    }

    public async login(email: string, password: string): Promise<boolean> {
        const user: User | null = await this.app.prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return !(!user || !(await this.app.bcrypt.compare(password, user.password)));
    }

    private userToUserDTO(user: UserIncludes): UserDTO {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            isVerified: user.isVerified,
            Admin: user.Admin,
            Professor: user.Professor,
            Student: user.Student
        }
    }

    private generateGetInclude(getInclude?: UserGetInclude): any {
        const include: any = {};
        if (getInclude) {
            if (!isNull(getInclude.Admin)) include.Admin = Boolean(getInclude.Admin);
            if (!isNull(getInclude.Professor)) include.Professor = Boolean(getInclude.Professor);
            if (!isNull(getInclude.Student)) include.Student = Boolean(getInclude.Student);
        }

        return include;
    }

    private generateGetWhere(getWhere?: UserGetWhere): any {
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