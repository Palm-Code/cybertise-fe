const SignupBoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full max-w-2xl rounded-lg bg-background-main-light p-20 shadow-type transition-all duration-75 dark:bg-background-main-dark">
      {children}
    </div>
  );
};
export default SignupBoxWrapper;
