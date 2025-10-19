import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, visible }) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, x: '50%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-4 right-1/2 translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
                >
                    <svg className="w-5 h-5 text-green-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;