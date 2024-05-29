"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentDelete = exports.studentPutPassword = exports.studentPut = exports.studentPost = exports.studentGet = exports.studentsGet = void 0;
exports.studentsGet = {
    schema: {
        tags: ["Student"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        userId: { type: "integer" },
                        email: { type: "string" },
                        name: { type: "string" },
                        surname: { type: "string" },
                        isVerified: { type: "boolean" },
                        countryId: { type: "integer" },
                        schoolId: { type: "integer" },
                        studyLevelId: { type: "integer" },
                    },
                },
                description: "OK"
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error",
            }
        }
    }
};
exports.studentGet = {
    schema: {
        tags: ["Student"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        response: {
            200: {
                type: "object",
                properties: {
                    userId: { type: "integer" },
                    email: { type: "string" },
                    name: { type: "string" },
                    surname: { type: "string" },
                    isVerified: { type: "boolean" },
                    countryId: { type: "integer" },
                    schoolId: { type: "integer" },
                    studyLevelId: { type: "integer" },
                },
                description: "OK",
            },
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error",
            }
        }
    }
};
exports.studentPost = {
    schema: {
        tags: ["Student"],
        body: {
            type: "object",
            required: ["email", "password", "name", "surname", "countryId", "schoolId", "studyLevelId"],
            properties: {
                email: { type: "string" },
                password: { type: "string" },
                name: { type: "string" },
                surname: { type: "string" },
                isVerified: { type: "boolean", description: "If not specified, set to false." },
                countryId: { type: "integer" },
                schoolId: { type: "integer" },
                studyLevelId: { type: "integer" },
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    userId: { type: "integer" },
                    email: { type: "string" },
                    name: { type: "string" },
                    surname: { type: "string" },
                    isVerified: { type: "boolean" },
                    countryId: { type: "integer" },
                    schoolId: { type: "integer" },
                    studyLevelId: { type: "integer" },
                },
                description: "Created"
            },
            400: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Bad Request"
            },
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Not Found"
            },
            409: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Email address already in use."
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error"
            }
        }
    }
};
exports.studentPut = {
    schema: {
        tags: ["Student"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["email", "name", "surname", "isVerified", "countryId", "schoolId", "studyLevelId"],
            properties: {
                email: { type: "string" },
                name: { type: "string" },
                surname: { type: "string" },
                isVerified: { type: "boolean" },
                countryId: { type: "integer" },
                schoolId: { type: "integer" },
                studyLevelId: { type: "integer" },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    userId: { type: "integer" },
                    email: { type: "string" },
                    name: { type: "string" },
                    surname: { type: "string" },
                    isVerified: { type: "boolean" },
                    countryId: { type: "integer" },
                    schoolId: { type: "integer" },
                    studyLevelId: { type: "integer" },
                },
                description: "OK"
            },
            400: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Bad Request"
            },
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Not Found"
            },
            409: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Email address already in use."
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error"
            }
        }
    }
};
exports.studentPutPassword = {
    schema: {
        tags: ["Student"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["currentPassword", "newPassword"],
            properties: {
                currentPassword: { type: "string" },
                newPassword: { type: "string" },
            }
        },
        response: {
            200: {
                type: "boolean",
                description: "OK"
            },
            400: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Bad Request"
            },
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error"
            }
        }
    }
};
exports.studentDelete = {
    schema: {
        tags: ["Student"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        response: {
            204: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    email: { type: "string" },
                    name: { type: "string" },
                    surname: { type: "string" },
                    isVerified: { type: "boolean" }
                },
                description: "No Content"
            },
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error"
            }
        }
    }
};
