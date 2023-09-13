import { RouterProvider } from "react-router-dom";

import useSplash from "./hooks/useSplash";

import ROUTER from "./router";
import SplashScreen from "@components/SplashScreen";
import useModalApp from "@contexts/Modal/hooks/useModalApp";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
function App() {
  const { isAppLoading } = useSplash();
  const { data, handleRemove } = useModalApp();
  const { handleAdd } = useModalConsumer();

  if (isAppLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <button
        onClick={() => {
          console.log("handleAdd");

          handleAdd({
            heading: "Heading",
            body: "Body",
            footer: "Footer",
          });
        }}
      >
        Open Modal
      </button>
      {data.map((item) => (
        <div key={item.id}>
          Modal {item.id}
          <button
            onClick={() => {
              console.log("handleRemove");

              handleRemove();
            }}
          >
            Close
          </button>
        </div>
      ))}
      <RouterProvider router={ROUTER} />;
    </>
  );
}

export default App;
