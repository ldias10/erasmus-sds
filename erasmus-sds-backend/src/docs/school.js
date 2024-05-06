"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolDelete = exports.schoolPut = exports.schoolPost = exports.schoolGet = exports.schoolsGet = void 0;
exports.schoolsGet = {
    schema: {
        tags: ["School"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        universityId: { type: "integer" },
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
exports.schoolGet = {
    schema: {
        tags: ["School"],
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
                    id: { type: "integer" },
                    name: { type: "string" },
                    universityId: { type: "integer" },
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
exports.schoolPost = {
    schema: {
        tags: ["School"],
        body: {
            type: "object",
            required: ["name", "universityId"],
            properties: {
                name: { type: "string" },
                universityId: { type: "integer" },
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    universityId: { type: "integer" },
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
exports.schoolPut = {
    schema: {
        tags: ["School"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["name", "universityId"],
            properties: {
                name: { type: "string" },
                universityId: { type: "integer" },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    universityId: { type: "integer" },
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
exports.schoolDelete = {
    schema: {
        tags: ["School"],
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
                    name: { type: "string" },
                    universityId: { type: "integer" },
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
