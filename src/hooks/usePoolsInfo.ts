import { useEffect, useState } from 'react'
import { useFaasPoolCreatorContract } from './useContract'

const usePoolsInfo = () => {
	const poolCreatorContract = useFaasPoolCreatorContract()
	const [pools, setPools] = useState([])
	const getPools = async () => {
		try {
			const poolNumberWei = await poolCreatorContract.poolNumber()
			const poolNumber = parseInt(poolNumberWei, 16)
			const poolsTemp = []
			for (let i = 0; i < poolNumber; i++) {
				const poolAddress = await poolCreatorContract.poolAddress(i)
				poolsTemp.push({
					poolAddress
				})
			}
			setPools(poolsTemp)
		}	catch(err) {
			console.log(err)
		}    
	}

	useEffect(() => {
		if (pools.length === 0) {
			getPools()	
		}		
	})
  
	return { pools, getPools }
  }
  
  export default usePoolsInfo