import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reporteWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// serviceWorkerRegistration.register({
//   onUpdate: async (registration) => {
//     // We want to run this code only if we detect a new service worker is
//     // waiting to be activated.
//     // Details about it: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
//     if (registration && registration.waiting) {
//       await registration.unregister();
//       // Makes Workbox call skipWaiting()
//       registration.waiting.postMessage({ type: "SKIP_WAITING" });
//       // Once the service worker is unregistered, we can reload the page to let
//       // the browser download a fresh copy of our app (invalidating the cache)
//       window.location.reload();
//     }
//   },
// });
