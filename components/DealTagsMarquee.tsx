import React from 'react';

interface DealTagProps {
  id: string;
  text: string;
  highlightedText?: string; // La parte del texto a resaltar (ej. "Starbucks")
}

const DealTag: React.FC<DealTagProps> = ({ text, highlightedText }) => {
  const parts: React.ReactNode[] = [];
  if (highlightedText && text.includes(highlightedText)) {
    const [before, after] = text.split(highlightedText, 2);
    parts.push(before);
    parts.push(<span key="highlight" style={{ color: '#FF7A00', fontWeight: 'bold' }}>{highlightedText}</span>);
    parts.push(after);
  } else {
    parts.push(text);
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 16px',
      marginRight: '10px',
      backgroundColor: 'white',
      borderRadius: '9999px', // Completamente redondeado
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      fontSize: '0.9rem',
      color: '#333',
      flexShrink: 0, // Evita que los elementos se encojan
    }}>
      {parts}
    </div>
  );
};

interface DealTagsMarqueeProps {
  deals: DealTagProps[];
}

const DealTagsMarquee: React.FC<DealTagsMarqueeProps> = ({ deals }) => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex animate-marquee">
        {deals.map(deal => (
          <a
            key={deal.id}
            href={`/tiendas/${deal.highlightedText?.toLowerCase()}`}
            className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-full px-6 py-2 mx-3 my-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-transparent hover:border-orange-200 dark:hover:border-orange-800"
          >
            <span className="text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
              {deal.highlightedText && deal.text.includes(deal.highlightedText) ? (
                <>
                  {deal.text.split(deal.highlightedText, 2)[0]}
                  <span className="font-bold text-orange-600 dark:text-orange-400">
                    {deal.highlightedText}
                  </span>
                  {deal.text.split(deal.highlightedText, 2)[1]}
                </>
              ) : (
                deal.text
              )}
            </span>
          </a>
        ))}

      </div>
    </div>
  );
};

export default DealTagsMarquee;
