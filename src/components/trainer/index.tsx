import { useCallback, useState } from "react"
import { CFOPCase } from "../../model/CFOP"
import { TrainerNotStarted } from "./trainerNotStarted"
import { TrainerShowingQuestion } from "./trainerShowingQuestion"
import { TrainerQuestion } from './trainer.types'
import { TrainerShowingDetails } from "./trainerShowingDetails"
import { TrainerFinished } from "./trainerFinished"
import Container from "../base/container"
import { TrainerLayout } from "./trainer.layout"
import { Header } from "../base/header"

type TrainerState = 'not-started' | 'showing-case' | 'showing-details' | 'finished'

export type TrainerProps = {

}

function shuffle(questions: TrainerQuestion[]) {
  for(let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = questions[i];
    questions[i] = questions[j];
    questions[j] = tmp
  }
}

function randomizeSetup(cases: CFOPCase[], id: string) {
  const setups = cases.find(c => c.id === id)?.setups
  if (!setups) {
    return null
  }
  return setups[Math.floor(Math.random() * setups.length)]
}

function calculateProgress(questions: TrainerQuestion[]) {
  const total = questions.length * 100
  let completed = 0;
  questions.forEach(q => {
    completed += Math.min(100, q.score)
  })
  return Math.floor((100 * completed) / total)
}

export function Trainer() {
  const [state, setState] = useState<TrainerState>('not-started')
  const [title, setTitle] = useState<string>('');
  const [trainingSet, setTrainingSet] = useState<CFOPCase[]>([])
  const [questions, setQuestions] = useState<TrainerQuestion[]>([])
  const [nextQuestion, setNextQuestion] = useState<TrainerQuestion | null>(null)

  const onBegin = useCallback((trainingSet: CFOPCase[], title: string) => {
    setTitle(title)
    setTrainingSet(trainingSet)
    const questions = trainingSet.map(c => ({
      attempts: 0,
      score: 0,
      case: {
        name: c.name,
        id: c.id,
        solution: c.solution,
        setup: c.setups[Math.floor(Math.random() * c.setups.length)],
        image: c.image,
      }
    }))
    shuffle(questions)
    setQuestions(questions)
    setNextQuestion(questions[0])
    setState('showing-case')
  }, [setState])

  const onExit = useCallback(() => {
    setState('not-started')
  }, [setState])

  const onFinish = useCallback(() => {
    setNextQuestion(null)
    setQuestions([])
    setState('not-started')
  }, [setNextQuestion, setQuestions, setState])

  const selectNextQuestion = useCallback(() => {
    const unsolvedQuestions = questions.filter(q => q.score < 100);
    const maxAttempts = unsolvedQuestions.reduce((result, q) => {
      return q.attempts > result ? q.attempts : result
    }, 0)

    const totalWeight = unsolvedQuestions.reduce((weight, q) => {
      return weight + (maxAttempts + 1) - q.attempts
    }, 0)

    let steps = Math.floor(Math.random() * totalWeight);
    for(let i = 0; i < unsolvedQuestions.length; i++) {
      const question = unsolvedQuestions[i];
      const weight = maxAttempts - question.attempts + 1;
      if (steps <= weight) {
        return question
      }
      else {
        steps -= weight;
      }
    }
    return null
  }, [questions])

  const onAnswer = useCallback((score: number, attempts: number) => {
    questions.forEach(q => {
      if (q.case.id === nextQuestion?.case.id) {
        q.score = score;
        q.case.setup = randomizeSetup(trainingSet, q.case.id) || q.case.setup
        q.attempts = attempts
      }
    })
    setQuestions([...questions])
    const newNextQuestion = selectNextQuestion();
    setNextQuestion(newNextQuestion ? {...newNextQuestion} : null)
    setState(newNextQuestion ? 'showing-case' : 'finished')
    

  }, [questions, trainingSet, setQuestions, setNextQuestion, setState, selectNextQuestion])

  const onSuccessEasy = useCallback(() => {
    onAnswer((nextQuestion?.score || 0) + 100, (nextQuestion?.attempts || 0) + 1)
  }, [onAnswer, nextQuestion])

  const onSuccessHard = useCallback(() => {
    onAnswer((nextQuestion?.score || 0) + 40, (nextQuestion?.attempts || 0) + 1)
  }, [onAnswer, nextQuestion])

  const onFail = useCallback(() => {
    onAnswer((nextQuestion?.score || 0) + 10, (nextQuestion?.attempts || 0) + 1)
  }, [onAnswer, nextQuestion])

  const onShowDetails = useCallback(() => {
    setState('showing-details')
  }, [setState])

  const onCloseDetails = useCallback(() => {
    setState('showing-case')
  }, [setState])

  function renderContent() {
    if (state === 'not-started') {
      return (<TrainerNotStarted onBegin={onBegin} />)
    }
  
    if (state === 'showing-case' && nextQuestion) {
      return (<TrainerShowingQuestion 
        question={nextQuestion} 
        onFinish={onFinish} 
        onSuccessEasy={onSuccessEasy}
        onSuccessHard={onSuccessHard}
        onFail={onFail}
        onShowDetails={onShowDetails}
        />)
    }
  
    if (state === 'showing-details' && nextQuestion) {
      return <TrainerShowingDetails onClose={onCloseDetails} question={nextQuestion} />
    }
  
    if (state === 'finished') {
      return <TrainerFinished onStartOver={() => onBegin(trainingSet, title)} onExit={onExit} questions={questions} />
    }
  }

  return (
    <Container>
      <TrainerLayout>
        <Header>
          {
            state === 'not-started' && 'Training Selection'
          }
          {
            state === 'finished' && `${title} Training Results`
          }
          {
            state === 'showing-case' && `${title} Training: ${calculateProgress(questions)}%`
          }
          {
            state === 'showing-details' && `Case Details`
          }
        </Header>
        {renderContent()}
      </TrainerLayout>
    </Container>
  )

}