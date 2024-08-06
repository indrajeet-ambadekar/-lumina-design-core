import { useState, useRef, useEffect } from "react";

const useDraggableResizer = (initialWidth = window.innerWidth * 0.5) => {
  const [columnWidth, setColumnWidth] = useState(initialWidth);
  const containerRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialWidthAtStart, setInitialWidthAtStart] = useState(initialWidth);

  useEffect(() => {
    const handleMouseDown = (event) => {
      setResizing(true);
      setInitialMouseX(event.clientX);
      setInitialWidthAtStart(containerRef.current.offsetWidth);
      if (
        event.target.closest(".lumina-resizable-panel") &&
        event.target.closest(".lumina-resize-handle")
      ) {
        document.body.classList.add("lumina-resizing");
      }
    };

    const handleMouseMove = (event) => {
      if (resizing && containerRef.current) {
        const offsetX = event.clientX - initialMouseX;
        const newWidth = Math.max(
          Math.min(
            initialWidthAtStart + offsetX,
            window.innerWidth * 0.8 // Maximum width set to 80% of window width
          ),
          window.innerWidth * 0.2 + 20 // Minimum width set to 20% of window width
        );
        setColumnWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setResizing(false);
      document.body.classList.remove("lumina-resizing");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [resizing, initialMouseX, initialWidthAtStart]);

  return {
    containerRef,
    columnWidth,
    setResizing
  };
};

export default useDraggableResizer;
