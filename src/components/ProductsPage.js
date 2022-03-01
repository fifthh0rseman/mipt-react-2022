import React from 'react';
import {Card, Col, Image, Row, Typography, Rate} from 'antd';
import sample from "../mock/products-sample.json";
import {countProductMetrics} from "../utils";

const {Title, Link, Text, Paragraph} = Typography;


const ProductCard = (props) => {
    const product = props.prod;
    const [count, sum] = countProductMetrics(product);

    return <Card style={{width: 800, margin: 20}}>
        <>
            <Row>
                <Col span={6}>
                    <Image src={product.images[0]}/>
                </Col>
                <Col span={17} offset={1}>
                    <Title level={4}>
                        <Link href={`/product/${product.usin}`}>{product.title}</Link>
                    </Title>
                    <Paragraph>
                        <Text>Автор: {product.attributes.author}</Text>
                    </Paragraph>
                    <Rate allowHalf disabled={true} value={sum / count}/>
                    <span className="ant-rate-text">{count}</span>
                </Col>
            </Row>
        </>
    </Card>;
}

export const ProductsPage = () => {
    document.title = 'Продукты';
    return <div>
        {sample.products.map(product => <ProductCard prod={product}/>)}
    </div>;
}