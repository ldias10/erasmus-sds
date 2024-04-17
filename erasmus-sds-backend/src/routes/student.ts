import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";
import {UserDTO} from "../services/user";
import {StudentDTO, StudentService} from "../services/student";

interface studentParams {
    id: number;
}

interface studentCreateAttrs {
    email: string,
    password: string,
    name: string,
    surname: string,
    isVerified: boolean,
    countryId: number,
    schoolId: number,
    studyLevelId: number
}

interface studentUpdateAttrs {
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
    countryId: number,
    schoolId: number,
    studyLevelId: number
}

interface studentUpdatePasswordAttrs {
    currentPassword: string,
    newPassword: string,
}

const StudentRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const studentService: StudentService = new StudentService(app);

    app.get('/students', {}, async (request, response) => {
        try {
            const students: StudentDTO[] = await studentService.getAll();
            return response.code(200).send(students);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.get<{ Params: studentParams }>('/student/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const student: StudentDTO | null = await studentService.get(id);
            if (!student) {
                return response.send(404);
            }

            return response.code(200).send(student);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.post<{ Body: studentCreateAttrs }>('/student', {}, async (request, response) => {
        try {
            const body: studentCreateAttrs = request.body;
            const {
                email,
                password,
                name,
                surname,
                isVerified,
                countryId,
                schoolId,
                studyLevelId
            } = body;
            if (!email || !password || !name || !surname || !isVerified || !countryId || !schoolId || !studyLevelId) {
                return response.send(400);
            }

            const student: StudentDTO = await studentService.create(email, password, name, surname, isVerified, Number(countryId), Number(schoolId), Number(studyLevelId));
            return response.code(201).send(student);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{ Params: studentParams, Body: studentUpdateAttrs }>('/student/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: studentUpdateAttrs = request.body;
            const {
                email,
                name,
                surname,
                isVerified,
                countryId,
                schoolId,
                studyLevelId
            } = body;
            if (!email || !name || !surname || !isVerified || !countryId || !schoolId || !studyLevelId) {
                return response.send(400);
            }

            const student: StudentDTO = await studentService.update(id, email, name, surname, isVerified, Number(countryId), Number(schoolId), Number(studyLevelId));
            if (!student) {
                return response.send(404);
            }

            return response.code(200).send(student);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{
        Params: studentParams,
        Body: studentUpdatePasswordAttrs
    }>('/student/:id/updatePassword', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: studentUpdatePasswordAttrs = request.body;
            const {
                currentPassword,
                newPassword,
            } = body;
            if (!currentPassword || !newPassword) {
                return response.send(400);
            }

            const isPasswordUpdated: boolean = await studentService.updatePassword(id, currentPassword, newPassword);
            if (!isPasswordUpdated) {
                return response.send(404);
            }

            return response.code(200);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.delete<{ Params: studentParams }>('/student/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const student: UserDTO = await studentService.delete(id);
            if (!student) {
                return response.send(404);
            }

            return response.code(204).send(student);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
}
export default fp(StudentRoutes);