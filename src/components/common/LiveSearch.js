import React, { useEffect, useState } from "react";

const LiveSearch = ({ onKeySearch }) => {
  // state quan ly keyword
  const [keyWord, setKeyWord] = useState("");

  //   delay khi user go search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      console.log("Call func onKeySearch");

      onKeySearch(keyWord);
    }, 1500);

    return () => clearTimeout(delayDebounce);

    // sau 1,5s thi moi gui chuoi search len server
  }, [keyWord]);

  // ham luu keyword
  const onTyping = (event) => {
    const target = event.target;
    console.log(">> key word typing: ", target.value);
    setKeyWord(target.value);
  };

  return (
    <>
      <input
        value={keyWord}
        onChange={onTyping}
        type="search"
        placeholder="Email or Name"
        className="form-control form-control-sm ms-1"
      />
    </>
  );
};

export default LiveSearch;
