import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Card.scss"

const ProductCard = ({ name, image, id, description, price, discount, editProduct, deleteCategory }) => {
  return (
    <Card className="card">
      <Card.Img
        height="200"
        className="object-fit-cover"
        variant="top"
        src={image}
      />
      <Card.Body className="">
        <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center gap-2">
        <Card.Title className="text-white">{name}</Card.Title>
        <Card.Title className="badge bg-info">{description}</Card.Title>
        </div>
        <div>
        <Card.Title className="text-white">{price}$</Card.Title>
        <Card.Title className="badge bg-success">count:{discount}</Card.Title>
        </div>
        </div>

        <Link className=" btn btn-primary me-3">
          Add To Cart
        </Link>
        <Button
          className="me-3"
          variant="warning"
          onClick={() => editProduct(id)}
        >
          Edit
        </Button>
        <Button variant="danger" onClick={() => deleteCategory(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};
 ProductCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string,
  editCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
};

export default ProductCard;
