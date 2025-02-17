import Home from "./pages/Home";
import ModelDescription from "./pages/ModelDescription";
import ModelView from "./pages/ModelView";
import Upload from "./pages/Upload";
import useStore from "./store/store";

const App = () => {

  const homePage: boolean = useStore(state => state.homePage);
  const uploadPage: boolean = useStore(state => state.uploadPage);
  const modelDescriptionPage: boolean = useStore(state => state.modelDescriptionPage);
  const modelViewPage: boolean = useStore(state => state.modelViewPage);

  return (
    <div
      className="app max-w-screen min-h-screen max-h-screen"
      >
      {homePage && <Home />}
      {uploadPage && <Upload />}
      {modelDescriptionPage && <ModelDescription />}
      {modelViewPage && <ModelView />}
    </div>
  );
};

export default App;