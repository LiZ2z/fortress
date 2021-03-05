import $ from 'jquery';
import { useLayoutEffect } from 'react';

export default function useOptimize(containerRef, key) {
  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    $(containerRef.current)
      .find('svg')
      .each((index, el) => {
        $(el).html(`<g class='icont-operation-group-el'>${$(el).html()}</g>`);
      })
      .find('.icont-operation-group-el')
      .each((index, el) => {
        console.log(el.getBoundingClientRect());
      });
  }, [key]);
}
