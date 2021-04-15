const fns = {};

fns.copyToClipboard = (el) => {
  try {
    el.select();
    return document.execCommand("copy");
  } catch (err) {
    return false;
  }
};

export default fns;
