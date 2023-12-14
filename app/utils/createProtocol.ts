export function createProtocol(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const mili = date.getMilliseconds();

  const yearFormtatted = year.toString().padStart(4, '0');
  const monthFormtatted = month.toString().padStart(2, '0');
  const dayFormtatted = day.toString().padStart(2, '0');
  const hourFormatada = hour.toString().padStart(2, '0');
  const minuteFormtatted = minute.toString().padStart(2, '0');
  const secondFormtatted = second.toString().padStart(2, '0');
  const miliFormtatted = mili.toString().slice(0, mili.toString().length / 2);

  const protocol = `${yearFormtatted}${monthFormtatted}${dayFormtatted}${hourFormatada}${minuteFormtatted}${secondFormtatted}${miliFormtatted}`;

  return protocol;
}