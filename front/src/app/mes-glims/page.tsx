'use client';

import NoGlimsDisplay from './components/NoGlimsDisplay';

export default function Page() {
  // TODO: get glims from API
  const glims = [];

  if (glims.length === 0) {
    return (
      <div className="h-full">
        <NoGlimsDisplay />
      </div>
    );
  }

  return <div>test</div>;
}
