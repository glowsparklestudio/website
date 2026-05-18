/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import { Layout } from './Layout';
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import WeddingPage from './pages/Wedding';
import BlogsPage from './pages/Blogs';
import BookPage from './pages/Book';
import ContestPage from './pages/Contest';
import ContactPage from './pages/Contact';
import AboutPage from './pages/About';
import ExpertisePage from './pages/Expertise';
import WhyUsPage from './pages/WhyUs';
import TestimonialsPage from './pages/Testimonials';
import AdminPage from './pages/Admin';

import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="expertise" element={<ExpertisePage />} />
            <Route path="why-us" element={<WhyUsPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="wedding" element={<WeddingPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="book" element={<BookPage />} />
            <Route path="contest" element={<ContestPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
