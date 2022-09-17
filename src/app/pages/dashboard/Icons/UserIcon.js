import * as React from 'react'

const UserIcon = (props) => (
  <svg
    width={24}
    height={24}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='mh-50px'
    {...props}
  >
    <path
      d='M6.285 15.086A6 6 0 0 1 11.53 12h.94a6 6 0 0 1 5.245 3.086l1.634 2.943c.74 1.333-.223 2.971-1.748 2.971H6.399c-1.525 0-2.489-1.638-1.748-2.971l1.634-2.943Z'
      fill='currentColor'
    />
    <rect opacity={0.3} x={8} y={3} width={8} height={8} rx={4} fill='currentColor' />
  </svg>
)

export default UserIcon
