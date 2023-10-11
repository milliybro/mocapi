import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ name, image, id, description, price, discount, editProduct, deleteCategory }) => {
  return (
    <Card>
      <Card.Img
        height="200"
        className="object-fit-cover"
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Title>name:{name}</Card.Title>
        <Card.Title>desc:{description}</Card.Title>
        <Card.Title>price:{price}</Card.Title>
        <Card.Title>count:{discount}</Card.Title>

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
