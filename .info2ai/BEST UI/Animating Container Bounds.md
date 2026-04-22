
Have you ever tried to animate a container's width or height with Motion and run into this?
Ex Ametbadge 13Ex Ametbadge 13
The one on the left just snaps to its new size. The text animates in fine, but the container itself jumps. That's because width and height are not animatable. The browser doesn't know how to interpolate between a fixed value and "whatever the content needs."
The one on the right is way smoother and feels better. Same content change, but the width animates to fit. So how do we achieve this?
Building a useMeasure Hook
Before we get into the animation part, we need a way to track an element's dimensions. The browser has a native API for this called ResizeObserver.1 It watches an element and fires a callback whenever its size changes. We can wrap this in a small hook.
import { useCallback, useEffect, useState } from "react";

function useMeasure() {
  const [element, setElement] = useState(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  const ref = useCallback((node) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, bounds];
}
The hook returns a ref callback and a bounds object. Attach the ref to any element and bounds will always reflect its current width and height. When the content inside that element changes and causes a resize, the observer fires, state updates, and your component re-renders with the new values.
There are libraries like react-use-measure that do this too, but as you can see it's only a few lines of code. No dependency needed.2
Integrating with Motion
Now for the animation. The core idea is two divs. An outer div that you animate, and an inner div that you measure. Attach the ref from useMeasure to the inner div, the hook gives you bounds.width and bounds.height which update whenever the content changes, pass those values to Motion's animate prop on the outer div.
import { motion } from "motion/react";

function AnimatedContainer({ children }) {
  const [ref, bounds] = useMeasure();

  return (
    <motion.div animate={{ height: bounds.height }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
Animating Width
Buttons that change their label are a common use case. Loading states, confirmation messages, multi-step forms. Without animated bounds the button jumps between widths. With this pattern, it slides.
Code PlaygroundArrow Rotate ClockwiseApp.tsxstyles.module.cssimport { MotionConfig, type MotionProps, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

const animation: MotionProps = {
  initial: { opacity: 0, filter: "blur(8px)", scale: 0.95 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, filter: "blur(8px)", scale: 0.95 },
  transition: {
    duration: 0.4,
    ease: [0.19, 1, 0.22, 1],
    delay: 0.05,
    opacity: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

function useMeasure<T extends HTMLElement = HTMLElement>(): [
  (node: T | null) => void,
  { width: number; height: number },
] {
  const [element, setElement] = useState<T | null>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  const ref = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, bounds];
}

const labels = ["Lorem Ipsum", "Ex Amet", "Aliqua Velit"];

export default function App() {
  const [index, setIndex] = useState(0);
  const [ref, bounds] = useMeasure();

  function handleClick() {
    setIndex((prev) => (prev + 1) % labels.length);
  }

  return (
    <div className={styles.container}>
      <MotionConfig
        transition={{
          duration: 0.4,
          ease: [0.19, 1, 0.22, 1],
          delay: 0.05,
        }}
      >
        <motion.button
          animate={{
            width: bounds.width > 0 ? bounds.width : "auto",
          }}
          onClick={handleClick}
          className={styles.button}
        >
          <div ref={ref} className={styles.wrapper}>
            <motion.span
              {...animation}
              key={labels[index]}
              className={styles.label}
            >
              {labels[index]}
            </motion.span>
          </div>
        </motion.button>
      </MotionConfig>
    </div>
  );
}

[3/3] Starting
The trick here is the ref goes on the inner wrapper, not the button itself. The button's width is controlled by Motion. The wrapper's width is controlled by its content. When the content changes, the measured width updates, and the button smoothly resizes to fit.
One thing to note is that I'm checking bounds.width > 0 before animating. This avoids an animation from 0 on the initial render. You want the first frame to just show the button at its natural size, not animate in from nothing.
Animating Height
Height is where this pattern really shines. Expandable sections, accordions, FAQs, details panels. Anywhere content reveals or hides itself.
The same pattern applies. Measure the inner content, animate the outer container.
Code PlaygroundArrow Rotate ClockwiseApp.tsxstyles.module.cssimport { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

function useMeasure<T extends HTMLElement = HTMLElement>(): [
  (node: T | null) => void,
  { width: number; height: number },
] {
  const [element, setElement] = useState<T | null>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  const ref = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, bounds];
}

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [ref, bounds] = useMeasure();

  return (
    <div className={styles.container}>
      <MotionConfig
        transition={{
          duration: 0.4,
          ease: [0.19, 1, 0.22, 1],
          delay: 0.05,
        }}
      >
        <div className={styles.card}>
          <motion.div
            animate={{
              height: bounds.height > 0 ? bounds.height : "auto",
            }}
            className={styles.content}
          >
            <div ref={ref} className={styles.inner}>
              <p className={styles.text}>
                Containers on the web snap to their new size instantly when
                content changes. By measuring the bounds of a container and
                animating to those values, we can make these transitions feel
                smooth and intentional.
              </p>
              <AnimatePresence mode="popLayout">
                {expanded && (
                  <motion.p
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(8px)" }}
                    className={styles.text}
                  >
                    This technique uses a ref to track the height of the inner
                    content. When the content changes, the measured height
                    updates and Motion animates the outer container to match.
                    The inner div always has its natural height, so the content
                    is never clipped or distorted.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <button
            type="button"
            className={styles.button}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </MotionConfig>
    </div>
  );
}

[3/3] Starting
When items are added or removed, the measured height changes and the animation follows. Works for any dynamic content, text, images, lists, nested components.
Gotchas
On initial render, bounds.width and bounds.height will be 0 before the first measurement. Guard against this or you'll get an animation from 0 to the actual size on mount. A simple bounds.height > 0 ? bounds.height : "auto" works.
Don't measure and animate the same element. The ref goes on the inner div, the animate prop goes on the outer div. If you put both on the same element you create a loop, the animation changes the size, which triggers a new measurement, which triggers a new animation.
Add a small delay to the animation to give the feel of a natural transition catching up to the content.
Finally, don't overuse this pattern. It's a subtle effect that should be used sparingly. Use it when it makes sense, like for buttons, accordions, or other interactive elements.



ResizeObserver is supported in all modern browsers. It watches for changes to an element's content or border box size without causing layout thrashing. ↩


react-use-measure is a popular alternative maintained by the Poimandres team. It adds some extras like debouncing and scroll tracking, but for most cases the hook above is all you need. ↩


