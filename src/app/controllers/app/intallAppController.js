class installAppController {
    async installApp(request, response) {
        console.log('ENTROU AQUI');
        const { code } = request.query;

        return response.json('Success');
    }
}

export default new installAppController();