# Description of Changes

Here is reference: #25

---

## support 'custom your created block' block

- Please add **the block you created** to replace the 'crate' block.

- ex) add react-katex dependency to support equation block
  -> **add custom solution for rendering 'your custom block'**

## Review point

- ex) Instead of adding the react-katex dependency, should I create a custom solution specifically for this project?
  -> **Should we integrate an existing solution or use a custom implementation for 'your custom block'?**

## To reproduce

- npm run story:start
- click 'your created block' on the Storybook left side panel

## Screenshot

- A screenshot of your created block being rendered in Storybook.

## Review Guide

Reviews are conducted based on priority levels, such as p0, p1, p2, p3, p4, and p5.  
p0 ~ p2: If the author decides not to reflect a review for p0 to p2, it signals that a proper discussion with the reviewer is  
necessary. It is expected that the review will be resolved either through incorporating the feedback or through further discussion.  
p3: indicates that the reviewer has identified a significant issue, but either lacks a clear solution or the comment lacks sufficient context. Further explanation or additional discussion on the reviewer's concerns is needed.
p4, p5: p4 and p5 suggest low priority, and if the author does not deem them important, these comments can be disregarded.
