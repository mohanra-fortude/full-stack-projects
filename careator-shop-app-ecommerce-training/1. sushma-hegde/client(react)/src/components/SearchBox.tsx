import React, { useState } from "react";
import SearchPage from "../containers/SearchPage";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { convertCompilerOptionsFromJson } from "typescript";

type Props = {};
const SearchBox: React.FC<Props> = () => {
  const [prodname, setProdName] = useState("");

  let history = useHistory();
  function submit() {
    history.push({
      pathname: "/search_product",
      search: `?prodname=${prodname}`,
      state: { prodname: prodname },
    });
  }

  return (
    <form
      className="d-flex"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        name="name"
        value={prodname}
        onChange={(e) => setProdName(e.target.value)}
      />
    </form>
  );
};
export default SearchBox;
