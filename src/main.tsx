import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '@/store/index'
// import { PersistGate } from 'redux-persist/integration/react'
import 'antd/dist/antd.css';
import './styles/scrollBar.css'
import 'react-quill/dist/quill.snow.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
)
