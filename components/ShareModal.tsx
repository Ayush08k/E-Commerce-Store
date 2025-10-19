import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
  pageUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, productName, productImage, pageUrl }) => {
  if (!isOpen) return null;

  const shareText = `Check out this amazing product: ${productName}`;

  const shareOptions = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
        </svg>
      ),
      color: 'hover:text-blue-600',
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.028 2.057 3.845-.757-.023-1.465-.23-2.062-.56v.052c0 2.246 1.595 4.123 3.71 4.557-.49.13-.996.197-1.512.197-.297 0-.585-.029-.865-.081.588 1.84 2.293 3.178 4.323 3.214-1.585 1.241-3.58 1.98-5.756 1.98-.372 0-.739-.022-1.103-.065 2.05 1.321 4.496 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.604.91-.658 1.7-1.477 2.323-2.41z"/>
        </svg>
      ),
      color: 'hover:text-blue-400',
    },
    {
      name: 'Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(productImage)}&description=${encodeURIComponent(shareText)}`,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.104 17.87c-.63 0-1.125-.213-1.488-.636-.364-.424-.545-1.012-.545-1.764 0-.722.212-1.41.636-2.06.424-.652 1.01-1.292 1.76-1.92l.84-.708c.204-.172.312-.375.324-.612.012-.237-.035-.456-.144-.656-.108-.2-.29-.3-.54-.3-.325 0-.61.12-.853.358-.242.238-.364.54-.364.907 0 .285-.09.52-.27.697-.18.177-.42.266-.72.266-.36 0-.66-.123-.9-.37-.24-.246-.36-.57-.36-.97 0-.627.187-1.17.56-1.626.375-.456.885-.79 1.53-.996.645-.204 1.28-.216 1.9-.036.624.18.936.576.936 1.188 0 .264-.06.51-.18.732-.12.222-.285.43-.496.62-.21.19-.38.34-.51.45-.13.11-.22.2-.27.27-.05.07-.075.14-.075.21 0 .21.06.38.18.51.12.13.285.195.495.195.405 0 .765-.18 1.08-.54.315-.36.472-.81.472-1.35 0-.57-.15-1.05-.45-1.44-.3-.39-.735-.675-1.305-.855-.57-.18-1.185-.195-1.845-.045-1.035.225-1.815.765-2.34 1.62-.525.855-.787 1.845-.787 2.97 0 1.2.33 2.205.99 3.015.66.81 1.545 1.215 2.655 1.215.825 0 1.5-.225 2.025-.675.525-.45.787-1.11.787-1.98 0-.195.006-.33.018-.405.012-.075.03-.165.054-.27l.135-.675c.06-.315.18-.57.36-.765.18-.195.405-.293.675-.293.36 0 .675.12.945.36.27.24.405.54.405.9 0 .3-.075.585-.225.855-.15.27-.375.495-.675.675-.24.15-.465.225-.675.225-.195 0-.39-.036-.585-.108-.195-.072-.345-.132-.45-.18-.105-.048-.195-.06-.27-.036-.075.024-.135.09-.18.195-.045.105-.067.24-.067.405 0 .615.195 1.14.585 1.575.39.435.915.652 1.575.652.87 0 1.62-.31 2.25-.93.63-.62.945-1.41.945-2.37 0-.825-.225-1.56-.675-2.205-.45-.645-1.08-1.14-1.89-1.485-.81-.345-1.695-.515-2.655-.515-1.41 0-2.655.42-3.735 1.26-.51.405-.915.9-1.215 1.485-.3.585-.45 1.23-.45 1.935 0 .63.15 1.17.45 1.62.3.45.675.795 1.125 1.035.45.24.915.36 1.395.36z"/>
        </svg>
      ),
      color: 'hover:text-red-600',
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`,
      icon: (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.905 6.304l-.942 3.453 3.593-.942z"/></svg>
      ),
      color: 'hover:text-green-500',
    },
    {
        name: 'Email',
        url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(pageUrl)}`,
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        ),
        color: 'hover:text-gray-600',
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative animate-slideInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 id="share-modal-title" className="text-xl font-bold text-gray-800 text-center">
          Share this Product
        </h2>
        <p className="text-center text-gray-600 mt-2 truncate">{productName}</p>
        <div className="mt-6 flex justify-around items-center space-x-2">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center text-gray-500 transition-colors duration-200 ${option.color}`}
              aria-label={`Share on ${option.name}`}
            >
              {option.icon}
              <span className="text-xs mt-1">{option.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
