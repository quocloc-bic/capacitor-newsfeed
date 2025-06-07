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
import { Route } from "react-router-dom";
import SplashPage from "@/pages/splash/splash-page";
import NewsfeedPage from "@/pages/newsfeed/newsfeed-page";
import CreateArticlePage from "@/pages/create-article/create-article-page";
import ArticleDetailPage from "@/pages/article-detail/article-detail-page";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact component={SplashPage} />
        <Route path="/newsfeed" exact component={NewsfeedPage} />
        <Route path="/create-article" exact component={CreateArticlePage} />
        <Route path="/article" exact component={ArticleDetailPage} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
