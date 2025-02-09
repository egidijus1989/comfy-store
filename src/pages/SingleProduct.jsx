import { useLoaderData, Link } from "react-router-dom";
import { formatPrice, customFetch, generateAmountOption } from "../utils";
import { useState } from "react";

export const loader = async ({ params }) => {
  const response = await customFetch(`products/${params.id}`);
  return { product: response.data.data };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, price, title, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };
  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/*PRODUCT*/}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/*IMAGE*/}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/*PRODUCT*/}
        <div className="">
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 left-8">{description}</p>
          {/*COLOR*/}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              <div className="mt-2">
                {colors.map((color) => {
                  return (
                    <button
                      key={color}
                      type="button"
                      className={`badge w-6 h-6 mr-2 ${
                        color === productColor && "border-2 border-primary"
                      } `}
                      style={{ backgroundColor: color }}
                      onClick={() => setProductColor(color)}
                    ></button>
                  );
                })}
              </div>
            </h4>
          </div>
          {/*AMOUNT*/}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              id="amount"
              className="select select-primary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOption(5)}
            </select>
          </div>
          {/*CART BTN*/}
          <div className="mt-10">
            <button
              className="btn btn-primary btn-md"
              onClick={() => console.log("x")}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
