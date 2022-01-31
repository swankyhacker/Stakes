import React from "react";
import { DAppProvider, Kovan } from "@usedapp/core";

import { Main } from "./components/main";

function App() {
  return (
    <DAppProvider
      config={{
        networks: [Kovan],
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000,
        },
      }}
    >
      <Main />
    </DAppProvider>
  );
}

export default App;
