import React from 'react'
import { View } from 'react-native'
// @ts-ignore
import entities from 'entities'
import AppText from '@/components/AppText'
import { screenInfo, rSizeH } from '@/configs/metrics.config'
import env from '@/configs/evn.config'

export const preProcessContent = (content: string) => {
  const html = content
    .replace(/<p><br><\/p>/g, '<p></p>')
    .replace(/<br><\/p>/g, '</p>')
  // .replace(/<p><br \/><\/p>/g, '<p></p>')
  // console.log('html', html)

  return html
}

export const handleTextAlignCenter = ({
  node,
  index,
  siblings,
  parent,
  defaultRenderer
}: any) => {
  if (
    (node.name === 'p' || node.name === 'div') &&
    node.attribs &&
    node.attribs.style &&
    node.attribs.style.includes &&
    (node.attribs.style.includes('text-align: center') ||
      node.attribs.style.includes('text-align: right'))
  ) {
    if (node.attribs.style.includes('text-align: center'))
      return handleTextAlign(defaultRenderer, node, index, 'center')
    if (node.attribs.style.includes('text-align: right'))
      return handleTextAlign(defaultRenderer, node, index, 'right')
  }
}

export const handleIndent = ({
  node,
  index,
  siblings,
  parent,
  defaultRenderer
}: any) => {
  if (
    (node.name === 'p' || node.name === 'div') &&
    node.attribs &&
    node.attribs.style &&
    node.attribs.style.includes &&
    node.attribs.style.includes('margin-left:')
  ) {
    return (
      <AppText
        key={index}
        style={{
          // backgroundColor: __DEV__ ? 'yellow' : 'transparent', // show it in beta app for easy to monitor if any problem
          flexWrap: 'wrap'
        }}
      >
        {`\n      ${renderChildNote(node)}\n`}
      </AppText>
    )
  }
}

const handleTextAlign = (
  node: any,
  index: number,
  alignDirection: 'left' | 'center' | 'right'
) => {
  return (
    <AppText
      key={index}
      style={{
        backgroundColor: env.IS_PRODUCTION == 0 ? 'yellow' : 'transparent', // show it in beta app for easy to monitor if any problem
        flexWrap: 'wrap',
        textAlign: alignDirection
      }}
    >
      {`\n${renderChildNote(node)}\n`}
    </AppText>
  )
}

const renderChildNote = (node: { children: any; data: any }) => {
  if (!node) return
  if (!node.children || !node.children.length)
    if (node.data) return entities.decodeHTML(node.data)
    else return
  return node.children.map((n: any) => renderChildNote(n))
}
