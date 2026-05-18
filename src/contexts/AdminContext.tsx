import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface MenuSubcategoryItem {
  name: string;
  price: string;
}

interface MenuSubcategory {
  name: string;
  items: MenuSubcategoryItem[];
}

interface MenuCategory {
  id: string;
  name: string;
  subcategories: MenuSubcategory[];
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

interface AdminData {
  blogs: BlogPost[];
  youtubeVideos: string[];
  lightbox: {
    isEnabled: boolean;
    imgUrl: string;
    offerDetails: string;
  };
  serviceMenu: MenuCategory[];
}

interface AdminContextType {
  data: AdminData;
  updateData: (newData: Partial<AdminData>) => void;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  logout: () => void;
}

const defaultData: AdminData = {
  blogs: [
    {
      id: '1',
      title: 'Top 5 Bridal Makeup Trends of 2024',
      excerpt: 'Discover the most sought-after bridal looks this wedding season, from minimalist glow to classic glam.',
      content: 'This year, bridal makeup is all about enhancing natural beauty. The "minimalist glow" is extremely popular, focusing on flawless skin, soft blush, and subtle highlights. Classic glam remains a staple, with bold lips and defined eyes for evening receptions. At Glow Sparkle Studio, we tailor these trends to complement your features, ensuring you look breathtaking on your special day.',
      image: 'https://images.unsplash.com/photo-1595152452543-e5fc28ebc2fd?auto=format&fit=crop&q=80',
      date: 'May 10, 2024'
    },
    {
      id: '2',
      title: 'The Ultimate Pre-Bridal Skincare Routine',
      excerpt: 'Get that perfect radiant skin before your big day with our expert recommended skincare timeline.',
      content: 'Achieving a flawless bridal glow starts months before the wedding. We recommend starting a dedicated skincare routine at least 3-6 months in advance. This includes regular facials, proper hydration, and a consistent daily regimen of cleansing, toning, and moisturizing. Our bespoke pre-bridal packages at Glow Sparkle Studio are designed to rejuvenate your skin, tackling concerns like dullness and pigmentation.',
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80',
      date: 'April 22, 2024'
    },
    {
      id: '3',
      title: 'Why Nanoplastia is the Best Hair Treatment',
      excerpt: 'Learn why everyone is choosing Nanoplastia for silky, straight, and frizz-free hair.',
      content: 'Nanoplastia is a revolutionary hair treatment that goes beyond traditional keratin smoothing. It uses organic acids and nanotechnology to penetrate the hair shaft, repairing it from the inside out while providing a sleek, straight finish. Unlike older treatments, it is free from harsh chemicals like formaldehyde. Our experts highly recommend this for anyone struggling with frizzy or unmanageable hair.',
      image: 'https://images.unsplash.com/photo-1560944527-a4a429848711?auto=format&fit=crop&q=80',
      date: 'March 15, 2024'
    }
  ],
  youtubeVideos: [
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
  ],
  lightbox: {
    isEnabled: true,
    imgUrl: 'https://drive.google.com/thumbnail?id=10HNCv2w6R9XHUVrjrS9Tkf8WcWzlUWxw&sz=w1000',
    offerDetails: 'Double your beauty with our exclusive 1+1 glow celebration.'
  },
  serviceMenu: []
};

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AdminData>(defaultData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load from Firebase on mount
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'admin', 'data'), (docSnap) => {
      if (docSnap.exists()) {
        setData({ ...defaultData, ...docSnap.data() as Partial<AdminData> });
      } else {
        // Initialize if not exists
        setDoc(doc(db, 'admin', 'data'), defaultData).catch(console.error);
      }
    }, (error) => {
      console.error('Failed to parse admin data from Firebase', error);
    });

    return () => unsub();
  }, []);

  const updateData = async (newData: Partial<AdminData>) => {
    const updated = { ...data, ...newData };
    setData(updated);
    try {
      await setDoc(doc(db, 'admin', 'data'), updated);
    } catch (e) {
      console.error('Failed to update admin data to Firebase', e);
    }
  };

  const login = (email: string) => {
    if (email.toLowerCase() === 'hunnyspace@gmail.com') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ data, updateData, isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
