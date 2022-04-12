const linkWorkout = (workoutId) => {
  fetch("/api/v1/workout/link", {
    method: "PUT",
    body: JSON.stringify({ id: workoutId }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to link workout to user.");
      }
    })
    .catch((error) => console.log(error));
};
