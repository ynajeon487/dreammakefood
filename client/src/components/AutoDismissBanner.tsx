import { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function AutoDismissBanner() {
  const shouldReduceMotion = useReducedMotion();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Auto-dismiss banner after 5 seconds
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
          role="status"
          aria-live="polite"
          data-testid="banner-testing-warning"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <p className="text-sm md:text-base text-yellow-800 dark:text-yellow-200 font-medium">
                Trang web đang trong quá trình thử nghiệm.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
