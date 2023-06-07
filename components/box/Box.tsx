interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={`h-fit w-full rounded-lg bg-neutral-900 ${className}`}>
      {children}
    </div>
  );
};

export default Box;
