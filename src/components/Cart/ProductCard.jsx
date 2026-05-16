import { useState, memo } from "react";

import { ProductQuantity } from "components/Commons";
import { Delete } from "neetoicons";
import { Typography, Alert } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

const ProductCard = ({
  availableQuantity,
  imageUrl,
  mrp,
  name,
  offerPrice,
  slug,
}) => {
  const { t } = useTranslation();
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  const removeCartItem = useCartItemsStore.pickFrom();

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center space-x-5">
        <img alt={name} height={80} src={imageUrl} width={80} />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">
            {t("cartProductCard.mrp", { mrp })}
          </Typography>
          <Typography style="body2">
            {t("cartProductCard.offerPrice", { offerPrice })}
          </Typography>
        </div>
        <div className="flex items-center space-x-2">
          <ProductQuantity availableQuantity={availableQuantity} slug={slug} />
          <Delete
            className="cursor-pointer"
            onClick={() => setShouldShowDeleteAlert(true)}
          />
          <Alert
            isOpen={shouldShowDeleteAlert}
            submitButtonLabel={t("cartProductCard.yesRemove")}
            title={t("cartProductCard.removeItem")}
            message={
              <Typography>
                <Trans
                  components={{ bold: <strong /> }}
                  i18nKey="cartProductCard.removeConfirmation"
                  values={{ name }}
                />
              </Typography>
            }
            onClose={() => setShouldShowDeleteAlert(false)}
            onSubmit={() => {
              removeCartItem(slug);
              setShouldShowDeleteAlert(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
