import axios from "axios"

const API =
  "http://localhost:5000/api/recommendations"

// ===================================
// GET
// ===================================

export async function getRecommendations(
  storeId
) {

  const response =
    await axios.get(
      `${API}/${storeId}`
    )

  return response.data
}

// ===================================
// REGENERATE
// ===================================

export async function regenerateRecommendations(
  storeId
) {

  const response =
    await axios.post(
      `${API}/regenerate/${storeId}`
    )

  return response.data
}