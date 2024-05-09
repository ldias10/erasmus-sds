export const coursesGet = {
    schema: {
        tags: ["Course"],
        response: {
            200: {
                type: "array",
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
                        studyLevelId: {type: "integer"}
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

export const courseGet = {
    schema: {
        tags: ["Course"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        response: {
            200: {
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

export const coursePost = {
    schema: {
        description: "You must be logged in as admin or professor.",
        tags: ["Course"],
        body: {
            type: "object",
            required: ["name", "description", "ects", "hoursOfLecture", "hoursOfLabs", "numberOfExams", "fieldOfStudyId", "studyLevelId"],
            properties: {
                name: {type: "string"},
                description: {type: "string"},
                ects: {type: "integer"},
                hoursOfLecture: {type: "number"},
                hoursOfLabs: {type: "number"},
                numberOfExams: {type: "integer"},
                isAvailable: {type: "boolean", description: "If not specified, set to false."},
                fieldOfStudyId: {type: "integer"},
                studyLevelId: {type: "integer"}
            }
        },
        response: {
            201: {
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

export const coursePut = {
    schema: {
        description: "You must be logged in as admin or professor.",
        tags: ["Course"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["name", "description", "ects", "hoursOfLecture", "hoursOfLabs", "numberOfExams", "isAvailable", "fieldOfStudyId", "studyLevelId"],
            properties: {
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
        },
        response: {
            200: {
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

export const courseDelete = {
    schema: {
        description: "You must be logged in as admin or professor.",
        tags: ["Course"],
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
                    name: {type: "string"},
                    description: {type: "string"},
                    ects: {type: "integer"},
                    hoursOfLecture: {type: "number"},
                    hoursOfLabs: {type: "number"},
                    numberOfExams: {type: "integer"},
                    isAvailable: {type: "boolean"},
                    fieldOfStudyId: {type: "integer"},
                    studyLevelId: {type: "integer"}
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


