import { useEffect, useState } from 'react'

const URL = 'http://localhost:8000/progress'

export default function App() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(null)
  const [run, setRun] = useState(0) // меняем чтобы перезапустить

  useEffect(() => {
    setPct(0)
    setDone(false)
    setErr(null)

    const es = new EventSource(URL)

    es.addEventListener('progress', (e) => {
      setPct(JSON.parse(e.data).percent)
    })

    es.addEventListener('complete', () => {
      setDone(true)
      es.close()
    })

    es.onerror = () => {
      // без close браузер будет бесконечно реконнектиться и начнёт заново
      es.close()
      setErr('Соединение с сервером потеряно. Попробуйте ещё раз.')
    }

    return () => es.close()
  }, [run])

  return (
    <div style={{ maxWidth: 420, margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h2>Прогресс задачи</h2>

      <progress value={pct} max="100" style={{ width: '100%' }} />
      <p>{pct}%</p>

      {done && <p style={{ color: 'green' }}>Задача выполнена!</p>}
      {err && <p style={{ color: 'crimson' }}>{err}</p>}

      {(done || err) && <button onClick={() => setRun(n => n + 1)}>Запустить снова</button>}
    </div>
  )
}
