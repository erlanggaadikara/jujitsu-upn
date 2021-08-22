import loadable from "@loadable/component";
import { PrerenderedComponent } from "react-prerendered-component";
import { observer } from "mobx-react-lite";
import Spinner from "component/Spinner";

const Prerendered = (dynamicImport) => {
  const LoadableComponent = loadable(dynamicImport, { fallback: <Spinner /> });
  return observer((props) => (
    <PrerenderedComponent live={LoadableComponent.load()}>
      <LoadableComponent {...props} />
    </PrerenderedComponent>
  ));
};

export default Prerendered;
