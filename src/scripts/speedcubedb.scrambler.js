function getNextCase() {
  return new Promise((resolve, reject) => {
    document.getElementById("refreshalg").click()
    setTimeout(() => {
      resolve(document.getElementById("scramble").innerText)
    }, 1000)
  })
}

async function getScrambles(n) {
  const scrambles = []
  for (let i = 0; i < n; i++) {
    const scramble = await getNextCase();
    scrambles.push(scramble)
  }
  return scrambles
}

async function printScrambles(n) {
  const scrambles = await getScrambles(n)
  console.log(`\n\n"${scrambles.join('",\n"')}",\n\n`)
}