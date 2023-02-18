/**
 * DOCS MESSAGE CONFIG FOR CONTROLLER
 */

 export const AuthorDoc = {
    // Error response
    unauthorizedResponse: { description: 'Unauthorized Error' },
    badRequestResponse: { description: 'Bad Request Error. Please re-check request body or params' },
    internalServerErrorResponse: { description: 'Internal Server Error. Check error log for detail information' },

    // @Post()
    create: {
        operation: { summary: 'Create New Author', description: 'Create new author endpoint' },
        response: { description: 'New author successfully created' },
    },

    // @Get()
    findAll: {
        operation: { summary: 'List All author', description: 'Get all author and list them all' },
        response: { description: 'Success' },
    },

    // @Get(':id')
    findOne: {
        operation: { summary: 'Get author by Id', description: 'Find author from database and by an id' },
        response: { description: 'Success' },
    },

    // @Patch(':id')
    update: {
        operation: { summary: 'Update author by Id', description: 'Update author with new data' },
        response: { description: 'Success' },
    },

    // @Delete(':id')
    remove: {
        operation: { summary: 'Delete author by Id', description: 'Delete author from the database' },
        response: { description: 'Success' },
    },
}