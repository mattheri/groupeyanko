import { FC } from "react";
import { Col } from "react-bootstrap";

const ProductCol:FC = ({ children }) => {
	return(
		<Col
			xs={12}
			md={6}
			lg={3}
			className="d-flex flex-wrap justify-content-center p-0"
		>
			{children}
		</Col>
	);
};

export default ProductCol;