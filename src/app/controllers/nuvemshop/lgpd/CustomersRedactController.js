class CustomersRedactController {
    async customersRedact(request, response) {
        return response.status(200).json({
            message: "success"
        })
    }
}

export default new CustomersRedactController();