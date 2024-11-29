import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonIcon, IonRefresher, IonRefresherContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pencil, trash } from 'ionicons/icons';

const Home: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [storageMessage, setStorageMessage] = useState<string>('');
  const history = useHistory();

  // Fonction pour récupérer les patients depuis AsyncStorage
  const getPatients = async () => {
    try {
      const storedPatients = await AsyncStorage.getItem('patients');
      if (storedPatients) {
        setPatients(JSON.parse(storedPatients));
      } else {
        setPatients([]);
      }
    } catch (error) {
      setStorageMessage('Failed to retrieve patients.');
    }
  };

  useEffect(() => {
    getPatients(); // Récupérer les patients lors de l'affichage de la page
  }, []);

  // Fonction pour naviguer vers la page de détails d'un patient
  const navigateToPatientDetails = (patient: any) => {
    history.push({
      pathname: `/patient-details`,
      state: { patient },  // Passer le patient à la nouvelle page via state
    });
  };

  // Fonction pour naviguer vers la page de modification d'un patient
  const navigateToEditPatient = (patient: any) => {
    history.push({
      pathname: `/patient-form`,
      state: { patient },  // Passer le patient à la nouvelle page via state
    });
  };

  // Fonction pour supprimer un patient
  const deletePatient = async (patient: any) => {
    try {
      const storedPatients = await AsyncStorage.getItem('patients');
      let patients = storedPatients ? JSON.parse(storedPatients) : [];
      patients = patients.filter((p: any) => p.nom !== patient.nom || p.prenom !== patient.prenom);

      await AsyncStorage.setItem('patients', JSON.stringify(patients));
      setPatients(patients); // Mettre à jour l'état local
    } catch (error) {
      setStorageMessage('Failed to delete patient.');
    }
  };

  // Fonction de rafraîchissement
  const handleRefresh = async (event: CustomEvent) => {
    await getPatients(); // Récupérer les patients
    event.detail.complete(); // Indiquer que le rafraîchissement est terminé
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent pullingText="Tirer pour rafraîchir" refreshingSpinner="circles" />
        </IonRefresher>

        <h2>Patients List</h2>
        <p>{storageMessage}</p>
        <IonButton onClick={() => history.push('/patient-form')}>Add Patient</IonButton>

        <IonList>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <IonItem key={index}>
                <IonLabel onClick={() => navigateToPatientDetails(patient)}>{`${patient.nom} ${patient.prenom}`}</IonLabel>
                <IonIcon icon={pencil} slot="end" onClick={() => navigateToEditPatient(patient)} />
                <IonIcon icon={trash} slot="end" onClick={() => deletePatient(patient)} />
              </IonItem>
            ))
          ) : (
            <p>No patients added yet.</p>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
