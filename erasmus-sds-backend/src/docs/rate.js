"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateDelete = exports.ratePut = exports.ratePost = exports.rateGet = exports.ratesGet = void 0;
exports.ratesGet = {
    schema: {
        tags: ["Rate"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        studentId: { type: "integer" },
                        courseId: { type: "integer" },
                        rate: { type: "integer" }
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
exports.rateGet = {
    schema: {
        tags: ["Rate"],
        params: {
            type: "object",
            properties: {
                studentId: { type: "integer" },
                courseId: { type: "integer" },
            },
            required: ["studentId", "courseId"]
        },
        response: {
            200: {
                type: "object",
                properties: {
                    studentId: { type: "integer" },
                    courseId: { type: "integer" },
                    rate: { type: "integer" }
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
exports.ratePost = {
    schema: {
        tags: ["Rate"],
        params: {
            type: "object",
            properties: {
                studentId: { type: "integer" },
                courseId: { type: "integer" },
            },
            required: ["studentId", "courseId"]
        },
        body: {
            type: "object",
            required: ["rate"],
            properties: {
                rate: { type: "integer" },
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    studentId: { type: "integer" },
                    courseId: { type: "integer" },
                    rate: { type: "integer" }
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
                description: "The resource already exists and cannot be created again."
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
exports.ratePut = {
    schema: {
        tags: ["Rate"],
        params: {
            type: "object",
            properties: {
                studentId: { type: "integer" },
                courseId: { type: "integer" },
            },
            required: ["studentId", "courseId"]
        },
        body: {
            type: "object",
            required: ["rate"],
            properties: {
                rate: { type: "string" },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    studentId: { type: "integer" },
                    courseId: { type: "integer" },
                    rate: { type: "integer" }
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
exports.rateDelete = {
    schema: {
        tags: ["Rate"],
        params: {
            type: "object",
            properties: {
                studentId: { type: "integer" },
                courseId: { type: "integer" },
            },
            required: ["studentId", "courseId"]
        },
        response: {
            204: {
                type: "object",
                properties: {
                    studentId: { type: "integer" },
                    courseId: { type: "integer" },
                    rate: { type: "integer" }
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
