export function formatDuration(duration_ms) {
  let hours = Math.floor(duration_ms / (1000 * 60 * 60));
  let minutes = Math.floor((duration_ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((duration_ms % (1000 * 60)) / 1000);
  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += hours;
  }
  if (minutes > 0) {
    formattedDuration +=
      (hours > 0 ? minutes.toString().padStart(2, "0") : minutes) + ":";
  }
  formattedDuration += seconds.toString().padStart(2, "0");
  return formattedDuration;
}

export function cleanUpHtml(string) {
  const regex = /(<([^>]+)>)/gi;
  const newString = string.replace(regex, "");
  return newString;
}
