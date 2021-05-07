import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import throttle from 'lodash/throttle';

const useScrollspy = ({
  sectionRefs,
}: {
  sectionRefs: RefObject<Element>[];
}) => {
  const isScrolledToBottom = useCallback(() => {
    return (
      document.documentElement.scrollTop + window.innerHeight >=
      document.body.scrollHeight
    );
  }, []);
  const isElementInViewport = useCallback((element: Element) => {
    const root = {
      height: window.innerHeight,
      scrollTop: document.documentElement.scrollTop,
      scrollBottom: document.documentElement.scrollTop + window.innerHeight,
    };
    const elementRect = element.getBoundingClientRect();
    const elementScrollTop = root.scrollTop + elementRect.top;
    const elementScrollBottom = elementScrollTop + elementRect.height;

    return [
      elementScrollTop < root.scrollBottom,
      elementScrollBottom > root.scrollTop,
    ].every((v) => v);
  }, []);

  const getElementsStatusInViewport = useCallback(() => {
    return sectionRefs.map((sectionRef) => {
      if (sectionRef.current) {
        return isElementInViewport(sectionRef.current);
      }
      return false;
    });
  }, [isElementInViewport, sectionRefs]);

  const [elementsStatusInViewport, updateElementsStatusInViewport] = useState<
    boolean[]
  >([]);

  const currentElementIndexInViewport = useMemo(
    () => elementsStatusInViewport.findIndex((status) => status),
    [elementsStatusInViewport]
  );

  const spy = useCallback(
    throttle(() => {
      const newElementsStatusInViewport = isScrolledToBottom()
        ? [...new Array(sectionRefs.length - 1).fill(false).map((v) => v), true]
        : getElementsStatusInViewport();
      updateElementsStatusInViewport(newElementsStatusInViewport);
    }),
    [getElementsStatusInViewport, isScrolledToBottom, sectionRefs]
  );

  useEffect(() => {
    spy();
    window.addEventListener('scroll', spy);
    window.addEventListener('resize', spy);

    return () => {
      window.removeEventListener('scroll', spy);
      window.removeEventListener('resize', spy);
    };
  }, [spy]);

  return {
    currentElementIndexInViewport,
  };
};

export const Scrollspy = ({
  children,
  sectionRefs,
}: {
  children: ({
    currentElementIndexInViewport,
  }: {
    currentElementIndexInViewport: number;
  }) => JSX.Element;
  sectionRefs: RefObject<Element>[];
}) => {
  const {
    currentElementIndexInViewport,
  } = useScrollspy({
    sectionRefs,
  });

  return children({
    currentElementIndexInViewport,
  });
};