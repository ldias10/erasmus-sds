export const ratesGet = {
    schema: {
        tags: ["Rate"],
        querystring: {
            type: 'object',
            properties: {
                studentId: {type: 'integer', description: "Condition"},
                courseId: {type: 'integer', description: "Condition"},
                rate: {type: 'integer', description: "Condition"},
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
                        studentId: {type: "integer"},
                        courseId: {type: "integer"},
                        rate: {type: "integer"},
                        Student: {
                            type: "object",
                            properties: {
                                userId: {type: "integer"},
                                countryId: {type: "integer"},
                                schoolId: {type: "integer"},
                                studyLevelId: {type: "integer"},
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
                                studyLevelId: {type: "integer"},
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

export const rateGet = {
    schema: {
        tags: ["Rate"],
        params: {
            type: "object",
            properties: {
                studentId: {type: "integer"},
                courseId: {type: "integer"},
            },
            required: ["studentId", "courseId"]
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
                    studentId: {type: "integer"},
                    courseId: {type: "integer"},
                    rate: {type: "integer"},
                    Student: {
                        type: "object",
                        properties: {
                            userId: {type: "integer"},
                            countryId: {type: "integer"},
                            schoolId: {type: "integer"},
                            studyLevelId: {type: "integer"},
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
                            studyLevelId: {type: "integer"},
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

export const ratePost = {
    schema: {
        description: "You must be logged in as admin or verified student.",
        tags: ["Rate"],
        params: {
            type: "object",
            properties: {
                studentId: {type: "integer"},
                courseId: {type: "integer"},
            },
            required: ["studentId", "courseId"]
        },
        body: {
            type: "object",
            required: ["rate"],
            properties: {
                rate: {type: "integer"},
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    studentId: {type: "integer"},
                    courseId: {type: "integer"},
                    rate: {type: "integer"}
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

export const ratePut = {
    schema: {
        description: "You must be logged in as admin or verified student.",
        tags: ["Rate"],
        params: {
            type: "object",
            properties: {
                studentId: {type: "integer"},
                courseId: {type: "integer"},
            },
            required: ["studentId", "courseId"]
        },
        body: {
            type: "object",
            required: ["rate"],
            properties: {
                rate: {type: "string"},
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    studentId: {type: "integer"},
                    courseId: {type: "integer"},
                    rate: {type: "integer"}
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

export const rateDelete = {
    schema: {
        description: "You must be logged in as admin or verified student.",
        tags: ["Rate"],
        params: {
            type: "object",
            properties: {
                studentId: {type: "integer"},
                courseId: {type: "integer"},
            },
            required: ["studentId", "courseId"]
        },
        response: {
            204: {
                type: "object",
                properties: {
                    studentId: {type: "integer"},
                    courseId: {type: "integer"},
                    rate: {type: "integer"}
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