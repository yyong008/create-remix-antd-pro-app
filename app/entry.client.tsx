// cores
import { startTransition, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";

// components and others
import { createCache, StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

// context
import SettingContext from "./settingContext";

const hydrate = () => {
  startTransition(() => {
    const cache = createCache();

    function MainApp() {
      const [theme, setTheme] = useState({
        colorPrimary: "#00b96b"
      });
      return (
        <SettingContext.Provider value={{ theme, setTheme }}>
          <StyleProvider cache={cache}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: theme.colorPrimary,
                },
              }}
            >
              <RemixBrowser />
            </ConfigProvider>
          </StyleProvider>
        </SettingContext.Provider>
      );
    }

    hydrateRoot(document, <MainApp />);
  });
};

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
