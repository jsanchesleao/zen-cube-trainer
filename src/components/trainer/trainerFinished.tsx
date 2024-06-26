import styled from "styled-components"
import Button from "../base/button"
import { TrainerQuestion } from "./trainer.types"
import { useMemo } from "react"

const StyledGrid = styled.div`
  display: grid;
  grid-template-rows: 75vh 1fr;
  padding: 0 0 1rem 0;
  gap: 1rem;
  width: 100%;
  margin-inline: auto;

  ${Button} {
    width: 25rem;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0 2rem;
`

const TrainingStatsWrapper = styled.div`
  width: 100%;
`

const TrainingStatsList = styled.ol`
  list-style: none;
  width: 100%;
  max-height: 65vh;
  overflow: auto;
`

const TrainingStatsListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 10rem 1fr 1fr;
  align-items: center;
  padding: var(--padding-sm) var(--padding-md);

  &:nth-child(2n) {
    background-color: var(--color-bg);
  }

  &:nth-child(2n + 1) {
    background-color: var(--color-bg-lighter);
  }

`

export type TrainerFinishedProps = {
  questions: TrainerQuestion[],
  onStartOver: () => void,
  onExit: () => void,
}

export type TrainerSummary = {

}

function sortCasesByAttempts(questions: TrainerQuestion[]) {
  return questions.sort((a, b) => {
    return a.attempts < b.attempts ? 1 : -1
  })
}

export function TrainerFinished(props: TrainerFinishedProps) {
  const sortedQuestions = useMemo(() => {
    return sortCasesByAttempts(props.questions)
  }, [props.questions])

  return (
    <StyledGrid>
      <TrainingStatsWrapper>
        <TrainingStatsList>
          {sortedQuestions.map(q => (
            <TrainingStatsListItem>
              <img className="col-2 place-self-center" src={q.case.image} />
              <p className="font-size-lg align-self-center">{q.attempts} {q.attempts === 1 ? 'attempt' : 'attempts'}</p>
              <p  className="font-size-sm font-bold capitalized col-2 place-self-center">{q.case.id}: {q.case.name}</p>
            </TrainingStatsListItem> 
          ))}
        </TrainingStatsList>
        <hr />
      </TrainingStatsWrapper>
      <ButtonsWrapper>
        <Button onClick={props.onStartOver}>Start Over</Button>
        <Button data-variant="success" onClick={props.onExit}>Exit</Button>
      </ButtonsWrapper>
    </StyledGrid>
  )
}