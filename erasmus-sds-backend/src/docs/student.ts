export const studentsGet = {
    schema: {
        tags: ["Student"],
        querystring: {
            type: 'object',
            properties: {
                email: {type: 'string', description: "Condition"},
                name: {type: 'string', description: "Condition"},
                surname: {type: 'string', description: "Condition"},
                isVerified: {type: 'boolean', description: "Condition"},
                countryId: {type: 'integer', description: "Condition"},
                schoolId: {type: 'integer', description: "Condition"},
                studyLevelId: {type: 'integer', description: "Condition"},
                Country: {type: 'boolean', description: "Include"},
                School: {type: 'boolean', description: "Include"},
                StudyLevel: {type: 'boolean', description: "Include"},
                FieldsOfStudy: {type: 'boolean', description: "Include"},
                Courses: {type: 'boolean', description: "Include"},
                Comments: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        userId: {type: "integer"},
                        email: {type: "string"},
                        name: {type: "string"},
                        surname: {type: "string"},
                        isVerified: {type: "boolean"},
                        countryId: {type: "integer"},
                        schoolId: {type: "integer"},
                        studyLevelId: {type: "integer"},
                        Country: {
                            type: 'object',
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                                tag: {type: "string"},
                            }
                        },
                        School: {
                            type: 'object',
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                                universityId: {type: "integer"},
                            }
                        },
                        StudyLevel: {
                            type: 'object',
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                            }
                        },
                        FieldsOfStudy: {
                            type: 'array',
                            items: {
                                type: "object",
                                properties: {
                                    id: {type: "integer"},
                                    name: {type: "string"},
                                }
                            }
                        },
                        Courses: {
                            type: 'array',
                            items: {
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
                                    studyLevelId: {type: "integer"},
                                }
                            }
                        },
                        Comments: {
                            type: 'array',
                            items: {
                                type: "object",
                                properties: {
                                    id: {type: "integer"},
                                    content: {type: "string"},
                                    date: {type: "string", format: "date-time"},
                                    studentUserId: {type: "integer"},
                                    courseId: {type: "integer"},
                                }
                            }
                        },
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

export const studentGet = {
    schema: {
        tags: ["Student"],
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
                Country: {type: 'boolean', description: "Include"},
                School: {type: 'boolean', description: "Include"},
                StudyLevel: {type: 'boolean', description: "Include"},
                FieldsOfStudy: {type: 'boolean', description: "Include"},
                Courses: {type: 'boolean', description: "Include"},
                Comments: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    userId: {type: "integer"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"},
                    countryId: {type: "integer"},
                    schoolId: {type: "integer"},
                    studyLevelId: {type: "integer"},
                    Country: {
                        type: 'object',
                        properties: {
                            id: {type: "integer"},
                            name: {type: "string"},
                            tag: {type: "string"},
                        }
                    },
                    School: {
                        type: 'object',
                        properties: {
                            id: {type: "integer"},
                            name: {type: "string"},
                            universityId: {type: "integer"},
                        }
                    },
                    StudyLevel: {
                        type: 'object',
                        properties: {
                            id: {type: "integer"},
                            name: {type: "string"},
                        }
                    },
                    FieldsOfStudy: {
                        type: 'array',
                        items: {
                            type: "object",
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                            }
                        }
                    },
                    Courses: {
                        type: 'array',
                        items: {
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
                                studyLevelId: {type: "integer"},
                            }
                        }
                    },
                    Comments: {
                        type: 'array',
                        items: {
                            type: "object",
                            properties: {
                                id: {type: "integer"},
                                content: {type: "string"},
                                date: {type: "string", format: "date-time"},
                                studentUserId: {type: "integer"},
                                courseId: {type: "integer"},
                            }
                        }
                    },
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

export const studentPost = {
    schema: {
        tags: ["Student"],
        body: {
            type: "object",
            required: ["email", "password", "name", "surname", "countryId", "schoolId", "studyLevelId"],
            properties: {
                email: {type: "string"},
                password: {type: "string"},
                name: {type: "string"},
                surname: {type: "string"},
                isVerified: {type: "boolean", description: "If not specified, set to false."},
                countryId: {type: "integer"},
                schoolId: {type: "integer"},
                studyLevelId: {type: "integer"},
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    userId: {type: "integer"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"},
                    countryId: {type: "integer"},
                    schoolId: {type: "integer"},
                    studyLevelId: {type: "integer"},
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
            404: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Not Found"
            },
            409: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Conflict"
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

export const studentPut = {
    schema: {
        description: "You must be logged in as admin or student.",
        tags: ["Student"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["email", "name", "surname", "isVerified", "countryId", "schoolId", "studyLevelId"],
            properties: {
                email: {type: "string"},
                name: {type: "string"},
                surname: {type: "string"},
                isVerified: {type: "boolean"},
                countryId: {type: "integer"},
                schoolId: {type: "integer"},
                studyLevelId: {type: "integer"},
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    userId: {type: "integer"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"},
                    countryId: {type: "integer"},
                    schoolId: {type: "integer"},
                    studyLevelId: {type: "integer"},
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
            409: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Conflict"
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

export const studentPutPassword = {
    schema: {
        description: "You must be logged in as admin or student.",
        tags: ["Student"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["currentPassword", "newPassword"],
            properties: {
                currentPassword: {type: "string"},
                newPassword: {type: "string"},
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

export const studentDelete = {
    schema: {
        description: "You must be logged in as admin or student.",
        tags: ["Student"],
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
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"}
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

export const studentJoinFieldOfStudy = {
    schema: {
        description: "You must be logged in as admin or student.",
        tags: ["Student"],
        body: {
            type: "object",
            required: ["id", "fieldOfStudyId"],
            properties: {
                id: {type: "integer"},
                fieldOfStudyId: {type: "integer"},
            }
        },
        response: {
            201: {
                type: "boolean",
                description: "Joined"
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
            409: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Conflict"
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
}

export const studentLeaveFieldOfStudy = {
    schema: {
        description: "You must be logged in as admin or student.",
        tags: ["Student"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"},
                fieldOfStudyId: {type: "integer"}
            },
            required: ["id", "fieldOfStudyId"]
        },
        response: {
            204: {
                type: "boolean",
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

export const studentJoinCourse = {
    schema: {
        description: "You must be logged in as admin or student.",
        tags: ["Student"],
        body: {
            type: "object",
            required: ["id", "courseId"],
            properties: {
                id: {type: "integer"},
                courseId: {type: "integer"},
            }
        },
        response: {
            201: {
                type: "boolean",
                description: "Joined"
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
            409: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Conflict"
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
}

export const studentLeaveCourse = {
    schema: {
        description: "You must be logged in as admin or student.",
        tags: ["Student"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"},
                courseId: {type: "integer"}
            },
            required: ["id", "courseId"]
        },
        response: {
            204: {
                type: "boolean",
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
