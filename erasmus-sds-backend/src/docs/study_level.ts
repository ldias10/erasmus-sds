export const studiesLevelGet = {
    schema: {
        tags: ["Study Level"],
        querystring: {
            type: 'object',
            properties: {
                name: {type: 'string', description: "Condition"},
                Students: {type: 'boolean', description: "Include"},
                Courses: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: {type: "integer"},
                        name: {type: "string"},
                        Students: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    userId: {type: "integer"},
                                    countryId: {type: "integer"},
                                    schoolId: {type: "integer"},
                                    studyLevelId: {type: "integer"},
                                }
                            }
                        },
                        Courses: {
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
                                    studyLevelId: {type: "integer"},
                                }
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

export const studyLevelGet = {
    schema: {
        tags: ["Study Level"],
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
                Students: {type: 'boolean', description: "Include"},
                Courses: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    name: {type: "string"},
                    Students: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                userId: {type: "integer"},
                                countryId: {type: "integer"},
                                schoolId: {type: "integer"},
                                studyLevelId: {type: "integer"},
                            }
                        }
                    },
                    Courses: {
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
                                studyLevelId: {type: "integer"},
                            }
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

export const studyLevelPost = {
    schema: {
        description: "You must be logged in as admin.",
        tags: ["Study Level"],
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: {type: "string"},
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    name: {type: "string"},
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

export const studyLevelPut = {
    schema: {
        description: "You must be logged in as admin.",
        tags: ["Study Level"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: {type: "string"},
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    name: {type: "string"},
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

export const studyLevelDelete = {
    schema: {
        description: "You must be logged in as admin.",
        tags: ["Study Level"],
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