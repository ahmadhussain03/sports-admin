import React from 'react'

function FlagIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='mh-50px'
      {...props}
    >
      <path opacity={0.3} d='M6 22H4V3c0-.6.4-1 1-1s1 .4 1 1v19Z' fill='currentColor' />
      <path
        d='M18 14H4V4h14c.8 0 1.2.9.7 1.5L16 9l2.8 3.5c.5.6 0 1.5-.8 1.5Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default FlagIcon
