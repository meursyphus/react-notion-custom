/**
 * @link react-katex https://github.com/MatejBransky/react-katex?tab=readme-ov-file
 */
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";

import { EquationArgs } from "../types";

const Equation = ({ equation: { expression } }: EquationArgs) => {
  return (
    <TeX className="notion-block notion-equation notion-equation-block">
      {expression}
    </TeX>
  );
};

export default Equation;
