import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const MainAppCard = ({ title, children }) => (
  <Card>
    <CardHeader title={title} />
    <CardContent>{children}</CardContent>
  </Card>
)
export default MainAppCard
