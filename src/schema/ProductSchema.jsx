import * as yup from "yup";

const productSchema = yup.object().shape({
  name: yup.string("Name must be string !").required("Please fill!"),
  image: yup
    .string("Image must be string !")
    .url("This field must be valid url!"),
  price: yup.string("Name must be number !").required("Please fill!"),
  description: yup.string("Name must be string !").required("Please fill!"),
});

export default productSchema;
