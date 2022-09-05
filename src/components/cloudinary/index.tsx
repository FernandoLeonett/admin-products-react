import React from 'react'
import WidgetProps from '../../interfaces/WidgetProps'
import UploadWidget from './components/UploadWidget'
import useScript from './components/_hooks_/useScript'

export const WidgetLoader = () => (
  <>{useScript('https://widget.cloudinary.com/v2.0/global/all.js')}</>
)
export const Widget = (props: WidgetProps) => <UploadWidget {...props} />
