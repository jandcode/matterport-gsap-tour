import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'matterport-viewer': any;
        }
    }
}

// Support for React 19 / Next.js namespace resolution
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'matterport-viewer': any;
        }
    }
}

declare module '@matterport/webcomponent' {
    const component: any;
    export default component;
}
