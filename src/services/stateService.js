const StateService = {
  url: `${import.meta.env.VITE_APP_API_URL}states-summary`,
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },

  async getSummary() {
    try {
      const response = await fetch(StateService.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching states summary:', error);
      return [];
    }
  }
};

export default StateService;
