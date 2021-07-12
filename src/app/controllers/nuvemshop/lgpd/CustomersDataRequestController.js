class CustomersDataRequestController {
    async customersDataRequest(request, response) {
        return response.status(200).json({
            message: "success"
        })
    }
}

export default new CustomersDataRequestController();