import "./App.css";
import AuthVerify from "./providers/AuthVerify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import Router from "./Router/Router";
import { SweetAlertProvider } from "./providers/SweetAlert.Provider";
import ToastProvider from "./providers/ToasProvider";

function App() {
  return (
    <SweetAlertProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthVerify>
            <ToastProvider>
              <Router />
            </ToastProvider>
          </AuthVerify>
        </PersistGate>
      </Provider>
    </SweetAlertProvider>
  );
}

export default App;
