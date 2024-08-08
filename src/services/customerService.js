const CustomerService = {

    url: `${import.meta.env.VITE_APP_API_URL}customers`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },

    get: async () => {
        try {
          const response = await fetch(CustomerService.url, {
            headers: CustomerService.headers
          });
          console.log(CustomerService.url);
          return response.json();
        } catch (e) {
          console.error('Error fetching customers:', e);
          return false;
        }
    },
    
    updateState: async (customerId, stateId) => {
      try {
        const response = await fetch(`${CustomerService.url}/${customerId}/state`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ state_id: stateId }),
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        return await response.json();
      } catch (e) {
        console.error('Error updating customer state:', e);
        return false;
      }
    }
}

export default CustomerService;