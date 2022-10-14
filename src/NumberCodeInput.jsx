import { Center, Group, Paper, Title } from "@mantine/core"
import { bool, func, number } from "prop-types"
import { useEffect, useState } from "react"

const NumberCodeInput = ({ digitCount, onComplete, disabled }) => {
  const [digits, setDigits] = useState([])

  const clearDigits = () => {
    setDigits([])
  }
  const removeDigit = () => {
    if (digits.length === 0) return
    const newDigits = [...digits]
    newDigits.pop()
    setDigits(newDigits)
  }
  const addDigit = (digit) => {
    if (digits.length === digitCount) return
    const newDigits = [...digits]
    newDigits.push(digit)
    setDigits(newDigits)
    if (digits.length === digitCount - 1) onComplete(Number(newDigits.join("")))
  }
  const handleKeydown = ({ code, key, metaKey }) => {
    if (disabled) return
    if (code === "Backspace" && metaKey) clearDigits()
    else if (code === "Backspace") removeDigit()
    else if (code.includes("Digit")) addDigit(key)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [handleKeydown])

  const digitsWithPlaceholders = [
    ...digits,
    ...Array(digitCount - digits.length).fill(""),
  ]

  return (
    <Group>
      {digitsWithPlaceholders.map((digit, i) => (
        <Paper
          sx={{ width: 100, height: 100, backgroundColor: "whitesmoke", color: disabled ? "lightgray" : "black" }}
          shadow={digit === "" ? "xl" : "xs"}
          radius="lg"
          key={i}
        >
          <Center sx={{ height: "100%" }}>
            <Title order={1}>{digit}</Title>
          </Center>
        </Paper>
      ))}
    </Group>
  )
}

NumberCodeInput.propTypes = {
  digitCount: number.isRequired,
  onComplete: func,
  disabled: bool,
}

NumberCodeInput.defaultProps = {
  onComplete: () => {},
  disabled: false,
}

export default NumberCodeInput
