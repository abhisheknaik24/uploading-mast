interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
}) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
