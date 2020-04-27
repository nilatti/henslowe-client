import React, {
  useState,
} from 'react'

import {Button} from 'react-bootstrap'

import RehearsalPatternCreator from './RehearsalPatternCreator'

export default function RehearsalPatternCreatorToggle ({open, production}) {
  const [formOpen, setFormOpen] = useState(open)
  return(
    <>
    {
      formOpen ? <RehearsalPatternCreator production={production} cancel={setFormOpen}/> : <Button onClick={() => {setFormOpen(true)}}>Add Rehearsal Schedule Pattern</Button>
    }
    </>
  )
}
