export interface RouteConfig {
  path: string;
  label: string;
  protected?: boolean;
  children?: RouteConfig[];
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}