import { MdProductionQuantityLimits } from "react-icons/md";

export default {
  name: "product",
  title: "Product",
  type: "document",
  icon: MdProductionQuantityLimits,
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotpsot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
    {
      title: "Categories",
      name: "category",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "category" },
            // etc
          ],
        },
      ],
    },
  ],
};
