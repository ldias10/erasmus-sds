import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";
import {AdminDTO, AdminService} from "../services/admin";
import {UserDTO} from "../services/user";

interface adminParams {
    id: number;
}

interface adminCreateAttrs {
    email: string,
    password: string,
    name: string,
    surname: string,
    isVerified: boolean,
}

interface adminUpdateAttrs {
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
}

interface adminUpdatePasswordAttrs {
    currentPassword: string,
    newPassword: string,
}

const AdminRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const adminService: AdminService = new AdminService(app);

    app.get('/admins', {}, async (request, response) => {
        try {
            const admins: AdminDTO[] = await adminService.getAll();
            return response.code(200).send(admins);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.get<{ Params: adminParams }>('/admin/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const admin: AdminDTO | null = await adminService.get(id);
            if (!admin) {
                return response.send(404);
            }

            return response.code(200).send(admin);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.post<{ Body: adminCreateAttrs }>('/admin', {}, async (request, response) => {
        try {
            const body: adminCreateAttrs = request.body;
            const {
                email,
                password,
                name,
                surname,
                isVerified
            } = body;
            if (!email || !password || !name || !surname || !isVerified) {
                return response.send(400);
            }

            const admin: AdminDTO = await adminService.create(email, password, name, surname, isVerified);
            return response.code(201).send(admin);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{ Params: adminParams, Body: adminUpdateAttrs }>('/admin/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: adminUpdateAttrs = request.body;
            const {
                email,
                name,
                surname,
                isVerified
            } = body;
            if (!email || !name || !surname || !isVerified) {
                return response.send(400);
            }

            const admin: UserDTO = await adminService.update(id, email, name, surname, isVerified);
            if (!admin) {
                return response.send(404);
            }

            return response.code(200).send(admin);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{
        Params: adminParams,
        Body: adminUpdatePasswordAttrs
    }>('/admin/:id/updatePassword', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: adminUpdatePasswordAttrs = request.body;
            const {
                currentPassword,
                newPassword,
            } = body;
            if (!currentPassword || !newPassword) {
                return response.send(400);
            }

            const isPasswordUpdated: boolean = await adminService.updatePassword(id, currentPassword, newPassword);
            if (!isPasswordUpdated) {
                return response.send(404);
            }

            return response.code(200);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.delete<{ Params: adminParams }>('/admin/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const admin: UserDTO = await adminService.delete(id);
            if (!admin) {
                return response.send(404);
            }

            return response.code(204).send(admin);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
}
export default fp(AdminRoutes);