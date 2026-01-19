import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "compact";
  type?: "button" | "submit" | "reset";
};

const Button = ({
  children,
  disabled,
  onClick,
  variant = "default",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${disabled ? styles.disabled : ""} ${
        styles[variant]
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
