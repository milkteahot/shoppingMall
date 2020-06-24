import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerms, setSearchTerms] = useState("");

  const onChangeSearch = event => {
    setSearchTerms(event.currentTarget.value);

    props.refreshFunction(event.currentTarget.value);
  };
  return (
    <div>
      <Search
        value={SearchTerms}
        placeholder="검색어를 입력하세요"
        onChange={onChangeSearch}
        style={{ width: 200 }}
      />
    </div>
  );
}

export default SearchFeature;
