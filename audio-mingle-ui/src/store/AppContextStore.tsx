import { UserProvider } from './ctx';
import { AppContextSessionProps } from './types';

type AppContextStoreProps = {
  children: React.ReactNode;
  session: AppContextSessionProps;
};

export default function AppContextStore({
  children,
  session,
}: AppContextStoreProps) {
  return <UserProvider session={session}>{children}</UserProvider>;
}
