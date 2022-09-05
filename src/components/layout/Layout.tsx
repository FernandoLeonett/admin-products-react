import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./Layout.css";
declare global {
  interface Window {
    deferredPrompt: any;
  }
}

const Layout = ({ children }) => {

  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }
  return (
    <>
      <Header />

      {
        setIsReadyForInstall &&
        <button onClick={downloadApp}> Descargasdasda </button>
      }
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;