function formatDate(dateString) {
  const options = { month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

module.exports = formatDate;
