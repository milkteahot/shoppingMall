import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState("")

  const searchHandler = event => {
    setSearchTerm(event.currentTarget.value)
    props.refreshFunction(event.currentTarget.value) //랜딩페이지(부모 컴포넌트)에 정보 업데이트 ->newSearchTerm
  }

  return (
    <div>
      <Search
        placeholder="검색어를 입력하세요"
        onChange={searchHandler}
        style={{ width: 200 }}
        value={SearchTerm}
      />
    </div>
  );
}

export default SearchFeature;
