import * as React from 'react'

const UsersIcon = (props) => (
  <svg
    width={24}
    height={24}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='mh-50px'
    {...props}
  >
    <path
      d='M16.017 9h-.622a3 3 0 0 0-2.652 1.596l-.589 1.113a.4.4 0 0 0 .102.498l.384.311a5 5 0 0 1 1.436 1.885l.156.357a.4.4 0 0 0 .367.24h4.076a1.4 1.4 0 0 0 1.237-2.055l-1.243-2.349A3 3 0 0 0 16.017 9Z'
      fill='currentColor'
    />
    <rect opacity={0.3} x={14} y={4} width={4} height={4} rx={2} fill='currentColor' />
    <path
      d='M4.655 14.856a4.733 4.733 0 0 1 8.69 0l1.448 3.35A2 2 0 0 1 12.957 21H5.043a2 2 0 0 1-1.836-2.793l1.448-3.351Z'
      fill='currentColor'
    />
    <rect opacity={0.3} x={6} y={5} width={6} height={6} rx={3} fill='currentColor' />
  </svg>
)

export default UsersIcon
