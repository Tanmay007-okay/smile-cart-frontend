import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute left-1/3 top-1/3">
      <NoData
        description={t("pageNotFound.description")}
        title={t("pageNotFound.title")}
        primaryButtonProps={{
          label: t("pageNotFound.backToHome"),
          to: routes.root,
        }}
      />
    </div>
  );
};

export default PageNotFound;
