import Container from '@/components/Container'
import React from 'react'

const TrackPage = ({params}) => {
  return (
    <Container>{params.id}</Container>
  )
}

export default TrackPage