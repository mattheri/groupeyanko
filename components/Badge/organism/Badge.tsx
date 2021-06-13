import { motion } from "framer-motion";

interface Props {
  number: number;
}

export function Badge({ number }: Props) {
  return (
    <motion.article
      layout
      animate={{ scale: [1, 0.8, 1.1, 1] }}
      transition={{ duration: 0.3 }}
    >
      {number}
    </motion.article>
  );
}
