import { forwardRef } from 'react'

type Box = HTMLDivElement

export interface BoxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'ref'
  > {
  m?: number
  mx?: number
  my?: number
  mt?: number
  mb?: number
  ml?: number
  mr?: number
  p?: number
  px?: number
  py?: number
  pt?: number
  pb?: number
  pl?: number
  pr?: number
  grow?: React.CSSProperties['flexGrow']
  shrink?: React.CSSProperties['flexShrink']
  basis?: React.CSSProperties['flexBasis']
}

const Box = forwardRef<Box, BoxProps>(
  (
    {
      m,
      mx,
      my,
      mt,
      mb,
      ml,
      mr,
      p,
      px,
      py,
      pt,
      pb,
      pl,
      pr,
      grow,
      shrink,
      basis,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={{
          flexGrow: grow,
          flexShrink: shrink,
          flexBasis: basis,
          marginTop: mt ?? my ?? m,
          marginBottom: mb ?? my ?? m,
          marginLeft: ml ?? mx ?? m,
          marginRight: mr ?? mx ?? m,
          paddingTop: pt ?? py ?? p,
          paddingBottom: pb ?? py ?? p,
          paddingLeft: pl ?? px ?? p,
          paddingRight: pr ?? px ?? p,
          ...style,
        }}
        {...props}
      />
    )
  },
)

export default Box
