import React from 'react'
import { useSelector, useDispatch}	from 'react-redux';
import enUS from './locales/en-US.json'


import Slice 						from './reducer'

export const deamAppId = Number(process.env.REACT_APP_DEAM_ID || 0)
export const deamApiKey = process.env.REACT_APP_DEAM_KEY || ''

export const now = () => Math.round(new Date().getTime()/1000)
const proxy = process.env.REACT_APP_PROXY || ''
const secret = process.env.REACT_APP_SECRET || ''

export const TF = (time:number,offset:number=2) => {
    let iOffset = Number(offset);
	let date = time === undefined ? new Date(Date.now()*1000 + (3600000 * iOffset)) : (typeof time === 'number'?new Date(time*1000 + (3600000 * iOffset)):new Date(+time + (3600000 * iOffset)));
	let y=date.getUTCFullYear();
	let m=date.getUTCMonth() + 1;
	let d=date.getUTCDate();
	let hh=date.getUTCHours();
	let mm=date.getUTCMinutes();
	let ss=date.getUTCSeconds();
	let dt=("0" + m).slice(-2) + "-" + ("0" + d).slice(-2);
	let tt=("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2) + ":" + ("0" + ss).slice(-2);
    return y+'-'+dt+' '+tt;
}
export const NF = (num:number,p:number=2) => num.toLocaleString('en', {maximumFractionDigits:p});
export const validateEmail = (email:string):boolean =>email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
export const validateUsername = (username:string):boolean => /^[a-zA-Z0-9]{3,20}$/.test(username);
export const toHex = (buf:ArrayBuffer) => Array.from(new Uint8Array(buf)).map(n => n.toString(16).padStart(2, "0")).join("");

const locales = {
    "en-US": enUS,
};

export const hmac256 = async (message) => {
	const CryptoJS = window['CryptoJS'];
	const buf = CryptoJS.HmacSHA256(message, secret);
	return CryptoJS.enc.Hex.stringify(buf)
}

const useStore = () => {
	const G = useSelector((state:WalletTypes)=>state)
	const L = locales[G.lang]
	const dispatch = useDispatch()
	const update = (payload:{[key:string]:any}) => dispatch(Slice.actions.update(payload))
	const getError = (code:number, args?:{[key:string]:string|number}|string|number) => T("error."+code, args)
	const T = (key:string, args?:{[key:string]:string|number}|string|number):string => {
		let text = L[key]
		if (text === undefined) throw new Error('Undefined lang key[' + key + ']')
		if (typeof args === 'string' || typeof args === 'number') {
			text = text.replace(/\{\w+\}/, String(args))
		} else {
			for(let k in args) text = text.replace(new RegExp('{'+k+'}', 'g'), String(args[k]))
		}
		return text
	}

	const call = async (params):Promise<ServerResponse|null> => { 
		try {
			const result = await fetch(proxy, { method: 'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(params)});
			return await result.json();
		} catch (error) {
			console.log(error)
			update({loading: false})
		}
		return null
	}
	return { ...G, T, update, call, getError };
}

export default useStore