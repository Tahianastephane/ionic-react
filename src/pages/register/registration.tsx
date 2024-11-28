import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Registration: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const history = useHistory();

  const handleRegister = () => {
    // Logique d'inscription ici
    if (password === confirmPassword) {
      console.log('Email:', email);
      console.log('Password:', password);
      history.push('/login');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
            <IonLabel position='floating'>Nom</IonLabel>
            <IonInput value={name} onIonChange={e => setName (e.detail.value!)} type='text'/>
        </IonItem>
        <IonItem>
            <IonLabel position='floating'>Prénom</IonLabel>
            <IonInput value={lastname} onIonChange={e => setLastname (e.detail.value!)} type='text'/>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} type="email" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput value={password} onIonChange={e => setPassword(e.detail.value!)} type="password" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} type="password" />
        </IonItem>
        <IonButton expand="full" onClick={handleRegister}>Register</IonButton>
        <IonButton expand="full" color="light" routerLink="/login">Back to Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Registration;
