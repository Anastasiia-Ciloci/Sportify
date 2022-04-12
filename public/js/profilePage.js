const workoutFormEl = document.getElementById('workout-form');
const workoutTextEl = document.querySelector('#workout-steps')
const workoutBtnEl = document.querySelector('#btn-save')
const workoutNameEl = document.querySelector('#workout-name')

console.log(workoutFormEl)
console.log(workoutTextEl)
console.log(workoutNameEl)


let submitWorkout = (e) => {
    e.preventDefault()
    console.log(workoutTextEl.textContent)
    console.log(workoutNameEl.textContent)
    console.log(workoutNameEl.value)

}

workoutFormEl.addEventListener('submit', submitWorkout)