import {FastifyInstance} from "fastify";
import {User} from "@prisma/client";

export interface UserDTO {
    id: number,
    email: string,
    name: string,
    surname: string,
    isVerified: boolean
}

export class UserService {

    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    public async getAll(): Promise<UserDTO[]> {
        return this.app.prisma.user.findMany();
    }

    public async get(id: number): Promise<UserDTO | null> {
        return this.app.prisma.user.findUnique({
            where: {
                id: id,
            }
        });
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

        if (!user || !(await this.app.bcrypt.compare(user.password, currentPassword))) {
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
}