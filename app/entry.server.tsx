// types
import type { EntryContext } from "@remix-run/node";

// core
import { useState } from "react";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

// components
import { ConfigProvider } from "antd";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

// context
import SettingContext from "./settingContext";


export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
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
            <RemixServer context={remixContext} url={request.url} />
          </ConfigProvider>
        </StyleProvider>
      </SettingContext.Provider>
    );
  }

  let markup = renderToString(<MainApp />);
  const styleText = extractStyle(cache);

  markup = markup.replace("__ANTD__", styleText);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
