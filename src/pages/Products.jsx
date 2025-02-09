import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { useLoaderData, Link } from "react-router-dom";
import { customFetch } from "../utils";
const url = "/products";

export const loader = async ({ request }) => {
  const response = await customFetch("/products");
  console.log(response);
  const products = response.data.data;
  const meta = response.data.meta;
  return { products, meta };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
