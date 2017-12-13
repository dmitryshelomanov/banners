import React from 'react'
import styled from 'styled-components'


const Icon = ({ className }) => (
  <svg 
    aria-hidden="true" 
    height="16" 
    version="1.1" 
    viewBox="0 0 14 16" 
    width="14"
    className={className}
  >
    <path 
      fillRule="evenodd" 
      d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"
    >
    </path>
  </svg>
)

export const FolderIcon = styled(Icon)`
  color: rgba(3,47,98,0.5);
  fill: currentColor;
  margin-right: 15px
`
