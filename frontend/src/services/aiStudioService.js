import axios from "axios";

const API =
  "http://localhost:5000/api/ai-studio";

export async function generateAIContent(
  formData
) {

  const response =
    await axios.post(
      `${API}/generate`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
}