import { GiTatteredBanner } from "react-icons/gi";

export default {
  name: "banner",
  title: "Banner",
  type: "document",
  icon: GiTatteredBanner,
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "buttonText",
      title: "ButtonText",
      type: "string",
    },
    {
      name: "largeText1",
      title: "LargeText1",
      type: "string",
    },
    {
      name: "largeText2",
      title: "LargeText2",
      type: "string",
    },
  ],
};
