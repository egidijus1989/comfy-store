import { toast } from "react-toastify";
import { SectionTitle, CartTotals, CheckOutForm } from "../components";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  console.log(user);
  if (!user) {
    toast.warn("you most be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.CartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Your cart" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start"></div>
      <CheckOutForm />
      <CartTotals />
    </>
  );
};

export default Checkout;
