// UTC TO MANILA TIME CONVERTION
export function fromUTCtoManila(utcDateString) {
  // Create a Date object from the UTC string
  const utcDate = new Date(utcDateString);

  // Create a formatter for Asia/Manila timezone
  const manilaFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  // Format the date using the Manila timezone
  const manilaDateString = manilaFormatter.format(utcDate);

  return manilaDateString;
}

// reverse from MANILA TO UTC DATETIME CONVERTION
export function fromManilaToUTC(manilaDateString) {
  // Create a Date object from the Manila date string
  const manilaDate = new Date(manilaDateString);

  // Get the UTC time in milliseconds
  const utcTime = manilaDate.getTime() - manilaDate.getTimezoneOffset() * 60000;

  // Create a new Date object in UTC
  const utcDate = new Date(utcTime);

  // Format the UTC date string
  const utcDateString = utcDate.toISOString();

  return utcDateString;
}

export function formatNumberWithCommas(number) {
  // Check if the number is null or undefined
  if (number == null) {
    return "N/A"; // or any other default value you prefer
  }

  // Check if the number has a decimal part
  const hasDecimalPart = number % 1 !== 0;

  return number.toLocaleString("en-US", {
    minimumFractionDigits: hasDecimalPart ? 2 : 0,
    maximumFractionDigits: hasDecimalPart ? 2 : 0,
  });
}

// Convert to negative
export function convertToNegative(value) {
  if (typeof value !== "number") {
    throw new Error("Input must be a number");
  }

  if (value >= 0) {
    return -value;
  } else {
    return value; // Already negative or zero
  }
}

// Convert To Positive
export function convertToPositive(value) {
  if (typeof value !== "number") {
    throw new Error("Input must be a number");
  }

  return value >= 0 ? value : -value;
}

// ChunkArray
export function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
