import { createSlice } from '@reduxjs/toolkit';

const appKey = process.env.REACT_APP_GTAG + '-config'

const lang = window.localStorage.getItem('lang') || 'en-US';

const initialState: WalletTypes = {
	lang,
	loading: false
}

const getStore = (initialState:any) => {
	try {
		const buf = window.localStorage.getItem(appKey)
		if (buf) {
			const json = JSON.parse(buf)
			for(let k in json) {
				if (initialState[k] !== undefined) {
					initialState[k] = json[k]
				}
			}
		}
	} catch (err) {
		console.log(err)
	}
	return initialState
}

const setStore = (state:any) => {
	window.localStorage.setItem(appKey, JSON.stringify(state))
}

export default createSlice({
	name: 'faucet',
	initialState: getStore(initialState),
	reducers: {
		update: (state:any, action) => {
			for (const k in action.payload) {
				if (state[k]  ===  undefined) new Error('🦊 undefined account item')
				state[k] = action.payload[k]
			}
			setStore(state)
		}
	}
})