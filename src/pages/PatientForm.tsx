import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonInput, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonList, IonToast } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Patient type
interface Patient {
  nom: string;
  prenom: string;
  age: string; // Changed to string
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
  nombre_enfants_vivants: string; // Changed to string
  gestite: string; // Changed to string
  parite: string; // Changed to string
  ddr: string | undefined;
  dpa: string;
  cpn1: string; // Changed to string
  rappel: string;
}

// Define the LocationState type
interface LocationState {
  patient?: Patient;
}

const PatientForm: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const initialPatient: Patient = {
    nom: '',
    prenom: '',
    age: '', // Initialized as empty string
    marie: '',
    region: '',
    district_sanitaire: '',
    formation_sanitaire: '',
    niveau_instruction: '',
    profession_femme: '',
    profession_mari: '',
    adresse: '',
    commune: '',
    date_dernier_accouchement: '',
    nombre_enfants_vivants: '', // Initialized as empty string
    gestite: '', // Initialized as empty string
    parite: '', // Initialized as empty string
    ddr: '',
    dpa: '',
    cpn1: '', // Initialized as empty string
    rappel: ''
  };

  const [patient, setPatient] = useState<Patient>(initialPatient);
  const [isEdit, setIsEdit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (location.state && location.state.patient) {
      setPatient(location.state.patient);
      setIsEdit(true);
    }
  }, [location.state]);

  const handleInputChange = (field: string, value: any) => {
    setPatient({ ...patient, [field]: value });
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (
      !patient.nom || !patient.prenom || !patient.age || !patient.marie || !patient.region || 
      !patient.district_sanitaire || !patient.formation_sanitaire || !patient.niveau_instruction || 
      !patient.profession_femme || !patient.profession_mari || !patient.adresse || !patient.commune ||
      !patient.date_dernier_accouchement || !patient.nombre_enfants_vivants || !patient.gestite || 
      !patient.parite || !patient.ddr || !patient.dpa || !patient.cpn1
    ) {
      setToastMessage('Tous les champs sont obligatoires.');
      setShowToast(true);
      return; // Stop the form submission if fields are missing
    }

    try {
      const storedPatients = await AsyncStorage.getItem('patients');
      let patients = storedPatients ? JSON.parse(storedPatients) : [];

      // Convert string values to numbers where necessary
      const newPatient = {
        ...patient,
        age: parseInt(patient.age, 10),
        nombre_enfants_vivants: parseInt(patient.nombre_enfants_vivants, 10),
        gestite: parseInt(patient.gestite, 10),
        parite: parseInt(patient.parite, 10),
        cpn1: parseInt(patient.cpn1, 10)
      };

      if (isEdit) {
        // Find the index of the patient to update
        const index = patients.findIndex((p: Patient) => p.nom === location.state.patient?.nom && p.prenom === location.state.patient?.prenom);
        if (index !== -1) {
          patients[index] = newPatient;
        }
      } else {
        patients.push(newPatient);
      }

      await AsyncStorage.setItem('patients', JSON.stringify(patients));
      history.push('/home');
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleCancel = () => {
    history.push('/home'); // Redirige l'utilisateur vers la page d'accueil
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEdit ? 'Modifier' : 'Ajouter'} un Patient</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Section: Informations Personnelles */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Informations Personnelles</IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonInput
                label="Nom"
                placeholder="Entrez le nom"
                value={patient.nom}
                onIonChange={e => handleInputChange('nom', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Prénom"
                placeholder="Entrez le prénom"
                value={patient.prenom}
                onIonChange={e => handleInputChange('prenom', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Âge"
                type="number"
                placeholder="Entrez l'âge"
                value={patient.age}
                onIonChange={e => handleInputChange('age', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonSelect
                label="Marié(e)"
                value={patient.marie}
                onIonChange={e => handleInputChange('marie', e.detail.value!)}
              >
                <IonSelectOption value="Oui">Oui</IonSelectOption>
                <IonSelectOption value="Non">Non</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonInput
                label="Région"
                placeholder="Entrez la région"
                value={patient.region}
                onIonChange={e => handleInputChange('region', e.detail.value!)}
              />
            </IonItem>
          </IonList>
        </IonCard>

        {/* Section: Informations de la Grossesse */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Informations de la Grossesse</IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonInput
                label="Date Dernier Accouchement"
                type="date"
                value={patient.date_dernier_accouchement}
                onIonChange={e => handleInputChange('date_dernier_accouchement', e.detail.value!)}
                placeholder="YYYY-MM-DD"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Nombre d'Enfants Vivants"
                type="number"
                value={patient.nombre_enfants_vivants}
                onIonChange={e => handleInputChange('nombre_enfants_vivants', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Gestité"
                type="number"
                value={patient.gestite}
                onIonChange={e => handleInputChange('gestite', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Parité"
                type="number"
                value={patient.parite}
                onIonChange={e => handleInputChange('parite', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="DDR"
                type="date"
                value={patient.ddr}
                onIonChange={e => handleInputChange('ddr', e.detail.value!)}
                placeholder="YYYY-MM-DD"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="DPA"
                type="date"
                value={patient.dpa}
                onIonChange={e => handleInputChange('dpa', e.detail.value!)}
                placeholder="YYYY-MM-DD"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="CPN1"
                type="number"
                value={patient.cpn1}
                onIonChange={e => handleInputChange('cpn1', e.detail.value!)}
              />
            </IonItem>
          </IonList>
        </IonCard>

        {/* Section: Autres Informations */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Autres Informations</IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonInput
                label="District Sanitaire"
                placeholder="Entrez le district sanitaire"
                value={patient.district_sanitaire}
                onIonChange={e => handleInputChange('district_sanitaire', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Formation Sanitaire"
                placeholder="Entrez la formation sanitaire"
                value={patient.formation_sanitaire}
                onIonChange={e => handleInputChange('formation_sanitaire', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Niveau d'Instruction"
                placeholder="Entrez le niveau d'instruction"
                value={patient.niveau_instruction}
                onIonChange={e => handleInputChange('niveau_instruction', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Profession de la Femme"
                placeholder="Entrez la profession de la femme"
                value={patient.profession_femme}
                onIonChange={e => handleInputChange('profession_femme', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Profession du Mari"
                placeholder="Entrez la profession du mari"
                value={patient.profession_mari}
                onIonChange={e => handleInputChange('profession_mari', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Adresse"
                placeholder="Entrez l'adresse"
                value={patient.adresse}
                onIonChange={e => handleInputChange('adresse', e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Commune"
                placeholder="Entrez la commune"
                value={patient.commune}
                onIonChange={e => handleInputChange('commune', e.detail.value!)}
              />
            </IonItem>
          </IonList>
        </IonCard>

        {/* Button Group */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <IonButton color="danger" onClick={handleCancel}>Annuler</IonButton>
          <IonButton color="success" onClick={handleSubmit}>
            {isEdit ? 'Modifier le Patient' : 'Ajouter le Patient'}
          </IonButton>
        </div>

        {/* Toast for Error Messages */}
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default PatientForm;
