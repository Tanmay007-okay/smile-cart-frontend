import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { useHistory } from "react-router-dom";

// 1. Add actionBlock to the props
const Header = ({ title, shouldShowBackButton = true, actionBlock }) => {
  const history = useHistory();

  return (
    <div className="m-2">
      <div className="mx-6 mb-2 mt-6 flex items-end justify-between">
        <div className="flex items-center">
          {shouldShowBackButton && (
            <LeftArrow
              className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6 cursor-pointer"
              onClick={history.goBack}
            />
          )}
          <Typography style="h1" weight="semibold">
            {title}
          </Typography>
        </div>
        {/* 2. Render the actionBlock (our search bar) on the right side */}
        <div className="flex items-end space-x-4">{actionBlock}</div>
      </div>
      <hr className="neeto-ui-bg-black h-1" />
    </div>
  );
};

export default Header;
