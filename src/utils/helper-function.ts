export const capitalizeText = (text: string) => {
  if (!text) return;
  const string = text.slice(1);
  string.toLowerCase();
  return `${text[0].toUpperCase()}${string}`;
};

export const getColorByMark = (mark: number) => {
  if (mark > 8) {
    return 'green';
  }
  if (mark < 6) {
    return 'red';
  }
  return 'blue';
};
