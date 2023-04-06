const inputs = document.querySelectorAll("input")

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const validateDate = () => {
  let result = []

  let expressions = {
    0: inputs[0].value > daysInMonth[Number(inputs[1].value) - 1],
    1: inputs[1].value > 12,
    2: inputs[2].value > new Date().getFullYear()
  }

  inputs.forEach((input, index) => {

    let p = input.closest("div").querySelector("p")
    let label = input.closest("div").querySelector("label")

    if(expressions[index] || input.value < 1){
      p.textContent = `Must be a valid ${input.name}`
      p.classList.add("error")
      label.classList.add("error")
      input.classList.add("error")
      result[index] = false
    }else{
      p.classList.remove("error")
      label.classList.remove("error")
      input.classList.remove("error")
      result[index] = true
    }
  })
  return result.every(element => element === true)
}

const isEmpty = () => {
  let result = []
  inputs.forEach((input, index) => {
    let p = input.closest("div").querySelector("p")
    let label = input.closest("div").querySelector("label")
    if(input.value === ""){
      p.textContent = "This field is required"
      p.classList.add("error")
      label.classList.add("error")
      input.classList.add("error")
      result[index] = false
    }else{
      p.classList.remove("error")
      label.classList.remove("error")
      input.classList.remove("error")
      result[index] = true
    }
  })
  return result.every(element => element === true)
}

document.querySelector("form", addEventListener("submit", (e) => {

  e.preventDefault()

  if(!isEmpty()) return
  if(!validateDate()) return

  if(new Date(`${inputs[2].value}-${inputs[1].value}-${inputs[0].value}`) > new Date()){
    inputs.forEach((input, index)=> {
      inputs[index].classList.add("error")
      inputs[index].closest("div").querySelector("label").classList.add("error")
      inputs[index].closest("div").querySelector("p").textContent = `Must be a valid ${input.name}`
      inputs[index].closest("div").querySelector("p").classList.add("error")
    })
    return
  }

  let date = new Date(`${inputs[2].value}-${Number(inputs[1].value)}-${inputs[0].value}`)
  let actualDate = new Date()

  let days = (actualDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)

  let calculateYears = Math.floor(days / 365)
  let calculateMonths = actualDate.getMonth() - date.getMonth() + 11

  if(calculateMonths % 12 == 0){
    calculateMonths = 0
  }
  if(calculateMonths >= 12){
    calculateMonths = calculateMonths % 12
  }

  let calculateDays = actualDate.getTime() - new Date(actualDate.getFullYear(), actualDate.getMonth() - 1, date.getDate() + 1).getTime()
  calculateDays = Math.floor(calculateDays / (1000 * 60 * 60 * 24)) + 1

  if(calculateDays >= 30 ){
    calculateDays = calculateDays % 30 - 1
    calculateMonths ++
  }

  document.querySelector(".year").textContent = calculateYears
  document.querySelector(".month").textContent = calculateMonths
  document.querySelector(".day").textContent = calculateDays

}))
