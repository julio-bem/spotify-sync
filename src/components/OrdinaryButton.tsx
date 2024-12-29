import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  height?: string;
  width?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  borderRadius?: string;
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 12px 24px;
  height: ${({ height }) => height || 'auto'};
  width: ${({ width }) => width || 'auto'};
  background-color: ${({ backgroundColor }) => backgroundColor || '#57B660'};
  color: ${({ color }) => color || 'black'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  font-weight: ${({ fontWeight }) => fontWeight || '700'};
  line-height: ${({ lineHeight }) => lineHeight || '20px'};
  border-radius: ${({ borderRadius }) => borderRadius || '24px'};
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:enabled:hover {
    transform: scale(1.05);
  }

  &:active {
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? `${backgroundColor}99` : '#1aa34a'};
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const OrdinaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  height,
  width,
  backgroundColor,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
  disabled,
}) => {
  return (
    <StyledButton
      height={height}
      width={width}
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      borderRadius={borderRadius}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default OrdinaryButton;
