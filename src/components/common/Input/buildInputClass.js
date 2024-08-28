// якщо треба додаткові додаткові класи

export const buildInputClass = (type) => {
    switch (type) {
      case "error":
        return "error";
      default:
        return "";
    }
  };
  