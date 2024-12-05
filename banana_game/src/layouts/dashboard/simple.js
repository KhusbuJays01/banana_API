import { memo, Fragment } from "react";

//SimpleRouter
import SimpleRouter from "../../router/simple-router";

//seetingoffCanvas
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";

const Simple = memo((props) => {
  return (
    <Fragment>
      <div className="wrapper">
        <SimpleRouter />
      </div>
      <SettingOffCanvas name={true} />
    </Fragment>
  );
});

Simple.displayName = "Simple";
export default Simple;
