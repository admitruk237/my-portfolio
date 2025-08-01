import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useContactAction = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleContactAction = (item) => {
    const desc = item.description;

    if (isMobile) {
      switch (item.type) {
        case 'phone':
          window.location.href = `tel:${desc}`;
          return;
        case 'email':
          window.location.href = `mailto:${desc}`;
          return;
        case 'location':
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              desc
            )}`,
            '_blank'
          );
          return;
        default:
          break;
      }
    }

    navigator.clipboard.writeText(desc);
    toast.success('Copied to clipboard!');
  };

  return { isMobile, handleContactAction };
};
