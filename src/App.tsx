import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import Home from './pages/home/home';
import PatientForm from './pages/PatientForm'; 
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import login from './pages/login/login';
import registration from './pages/register/registration';
import PatientDetails from './pages/PatientDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import PatientAntes from './pages/PatientAntes';

setupIonicReact();
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={login} exact />
        <Route path="/registration" component={registration} exact />
        <Route path="/home" component={Home} exact />
        <Route  path="/patient-form" component={PatientForm} exact/>
        <Route  path="/patient-antes" component={PatientAntes} exact/>
        <Route exact path="/patient-details" component={PatientDetails} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);



export default App;
