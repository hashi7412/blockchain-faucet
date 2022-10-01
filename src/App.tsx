import React from 'react'; 
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./neon.scss";

import useStore, {now} from './useStore';


import Home from './Pages/Home'; 
import Loading from './components/Loading';

function App() {
	const {loading} = useStore();
	return (
		<BrowserRouter>
			<Switch>
				<Route path="*" component = {Home}></Route>
			</Switch>
			<ToastContainer />
			{loading && <Loading type="bars" width={100} height={100} color={"#c2ab81"} opacity={0.4}/>}
		</BrowserRouter>
	)
}

export default App;
