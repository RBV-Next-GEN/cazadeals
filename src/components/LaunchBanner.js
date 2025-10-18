import React from 'react';
import { motion } from 'framer-motion';
import '../styles/custom.css';

const LaunchBanner = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    const floatingVariants = {
        float: (i) => ({
            y: [0, -10, 0, 10, 0],
            rotate: [0, i * 2, 0, i * -2, 0],
            transition: {
                duration: 5 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        })
    };

    return (
        <div className="relative black-friday-banner rounded-xl text-white p-8 text-center my-8 overflow-hidden shadow-2xl bg-black">
            {/* Elementos flotantes */}
            <motion.div custom={1} variants={floatingVariants} animate="float" className="absolute top-10 left-10 text-5xl opacity-20">🎁</motion.div>
            <motion.div custom={-1.5} variants={floatingVariants} animate="float" className="absolute bottom-20 right-20 text-6xl opacity-20">🛍️</motion.div>
            <motion.div custom={2} variants={floatingVariants} animate="float" className="absolute top-20 right-1/4 text-4xl opacity-20">💸</motion.div>
            <motion.div custom={-1} variants={floatingVariants} animate="float" className="absolute bottom-1/4 left-1/4 text-5xl opacity-20">🛒</motion.div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.h2
                    className="text-6xl font-extrabold mb-3 text-yellow-300"
                    style={{ fontFamily: '\'Anton\', sans-serif' }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.08
                            }
                        }
                    }}
                >
                    {"BLACK FRIDAY".split("").map((char, index) => (
                        <motion.span key={index} variants={textVariants} custom={index} className="inline-block">
                            {char}
                        </motion.span>
                    ))}
                </motion.h2>

                <motion.p
                    className="text-lg mb-6 max-w-2xl mx-auto text-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    ¡Las mejores ofertas del año ya están aquí! No te las pierdas.
                </motion.p>

                <motion.a
                    href="#deals-section"
                    className="inline-block bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
                >
                    Ver Ofertas Flash
                </motion.a>
            </div>
        </div>
    );
};

export default LaunchBanner;
