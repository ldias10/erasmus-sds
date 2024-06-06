"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = require("fastify");
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_bcrypt_1 = __importDefault(require("fastify-bcrypt"));
const prisma_1 = __importDefault(require("./plugins/prisma"));
const course_1 = __importDefault(require("./routes/course"));
const study_level_1 = __importDefault(require("./routes/study_level"));
const field_of_study_1 = __importDefault(require("./routes/field_of_study"));
const university_1 = __importDefault(require("./routes/university"));
const school_1 = __importDefault(require("./routes/school"));
const admin_1 = __importDefault(require("./routes/admin"));
const country_1 = __importDefault(require("./routes/country"));
const professor_1 = __importDefault(require("./routes/professor"));
const student_1 = __importDefault(require("./routes/student"));
const comment_1 = __importDefault(require("./routes/comment"));
const rate_1 = __importDefault(require("./routes/rate"));
dotenv_1.default.config();
const app = (0, fastify_1.fastify)({ logger: true });
const swaggerOptions = {
    swagger: {
        info: {
            title: "erasmus-sds-api",
            description: "Web documentation of our API.",
            version: "1.0.0",
        },
        host: "localhost:8080",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [{ name: "Default", description: "Default" }],
    },
};
const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
};
app.register(swagger_1.default, swaggerOptions);
app.register(swagger_ui_1.default, swaggerUiOptions);
app.register(cors_1.default, corsOptions);
app.register(fastify_bcrypt_1.default, {
    saltWorkFactor: 12
});
app.register((app, options, done) => {
    app.get('/', { schema: { hide: true } }, (request, response) => {
        response.redirect("/docs");
    });
    done();
});
app.register(prisma_1.default);
app.register(admin_1.default);
app.register(comment_1.default);
app.register(country_1.default);
app.register(course_1.default);
app.register(field_of_study_1.default);
app.register(professor_1.default);
app.register(rate_1.default);
app.register(school_1.default);
app.register(student_1.default);
app.register(study_level_1.default);
app.register(university_1.default);
app.listen({
    host: (_a = process.env.APP_HOST) !== null && _a !== void 0 ? _a : "localhost",
    port: (_b = Number(process.env.APP_PORT)) !== null && _b !== void 0 ? _b : 8080, // Pulled from env file.
}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});
