import React from 'react';

const SingleMarquee = ({ items }) => {
  return (
    <div style={{
      display: 'flex',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      padding: '10px 0',
      gap: '10px', // Espacio entre los elementos
      scrollbarWidth: 'none', // Para Firefox
      msOverflowStyle: 'none', // Para IE/Edge
      // Para Chrome, Safari, Opera
      WebkitScrollbar: {
        display: 'none',
      }
    }}>
      {items.map((item, index) => {
        // Divide el contenido para resaltar el prefijo si existe
        const parts = item.highlightPrefix ? item.content.split(item.highlightPrefix) : [item.content];
        const hasPrefix = item.highlightPrefix && parts.length > 1;

        return (
          <div
            key={item.id || index}
            style={{
              display: 'inline-flex', // Asegura que los elementos estén en una sola línea
              alignItems: 'center',
              padding: '8px 15px',
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              flexShrink: 0, // Evita que los elementos se encojan
              cursor: 'pointer',
              fontSize: '14px',
              color: '#333',
            }}
          >
            {hasPrefix && (
              <span style={{ color: '#FF7F50', fontWeight: 'bold', marginRight: '4px' }}>
                {item.highlightPrefix}
              </span>
            )}
            <span>
              {parts[parts.length - 1]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SingleMarquee;
