export const getProducts =
  async (storeId) => {

  const res = await fetch(
    `http://localhost:5000/api/products/store/${storeId}`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch products"
    );
  }

  return res.json();
};

export const getSingleProduct =
  async (id) => {

  const res = await fetch(
    `http://localhost:5000/api/products/${id}`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch product"
    );
  }

  return res.json();
};
export const analyzeProduct =
  async (id) => {

    const res = await fetch(
      `http://localhost:5000/api/ai/analyze/${id}`,
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      throw new Error(
        "AI analysis failed"
      );
    }

    return res.json();
  };
export const analyzeStoreProducts =
  async (storeId) => {

    const res = await fetch(
      `http://localhost:5000/api/ai/analyze-store/${storeId}`,
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Store analysis failed"
      );
    }

    return res.json();
  };