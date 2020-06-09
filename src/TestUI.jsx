import React from "react";
import { Image } from "semantic-ui-react";
import imgPath from "../public/images/te.svg";

const ImageExampleLink = () => (
  <Image
    src={imgPath || null}
    as="a"
    size="medium"
    href="http://google.com"
    target="_blank"
  />
);

export default ImageExampleLink;
