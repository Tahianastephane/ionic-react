import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';

// Définir l'interface Patient pour garantir que l'objet a la bonne forme
interface Patient {
  nom: string;
  prenom: string;
  age: number;
  marie: string;
  region: string;
  district_sanitaire: string;
  formation_sanitaire: string;
  niveau_instruction: string;
  profession_femme: string;
  profession_mari: string;
  adresse: string;
  commune: string;
  date_dernier_accouchement: string;
  nombre_enfants_vivants: number;
  gestite: number;
  parite: number;
  ddr: string;
  dpa: string;
  cpn1: number;
  rappel: string;
}

// Définir un type pour le state de useLocation avec la structure spécifique attendue
interface LocationState {
  patient: Patient;
}

const PatientDetails: React.FC = () => {
  const location = useLocation<LocationState>(); // Utiliser le type LocationState pour `useLocation`
  const history = useHistory();

  // Vérifier si patient est disponible dans le state
  const patient = location.state?.patient;

  if (!patient) {
    return <div>No patient found!</div>; // Si aucune donnée n'est trouvée
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Patient Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Details of {patient.nom} {patient.prenom}</h2>
        <IonItem>
          <IonLabel>Nom: {patient.nom}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Prénom: {patient.prenom}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Âge: {patient.age}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Marie: {patient.marie}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Région: {patient.region}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>District Sanitaire: {patient.district_sanitaire}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Formation Sanitaire: {patient.formation_sanitaire}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Niveau d'Instruction: {patient.niveau_instruction}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Profession de la Femme: {patient.profession_femme}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Profession du Mari: {patient.profession_mari}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Adresse: {patient.adresse}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Commune: {patient.commune}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Date du Dernier Accouchement: {patient.date_dernier_accouchement}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Nombre d'Enfants Vivants: {patient.nombre_enfants_vivants}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Gestité: {patient.gestite}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Parité: {patient.parite}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>DDR: {patient.ddr}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>DPA: {patient.dpa}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>CPN1: {patient.cpn1}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Rappel: {patient.rappel}</IonLabel>
        </IonItem>
        <IonButton expand="full" onClick={() => history.goBack()}>Retour</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PatientDetails;
