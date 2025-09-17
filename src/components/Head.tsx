import { type ReactNode, type FunctionComponent } from 'react';
import '../styles/global.css';

interface HeadProps {
  title: string;
  children?: ReactNode;
}

export const Head: FunctionComponent<HeadProps> = ({ title, children }) => (
  <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>{title}</title>
    <link rel="preload" href="/assets/fonts/montserrat-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="stylesheet" href="/assets/fonts.css" />
    <script>
      {`
        function setVH() {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', vh + 'px');
        }
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
      `}
    </script>
    {children}
  </>
);