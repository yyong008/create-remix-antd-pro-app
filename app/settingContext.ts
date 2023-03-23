import { createContext } from "react";

const SettingContext = createContext({
  theme: {},
  setTheme: (theme: any) => {}
});

export default SettingContext;
