import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";
import {UserDTO} from "../services/user";
import {StudentDTO, StudentService} from "../services/student";
import {studentDelete, studentGet, studentPost, studentPut, studentPutPassword, studentsGet} from "../docs/student";

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

    app.get('/students', studentsGet, async (request, response) => {
        try {
            const students: StudentDTO[] = await studentService.getAll();
            return response.code(200).send(students);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{ Params: studentParams }>('/student/:id', studentGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const student: StudentDTO | null = await studentService.get(id);
            if (!student) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(student);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{ Body: studentCreateAttrs }>('/student', studentPost, async (request, response) => {
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
                return response.code(400).send({error: "Bad Request"});
            }

            const student: StudentDTO = await studentService.create(email, password, name, surname, isVerified, Number(countryId), Number(schoolId), Number(studyLevelId));
            return response.code(201).send(student);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: studentParams,
        Body: studentUpdateAttrs
    }>('/student/:id', studentPut, async (request, response) => {
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
                return response.code(400).send({error: "Bad Request"});
            }

            const student: StudentDTO = await studentService.update(id, email, name, surname, isVerified, Number(countryId), Number(schoolId), Number(studyLevelId));
            if (!student) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(student);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: studentParams,
        Body: studentUpdatePasswordAttrs
    }>('/student/:id/updatePassword', studentPutPassword, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: studentUpdatePasswordAttrs = request.body;
            const {
                currentPassword,
                newPassword,
            } = body;
            if (!currentPassword || !newPassword) {
                return response.code(400).send({error: "Bad Request"});
            }

            const isPasswordUpdated: boolean = await studentService.updatePassword(id, currentPassword, newPassword);
            if (!isPasswordUpdated) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{ Params: studentParams }>('/student/:id', studentDelete, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const student: UserDTO = await studentService.delete(id);
            if (!student) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(204).send(student);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(StudentRoutes);