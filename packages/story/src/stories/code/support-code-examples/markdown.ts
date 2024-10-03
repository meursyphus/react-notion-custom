import { dedent } from "ts-dedent";

export const markdown = dedent`
# My Document

This is a paragraph of text.

## Section 1

This is the first section of the document. It contains some **bold** text and some _italic_ text.

### Subsection 1.1

This is a subsection of section 1. It contains a list:

- Item 1
- Item 2
- Item 3

### Subsection 1.2

This is another subsection of section 1. It contains a table:

| Name     | Age |
| -------- | --- |
| Alice    | 30  |
| Bob      | 25  |
| Charlie  | 35  |

## Section 2

This is the second section of the document. It contains a code block:

\`\`\`python
def hello():
    print("Hello, world!")
\`\`\`
`;
