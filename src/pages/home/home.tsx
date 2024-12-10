import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonIcon, IonRefresher, IonRefresherContent, IonFabButton, IonMenu, IonContent, IonList, IonMenuButton, IonButtons, IonTabBar, IonTabButton, IonToast, IonModal, IonButton, IonBadge } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pencil, trash, add, chatbox, colorPalette, home, statsChart, megaphone, notifications } from 'ionicons/icons';
import { addMonths } from 'date-fns';

const Home: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [storageMessage, setStorageMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationMessages, setNotificationMessages] = useState<string[]>([]);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const history = useHistory();

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
    getPatients();
  }, []);

  useEffect(() => {
    const checkForNotifications = () => {
      const notifications: string[] = [];
      let newCount = 0;
      patients.forEach((patient) => {
        const ddr = patient.ddr;
        if (ddr) {
          const ddrDate = new Date(ddr);
          const nextAppointmentDate = addMonths(ddrDate, 1);
          const currentDate = new Date();
          
          if (
            nextAppointmentDate.getDate() === currentDate.getDate() &&
            nextAppointmentDate.getMonth() === currentDate.getMonth() &&
            nextAppointmentDate.getFullYear() === currentDate.getFullYear()
          ) {
            const message = `Rappel : Rendez-vous pour patient ${patient.nom} ${patient.prenom} prévu aujourd'hui.`;
            notifications.push(message);
            setToastMessage(message);
            setShowToast(true);
            newCount += 1;
          }
        }
      });
      setNotificationMessages(notifications);
      setNewNotificationsCount(newCount);
    };
    
    checkForNotifications();

  }, [patients]);

  const navigateToPatientActions = (patient: any) => {
    history.push({
      pathname: `/patient-details`,
      state: { patient },
    });
  };

  const navigateToEditPatient = (patient: any) => {
    history.push({
      pathname: `/patient-form`,
      state: { patient },
    });
  };

  const deletePatient = async (patient: any) => {
    try {
      const storedPatients = await AsyncStorage.getItem('patients');
      let patients = storedPatients ? JSON.parse(storedPatients) : [];
      patients = patients.filter((p: any) => p.telephone !== patient.telephone);

      await AsyncStorage.setItem('patients', JSON.stringify(patients));
      setPatients(patients);
    } catch (error) {
      setStorageMessage('Failed to delete patient.');
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    await getPatients();
    event.detail.complete();
  };

  const navigateToAddPatient = () => {
    history.push('/patient-form');
  };

  const navigateToPatientAntes = (patient: any) => {
    history.push({
      pathname: '/patient-antes',
      state: { patientNumero: patient.telephone },
    });
  };

  const handleMenuMessageClick = () => {
    console.log("Message menu item clicked");
  };

  const handleMenuThemeClick = () => {
    console.log("Theme menu item clicked");
  };

  const handleMenuNotificationClick = () => {
    setShowNotifications(true);
    setNewNotificationsCount(0); // Réinitialiser le compte des nouvelles notifications lorsqu'elles sont consultées
  };

  const navigateToStatistics = () => {
    history.push('/statistics');
  };

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
            <IonItem button onClick={handleMenuNotificationClick}>
              <IonIcon icon={notifications} slot="start" />
              <IonLabel>Notifications</IonLabel>
              {newNotificationsCount > 0 && (
                <IonBadge color="danger" slot="end">{newNotificationsCount}</IonBadge>
              )}
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

          <h2>{patients.length > 2 ? 'Liste des patients' : 'Liste de patient'}</h2>
          <p>{storageMessage}</p>

          <IonList>
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <IonItem key={index}>
                  <IonLabel onClick={() => navigateToPatientActions(patient)}>
                    {`Numéro: ${patient.telephone} Nom: ${patient.nom} Prénom: ${patient.prenom}`}
                  </IonLabel>
                  <IonIcon icon={pencil} slot="end" onClick={() => navigateToEditPatient(patient)} />
                  <IonIcon icon={trash} slot="end" onClick={() => deletePatient(patient)} />
                </IonItem>
              ))
            ) : (
              <p>No patients added yet.</p>
            )}
          </IonList>
        </IonContent>

        <div style={{ position: 'fixed', bottom: '70px', left: '50%', transform: 'translateX(-50%)' }}>
          <IonFabButton onClick={navigateToAddPatient}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </div>

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

      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={5000}
        onDidDismiss={() => setShowToast(false)}
      />

      <IonModal isOpen={showNotifications} onDidDismiss={() => setShowNotifications(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Notifications</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowNotifications(false)}>Fermer</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {notificationMessages.length > 0 ? (
              notificationMessages.map((message, index) => (
                <IonItem key={index}>
                  <IonLabel>{message}</IonLabel>
                </IonItem>
              ))
            ) : (
              <IonItem>
                <IonLabel>Aucune notification.</IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Home;
