import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageRenderer from '@/pages/PageRenderer';
import { PAGE_DEFINITIONS } from '@/pages/pageDefinitions';

/** Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {PAGE_DEFINITIONS.map(({ hero, index, path, sections }) => (
            <Route
              key={index ? 'home' : path}
              index={index}
              path={path}
              element={<PageRenderer hero={hero} sections={sections} />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
