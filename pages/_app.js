import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/Landingpage.css'
import '../styles/auth.css'
import '../styles/main.css'
import {Provider} from 'react-redux'
import { store } from '../redux/store'; 

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
