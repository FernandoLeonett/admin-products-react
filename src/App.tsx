import { ToastContainer } from "react-toastify";
import "./App.css";
import { ProductContextProvider, useProducts } from "./context/context";
import AppRouter from "./routers/AppRouter";
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "./components/layout/Layout";

// interface IBeforeInstallPromptEvent extends Event {
//   readonly platforms: string[];
//   readonly userChoice: Promise<{
//     outcome: "accepted" | "dismissed";
//     platform: string;
//   }>;
//   prompt(): Promise<void>;
// }

// const isInWebApp =
//   window.navigator.standalone === true ||
//   window.matchMedia("(display-mode: standalone)").matches;

// function useAddToHomeScreenPrompt() {

//   const [prompt, setPrompt] = useState<IBeforeInstallPromptEvent | null>(null);
//   const [isReady, setIsReady] = useState(false);
//   const [hasFinishedInstallation, setHasFinishedInstallation] =
//     useState(isInWebApp);

//   const finishInstallation = useCallback(function () {
//     setHasFinishedInstallation(true);
//   }, []);

//   const promptToInstall = useCallback(
//     function () {
//       if (prompt) {
//         prompt.prompt();
//         prompt.userChoice.then(function (choiceResult) {
//           if (choiceResult.outcome === "accepted") {
//             finishInstallation();
//           }
//         });
//         return;
//       }

//       return Promise.reject(
//         new Error(
//           'Tried installing before browser sent "beforeinstallprompt" event'
//         )
//       );
//     },
//     [finishInstallation, prompt]
//   );

//   useEffect(
//     function () {
//       if (prompt) {
//         setIsReady(true);
//       }
//     },
//     [prompt]
//   );

//   useEffect(function () {
//     function ready(e: IBeforeInstallPromptEvent) {
//       e.preventDefault();
//       setPrompt(e);
//     }

//     window.addEventListener("beforeinstallprompt", ready as any);

//     return function () {
//       window.removeEventListener("beforeinstallprompt", ready as any);
//     };
//   }, []);

//   return useMemo(
//     () => ({
//       isReady,
//       promptToInstall,
//       hasFinishedInstallation,
//       finishInstallation,
//     }),
//     [isReady, promptToInstall, hasFinishedInstallation, finishInstallation]
//   );

// }

function App() {
  // const { isReady, promptToInstall, hasFinishedInstallation } =
  //   useAddToHomeScreenPrompt();

  const { user, setUser } = useProducts();

  return (
    <ProductContextProvider>
      <Layout>
        <AppRouter />
        <ToastContainer />
      </Layout>
    </ProductContextProvider>
  );
}

export default App;
