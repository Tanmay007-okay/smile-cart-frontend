import { t } from "i18next";
import { Helmet } from "react-helmet";

const withTitle = (Component, title) => {
  const PageTitle = (props) => {
    // If a title is provided, it uses "Title | Smile Cart".
    // If no title is provided, it just uses "Smile Cart"
    const pageTitle = title ? t("pageTitle", { title }) : t("title");

    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        {/* It renders the original component with all its original props */}
        <Component {...props} />
      </>
    );
  };

  return PageTitle;
};

export default withTitle;
