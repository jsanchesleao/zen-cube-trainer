import styled from "styled-components"
import Button from "../base/button"
import { TrainerQuestion } from "./trainer.types"

const StyledGrid = styled.div`
  display: grid;
  gap: 1rem;
  place-self: center;
  width: 100%;
  height: 100%;
  max-width: 25rem;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 4rem 1fr 10rem 5rem;
  padding: 1rem;
`

const StyledText = styled.p`
  place-self: center;
  text-align: center;
  font-size: var(--font-size-xl);
`

export type TrainerShowingQuestionProps = {
  question: TrainerQuestion,
  onFinish: () => void,
  onSuccessEasy: () => void,
  onSuccessHard: () => void,
  onFail: () => void,
  onShowDetails: () => void,
}

export function TrainerShowingQuestion(props: TrainerShowingQuestionProps) {
  
  return (
    <StyledGrid>
      <Button onClick={props.onFinish}>Finish</Button>
      <Button onClick={props.onShowDetails}>Details</Button>
      <StyledText className="colspan-2">{props.question.case.setup}</StyledText>
      <Button data-variant="success" className="colspan-2" onClick={props.onSuccessEasy}>Easy</Button>
      <Button data-variant="warning" onClick={props.onSuccessHard}>Hard</Button>
      <Button data-variant="danger" onClick={props.onFail}>Failed</Button>
    </StyledGrid>
  )
}