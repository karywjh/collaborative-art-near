import { Children, cloneElement, forwardRef, isValidElement } from 'react'
import Box, { BoxProps } from './Box'

type Flex = Box

export interface FlexProps extends BoxProps {
  direction?: React.CSSProperties['flexDirection']
  wrap?: React.CSSProperties['flexWrap']
  justify?: React.CSSProperties['justifyContent']
  align?: React.CSSProperties['alignItems']
  spacing?: number
}

const Flex = forwardRef<Flex, FlexProps>(
  (
    { direction, wrap, justify, align, spacing = 0, style, children, ...props },
    ref,
  ) => {
    return (
      <Box
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: direction,
          flexWrap: wrap,
          justifyContent: justify,
          alignItems: align,
          ...style,
        }}
        {...props}
      >
        {spacing === 0
          ? children
          : Children.toArray(children)
              .filter((child): child is React.ReactElement =>
                isValidElement(child),
              )
              .map((child, index, arr) =>
                index === arr.length - 1
                  ? child
                  : cloneElement<HTMLElement>(child, {
                      ...child.props,
                      style: {
                        ...child.props,
                        ...(direction === 'row' || direction === undefined
                          ? { marginRight: spacing }
                          : direction === 'row-reverse'
                          ? { marginLeft: spacing }
                          : direction === 'column'
                          ? { marginBottom: spacing }
                          : direction === 'column-reverse'
                          ? { marginTop: spacing }
                          : {}),
                      },
                    }),
              )}
      </Box>
    )
  },
)

export default Flex
