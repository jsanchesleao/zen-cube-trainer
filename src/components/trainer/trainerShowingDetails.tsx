import styled from "styled-components";
import Button from "../base/button";
import { TrainerQuestion } from "./trainer.types";

const StyledGrid = styled.div`
  display: grid;
  grid-template-rows: 3rem 2fr 1fr 6rem;
  padding: 1rem;
  gap: 1rem;
  margin: auto;
  height: 90%;
  width: 100%;
  max-width: 25rem;
`

const StyledHeading = styled.h2`
  text-align: center;
`

const StyledSubHeading = styled.h3`
  text-align: center;
  text-transform: capitalize;
`

const StyledFigure = styled.figure`
  place-self: center;
  width: 80%;
  text-align: center;
  img {
    width: 90%;
  }
`

const StyledSolutionWrapper = styled.div`
  text-align: center;
  h3 {
    margin: var(--margin-sm);
  }
  p {
    font-size: var(--font-size-xl);
  }
`

export type TrainerShowingDetailsProps = {
  question: TrainerQuestion,
  onClose: () => void
}

export function TrainerShowingDetails(props: TrainerShowingDetailsProps) {
  return (
    <StyledGrid>
      <header>
        <StyledHeading>{props.question.case.id}</StyledHeading>
        <StyledSubHeading>{props.question.case.name}</StyledSubHeading>
      </header>
      <StyledFigure>
        <img src={props.question.case.image} alt="oll" />
      </StyledFigure>
      <StyledSolutionWrapper>
        <h3>Solution</h3>
        <p>{props.question.case.solution}</p>
      </StyledSolutionWrapper>
      <Button onClick={props.onClose}>Close Details</Button>
    </StyledGrid>
  )
}