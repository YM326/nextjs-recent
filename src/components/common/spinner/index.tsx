'use client';

interface SpinnerProps {
  size?: number;
}

export default function Spinner(props: SpinnerProps) {
  const { size = 28 } = props;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 65 65" fill="none" className={'spinner'}>
        <g clipPath="url(#clip0_1168_53876)">
          <path
            d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5ZM4.875 32.5C4.875 47.7569 17.2431 60.125 32.5 60.125C47.7569 60.125 60.125 47.7569 60.125 32.5C60.125 17.2431 47.7569 4.875 32.5 4.875C17.2431 4.875 4.875 17.2431 4.875 32.5Z"
            fill="#F9F9F9"
          />
          <path
            d="M32.5 2.4375C32.5 1.09131 33.5929 -0.0095127 34.9353 0.0913462C40.9351 0.542125 46.7097 2.65171 51.603 6.20695C57.1556 10.2411 61.2885 15.9295 63.4093 22.4569C65.5302 28.9844 65.5302 36.0156 63.4093 42.5431C61.5402 48.2956 58.1085 53.3965 53.5195 57.2877C52.4928 58.1584 50.9616 57.9102 50.1703 56.8211C49.379 55.732 49.6288 54.2154 50.6439 53.3312C54.4056 50.0549 57.2221 45.8096 58.7729 41.0366C60.5757 35.4883 60.5757 29.5117 58.7729 23.9634C56.9702 18.4151 53.4572 13.5799 48.7376 10.1509C44.6774 7.201 39.9034 5.42201 34.9345 4.98245C33.5935 4.86383 32.5 3.78369 32.5 2.4375Z"
            fill="url(#paint0_linear_1168_53876)"
          />
        </g>
        <defs>
          <linearGradient id="paint0_linear_1168_53876" x1="-1.36856e-07" y1="28.8389" x2="65" y2="28.8389" gradientUnits="userSpaceOnUse">
            <stop stopColor="#156EF5" />
            <stop offset="1" stopColor="#448EFF" />
          </linearGradient>
          <clipPath id="clip0_1168_53876">
            <rect width="65" height="65" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .spinner {
          display: inline-block;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </>
  );
}
