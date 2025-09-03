import { type ReactNode, type FunctionComponent } from 'react';

interface HeadProps {
  title: string;
  children?: ReactNode;
}

export const Head: FunctionComponent<HeadProps> = ({ title, children }) => (
  <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <link rel="preload" href="/assets/fonts/montserrat-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="stylesheet" href="/assets/fonts.css" />
    {children}
  </>
);