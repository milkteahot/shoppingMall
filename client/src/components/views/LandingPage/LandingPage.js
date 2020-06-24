import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta"

function LandingPage() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios.post("/api/product/products").then(response => {
      if (response.data.success) {
        console.log(response.data);
        setProducts(response.data.productInfo);
      } else {
        alert("상품을 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    //   console.log("product", product)
    //이 부분을 넣어야 key 에러를 없앨 수 있다.
      return <Col lg={6} md={8} xs={24} key={index} >
          
      <Card
        cover={<a href={`/product/${product._id}`}> 
        <img style={{width:'100%', maxHeight:'150px'}}
        src={`http://localhost:5000/${product.images[0]}`}
        /></a>}
      >
          <Meta 
            title={product.title}
            description={`${product.price}원`}
            />
      </Card>
      </Col>
  })

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let's Explore <Icon type="rocket" />
        </h2>
      </div>
      {/* Filter */}

      {/* Search */}

      <Row gutter={[16, 16]}>
        {renderCards}
      </Row>

        
        
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
