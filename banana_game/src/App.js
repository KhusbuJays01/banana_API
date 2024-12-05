import { useEffect } from 'react'
//router
// import IndexRouters from "./router/index"

//scss
import "shepherd.js/dist/css/shepherd.css";
import "flatpickr/dist/flatpickr.css";
import 'choices.js/public/assets/styles/choices.min.css'
import "./assets/scss/hope-ui.scss"
import "./assets/scss/pro.scss"
import "./assets/scss/custom.scss"
import "./assets/scss/dark.scss"
import "./assets/scss/rtl.scss"
import "./assets/scss/customizer.scss"
import "./assets/custom/scss/custom.scss"

// Redux Selector / Action
import { useDispatch } from 'react-redux';

// import state selectors
import { setSetting } from './store/setting/actions'
import { ContextProvider } from './context/ContextProvider';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

function App() {

  return (
    <ContextProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ContextProvider>
  );
}

export default App;
