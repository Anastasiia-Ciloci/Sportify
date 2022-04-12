module.exports = {
  // the helper method to get a random number
  rand: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};
