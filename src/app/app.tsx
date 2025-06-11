import React from "react";

import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./app.style.css";

import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import NewsfeedPage from "@/pages/newsfeed/newsfeed-page";
import CreateArticlePage from "@/pages/create-article/create-article-page";
import ArticleDetailPage from "@/pages/article-detail/article-detail-page";
import { AppRoutes } from "@/core/app-routes";
import ErrorBoundary from "@/shared/components/error-boundary/error-boundary";

setupIonicReact();

const App: React.FC = () => (
  <ErrorBoundary>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path={AppRoutes.Root} exact>
            <Redirect to={AppRoutes.Newsfeed} />
          </Route>
          <Route path={AppRoutes.Newsfeed} exact component={NewsfeedPage} />
          <Route
            path={AppRoutes.CreateArticle}
            exact
            component={CreateArticlePage}
          />
          <Route
            path={AppRoutes.ArticleDetail}
            exact
            component={ArticleDetailPage}
          />
          <Route
            path={AppRoutes.EditArticle}
            exact
            component={CreateArticlePage}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </ErrorBoundary>
);

export default App;
