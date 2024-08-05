const CustomerService = {

    url: `${import.meta.env.VITE_APP_API_URL}customers`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },

    get: async () => {
        try {

            const response = await fetch(`${CustomerService.url}`, {
                headers: CustomerService.headers
            })
            
            return response
        } catch (e) {
            return false;
        }
    }
}

export default CustomerService