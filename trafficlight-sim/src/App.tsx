import TrafficLightWrapper from './components/TrafficLightWrapper'
import TrafficLightSimulator from './components/gpt'

function App() {

  return (
    <>
      <TrafficLightWrapper timeOut={2000} />
      <TrafficLightWrapper timeOut={3000} />
    {/* <TrafficLightSimulator></TrafficLightSimulator> */}
    </>
  )
}

export default App
