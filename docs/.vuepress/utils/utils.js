export const copyToClipboard = (el) => {
  try {
    el.select();
    return document.execCommand("copy");
  } catch (err) {
    return false;
  }
};
