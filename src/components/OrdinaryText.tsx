import React from 'react';
import styled from 'styled-components';

interface TextProps {
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  textAlign?: string;
}

const StyledText = styled.p<TextProps>`
  color: ${({ color }) => color || '#fff'};
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  line-height: ${({ lineHeight }) => lineHeight || '20px'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
`;

const OrdinaryText: React.FC<TextProps> = ({
  children,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  textAlign,
}) => {
  return (
    <StyledText
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      textAlign={textAlign}
    >
      {children}
    </StyledText>
  );
};

export default OrdinaryText;
