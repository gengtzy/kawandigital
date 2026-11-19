import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6 4h6v9.5l8.5-9.5H27L17 15l10.5 13H21L12 17v11H6V4z"
                fill="currentColor"
            />
        </svg>
    );
}
