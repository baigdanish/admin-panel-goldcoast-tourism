import { memo } from "react";

interface ILayoutWrapperProps {
  children: React.ReactNode;
}

function LayoutWrapper(props: ILayoutWrapperProps) {
  const { children } = props;

  return <>{children}</>;
}

export default memo(LayoutWrapper);