import { useEffect, useState } from 'react'
import { useFaasPoolContract, useFactoryContract } from './useContract'

const usePoolInfo = ({ poolAddress }) => {
	const poolContract = useFaasPoolContract(poolAddress)
	const factoryContract = useFactoryContract()
	const [initialized, setInitialized] = useState(false)
	const [tokenAAddress, setTokenAAddress] = useState('')
	const [tokenBAddress, setTokenBAddress] = useState('')
	const [lpAddress, setLPAddress] = useState('')
	const [rewardAddress, setRewardAddress] = useState('')
	const initialize = async () => {
		try {
				const pairResult = await poolContract.getPair()
				const sngResult = await poolContract.sng()
				const lp = await factoryContract.getPair(pairResult[0], pairResult[1])
				setTokenAAddress(pairResult[0])
				setTokenBAddress(pairResult[1])
				setLPAddress(lp)
				setInitialized(true)
				setRewardAddress(sngResult)
		} catch (err) {
			console.log('err pool info')
		}
	}

	useEffect(() => {
		if (!initialized) {
			initialize()
		}
	})


  
	return { tokenAAddress, tokenBAddress, lpAddress, rewardAddress }
  }
  
  export default usePoolInfo