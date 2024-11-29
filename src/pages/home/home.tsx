import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonRefresher, IonRefresherContent, IonFab, IonFabButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pencil, trash, add } from 'ionicons/icons';

const Home: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [storageMessage, setStorageMessage] = useState<string>('');
  const history = useHistory();

  // Function to fetch patients from AsyncStorage
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
    getPatients(); // Fetch patients when the page loads
  }, []);

  // Navigate to patient details page
  const navigateToPatientDetails = (patient: any) => {
    history.push({
      pathname: `/patient-details`,
      state: { patient },  // Pass the patient to the details page via state
    });
  };

  // Navigate to patient edit form
  const navigateToEditPatient = (patient: any) => {
    history.push({
      pathname: `/patient-form`,
      state: { patient },  // Pass the patient to the form page via state
    });
  };

  // Delete a patient
  const deletePatient = async (patient: any) => {
    try {
      const storedPatients = await AsyncStorage.getItem('patients');
      let patients = storedPatients ? JSON.parse(storedPatients) : [];
      patients = patients.filter((p: any) => p.id !== patient.id); // Remove the patient by id

      await AsyncStorage.setItem('patients', JSON.stringify(patients));
      setPatients(patients); // Update local state
    } catch (error) {
      setStorageMessage('Failed to delete patient.');
    }
  };

  // Refresh patients list
  const handleRefresh = async (event: CustomEvent) => {
    await getPatients(); // Fetch patients
    event.detail.complete(); // Complete the refresh
  };

  // Navigate to another page (e.g., for adding a new patient)
  const navigateToAddPatient = () => {
    history.push('/patient-antes'); // Adjust the route to your "Add Patient" page
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

        {/* Modify title based on the number of patients */}
        <h2>{patients.length > 2 ? 'Liste des patients' : 'Liste de patient'}</h2>
        <p>{storageMessage}</p>

        <IonList>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <IonItem key={index}>
                {/* Display patient id, name, and surname */}
                <IonLabel onClick={() => navigateToPatientDetails(patient)}>
                  {`ID: ${patient.id} - Nom: ${patient.nom} Prénom: ${patient.prenom}`}
                </IonLabel>
                {/* Edit icon */}
                <IonIcon icon={pencil} slot="end" onClick={() => navigateToEditPatient(patient)} />
                {/* Delete icon */}
                <IonIcon icon={trash} slot="end" onClick={() => deletePatient(patient)} />
                {/* Add icon */}
                <IonIcon icon={add} slot="end" onClick={navigateToAddPatient} />
              </IonItem>
            ))
          ) : (
            <p>No patients added yet.</p>
          )}
        </IonList>
      </IonContent>

      {/* Floating button to add a new patient */}
      <IonFab horizontal="end" vertical="bottom" slot="fixed">
        <IonFabButton onClick={navigateToAddPatient}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Home;
