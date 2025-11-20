'use client';
import { useEffect, RefObject } from 'react';

export function useMousePosition<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback?: ({ x, y }: { x: number; y: number }) => void,
) {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { top, left } = ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };

      callback?.({ x: clientX - left, y: clientY - top });
    };

    const handleTouchMove = (event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0];
      const { top, left } = ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };

      callback?.({ x: clientX - left, y: clientY - top });
    };

    const nodeRef = ref.current;
    nodeRef?.addEventListener('mousemove', handleMouseMove);
    nodeRef?.addEventListener('touchmove', handleTouchMove);

    return () => {
      nodeRef?.removeEventListener('mousemove', handleMouseMove);
      nodeRef?.removeEventListener('touchmove', handleTouchMove);
    };
  }, [ref, callback]);
}