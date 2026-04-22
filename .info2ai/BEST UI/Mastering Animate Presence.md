When an element leaves the DOM, it's pretty much gone and as a result, there is no way to animate something that no longer exists.
Motion's Animate Presence fixes this. It keeps departing elements mounted long enough to animate out, then removes them. The basic usage is straightforward, wrap conditional content, define initial, animate, and exit states and the component handles the rest.
Bell 2$57,206Dot Grid 1 X 3 HorizontalCustomizeAn Example of A Component Powered by Animate Presence 1
The more interesting question is what happens when basic entry and exit animations are not enough. Components that need to know they are leaving. Animations that depend on navigation direction. Parent-child exits that coordinate. This is where the real power lives.
Reading Presence State
Sometimes a component needs to know it is exiting. Maybe it changes its appearance, disables interactions, or triggers side effects. The useIsPresent hook provides this information.2
Code PlaygroundArrow Rotate ClockwiseApp.tsxstyles.module.css99123456789101112131415161718192021222324252627282930313233343536import { AnimatePresence, motion, useIsPresent } from "motion/react";import { useState } from "react";import styles from "./styles.module.css";const definitions = {  present: {    word: "present",    pronunciation: "/ˈprez.ənt/",    type: "adjective",    definition:      "In a particular place; being in view or at hand. Existing or occurring now, at this time.",  },  exiting: {    word: "exit",    pronunciation: "/ˈek.sɪt/",    type: "verb",    definition:      "To go out of or leave a place; to depart from a scene, stage, or situation.",  },};function Card() {  const isPresent = useIsPresent();  const entry = definitions[isPresent ? "present" : "exiting"];  return (    <motion.div      className={styles.card}      initial={{ opacity: 0, scale: 0.9 }}      animate={{ opacity: 1, scale: 1 }}      exit={{ opacity: 0, scale: 0.9 }}      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}    >      <span className={styles.word}>{entry.word}</span>      <span className={styles.pronunciation}>{entry.pronunciation}</span>      <span className={styles.type}>{entry.type}</span>[3/3] Starting
The hook returns a boolean. True while mounted normally, false during the exit animation. You might use this to disable buttons while a component exits, switch visual states on unmount, or trigger cleanup when departure begins.
One constraint is that useIsPresent must be called from a component that is a child of Animate Presence. You cannot inline the hook in the parent where you conditionally render. This is why the demo above uses a separate Card component rather than putting the motion element directly inside the conditional.
Manual Exit Control
Standard exit animations run on a fixed timeline. But some scenarios require manual control. Async cleanup, external animation libraries, or coordinating with systems outside React.
The usePresence hook returns both the presence state and a safeToRemove callback. The component stays mounted until you call it.
Code PlaygroundArrow Rotate ClockwiseApp.tsxstyles.module.css99123456789101112131415161718192021222324252627282930313233343536import { AnimatePresence, motion, usePresence } from "motion/react";import { useEffect, useState } from "react";import styles from "./styles.module.css";function Notification() {  const [isPresent, safeToRemove] = usePresence();  useEffect(() => {    if (!isPresent) {      const timer = setTimeout(() => {        safeToRemove();      }, 500);      return () => clearTimeout(timer);    }  }, [isPresent, safeToRemove]);  return (    <motion.div      className={styles.notification}      initial={{ opacity: 0, scale: 0.95 }}      animate={{ opacity: 1, scale: 1 }}      exit={{ opacity: 0, scale: 0.95 }}      transition={{ type: "spring", stiffness: 500, damping: 30 }}    >      <span className={styles.title}>        {isPresent ? "Notification" : "Cleaning up..."}      </span>      <span className={styles.message}>        {isPresent ? "Click dismiss to trigger cleanup" : "Saving state..."}      </span>    </motion.div>  );}export default function App() {[2/3] Downloaded react (6/9)
The exit animation starts immediately. Your async work runs in parallel. When both the animation finishes and safeToRemove is called, the element unmounts. This is how you could save draft content before a modal closes, wait for a network request to complete, or hand control to GSAP or other animation libraries for more complex animations.3
Nested Exits
When a parent Animate Presence removes its children, nested exit animations do not fire by default. The parent wins. Sometimes you want both. A modal fading out while its content items also animate. The propagate prop enables this.
Code PlaygroundArrow Rotate ClockwiseApp.tsxstyles.module.cssimport { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import styles from "./styles.module.css";

const items = ["A", "B", "C"];

export default function App() {
  const [show, setShow] = useState(true);

  const renderCard = (propagate: boolean) => (
    <AnimatePresence>
      {show && (
        <motion.div
          key="card"
          className={styles.card}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className={styles.label}>
            {propagate ? "With Propagate" : "No Propagate"}
          </span>
          <div className={styles.items}>
            <AnimatePresence propagate={propagate}>
              {items.map((item) => (
                <motion.div
                  key={item}
                  className={styles.item}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={styles.root}>
      <div className={styles.cards}>
        {renderCard(false)}
        {renderCard(true)}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setShow(!show)}
        >
          Toggle
        </button>
      </div>
    </div>
  );
}

[2/3] Downloaded react (6/9)
When true, removing the parent, triggers exit animations on both the parent and its nested children. Without it, children vanish instantly when the parent exits. Stuff like this goes unnoticed by many, but adding things like this really separetes people who care about the details from those who don't.
Modes
The mode prop controls timing between entering and exiting elements.
Code PlaygroundArrow Rotate ClockwiseApp.tsxstyles.module.cssimport { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import styles from "./styles.module.css";

type Mode = "sync" | "wait" | "popLayout";

const modes: Mode[] = ["sync", "wait", "popLayout"];

function ModeExample({ mode, show }: { mode: Mode; show: boolean }) {
  return (
    <div className={styles.example}>
      <div className={styles.label}>{mode}</div>
      <div className={styles.icon}>
        <AnimatePresence mode={mode}>
          <motion.div
            key={show ? "a" : "b"}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(2px)" }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            {show ? "A" : "B"}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        {modes.map((mode) => (
          <ModeExample key={mode} mode={mode} show={show} />
        ))}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setShow((prev) => !prev)}
        >
          Toggle
        </button>
      </div>
    </div>
  );
}

[2/3] Downloaded react (6/9)
sync
This is where entering and exiting elements animate simultaneously. It's useful for crossfades or when you want to animate both at the same time. You just have to bare in mind that both elements will be visible at the same time so you will have to handle the layouts to avoid conflicts.
wait
Here the exiting element waits for one to finish before the other starts. I use this when I want a more elegant transition between two elements. When I don't want to have both elements visible at the same time. One thing to pay note to is that because one element has to finish before the other can start, the duration of the animation will almost be doubled. So if you want something quicker you might have to mess around with the durations.
popLayout
Using this mode removes exiting elements from document immediately. They become absolutely positioned, allowing surrounding content to reflow. I use this alot when I need elements to be removed fast without layout shifts, so like list reordering, morphing layout animations etc. It's also handy when I need to run calculations on the parents bounds, like if I'm doing an animated width container and need the width of the parent to update quickly, inline with the animation.
Closing Thoughts
Even though CSS now has @starting-style for native exit animations.4 Simple transitions no longer need JavaScript. But the patterns in this article do. Reading presence state, manual exit control, directional animations, coordinated nested exits are things that Animate Presence offers that CSS can't at this point in time.
Animate Presence fills the gap between what CSS can handle and what real interfaces need. The component itself is simple, but hopefuly this article has helped you understand how to use it to it's fullest.



An example of a component powered by Animate Presence, taken from my 12 Principles of Animation article. ↩


Motion's AnimatePresence documentation covers the full API including useIsPresent, usePresence, and usePresenceData. ↩


For complex animation sequences outside React's lifecycle, GSAP pairs well with manual exit control. ↩


MDN's @starting-style documentation covers the emerging CSS approach to entry animations. ↩


