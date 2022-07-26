import React, { useState, useRef, useEffect } from 'react'
import ReactQuill from 'react-quill';
interface Prop {
  getQuillText: (value?: string) => void
  initialValue?: string
}
export default function RichText(props: Prop) {
  const [value, setValue] = useState('')
  const quill = useRef<ReactQuill>(null)
  useEffect(() => {
    quill.current?.getEditor().setText(props.initialValue ?? '')
  }, [])
  return (
    <ReactQuill onBlur={() => {
      props.getQuillText(value)
    }} theme='snow' value={value} onChange={setValue} ref={quill} />
  )
}
