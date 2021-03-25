import { useState } from 'react'
import { formatEther, parseEther } from '@ethersproject/units'
import { useActiveWeb3React } from 'hooks'
import { useFaasPoolCreatorContract, useTokenContract } from './useContract'
import { FAAS_POOL_CREATOR_ADDRESS } from '../constants'

const usePoolCreator = ({ tokenA, tokenB, rewardTokenAddress, rewardTokenAmount, stakingDuration, startTime }) => {
	const { account } = useActiveWeb3React()
	const rewardTokenContract = useTokenContract(rewardTokenAddress)  
	const poolCreatorContract = useFaasPoolCreatorContract()
	const [isApproved, setIsApproved] = useState(false)
	const [isCreated, setIsCreated] = useState(false)
	const checkAllowance = async () => {
	  try {
		const allowanceWei = await rewardTokenContract.allowance(account, FAAS_POOL_CREATOR_ADDRESS)
		const allowanceEth = formatEther(allowanceWei)
		if (allowanceEth >= rewardTokenAmount) {
		  setIsApproved(true)
		}
	  } catch (err) {
		console.log(err)
	  }
	}
  
	const approve = async () => {
	  try {
		const approvePromise = await rewardTokenContract.approve(FAAS_POOL_CREATOR_ADDRESS, parseEther(rewardTokenAmount))
		await approvePromise.wait(1)
		setIsApproved(true)
	  } catch (err) {
		console.log(err)
	  }
	}
  
	const createPool = async () => {
	  try {
		if (isApproved) {
		  const createPoolPromise = await poolCreatorContract.createNewPool(tokenA, tokenB, rewardTokenAddress, parseEther(rewardTokenAmount), stakingDuration, startTime)
		  await createPoolPromise.wait(1)
		  setIsCreated(true)
		}
	  } catch (err) {
		console.log(err)
	  }
	}

  
	return { isApproved, isCreated, approve, createPool, checkAllowance }
  }
  
  export default usePoolCreator