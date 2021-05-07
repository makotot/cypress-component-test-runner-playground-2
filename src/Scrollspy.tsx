import { RefObject } from 'react';

export const Scrollspy = ({
  children,
  sectionRefs,
}: {
  children: () => JSX.Element;
  sectionRefs: RefObject<Element>[];
}) => {
  return children();
};