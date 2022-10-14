import { Center } from "@mantine/core"
import { useState } from "react"
import NumberCodeInput from "~/NumberCodeInput"

const App = () => {
  const [disabled, setDisabled] = useState(false)
  const handleComplete = (code) => {
    setDisabled(true)
    console.log("Code submitted: " + code)
  }

  return (
    <Center sx={{ height: "50vh" }}>
      <NumberCodeInput
        digitCount={5}
        onComplete={handleComplete}
        disabled={disabled}
      />
    </Center>
  )
}

export default App
