const numberToWords = (num) => {
  const singleDigit = ['','One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const twoDigit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const thousands = ['', 'Thousand', 'Million', 'Billion'];

  if (num === 0) return 'Zero';

  let result = '';
  let p = 0;

  // Split the number into chunks of 3 digits
  while (num > 0) {
    let chunk = num % 1000;
    if (chunk > 0) {
      result = convertChunk(chunk) + (thousands[p] ? ' ' + thousands[p] : '') + ' ' + result;
    }
    num = Math.floor(num / 1000);
    p++;
  }

  return result.trim();

  // Convert numbers less than 1000
  function convertChunk(n) {
    let str = '';

    // Handle hundreds
    if (Math.floor(n / 100) > 0) {
      str += singleDigit[Math.floor(n / 100)] + ' Hundred ';
      n = n % 100;
    }

    // Handle tens and ones
    if (n >= 10 && n < 20) {
      str += twoDigit[n - 10];
    } else {
      if (Math.floor(n / 10) > 0) {
        str += tens[Math.floor(n / 10)] + ' ';
      }
      if (n % 10 > 0) {
        str += singleDigit[n % 10];
      }
    }

    return str.trim();
  }
};

export default numberToWords;
