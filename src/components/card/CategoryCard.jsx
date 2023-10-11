import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Card.scss"
const CategoryCard = ({ name, image, id, editCategory, deleteCategory }) => {
  return (
    <Card className="card">
      <Card.Img
        height="200"
        className="object-fit-cover"
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Title className="text-white">{name}</Card.Title>
        <Link className=" btn btn-primary me-3 see" to={`/category/${id}/product`}>
          See more
        </Link>
        <Button
          className="me-3 edit"
          variant="warning"
          onClick={() => editCategory(id)}
        >
          Edit
        </Button>
        <Button variant="danger delete" onClick={() => deleteCategory(id)}>
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
