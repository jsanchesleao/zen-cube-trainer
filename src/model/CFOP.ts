export type CFOPStep = 'f2l' | 'oll' | 'pll'

export type CFOPCase = {
  step: CFOPStep,
  name: string,
  id: string,
  setups: string[],
  solution: string,
  image: string,
}