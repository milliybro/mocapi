import * as yup from "yup";

const categorySchema = yup.object().shape({
  name: yup.string("Name must be string !").required("Please fill!"),
  image: yup
    .string("Image must be string !")
    .url("This field must be valid url!"),
});

export default categorySchema;
