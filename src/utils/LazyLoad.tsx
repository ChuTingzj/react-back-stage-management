import React, { ReactElement } from 'react'
export default function LazyLoad(path: string | ReactElement) {
  if (typeof path === 'string') {
    const Component = React.lazy(() => import(path))
    return (
      <React.Suspense>
        <Component>
        </Component>
      </React.Suspense>
    )
  } else {
    return (
      <React.Suspense>
        {path}
      </React.Suspense>
    )
  }
}
