import { lazy } from "react";
import Headings from "./headings";
import Paragraph from "./paragraph";
import Toggle from "./toggle";
import NumberedListItem from "./numbered-list-item";
import Quote from "./quote";
import Callout from "./callout";
import BulletedListItem from "./bulleted-list-item";
import Divider from "./divider";
const Equation = lazy(() => import("./equation"));
export {
  Headings,
  Paragraph,
  Toggle,
  Equation,
  Quote,
  Callout,
  NumberedListItem,
  BulletedListItem,
  Divider,
};

export default {
  heading_1: Headings,
  heading_2: Headings,
  heading_3: Headings,
  paragraph: Paragraph,
  bulleted_list_item: BulletedListItem,
  toggle: Toggle,
  equation: Equation,
  numbered_list_item: NumberedListItem,
  quote: Quote,
  callout: Callout,
  divider: Divider,
};
