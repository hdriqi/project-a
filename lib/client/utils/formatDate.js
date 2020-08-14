module.exports = (date) => {
  if (date !== undefined && date !== "") {
    var myDate = new Date(date)
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][myDate.getMonth()]
    var str = myDate.getDate() + " " + month + " " + myDate.getFullYear()
    return str
  }
  return ""
}