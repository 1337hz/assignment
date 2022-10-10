exports.getDateString = (date) => {
  const day = date.toLocaleDateString('en-US', { weekday: 'short', });
  return `${day}, ${`0${date.getDate()}`.slice(-2)}/${date.getMonth() + 1}/`
}
