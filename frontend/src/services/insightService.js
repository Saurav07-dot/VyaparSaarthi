import axios from "axios";

const API =
  "http://localhost:5000/api/insights";

export const getInsights =
  async (storeId) => {

    const response =
      await axios.get(
        `${API}/${storeId}`
      );

    return response.data;
  };