import React, { useState } from 'react'
import styled from 'styled-components'
import usePoolCreator from '../../hooks/usePoolCreator'

const Input = styled.input`
  outline: none;
  border-radius: 16px;
  padding: 10px 15px 10px 15px;
  max-width: 250px;
  font-size: 18px;
  margin-top: 10px;
  border: 1px solid black;
`

const Inputs = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  z-index: 100;
  border: 1px solid black;
  background-color: white;
  border-radius: 32px;
  padding: 20px;
`

const Row = styled.div`
  margin-top: 20px;
`

const Button = styled.button`
  width: 150px;
  padding: 7.5px;
  cursor: pointer;
  border-radius: 16px;
  border: none;
  background-color: lightgray;
  &:hover {
    background-color: gray;
  }
  font-size: 18px;
`

const H1 = styled.h1`
  font-size: 40px;
`

const FlexDiv = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
`

const SmallText = styled.p`
  font-size: 16px;
  font-weight: 400;
`

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  z-index: 100;
  border: 1px solid black;
  background-color: white;
  border-radius: 32px;
  padding: 20px;
  padding-top: 30px;
`

const ApproveCreateButtons =  ({ tokenA, tokenB, rewardTokenAddress, rewardTokenAmount, stakingDuration, startTime }) => {
  const { isApproved, isCreated, createPool, approve } = usePoolCreator({ tokenA, tokenB, rewardTokenAddress, rewardTokenAmount, stakingDuration, startTime })
  return (
      <Buttons>
        
        {!isApproved && (
          <>
            <Button onClick={approve}>Approve</Button>
            <Row>
              <SmallText>Step 2 / 3</SmallText>
            </Row>
          </>
        )}
        {isApproved && !isCreated && (
          <>
            <Button onClick={createPool}>Create Pool</Button>
            <Row>
              <SmallText>Step 3 / 3</SmallText>
            </Row>
          </>
        )}
        {isCreated && (
          <>
            <Text>Success!</Text>
          </>
        )}
      </Buttons>
  )
}


export default function Pool() {

  const [tokenA, setTokenA] = useState('')
  const [tokenB, setTokenB] = useState('')
  const [rewardTokenAddress, setRewardTokenAddress] = useState('')
  const [rewardTokenAmount, setRewardTokenAmount] = useState('')
  const [stakingDuration, setStakingDuration] = useState('')
  const [startTime, setStartTime] = useState('')
  const [poolInfoReady, setPoolInfoReady] = useState(false)
  // const date = new Date(Date.now())
  // console.log(Math.floor(date.getTime()/ 1000))
  // 0xdF5f5b7aA8546Ec6C480f6Ac1D684E317151d400
  // 0xDC573Aa094D9c7B10f0c70fb4060844a8Abab872
  return (
    <>
      <H1>Create Farm</H1>
      {!poolInfoReady && (
        <Inputs>
          <FlexDiv>
            <Text>Token A:</Text>
            <Input placeholder='Token A address' type='text' value={tokenA} onChange={(e) => setTokenA(e.target.value)}/>
          </FlexDiv>
          <FlexDiv>
            <Text>Token B:</Text>
            <Input placeholder='Token B address' type='text' value={tokenB} onChange={(e) => setTokenB(e.target.value)}/>
          </FlexDiv>
          <FlexDiv>
            <Text>Reward token:</Text>
            <Input placeholder='Reward token address' type='text' value={rewardTokenAddress} onChange={(e) => setRewardTokenAddress(e.target.value)}/>
          </FlexDiv>
          <FlexDiv>
            <Text>Reward amount:</Text>
            <Input placeholder='Reward amount' type='text' value={rewardTokenAmount} onChange={(e) => setRewardTokenAmount(e.target.value)}/>
          </FlexDiv>
          <FlexDiv>
            <Text>Staking duration:</Text>
            <Input placeholder='Staking duration in sec' type='text' value={stakingDuration} onChange={(e) => setStakingDuration(e.target.value)}/>
          </FlexDiv>
          <FlexDiv>
            <Text>Start time:</Text>
            <Input placeholder='Start time in sec' type='text' value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
          </FlexDiv>
          <Row>
            <Button onClick={() => setPoolInfoReady(true)}>Create Farm</Button>
          </Row>
          <Row>
            <SmallText>Step 1 / 3</SmallText>
          </Row>
        </Inputs>
      )}
      {poolInfoReady && (
        <ApproveCreateButtons 
          tokenA={tokenA}
          tokenB={tokenB}
          rewardTokenAddress={rewardTokenAddress} 
          rewardTokenAmount={rewardTokenAmount}
          stakingDuration={parseInt(stakingDuration)}
          startTime={parseInt(startTime)}  
          // tokenA='0xdF5f5b7aA8546Ec6C480f6Ac1D684E317151d400'
          // tokenB='0xDC573Aa094D9c7B10f0c70fb4060844a8Abab872'
          // rewardTokenAddress='0xdF5f5b7aA8546Ec6C480f6Ac1D684E317151d400' 
          // rewardTokenAmount='24'
          // stakingDuration={86400}
          // startTime={1616701194}  
        />
      )}
    </>
  )
}





