import React from 'react'

const YouTubeIcon: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="currentColor"
  >
    <g transform="translate(-851 -334)">
      <rect width="100" height="100" transform="translate(851 334)" fill="none" />
      <path d="M97.911,87.731A12.522,12.522,0,0,0,89.07,78.89C81.271,76.8,50,76.8,50,76.8s-31.271,0-39.07,2.09a12.523,12.523,0,0,0-8.841,8.841C0,95.529,0,111.8,0,111.8s0,16.271,2.089,24.069a12.524,12.524,0,0,0,8.841,8.842C18.729,146.8,50,146.8,50,146.8s31.271,0,39.07-2.089a12.523,12.523,0,0,0,8.841-8.842C100,128.072,100,111.8,100,111.8S100,95.529,97.911,87.731ZM40,126.8v-30l25.98,15L40,126.8Z" transform="translate(851 272.2)" fill="currentColor" />
    </g>
  </svg>
)

export default YouTubeIcon