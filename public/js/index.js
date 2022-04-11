const { response } = require("express");

const home = document.querySelector('#home');
const profile = document.querySelector('#profile');
const about = document.querySelector('#about');
const logout = document.querySelector('#logout');

const renderProfile = async (req, res, next) => {
  const response = fetch('api/v1/user/:id', {
    method: 'GET',
  }).catch (error => console.log(error));

  if (response.ok) {
    document.location.replace('/user');
  }
}

profile.addEventListener('click', renderProfile);
