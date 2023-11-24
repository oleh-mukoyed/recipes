import { Paths } from "pages/Paths";
import { Crumb } from "pages/Router";
import React from "react";
import { Link, Params, useLocation, useMatches } from "react-router-dom";

interface IMatches {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: {
    crumb: (data?: unknown) => Crumb;
  };
}

export const Breadcrumbs = (): JSX.Element | null => {
  const matches = useMatches() as IMatches[];
  const location = useLocation();

  if (location.pathname === Paths.DISHES_PAGE) return null;

  const crumbs: Crumb[] = matches
    .filter((match) => Boolean(match?.handle?.crumb))
    .map((match) => {
      return match.handle.crumb(match.data);
    });

  return (
    <nav className="container">
      <ol className="list-reset text-sm py-4 rounded flex flex-row flex-wrap content-center justify-start items-center bg-grey-light text-grey">
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {location.pathname === crumb.link ? (
              <li className="tg-hint_color">{crumb.name}</li>
            ) : (
              <>
                <li className="tg-hint_color font-semibold">
                  <Link to={crumb.link}>{crumb.name}</Link>
                </li>
                <li className="tg-hint_color px-2">/</li>
              </>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
