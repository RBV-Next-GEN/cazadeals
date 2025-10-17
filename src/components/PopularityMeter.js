
import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { TagIcon } from '@heroicons/react/24/solid';

const PopularityMeter = ({ score, votes }) => {
    const scoreRef = useRef(null);
    const isInView = useInView(scoreRef, { once: true });

    // Animar el número cuando el componente es visible
    useEffect(() => {
        if (isInView) {
            const controls = animate(0, score, {
                duration: 2,
                ease: "easeOut",
                onUpdate: (latest) => {
                    if (scoreRef.current) {
                        scoreRef.current.textContent = latest.toFixed(1);
                    }
                },
            });
            return () => controls.stop();
        }
    }, [isInView, score]);

    // Calcular la altura del relleno del gradiente
    const fillHeight = `${score * 10}%`;

    return (
        <div className="relative w-40 h-40 flex flex-col items-center justify-center">
            {/* Contenedor del icono y el relleno */}
            <div className="relative w-full h-full">
                {/* Icono de fondo (la silueta) */}
                <TagIcon className="w-full h-full text-gray-200 dark:text-gray-700" />

                {/* Relleno animado con gradiente */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-orange-400 to-pink-500"
                    style={{
                        height: '0%', // Altura inicial
                        mask: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'black\'><path fill-rule=\'evenodd\' d=\'M12.963 2.286a.75.75 0 00-1.071 0L5.43 8.75a.75.75 0 00-.43 1.07l3.569 6.548-6.617 3.23a.75.75 0 00.43 1.45l11.455-2.29a.75.75 0 00.569-.569l2.29-11.455a.75.75 0 00-1.45-.43l-3.23 6.617L12.963 2.286zM9 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z\' clip-rule=\'evenodd\' /></svg>")',
                        WebkitMask: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'black\'><path fill-rule=\'evenodd\' d=\'M12.963 2.286a.75.75 0 00-1.071 0L5.43 8.75a.75.75 0 00-.43 1.07l3.569 6.548-6.617 3.23a.75.75 0 00.43 1.45l11.455-2.29a.75.75 0 00.569-.569l2.29-11.455a.75.75 0 00-1.45-.43l-3.23 6.617L12.963 2.286zM9 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z\' clip-rule=\'evenodd\' /></svg>")',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                    }}
                    initial={{ height: '0%' }}
                    animate={{ height: isInView ? fillHeight : '0%' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                ></motion.div>
            </div>

            {/* Texto superpuesto */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span ref={scoreRef} className="text-4xl font-extrabold text-gray-800 dark:text-white">0.0</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 -mt-1">{votes} votos</span>
            </div>
        </div>
    );
};

export default PopularityMeter;
