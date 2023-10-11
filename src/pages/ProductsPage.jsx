import { memo, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINT, LIMIT } from "../const";

import ProductCard from "../components/card/ProductCard";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import productSchema from "../schema/ProductSchema";
import request from "../server";
import useFetchPagination from "../hook/useFetch";


const ProductPage = () => {
  let { categoryId } = useParams();
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const searchProducts = async () => {
      let { data } = await axios.get(
        `${ENDPOINT}category/${categoryId}/product?sortBy=price&order=${sort}&search=${search}&page=${activePage}&limit=${LIMIT}`
      );
      setSortedProducts(data);
    };
    searchProducts();
    

    const getProducts = async () => {
      let { data } = await axios.get(
        `${ENDPOINT}/category/${categoryId}/product?search=${search}`
      );
      setTotal(data);
    };
    getProducts();

    return () => {
      controller.abort();
    };
  }, [categoryId, sort, search, activePage]);

  let pages = Math.ceil(total.length / LIMIT);
  let arr = [];
  for (let i = 1; i <= pages; i++) {
    arr.push(i);
  }

  const {
   refetch,
 } = useFetchPagination();

  const {
   formState: { errors, touchedFields },
   register,
   handleSubmit,
   reset,
 } = useForm({
   resolver: yupResolver(productSchema),
 });


 const closeModal = () => {
   setShow(false);
 };

 const showModal = () => {
   setSelected(null);
   reset({ name: "", image: "" });
   setShow(true);
 };

 const onSubmit = async (data) => {
   try {
     if (selected === null) {
       await request.post(`${ENDPOINT}category/${categoryId}/product`, data);
     } else {
       await request.put(`${ENDPOINT}category/${categoryId}/product/${selected}`, data);
     }
     closeModal();
     refetch();
   } catch (err) {
     console.log(err);
   }
 };

 const editProduct = async (id) => {
   try {
     setSelected(id);
     setShow(true);
     let { data } = await request.get(`${ENDPOINT}/category/${categoryId}/product`);
     reset(data);
   } catch (err) {
     console.log(err);
   }
 };

 const deleteCategory = async (id) => {
   let confirmDelete = confirm(
     "Are you sure you want to delete this product?"
   );
   if (confirmDelete) {
     await request.delete(`${ENDPOINT}category/${categoryId}/product/${id}`);
     refetch();
   }
 };

  return (
    <section id="products">
      <div className="container-lg">
        <InputGroup className="mb-4">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products"
          />
          
          <InputGroup.Text id="basic-addon2">
            <Form.Select
              onChange={(e) => setSort(e.target.value)}
              aria-label="Default select example"
            >
              <option value="defaut">Default</option>
              <option value="asc">1-10</option>
              <option value="desc">10-1</option>
            </Form.Select>
          </InputGroup.Text>
          <Button variant="outline-secondary" onClick={showModal}>
          Add category
        </Button>
        </InputGroup>
        <p className="alert alert-warning">
          {sortedProducts.length !== 0
            ? `Total Products: ${sortedProducts.length}`
            : "Product is not available"}
        </p>
        <div className="products-row">
          {sortedProducts.map((product) => (
            <Col className="mb-3" key={product.id}>
            <ProductCard
              {...product}
              editProduct={editProduct}
              deleteCategory={deleteCategory}
            />
          </Col>
          ))}
        </div>
        <Modal show={show} onHide={closeModal} backdrop="static" keyboard={false}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Category data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Product name</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Product name"
              />
              {touchedFields.name && errors.name ? (
                <p className="text-danger">{errors.name.message}</p>
              ) : null}
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Image url</Form.Label>
              <Form.Control
                {...register("image")}
                type="text"
                placeholder="Image name"
              />
            </Form.Group>
            {touchedFields.image && errors.image ? (
              <p className="text-danger">{errors.image.message}</p>
            ) : null}
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                {...register("price")}
                type="number"
                placeholder="Product price"
              />
              {touchedFields.price && errors.price ? (
                <p className="text-danger">{errors.price.message}</p>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                {...register("description")}
                type="text"
                placeholder="Product description"
              />
              {touchedFields.description && errors.description ? (
                <p className="text-danger">{errors.description.message}</p>
              ) : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {selected === null ? "Add" : "Save"} category
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
        {sortedProducts.length > 0 && total.length > 6 ? (
          <ul className="pagination d-flex align-items-center justify-content-center my-3 text-center">
            <li className="page-item">
              <Link
                onClick={() => setActivePage(activePage - 1)}
                value="prev"
                className={`page-link ${activePage == 1 ? "disabled" : ""}`}
              >
                Previous
              </Link>
            </li>
            {arr.map((page) => (
              <li key={page} className="page-item">
                <Link
                  value={page}
                  onClick={() => setActivePage(page)}
                  className={`page-link ${page === activePage ? "active" : ""}`}
                >
                  {page}
                </Link>
              </li>
            ))}
            <li className="page-item">
              <Link
                value="next"
                onClick={() => setActivePage(activePage + 1)}
                className={`page-link ${
                  activePage === pages ? "disabled" : ""
                }`}
              >
                Next
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    </section>
  );
};

const MemoProductPage = memo(ProductPage);

export default MemoProductPage;