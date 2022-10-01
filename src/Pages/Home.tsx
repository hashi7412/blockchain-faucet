import React  from 'react';
import useStore, { deamApiKey, deamAppId } from '../useStore';
import Deamtest from 'deamtest-react';
import Success from '../components/Success';

interface HomeStatus {
	loading:		boolean
	showDrop:		boolean
	success:		boolean

	addressError: 	number
	captchaError:	number
	error:			number

	chain:			string
	address:		string
	token:			string
} 

interface HomeProps {
	onClose: Function
} 

const chains = {
	neon:{icon:'logo', label: 'Neon Testnet Coin'},
}

const Home = ({}: HomeProps) => {
	const {T, call, update, getError} = useStore()
	const [status, setStatus] = React.useState<HomeStatus>({
		showDrop:		false,
		loading:		false,
		success:		false,

		addressError: 	0,
		captchaError:	0,
		error:			0,

		chain:			'neon',
		address:		'',
		token:			''
	})

	const set = (attrs:Partial<HomeStatus>) => setStatus({ ...status, ...attrs })
	const addressRef = React.useRef<HTMLInputElement>(null)
	const submit = async () => {
		const { chain, address, token } = status
		if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
			set({ addressError:10001 })
			addressRef.current?.select()
			addressRef.current?.focus()
			return
		}
		if (token==='') {
			set({ captchaError:10002 })
			return
		}
		update({loading:true})
		const response = await call({
			jsonrpc: "2.0",
			method: 'faucet',
			params: [chain, address, token],
			id: 1
		})
		if (response?.result===true) {
			set({ success:true })
		} else {
			set({ error: response?.error})
		}
		update({loading:false})
	}

	return (
		<>
			<div className='bg'>
				<div></div>
				<div></div>
				<div></div>
				<div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div></div>
			</div>
			<main>
				<section>
					<h1>{T('app.title')}</h1>
					<p className="desc">{T('app.desc')}</p>
					{ status.success ? (
						<div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', paddingTop:100}} className='mt5 mb5'>
							<Success />
							<h3 style={{ marginTop: 50 }}>{T('faucet.success.1')}</h3>
							<p>{T('faucet.success.2')}</p>
						</div>
					) : (
						<div className='form'>
							<div className="network">
								<label><p>Network</p>
									<div style={{position:'relative'}}>
										<input type="text" readOnly className={status.showDrop ? ' folddown' : ''}
											onFocus={()=>set({ showDrop:true })} 
											onClick={()=>set({ showDrop:true })} 
											onBlur={()=>setTimeout(()=>set({ showDrop:false}), 200)} 
											value={chains[status.chain].label} />
										
										<div className="drop" style={{display: status.showDrop?'' : 'none'}}>
											<ul>
												{Object.keys(chains).map((k)=>(
													<li key={k} onClick={()=>set({ chain:k })}>
														<img src={`/${chains[k].icon}.svg`} loading="lazy" alt={k} />
														<span>{chains[k].label}</span>
													</li>
												))}
											</ul>
										</div>
										<div className="icon">
											<img src={`/${chains[status.chain].icon}.svg`} width="20" height="20" alt="icon" />
										</div>
									</div>
								</label>
							</div>
							<div className="address">
								<label><p style={{ color:status.addressError ? 'red' : '' }}>{ status.addressError!==0 ? getError(status.addressError) : 'Testnet account address' }</p>
									<input ref={addressRef} value={status.address} onChange={e=>set({addressError:0, address:e.target.value})} minLength={42} maxLength={42} placeholder="Please input your address" />
								</label>
							</div>
							<div style={{ maxWidth:300 }}>
								<label><p style={{ color:status.captchaError ? 'red' : '' }}>{ status.captchaError!==0 ? getError(status.captchaError) : 'Verify Captcha' }</p>
									<Deamtest appId={deamAppId} apiKey={deamApiKey} onVerify={token=>set({captchaError:0, token})} />
								</label>
							</div>
							<div>
								<button onClick={submit}>
									Submit
								</button>
							</div>
							{status.error!==0 && <div style={{color: 'red'}}>{getError(status.error)}</div> }
						</div>
					) }
					
				</section>
			</main>
			<footer>
			</footer>
		</>
	)
}

export default Home;