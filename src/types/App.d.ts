export interface RouteType {
  path: string;
  name: string;
  icon?: string;
  component: React.ComponentType;
  collapse?: boolean;
  state?: string;
  views?: RouteType[];
}
