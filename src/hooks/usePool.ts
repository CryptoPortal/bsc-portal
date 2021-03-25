import { useEffect, useState } from 'react'
import { parseEther } from '@ethersproject/units'
import { MaxUint256 } from '@ethersproject/constants'
import { calculateGasMargin } from 'utils'
import { useActiveWeb3React } from 'hooks'
import Web3Utils from 'web3-utils'
import { useFaasPoolContract, useTokenContract } from './useContract'

const usePool = ({ poolAddress, tokenAAddress, tokenBAddress, lpAddress, rewardAddress }) => {
	const { account } = useActiveWeb3React()
	const poolContract = useFaasPoolContract(poolAddress)
	const lpContract = useTokenContract(lpAddress)
	const tokenAContract = useTokenContract(tokenAAddress)
	const tokenBContract = useTokenContract(tokenBAddress)
	const rewardContract = useTokenContract(rewardAddress)
	const [isApproved, setIsApproved] = useState(false)
	const [initialized, setInitialized] = useState(false)
	const [tokenASymbol, setTokenASymbol] = useState('')
	const [tokenBSymbol, setTokenBSymbol] = useState('')
	const [rewardSymbol, setRewardSymbol] = useState('')
	const [modalAmount, setModalAmount] = useState('')
	const [lpAvailable, setLpAvailable] = useState('')
	const [earnedAmount, setEarnedAmount] = useState('')
	const [depositedAmount, setDepositedAmount] = useState('')
	const [modalType, setModalType] = useState('')

	const initialize = async () => {
		try {
				const allowanceResult = await lpContract.allowance(account, poolAddress)
				const allowance = parseInt(allowanceResult._hex, 16)
				const earnedResult = await poolContract.earned(account)
				const depositedResult = await poolContract.balanceOfInternal(account)
				const lpAvailableResult = await lpContract.balanceOf(account)
				const symbolA = await tokenAContract.symbol()
				const symbolB = await tokenBContract.symbol()
				const symbolR = await rewardContract.symbol()
				setLpAvailable(parseFloat(Web3Utils.fromWei(lpAvailableResult._hex)).toFixed(4))
				setEarnedAmount(parseFloat(Web3Utils.fromWei(earnedResult._hex)).toFixed(4))
				setDepositedAmount(parseFloat(Web3Utils.fromWei(depositedResult._hex)).toFixed(4))
				setTokenASymbol(symbolA)
				setTokenBSymbol(symbolB)
				setRewardSymbol(symbolR)
				if (allowance !== 0) {
					setIsApproved(true)
				}
				setInitialized(true)
		} catch (err) {
			console.log('err')
		}
	}

	const approve = async () => {
		try {
			const estimatedGas = await lpContract.estimateGas.approve(poolAddress, MaxUint256)
			console.log(estimatedGas)
			const approvePromise = await lpContract.approve(poolAddress, MaxUint256, 
				{ gasLimit: calculateGasMargin(estimatedGas), gasPrice: parseEther('0.00000003') } )
			await approvePromise.wait(1)
			setIsApproved(true)
		} catch(err) {
			console.log(err)
		}
	}

	const stake = (amount) => {
		try {
			poolContract.stake(Web3Utils.toWei(amount))
		} catch(err) {
			console.log(err)
		}
	}

	const withdraw = (amount) => {
		try {
			poolContract.withdraw(Web3Utils.toWei(amount))
		} catch(err) {
			console.log(err)
		}
	}

	const claim = () => {
		try {
			poolContract.getReward()
		} catch(err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if (!initialized) {
			initialize()
		}
	})


  
	return { tokenASymbol, tokenBSymbol, rewardSymbol, isApproved, modalAmount, earnedAmount, depositedAmount, modalType, lpAvailable, approve, stake, withdraw, claim, setModalAmount, setModalType }
  }
  
  export default usePool