// ===============================
// FILE: src/pages/Products.jsx
// ===============================

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import Sidebar
from "../components/Sidebar";

import ProductCard
from "../components/ProductCard";

import {
  getProducts,
} from "../services/productService";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const user =
            JSON.parse(
              sessionStorage.getItem(
                "user"
              )
            );

          if (!user?.storeId) {

            setLoading(false);

            return;
          }

          const data =
            await getProducts(
              user.storeId
            );

          setProducts(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchProducts();

  }, []);

  return (

    <div className="flex bg-zinc-50 dark:bg-zinc-950 h-screen overflow-hidden transition-colors duration-300">

      {/* SIDEBAR */}

      <Sidebar />

      {/* RIGHT SIDE ONLY SCROLL */}

      <div className="flex-1 overflow-y-auto p-8">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Product Intelligence
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            AI optimization analysis
            for your store products
          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-zinc-900 dark:text-white">
            Loading products...
          </div>

        ) : (

          <>
            {/* EMPTY STATE */}

            {products.length === 0 ? (

              <div className="glass-panel rounded-2xl p-10 text-center transition-colors duration-300">

                <h2 className="text-zinc-900 dark:text-white text-xl font-semibold mb-2">
                  No Products Found
                </h2>

                <p className="text-zinc-400">
                  This store currently has no products.
                </p>

              </div>

            ) : (

              /* PRODUCT GRID */

              <div className="grid grid-cols-3 gap-6 pb-8">

                {products.map((product) => (

                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="block"
                  >

                    <ProductCard
                      product={product}
                    />

                  </Link>

                ))}

              </div>

            )}

          </>

        )}

      </div>

    </div>
  );
}

export default Products;