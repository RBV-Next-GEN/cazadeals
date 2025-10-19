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
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">📬 ¡No te pierdas nada!</h3>
      <p className="text-white text-opacity-90 mb-6">Suscríbete para recibir las mejores ofertas directamente en tu correo.</p>
      {submitted ? (
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4">
          <p className="text-white font-bold text-center">✨ ¡Gracias por suscribirte! ✨</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            className="w-full p-4 rounded-xl bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-75 focus:ring-2 focus:ring-white focus:ring-opacity-50 outline-none transition-all"
            required 
          />
          <button 
            type="submit"
            className="w-full bg-white text-orange-500 font-bold py-4 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Suscribirme ahora
          </button>
        </form>
      )}
    </div>
  );
};

export default Newsletter;
