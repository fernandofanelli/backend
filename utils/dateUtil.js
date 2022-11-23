const getCurrentDate = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

exports.getCurrentDate = getCurrentDate;
