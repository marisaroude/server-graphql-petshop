function formatDate(dateString) {
  const dateObject = new Date(dateString)
  const formattedDate = dateObject.toISOString().split('T')[0]
  return formattedDate
}

module.exports = { formatDate }
