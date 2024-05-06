"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDelete = exports.adminPutPassword = exports.adminPut = exports.adminPost = exports.adminGet = exports.adminsGet = void 0;
exports.adminsGet = {
    schema: {
        tags: ["Admin"],
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
                        isVerified: { type: "boolean" }
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
exports.adminGet = {
    schema: {
        tags: ["Admin"],
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
                    isVerified: { type: "boolean" }
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
exports.adminPost = {
    schema: {
        tags: ["Admin"],
        body: {
            type: "object",
            required: ["email", "password", "name", "surname"],
            properties: {
                email: { type: "string" },
                password: { type: "string" },
                name: { type: "string" },
                surname: { type: "string" },
                isVerified: { type: "boolean", description: "If not specified, set to false." }
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
                    isVerified: { type: "boolean" }
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
exports.adminPut = {
    schema: {
        tags: ["Admin"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["email", "name", "surname", "isVerified"],
            properties: {
                email: { type: "string" },
                name: { type: "string" },
                surname: { type: "string" },
                isVerified: { type: "boolean" }
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
                    isVerified: { type: "boolean" }
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
exports.adminPutPassword = {
    schema: {
        tags: ["Admin"],
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
exports.adminDelete = {
    schema: {
        tags: ["Admin"],
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
