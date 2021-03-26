/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import styled from 'styled-components'
import usePoolsInfo from 'hooks/usePoolsInfo'
import usePoolInfo from 'hooks/usePoolInfo'
import usePool from 'hooks/usePool'


const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  height: 250px;
  margin-top: 10px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
  &:nth-child(n + 1) {
    margin-left: 20px;
  }
  border-radius: 32px;
`

const EmptyCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 250px;
  margin-top: 10px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
  &:nth-child(n + 1) {
    margin-left: 20px;
  }
  border-radius: 32px;
`

const Input = styled.input`
  outline: none;
  border-radius: 16px;
  padding: 10px 15px 10px 15px;
  max-width: 175px;
  font-size: 18px;
`

const Button = styled.button`
  width: max-content;
  min-width: 100px;
  padding: 5px;
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

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
`

const Subtitle = styled.p`
  font-size: 20px;
  font-weight: 500;
`

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
`

const SmallText = styled.p`
  font-size: 16px;
  font-weight: 400;
`

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FlexRightDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Link = styled.a`
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
`

const ModalCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 350px;
  height: 250px;
  z-index: 100;
  border: 1px solid black;
  background-color: white;
  border-radius: 32px;
  padding: 20px;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #000000D1;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Spinner = styled.div`
  height: 60px;
	min-width: 32px;
	min-height: 32px;
  background-position: center;
	background-repeat: no-repeat;
	background-image: url(data:image/gif;base64,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);
`

const LoadingWrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Close = styled.p`
  font-size: 26px;
  cursor: pointer;
  color: #000000A7;
  &:hover {
    color: #000000;
  }
  padding-bottom: 6px;
`

const Modal = ({ tokenASymbol, tokenBSymbol, modalAmount,  depositedAmount, modalType, lpAvailable, setModalAmount, stake, withdraw, setModalType }) => {
  return (
    <>
      <ModalOverlay>
        <ModalCenter>
          <FlexDiv>
            <Subtitle>{modalType === 'stake' ? `Stake ${tokenASymbol} - ${tokenBSymbol} LP` : `Withdraw ${tokenASymbol} - ${tokenBSymbol} LP`}</Subtitle>
            <Close onClick={() => setModalType('')}>x</Close>
          </FlexDiv>
          <FlexRightDiv>
            <SmallText>{`${modalType === 'stake' ? lpAvailable : depositedAmount} available`}</SmallText>
          </FlexRightDiv>
          <FlexDiv>
            <Input type='text' placeholder='0' value={modalAmount} onChange={(e) => setModalAmount(e.target.value)}/>
            <Button onClick={modalType === 'stake' ? () => setModalAmount(lpAvailable) : () => setModalAmount(depositedAmount)}>Max</Button>
          </FlexDiv>
          <FlexDiv>
            <Button onClick={() => setModalType('')}>Cancel</Button>
            <Button onClick={modalType === 'stake' ? () => stake(modalAmount) : () => withdraw(modalAmount)}>Confirm</Button>
          </FlexDiv>
        </ModalCenter>
      </ModalOverlay>
    </>
  )
}

const PoolCard = (props) => {
  const { poolAddress, tokenAAddress, tokenBAddress, lpAddress, rewardAddress } = props
  const { tokenASymbol, tokenBSymbol, rewardSymbol, isApproved, modalAmount, earnedAmount, depositedAmount, modalType, lpAvailable, 
    setModalAmount, approve, stake, withdraw, claim, setModalType } = usePool({ poolAddress, tokenAAddress, tokenBAddress, lpAddress, rewardAddress })
  if (tokenASymbol && tokenBSymbol && rewardSymbol && isApproved) {
    console.log(props)
  }
  if (!tokenASymbol) {
    return (
      <EmptyCard>
        <Spinner />
      </EmptyCard>
    )
  }
  return (
    <>
      <Card>
        <FlexDiv>
          <Title>{`${tokenASymbol} - ${tokenBSymbol}`}</Title>
          <Link href={`https://testnet.bscscan.com/address/${poolAddress}`} target='_blank'>(BSCScan)</Link>
        </FlexDiv>
        <FlexDiv>
          <Text>APR: </Text>
          <Subtitle>n/a</Subtitle>
        </FlexDiv> 
        <FlexDiv>
          <Text>Earn: </Text>
          <Subtitle>{rewardSymbol}</Subtitle>
        </FlexDiv> 
        <FlexDiv>
          <Text>Earned: </Text>
          <Subtitle>{earnedAmount}</Subtitle>
        </FlexDiv> 
        <FlexDiv>
          <Text>Staked LP: </Text>
          <Subtitle>{depositedAmount}</Subtitle>
        </FlexDiv> 
        {!isApproved && <Button onClick={approve}>Approve</Button> }
        {isApproved && (
          <>
            <FlexDiv>
              <Button onClick={() => setModalType('stake')}>+</Button>
              <Button onClick={() => setModalType('withdraw')}>-</Button>
              <Button onClick={claim}>Claim</Button>
            </FlexDiv>
          </>
        )}
      </Card>
      {modalType && <Modal tokenASymbol={tokenASymbol} tokenBSymbol={tokenBSymbol}  modalAmount={modalAmount} depositedAmount={depositedAmount}  modalType={modalType}  lpAvailable={lpAvailable}  
        setModalAmount={setModalAmount}  stake={stake} withdraw={withdraw} setModalType={setModalType} />}
    </>

  )
}

const PoolCardWrap = ({ poolAddress, index } )=> {
  const props = usePoolInfo({ poolAddress })
  const { tokenAAddress, tokenBAddress, lpAddress, rewardAddress } = props

  return (
    <PoolCard poolAddress={poolAddress} tokenAAddress={tokenAAddress} tokenBAddress={tokenBAddress} lpAddress={lpAddress} rewardAddress={rewardAddress} index={index} />
  )
}

const renderPoolCards = (pools) => {
  if (pools.length === 0) {
    return (
      <LoadingWrap>
        <Subtitle>Loading farms...</Subtitle>
        <Spinner />
      </LoadingWrap>
    ) 
  }
  return pools.map(({ poolAddress }, index) => {
    return <PoolCardWrap poolAddress={poolAddress} key={poolAddress} index={index}/>
  })
}

export default function Pool() {
  const { pools } = usePoolsInfo()
  return (
    <>
      <H1>Farms</H1>
      <Cards>
        {renderPoolCards(pools)}
      </Cards>
    </>
  )
}




