import styled from "styled-components"
import Button from "../base/button"
import olls from "../../data/oll"
import plls from "../../data/pll"
import { CFOPCase } from "../../model/CFOP"

const Wrapper = styled.div`
  width: 20rem;
  margin: auto;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 6rem 6rem 1fr;
  gap: 1rem;
`

export type TrainerNotStartedProps = {
  onBegin: (trainingSet: CFOPCase[]) => void
}

export function TrainerNotStarted(props: TrainerNotStartedProps) {
  return (
    <Wrapper>
      <Button className="row-2" onClick={() => props.onBegin(olls)}>Begin OLL</Button>
      <Button className="row-3" onClick={() => props.onBegin(plls)}>Begin PLL</Button>
    </Wrapper>
  )
}