export const getDate = () => {
  let date = new Date();

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  let time = String(date.toString().slice(16, 21)).padStart(2, "0");

  return `${year}.${month}.${day} ${time}`;
};
