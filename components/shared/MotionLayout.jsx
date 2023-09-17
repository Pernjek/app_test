import { motion } from "framer-motion";

export const MotionLayout = ({ children }) => (
  <motion.div
    initial={{ y: 400, x: 0, opacity: 0 }}
    animate={{ y: 0, x: 0, opacity: 1 }}
    exit={{ y: 400, x: 0, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 40,
    }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);
