async function getId() {
  const res = await fetch('https://front-test.dev.aviasales.ru/search')
  return res.json()
}

async function getTickets(id) {
  const searchId = id ? id : await getId().then((body) => body.searchId)
  const promise = await fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`)
  const res = promise.json()
  return res
}
export default getTickets
