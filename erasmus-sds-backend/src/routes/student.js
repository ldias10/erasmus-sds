"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const student_1 = require("../services/student");
const student_2 = require("../docs/student");
const country_1 = require("../services/country");
const school_1 = require("../services/school");
const study_level_1 = require("../services/study_level");
const utils_1 = require("../utils/utils");
const StudentRoutes = async (app, options) => {
    const studentService = new student_1.StudentService(app);
    const countryService = new country_1.CountryService(app);
    const schoolService = new school_1.SchoolService(app);
    const studyLevelService = new study_level_1.StudyLevelService(app);
    app.get('/students', student_2.studentsGet, async (request, response) => {
        try {
            const students = await studentService.getAll();
            return response.code(200).send(students);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/student/:id', student_2.studentGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const student = await studentService.get(id);
            if (!student) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(student);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/student', student_2.studentPost, async (request, response) => {
        try {
            const body = request.body;
            const { email, password, name, surname, isVerified, countryId, schoolId, studyLevelId } = body;
            if ((0, utils_1.isStringEmpty)(email) || (0, utils_1.isStringEmpty)(password) || (0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(surname) || (0, utils_1.isNull)(countryId) || (0, utils_1.isNull)(schoolId) || (0, utils_1.isNull)(studyLevelId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await countryService.get(countryId) || !await schoolService.get(schoolId) || !await studyLevelService.get(studyLevelId)) {
                return response.code(404).send({ error: "Not found" });
            }
            if (await studentService.isEmailAddressAlreadyUsed(email)) {
                return response.code(409).send({ error: "Email address already in use." });
            }
            const student = await studentService.create(email, password, name, surname, isVerified || false, Number(countryId), Number(schoolId), Number(studyLevelId));
            return response.code(201).send(student);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/student/:id', student_2.studentPut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { email, name, surname, isVerified, countryId, schoolId, studyLevelId } = body;
            if ((0, utils_1.isStringEmpty)(email) || (0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(surname) || (0, utils_1.isNull)(isVerified) || (0, utils_1.isNull)(countryId) || (0, utils_1.isNull)(schoolId) || (0, utils_1.isNull)(studyLevelId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await countryService.get(countryId) || !await schoolService.get(schoolId) || !await studyLevelService.get(studyLevelId) || !await studentService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            if (await studentService.isEmailAddressAlreadyUsedByAnotherUser(id, email)) {
                return response.code(409).send({ error: "Email address already in use." });
            }
            const student = await studentService.update(id, email, name, surname, isVerified, Number(countryId), Number(schoolId), Number(studyLevelId));
            return response.code(200).send(student);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/student/:id/updatePassword', student_2.studentPutPassword, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { currentPassword, newPassword, } = body;
            if ((0, utils_1.isStringEmpty)(currentPassword) || (0, utils_1.isStringEmpty)(newPassword)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await studentService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const isPasswordUpdated = await studentService.updatePassword(id, currentPassword, newPassword);
            if (!isPasswordUpdated) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/student/:id', student_2.studentDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await studentService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const student = await studentService.delete(id);
            return response.code(204).send(student);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(StudentRoutes);
