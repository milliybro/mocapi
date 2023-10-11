import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryCard = ({ name, image, id, editCategory, deleteCategory }) => {
  return (
    <Card>
      <Card.Img
        height="200"
        className="object-fit-cover"
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Link className=" btn btn-primary me-3" to={`/category/${id}/product`}>
          See more
        </Link>
        <Button
          className="me-3"
          variant="warning"
          onClick={() => editCategory(id)}
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

CategoryCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string,
  editCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
};

export default CategoryCard;
