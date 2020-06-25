import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import { Icon, Col, Card, Row } from "antd";
// import Meta from "antd/lib/card/Meta"
import SearchFeature from "./Sections/SearchFeature";
// import { continents, price } from './Sections/Datas';

const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [Filters, setFilters] = useState({
    continents: [],
    price: []
  });
  const [SearchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    let variables = {
      skip: Skip,
      limit: Limit
    };
    getProducts(variables);
  }, []);

  const getProducts = variables => {
    Axios.post("/api/product/products", variables).then(response => {
        if (response.data.success) {
          if (variables.loadMore) {
            setProducts([...Products, ...response.data.productInfo]);
          } else {
            setProducts(response.data.productInfo);
          }
          setPostSize(response.data.postSize);
        //   console.log("postsize:", PostSize)
        } 
       else {
        alert("상품을 가져오는데 실패했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    // console.log("skip: ", skip)
    let variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getProducts(variables);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    //   console.log("product", product)
    //이 부분을 넣어야 key 에러를 없앨 수 있다.
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <img
                style={{ width: "100%", maxHeight: "150px" }}
                src={`http://localhost:5000/${product.images[0]}`}
              />
            </a>
          }
        >
          <Meta title={product.title} description={`${product.price}원`} />
        </Card>
      </Col>
    );
  });

  const updateSearchTerm = (newSearchTerm) => {
    let variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    };

    setSkip(0);
    setSearchTerms(newSearchTerm);
    getProducts(variables);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Explore <Icon type="rocket" />
        </h2>
      </div>
      {/* Filter */}

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto"
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <br />

      {PostSize >= Limit && 
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      }
    </div>
  );
}

export default LandingPage;
