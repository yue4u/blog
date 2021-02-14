import React, { useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 3rem auto;
`

const Row = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 3rem;
  &:not(:last-child)::after {
    content: "⇩";
    position: absolute;
    left: 11%;
    color: #555;
    top: calc(100% + 10px);
    font-size: 2rem;
  }
`

const Role = styled.div`
  width: 20%;
  padding: 1rem;
  text-align: center;
  position: relative;
  display: grid;
  align-items: center;
  border: 1px solid #ffc107;
  border-radius: 1rem;
`

const Income = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  align-items: center;
  padding: 1rem;
`
const Input = styled.input`
  padding: 0;
  font-size: 1.2rem;
  text-align: center;
  width: fit-content;
  width: 2.5rem;
  border-radius: 3px;
  margin: 0 15px;
  background-color: #555;
  color: #fff;
  box-shadow: 0 0 5px #000;
  border: 0;
`
const Fee = styled.div`
  width: 100%;
`
const Money = styled.span`
  width: 100%;
  display: block;
  font-size: 1.2rem;
  background-image: linear-gradient(-40deg, #ffc107 47%, #ff8a65);
  color: #000;
  border-radius: 10px;
  padding: 0 10px;
  box-shadow: 0 0 5px #000;
  margin: 0 10px;
  text-align: center;
  ${Input} {
    box-shadow: 0 0 10px #fff;
  }
  ::after {
    content: " 億円";
  }
`

export default function BusinessModel() {
  const [ticketIncome, setTicketIncome] = useState("20")
  const [cinemaPercentage, setCinemaPercentage] = useState("50")
  const [paFee, setPaFee] = useState("3")
  const [distributorPercentage, setDistributorPercentage] = useState("20")

  const n = (s: string) => {
    const f = parseFloat(s)
    return isNaN(f) ? 0 : f
  }
  const round = (num: number) => Math.round(num) / 100
  const ticketIncomeNumber = n(ticketIncome)
  const cinemaPercentageNumber = n(cinemaPercentage)
  const paFeeNumber = n(paFee)
  const distributorPercentageNumber = n(distributorPercentage)
  const cinemaIncome = round(ticketIncomeNumber * cinemaPercentageNumber)

  const distributorIncome = round(
    (ticketIncomeNumber - cinemaIncome - paFeeNumber) *
      distributorPercentageNumber
  )

  const productionCommitteeIncome =
    ticketIncomeNumber - cinemaIncome - paFeeNumber - distributorIncome

  return (
    <Wrapper>
      <Row>
        <Money>
          チケット代収入
          <Input
            value={ticketIncome}
            onChange={(e) => setTicketIncome(e.target.value)}
          />
        </Money>
      </Row>
      <Row>
        <Role>映画館</Role>
        <Income>
          <Fee>
            映画館分配:
            <Input
              value={cinemaPercentage}
              onChange={(e) => setCinemaPercentage(e.target.value)}
            />
            % <br /> 映画館収入 = (チケット代収入 * 映画館分配)
          </Fee>
          <Money>収入 {cinemaIncome}</Money>
        </Income>
      </Row>
      <Row>
        <Role>配給会社</Role>
        <Income>
          <Fee>
            P&A費:{" "}
            <Input value={paFee} onChange={(e) => setPaFee(e.target.value)} />
            億円
            <br />
            配給手数料:{" "}
            <Input
              value={distributorPercentage}
              onChange={(e) => setDistributorPercentage(e.target.value)}
            />
            %
          </Fee>
          配給会社収入 = (チケット代収入 - 映画館収入 - P&A費) * 配給手数料%
          <Money>収入 {distributorIncome}</Money>
        </Income>
      </Row>
      <Row>
        <Role>製作委員会</Role>
        <Income>
          製作委員会収入 = チケット代収入 - 映画館収入 - P&A費 - 配給会社収入
          <Money>収入 {productionCommitteeIncome}</Money>
        </Income>
      </Row>
    </Wrapper>
  )
}
