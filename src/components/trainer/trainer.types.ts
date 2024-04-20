export type TrainerCase = {
  name: string,
  id: string,
  setup: string,
  solution: string,
  image: string,
}

export type TrainerQuestion = {
  case: TrainerCase,
  attempts: number,
  score: number,
}