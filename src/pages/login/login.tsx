import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonText, IonIcon, IonToast, IonRefresher, IonRefresherContent } from '@ionic/react';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getAdmin } from '../database/database';
import bcrypt from 'bcryptjs';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const history = useHistory();

  const handleLogin = async () => {
    const admin = await getAdmin();

    if (admin && admin.length > 0) {
      const storedAdmin = admin[0];

      if (!password) {
        setErrorMessage('Le mot de passe ne peut pas être vide');
        setShowToast(true);
        return;
      }

      const passwordMatch = bcrypt.compareSync(password, storedAdmin.password);

      if (username === storedAdmin.username && passwordMatch) {
        history.push('/home');
      } else {
        setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect');
        setShowToast(true);
      }
    } else {
      setErrorMessage('Aucun administrateur trouvé');
      setShowToast(true);
    }
  };

  // Fonction de rafraîchissement
  const handleRefresh = (event: CustomEvent) => {
    // Remettre les champs de saisie à leurs valeurs initiales
    setUsername('');
    setPassword('');
    setErrorMessage('');
    setShowPassword(false);
    event.detail.complete(); // Indiquer que le rafraîchissement est terminé
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connexion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding login-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent pullingText="Tirer pour rafraîchir" refreshingSpinner="circles" />
        </IonRefresher>

        <div className="login-container">
          <IonTitle className="ion-title">Bienvenue</IonTitle>
          
          <IonItem>
            <IonLabel position="floating">Nom d'utilisateur</IonLabel>
            <IonInput
              value={username}
              onIonChange={e => setUsername(e.detail.value!)}
              type="text"
              required
              autofocus
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Mot de passe</IonLabel>
            <IonInput
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
              type={showPassword ? "text" : "password"}
              required
            />
            <IonIcon
              icon={showPassword ? eyeOffOutline : eyeOutline}
              slot="end"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            />
          </IonItem>

          {errorMessage && (
            <IonText color="danger">
              <p>{errorMessage}</p>
            </IonText>
          )}

          <IonButton expand="full" onClick={handleLogin} color="primary">
            Se connecter
          </IonButton>

          <IonToast
            isOpen={showToast}
            message={errorMessage || 'Connexion réussie!'}
            duration={2000}
            onDidDismiss={() => setShowToast(false)}
            color={errorMessage ? 'danger' : 'success'}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
