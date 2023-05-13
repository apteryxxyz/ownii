import '#/styles/common.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { Pipe, Pipeline } from 'react-pipeline-component';
import { Layout } from '#/components/Layout';
import { injectEventEmitters } from '#/hooks/useEventListener';
import { triggerPageView } from '#/utilities/google';

export default ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    useEffect(() => {
        injectEventEmitters();
    }, []);

    useEffect(() => {
        const handleChange = (url: string) => triggerPageView(url);

        router.events.on('routeChangeComplete', handleChange);
        router.events.on('hashChangeComplete', handleChange);

        return () => {
            router.events.off('routeChangeComplete', handleChange);
            router.events.off('hashChangeComplete', handleChange);
        };
    }, [router.events]);

    return <Pipeline
        // prettier-ignore
        components={[
            <ThemeProvider attribute="class" storageKey="qwaroo.theme" enableSystem children={<Pipe />} />,
        ]}
    >
        <Layout {...pageProps}>
            <Component {...pageProps} />
        </Layout>
    </Pipeline>;
};

declare global {
    namespace JSX {
        interface IntrinsicElements {
            qwaroo: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}
