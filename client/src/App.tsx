import Home from "./pages/Home";
import ModelView from "./pages/ModelView";
import Upload from "./pages/Upload";
import useStore from "./store/store";

const App = () => {

  const homePage: boolean = useStore(state => state.homePage);
  const uploadPage: boolean = useStore(state => state.uploadPage);
  const modelViewPage: boolean = useStore(state => state.modelViewPage);

  return (
    <div
      className="app max-w-screen min-h-screen max-h-screen"
      >
      {homePage && <Home />}
      {uploadPage && <Upload />}
      {modelViewPage && <ModelView />}
    </div>
  );
};

export default App;