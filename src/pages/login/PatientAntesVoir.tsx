import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonButton } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import { Storage } from '@capacitor/storage';

interface LocationState {
  telephone: string;
}

interface Antecedent {
  ageInferieur18Ans: boolean;
  ageSuperieur38Ans: boolean;
  primipareAgeePlus35Ans: boolean;
  pariteSuperieure5: boolean;
  dernierAccouchementMoins2Ans: boolean;
  bassinRetreciAsymetrique: boolean;
  taSup148: boolean;
  diabete: boolean;
  dyspnee: boolean;
  intervention: boolean;
  grossesseGemellaire: boolean;
  antecedent: boolean;
  mortNe: boolean;
  faussesCouches: boolean;
  habitude: boolean;
}

const VoirAntecedent: React.FC = () => {
  const location = useLocation<LocationState>(); // Récupérer les paramètres passés
  const { telephone } = location.state || {}; // Récupérer le numéro de téléphone du patient
  const [antecedent, setAntecedent] = useState<Antecedent | null>(null); // État pour stocker les antécédents
  const [patients, setPatients] = useState<any[]>([]); // Liste des patients

  const history = useHistory();

  // Fonction pour récupérer la liste des patients depuis Capacitor Storage
  const getPatients = async () => {
    try {
      const storedPatients = await Storage.get({ key: 'patients' });
      if (storedPatients.value) {
        const parsedPatients = JSON.parse(storedPatients.value);
        console.log('Patients récupérés:', parsedPatients); // Log des patients récupérés
        setPatients(parsedPatients);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.log('Erreur lors de la récupération des patients', error);
    }
  };

  useEffect(() => {
    getPatients(); // Charger les patients au démarrage de la page
  }, []);

  useEffect(() => {
    if (patients.length > 0) {
      const patient = patients.find((p) => p.telephone === telephone);
      if (patient) {
        console.log('Patient trouvé:', patient); // Log du patient trouvé
        if (patient.antecedent) {
          console.log('Antécédent trouvé:', patient.antecedent); // Log de l'antécédent trouvé
          setAntecedent(patient.antecedent); // Charger les antécédents si trouvés
        } else {
          console.log('Aucun antécédent trouvé pour ce patient'); // Log si aucun antécédent trouvé
          setAntecedent(null); // Aucun antécédent trouvé
        }
      } else {
        console.log('Patient non trouvé'); // Log si aucun patient trouvé
        setAntecedent(null);
      }
    }
  }, [patients, telephone]);

  // Vérifier si les antécédents existent
  if (!antecedent) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Voir Antécédent</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>Aucun antécédent trouvé pour ce patient (tsy misy hita ee).</h2>
          <IonButton onClick={() => history.goBack()}>Retour</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Voir Antécédent</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Antécédents de {telephone}</h2>

        {/* Affichage des antécédents du patient */}
        <IonItem>
          <IonLabel>Âge inférieur à 18 ans: {antecedent.ageInferieur18Ans ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Âge supérieur à 38 ans: {antecedent.ageSuperieur38Ans ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Primipare âgée de plus de 35 ans: {antecedent.primipareAgeePlus35Ans ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Parité supérieure à 5: {antecedent.pariteSuperieure5 ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Dernier accouchement il y a moins de 2 ans: {antecedent.dernierAccouchementMoins2Ans ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Bassin rétréci asymétrique: {antecedent.bassinRetreciAsymetrique ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>TA supérieure à 14/8: {antecedent.taSup148 ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Diabète: {antecedent.diabete ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Dyspnée: {antecedent.dyspnee ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Intervention chirurgicale: {antecedent.intervention ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Grossesse gemellaire: {antecedent.grossesseGemellaire ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Antécédents médicaux: {antecedent.antecedent ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Mort-né: {antecedent.mortNe ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Fausses couches: {antecedent.faussesCouches ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Habitude: {antecedent.habitude ? 'Oui' : 'Non'}</IonLabel>
        </IonItem>

        <IonButton onClick={() => history.goBack()}>Retour</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default VoirAntecedent;
