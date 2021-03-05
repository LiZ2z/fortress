import { useRef } from 'react';
import $ from 'jquery';
import useMouseMove from './useMouseMove';

export default function useMove(onChange = () => undefined) {
  const $svgRef = useRef();
  const viewBoxRef = useRef();

  const getSvg = (el) => {
    return $(el).parent(1).parent(1).find('svg');
  };

  const getViewBox = ($el) => {
    return $el.attr('viewBox').split(' ').map(Number);
  };

  const onMouseDown = (e) => {
    $svgRef.current = getSvg(e.target);
    viewBoxRef.current = getViewBox($svgRef.current);
  };

  const onMouseMove = (e, { directionX, directionY }) => {
    const [x, y, width, height] = viewBoxRef.current;
    const ratio = 10;

    const _x = x - directionX * ratio;
    const _y = y - directionY * ratio;

    $svgRef.current.attr(
      'viewBox',
      [_x, _y, width, height].map((item) => item.toFixed(0)).join(' ')
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
