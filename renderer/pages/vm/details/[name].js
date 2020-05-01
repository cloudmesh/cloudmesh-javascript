import React from 'react'
import { useRouter } from 'next/router'
import Details from '../../../components/vm/Details'

const VmDetails = () => {
  const router = useRouter()
  const { name } = router.query
  return name ? <Details name={name} router={router} /> : null
}

export default VmDetails
