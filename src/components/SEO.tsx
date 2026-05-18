import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export default function SEO({ 
  title = "Glow Sparkle Studio | The Best Salon in Vizag", 
  description = "Experience premium grooming and flawless bridal transformations at Glow Sparkle Studio, the best salon in Visakhapatnam. Book your appointment today.",
  keywords = "best salon in vizag, best bridal makeup in vizag, premium salon visakhapatnam, glow sparkle studio, hair salon vizag, beauty parlor vizag",
  image = "https://glowsparklestudio.com/fav.jpg",
  type = "website"
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    
    const setMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', value);
      } else {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        } else if (selector.startsWith('meta[property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        }
        element.setAttribute('content', value);
        document.head.appendChild(element);
      }
    };

    // Standard tags
    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('meta[name="keywords"]', 'content', keywords);

    // OpenGraph tags
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:type"]', 'content', type);
    setMetaTag('meta[property="og:url"]', 'content', `https://glowsparklestudio.com${location.pathname}`);
    setMetaTag('meta[property="og:image"]', 'content', image);
    setMetaTag('meta[property="og:site_name"]', 'content', 'Glow Sparkle Studio');

    // Twitter tags
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', image);

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', `https://glowsparklestudio.com${location.pathname}`);

  }, [title, description, keywords, image, type, location.pathname]);

  return null;
}
