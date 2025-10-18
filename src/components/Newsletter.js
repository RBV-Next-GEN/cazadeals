import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el email a tu servicio de newsletter
    console.log(`Email submitted: ${email}`);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-2">¡No te pierdas nada!</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Suscríbete para recibir las mejores ofertas directamente en tu correo.</p>
      {submitted ? (
        <p className="text-green-500 font-bold">¡Gracias por suscribirte!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            className="flex-grow p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
            required 
          />
          <button 
            type="submit"
            className="bg-orange-500 text-white font-bold py-3 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300 shadow-lg"
          >
            Suscribirme
          </button>
        </form>
      )}
    </div>
  );
};

export default Newsletter;
