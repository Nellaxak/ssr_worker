'use client'
import { useCallback, Suspense } from 'react'
//import Form from 'next/form'
//import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { toggleClick } from '../../app/lib/actions'

function ButtonSubmit(props) {
  //console.log('ButtonSubmit', props)
  const handleClick = useCallback(async () => {
    await toggleClick(props.id)
  }, [])
  //onClick={()=>handleClick()}
  return <button type="button" onClick={handleClick}><Suspense>{props.status}</Suspense></button>

  /*return <Form action={toggleClick}>
    <input type='number' name='id' defaultValue={props.id} hidden></input>
    <button type="submit" ><Suspense>{props.status}</Suspense></button>
  </Form>*/
}
export default ButtonSubmit