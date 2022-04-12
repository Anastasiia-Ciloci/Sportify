const home = document.querySelector("#home");
const profile = document.querySelector("#profile");
const about = document.querySelector("#about");
const logout = document.querySelector("#logout");

/*const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }).catch((error) => console.log(error));

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  console.log(username, email, password);

  if (username && email && password) {
    const response = await fetch("/api/v1/user/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);*/

/*const workoutFormEl = document.getElementById("workout-form");
console.log(workoutFormEl);
console.log("IT WORKS!!!!!!!!!!!!!!!!!!!");

let submitWorkout = (e) => {
  const workoutTextEl = document.querySelector("#workout-steps");
  const workoutBtnEl = document.querySelector("#btn-save");
  const workoutNameEl = document.querySelector("#workout-name");

  e.preventDefault();
  console.log(workoutNameEl.value);
};

workoutFormEl.addEventListener("click", submitWorkout);*/

// FETCH PROFILE INFO
// const renderProfile = async (req, res, next) => {
//     const response = fetch('api/v1/user/:', {
//         method: 'GET',
//     }).catch(error => console.log(error));
//
//     if (response.ok) {
//         document.location.replace('/user');
//     }
// }
//
// profile.addEventListener('click', renderProfile);
