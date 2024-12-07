import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonIcon, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonMenu, IonContent, IonList, IonMenuButton, IonButtons, IonButton, IonTabBar, IonTabButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pencil, trash, add, chatbox, colorPalette, home, statsChart, megaphone } from 'ionicons/icons';

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

  // Navigate to patient actions page
  const navigateToPatientActions = (patient: any) => {
    history.push({
      pathname: `/patient-details`,
      state: { patient },  // Pass the patient to the actions page via state
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
      patients = patients.filter((p: any) => p.numero !== patient.numero); // Remove the patient by phone number

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
    history.push('/patient-form'); // Adjust the route to your "Add Patient" page
  };

  const navigateToPatientAntes = (patient: any) => {
    history.push({
      pathname: '/patient-antes',
      state: { patientNumero: patient.telephone },  // Pass the patient's phone number
    });
  };

  // Handle message menu item click
  const handleMenuMessageClick = () => {
    // Handle your message logic here
    console.log("Message menu item clicked");
  };

  // Handle theme menu item click
  const handleMenuThemeClick = () => {
    // Handle your theme logic here
    console.log("Theme menu item clicked");
  };

  // Navigate to statistics page
  const navigateToStatistics = () => {
    history.push('/statistics');
  };

  // Navigate to advertisements page
  const navigateToAdvertisements = () => {
    history.push('/advertisements');
  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button onClick={handleMenuMessageClick}>
              <IonIcon icon={chatbox} slot="start" />
              <IonLabel>Message</IonLabel>
            </IonItem>
            <IonItem button onClick={handleMenuThemeClick}>
              <IonIcon icon={colorPalette} slot="start" />
              <IonLabel>Thème</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
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
                  {/* Display patient phone number, name, and surname */}
                  <IonLabel onClick={() => navigateToPatientActions(patient)}>
                    {`Numéro: ${patient.telephone} Nom: ${patient.nom} Prénom: ${patient.prenom}`}
                  </IonLabel>
                  {/* Edit icon */}
                  <IonIcon icon={pencil} slot="end" onClick={() => navigateToEditPatient(patient)} />
                  {/* Delete icon */}
                  <IonIcon icon={trash} slot="end" onClick={() => deletePatient(patient)} />
                  {/* Add icon */}
               
                </IonItem>
              ))
            ) : (
              <p>No patients added yet.</p>
            )}
          </IonList>
          
        </IonContent>

        {/* Floating button to add a new patient */}
        <div style={{ position: 'fixed', bottom: '70px', left: '50%', transform: 'translateX(-50%)' }}>
          <IonFabButton onClick={navigateToAddPatient}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </div>

        {/* Tab bar for navigation */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" onClick={handleRefresh}>
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="statistics" onClick={navigateToStatistics}>
            <IonIcon icon={statsChart} />
            <IonLabel>Statistics</IonLabel>
          </IonTabButton>
          <IonTabButton tab="advertisements" onClick={navigateToAdvertisements}>
            <IonIcon icon={megaphone} />
            <IonLabel>Publicity</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonPage>
    </>
  );
};

export default Home;
