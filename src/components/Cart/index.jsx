import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/Commons";
import { MRP, OFFER_PRICE } from "components/constants";
import { cartTotalOf } from "components/utils";
import i18n from "i18next";
import { NoData, Toastr } from "neetoui";
import { keys, isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();
  const slugs = keys(cartItems);
  const { t } = useTranslation(); // Call the hook
  const fetchCartProducts = async () => {
    try {
      const responses = await Promise.all(
        slugs.map((slug) => productsApi.show(slug))
      );

      setProducts(responses);

      responses.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(
            `${name} is no longer available and has been removed from cart`,
            { autoClose: 2000 }
          );
        }
      });
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  if (isLoading) return <PageLoader />;

  if (isEmpty(products)) {
    return (
      <>
        <Header title={t("cart.title")} /> {/* 👈 Update this! */}
        <div className="flex h-screen items-center justify-center">
          <NoData title={t("cart.empty")} /> {/* 👈 Update this! */}
        </div>
      </>
    );
  }

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

  return (
    <>
      <Header title={t("cart.title")} />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard totalMrp={totalMrp} totalOfferPrice={totalOfferPrice} />
          </div>
        )}
      </div>
    </>
  );
};

export default withTitle(Cart, i18n.t("cart.title"));
