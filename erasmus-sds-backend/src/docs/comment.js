"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentDelete = exports.commentPut = exports.commentPost = exports.commentGet = exports.commentsGet = void 0;
exports.commentsGet = {
    schema: {
        tags: ["Comment"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        content: { type: "string" },
                        date: { type: "string", format: "date-time" },
                        studentUserId: { type: "integer" },
                        courseId: { type: "integer" },
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
exports.commentGet = {
    schema: {
        tags: ["Comment"],
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
                    content: { type: "string" },
                    date: { type: "string", format: "date-time" },
                    studentUserId: { type: "integer" },
                    courseId: { type: "integer" },
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
exports.commentPost = {
    schema: {
        tags: ["Comment"],
        body: {
            type: "object",
            required: ["content", "studentUserId", "courseId"],
            properties: {
                content: { type: "string" },
                date: {
                    type: "string", format: "date-time",
                    description: "If not specified, the current date is set."
                },
                studentUserId: { type: "integer" },
                courseId: { type: "integer" },
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    content: { type: "string" },
                    date: { type: "string", format: "date-time" },
                    studentUserId: { type: "integer" },
                    courseId: { type: "integer" },
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
exports.commentPut = {
    schema: {
        tags: ["Comment"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["content", "date", "studentUserId", "courseId"],
            properties: {
                content: { type: "string" },
                date: { type: "string", format: "date-time" },
                studentUserId: { type: "integer" },
                courseId: { type: "integer" },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    content: { type: "string" },
                    date: { type: "string", format: "date-time" },
                    studentUserId: { type: "integer" },
                    courseId: { type: "integer" },
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
exports.commentDelete = {
    schema: {
        tags: ["Comment"],
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
                    content: { type: "string" },
                    date: { type: "string", format: "date-time" },
                    studentUserId: { type: "integer" },
                    courseId: { type: "integer" },
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
