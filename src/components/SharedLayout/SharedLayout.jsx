import { Suspense } from 'react';

const SharedLayout = ({ children }) => {
  return (
    <div className=''>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
export default SharedLayout;
