import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Token} from 'bscportal-lib/src'
import { formatEther, parseEther } from '@ethersproject/units'
import { useActiveWeb3React } from 'hooks'
import { useFaasPoolCreatorContract, useTokenContract } from '../../hooks/useContract'
import { useSingleCallResult } from '../../state/multicall/hooks'
import { FAAS_POOL_CREATOR_ADDRESS } from '../../constants'


const TextInput = styled.input`
`

const CreateButton = styled.button`

`

// const useTokenAllowance = ({ contract, spender }) => {

// }

const ApproveModal = ({ rewardTokenAddress, rewardTokenAmount }) => {
  const { account, library } = useActiveWeb3React()
  const rewardTokenContract = useTokenContract(rewardTokenAddress)  
  const allowanceWei = useSingleCallResult(rewardTokenContract, 'allowance', [account, FAAS_POOL_CREATOR_ADDRESS]).result
  if (allowanceWei) {
      console.log(formatEther(allowanceWei[0]._hex))
      rewardTokenContract.approve(FAAS_POOL_CREATOR_ADDRESS, parseEther(rewardTokenAmount))
  }
  return (
    <div>
      {rewardTokenAddress}portal
    </div>
  )
}

// async function onCreate () {
//   const poolCreatorContract = useFaasPoolCreatorContract()
// }
export default function Pool() {
  const poolCreatorContract = useFaasPoolCreatorContract()
  const [poolInfoReady, setPoolInfoReady] = useState(false)
  const [rewardTokenAddress, setRewardTokenAddress] = useState('')
  const [rewardTokenAmount, setRewardTokenAmount] = useState('')
  // console.log(poolCreatorContract)
  // const poolNumber = useSingleCallResult(poolCreatorContract, 'poolNumber').result
  // if (poolNumber) {
  //   console.log(poolNumber[0]._hex)
  //   console.log(formatEther(poolNumber[0]._hex))
  // }

  useEffect(() => {
    // const getBalance = async () => {
    //   if (!account) {
    //     return
    //   }
    //   const balance = await library?.getBalance(account)
      
    //   console.log(balance)
    // }
    // getBalance()
    // onCreate()
  })
  return (
    <>
      <div>Faas</div>
      {!poolInfoReady && (
        <>
          <TextInput placeholder='Token A address' type='text'/>
          <TextInput placeholder='Token B address' type='text'/>
          <TextInput placeholder='Reward token address' type='text' value={rewardTokenAddress} onChange={(e) => setRewardTokenAddress(e.target.value)}/>
          <TextInput placeholder='Reward amount' type='number' value={rewardTokenAmount} onChange={(e) => setRewardTokenAmount(e.target.value)}/>
          <TextInput placeholder='Duration of staking' type='number'/>
          <TextInput placeholder='Start time' type='number'/>
          <CreateButton onClick={() => setPoolInfoReady(true)}>Create Pool</CreateButton>
        </>
      )}
      {poolInfoReady && (
        <>
          <ApproveModal rewardTokenAddress={rewardTokenAddress} rewardTokenAmount={rewardTokenAmount} />
        </>
      )}
    </>
  )
}




