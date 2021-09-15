class installAppController {
    async installApp(request, response) {
        const { code } = request.query;

        return response.json('Success');
    }
}

export default new installAppController();