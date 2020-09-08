

export const getInitialsFromName = (name: string) => {
  const arr = name.split(' ');
  if (arr.length >= 2) {
    return `${arr[0][0]}${arr[1][0]}`.toUpperCase();
  }
  return arr[0].substring(0, 2).toUpperCase();
};

