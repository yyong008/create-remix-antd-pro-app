
// core
import { useContext } from "react";
import { Outlet } from "@remix-run/react";

// components
import { ClientOnly } from "remix-utils";
import { ProConfigProvider, SettingDrawer } from "@ant-design/pro-components";

// context
import SettingContext from "~/settingContext";

export default function Layout() {
  const value = useContext(SettingContext);
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      {() => (
        <ProConfigProvider>
          <Outlet />
          
          <SettingDrawer
            getContainer={() => document.body}
            enableDarkTheme
            onSettingChange={(settings: any) => {
              value?.setTheme(settings);
            }}
            settings={{ ...value.theme }}
            themeOnly
          />
        </ProConfigProvider>
      )}
    </ClientOnly>
  );
}
