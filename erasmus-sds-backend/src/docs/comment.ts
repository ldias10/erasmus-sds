export const commentsGet = {
    schema: {
        tags: ["Comment"],
        querystring: {
            type: 'object',
            properties: {
                content: {type: 'string', description: "Condition"},
                date: {type: "string", format: "date-time", description: "Condition"},
                studentUserId: {type: 'integer', description: "Condition"},
                courseId: {type: 'integer', description: "Condition"},
                Student: {type: 'boolean', description: "Include"},
                Course: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: {type: "integer"},
                        content: {type: "string"},
                        date: {type: "string", format: "date-time"},
                        studentUserId: {type: "integer"},
                        courseId: {type: "integer"},
                        Student: {
                            type: "object",
                            properties: {
                                "countryId": {type: "integer"},
                                "schoolId": {type: "integer"},
                                "studyLevelId": {type: "integer"},
                            }
                        },
                        Course: {
                            type: "object",
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                                description: {type: "string"},
                                ects: {type: "integer"},
                                hoursOfLecture: {type: "number"},
                                hoursOfLabs: {type: "number"},
                                numberOfExams: {type: "integer"},
                                isAvailable: {type: "boolean"},
                                fieldOfStudyId: {type: "integer"},
                                studyLevelId: {type: "integer"}
                            }
                        }
                    },
                },
                description: "OK"
            },
            500: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Internal Server Error",
            }
        }
    }
};

export const commentGet = {
    schema: {
        tags: ["Comment"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        querystring: {
            type: 'object',
            properties: {
                Student: {type: 'boolean', description: "Include"},
                Course: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    content: {type: "string"},
                    date: {type: "string", format: "date-time"},
                    studentUserId: {type: "integer"},
                    courseId: {type: "integer"},
                    Student: {
                        type: "object",
                        properties: {
                            "countryId": {type: "integer"},
                            "schoolId": {type: "integer"},
                            "studyLevelId": {type: "integer"},
                        }
                    },
                    Course: {
                        type: "object",
                        properties: {
                            id: {type: "integer"},
                            name: {type: "string"},
                            description: {type: "string"},
                            ects: {type: "integer"},
                            hoursOfLecture: {type: "number"},
                            hoursOfLabs: {type: "number"},
                            numberOfExams: {type: "integer"},
                            isAvailable: {type: "boolean"},
                            fieldOfStudyId: {type: "integer"},
                            studyLevelId: {type: "integer"}
                        }
                    }
                },
                description: "OK",
            },
            404: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Internal Server Error",
            }
        }
    }
};

export const commentPost = {
    schema: {
        description: "You must be logged in as a verified user.",
        tags: ["Comment"],
        body: {
            type: "object",
            required: ["content", "studentUserId", "courseId"],
            properties: {
                content: {type: "string"},
                date: {
                    type: "string", format: "date-time",
                    description: "If not specified, the current date is set."
                },
                studentUserId: {type: "integer"},
                courseId: {type: "integer"},
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    content: {type: "string"},
                    date: {type: "string", format: "date-time"},
                    studentUserId: {type: "integer"},
                    courseId: {type: "integer"},
                },
                description: "Created"
            },
            400: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Bad Request"
            },
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            403: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Forbidden"
            },
            404: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Internal Server Error"
            }
        }
    }
};

export const commentPut = {
    schema: {
        description: "You must be logged in as a verified user.",
        tags: ["Comment"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["content", "date", "studentUserId", "courseId"],
            properties: {
                content: {type: "string"},
                date: {type: "string", format: "date-time"},
                studentUserId: {type: "integer"},
                courseId: {type: "integer"},
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    content: {type: "string"},
                    date: {type: "string", format: "date-time"},
                    studentUserId: {type: "integer"},
                    courseId: {type: "integer"},
                },
                description: "OK"
            },
            400: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Bad Request"
            },
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            403: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Forbidden"
            },
            404: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Internal Server Error"
            }
        }
    }
};

export const commentDelete = {
    schema: {
        description: "You must be logged in as a verified user.",
        tags: ["Comment"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        response: {
            204: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    content: {type: "string"},
                    date: {type: "string", format: "date-time"},
                    studentUserId: {type: "integer"},
                    courseId: {type: "integer"},
                },
                description: "No Content"
            },
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            403: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Forbidden"
            },
            404: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Internal Server Error"
            }
        }
    }
};


