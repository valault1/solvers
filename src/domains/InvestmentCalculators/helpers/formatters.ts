export const formatDollars = (num: number) => {
  if (!num) return "$0.00"
  const roundedNum = Math.round(num * 100) / 100;
  var cents = roundedNum.toString().includes(".") ? roundedNum.toString().split('.')[1] : "00";
  if (cents == "0") cents = "00"
  else if (cents.split('').length == 1) cents = (parseInt(cents) * 10).toString();

  var dollarsChars = roundedNum.toString() ? roundedNum.toString().split('.')[0].split('') : "00";
  var dollarsWithCommas = "";
  for (let i=0; i < dollarsChars.length; i++) {
    dollarsWithCommas += dollarsChars[i];
    if (i % 3 === ((dollarsChars.length % 3) + 2) % 3 && i != dollarsChars.length - 1) dollarsWithCommas+=",";
  }
  return "$"+ dollarsWithCommas + "." + (cents ? cents : "00");
}