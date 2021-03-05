import { useRef } from 'react';
import $ from 'jquery';
import useMouseMove from './useMouseMove';

export default function useZoom(onChange = () => undefined) {
  const $svgRef = useRef();
  const viewBoxRef = useRef();

  const getSvg = (el) => {
    return $(el).parent(1).parent(1).find('svg');
  };

  const getViewBox = ($el) => {
    return $el.attr('viewBox').split(' ').map(Number);
  };

  const onMouseDown = (e) => {
    e.stopPropagation();
    $svgRef.current = getSvg(e.target);
    viewBoxRef.current = getViewBox($svgRef.current);
  };

  const onMouseMove = (e, { directionX, directionY }) => {
    const [x, y, width, height] = viewBoxRef.current;
    const ratio = 25;
    const _w = width - directionX * ratio;
    const _h = height - directionY * ratio;
    const _x = x - (_w - width) / 2;
    const _y = y - (_h - height) / 2;

    $svgRef.current.attr(
      'viewBox',
      [_x, _y, _w, _h].map((item) => item.toFixed(0)).join(' ')
    );
  };

  const onMouseUp = () => {
    const $svgParent = $svgRef.current.parent(1);
    const data = $svgParent.data();
    onChange($svgParent.html(), data.svgFilename, data.svgBasename);

    $svgRef.current = undefined;
    viewBoxRef.current = undefined;
  };

  return useMouseMove({
    onMouseDown,
    onMouseMove,
    onMouseUp,
  });
}
