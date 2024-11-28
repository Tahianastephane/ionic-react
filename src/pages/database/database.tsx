import AsyncStorage from '@react-native-async-storage/async-storage';
import * as bcrypt from 'bcryptjs'; // Importation de bcryptjs pour hachage du mot de passe


// Sauvegarder les données sous une clé spécifique
const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Erreur lors de l\'enregistrement des données', e);
  }
};

// Récupérer les données d'une clé spécifique
const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Erreur lors de la lecture des données', e);
    return null;
  }
};

// **Fonctions spécifiques pour la table admin**
export const saveAdmin = async (admin: any) => {
  const admins = await getData('admins');
  const updatedAdmins = admins ? [...admins, admin] : [admin];
  await storeData('admins', updatedAdmins);
};

// Récupérer l'administrateur
export const getAdmin = async () => {
  return await getData('admins');
};

// Fonction pour insérer un admin par défaut si nécessaire
export const initializeAdmin = async () => {
  const admin = await getAdmin();
  if (!admin || admin.length === 0) {
    // Hacher le mot de passe pour plus de sécurité
    const hashedPassword = bcrypt.hashSync('admin123', 10); // Remplacer par un mot de passe sécurisé
    
    const defaultAdmin = {
      username: 'admin',
      password: hashedPassword,
    };
    
    await saveAdmin(defaultAdmin);
    console.log('Admin utilisateur inséré');
  } else {
    console.log('L\'administrateur existe déjà');
  }
};

// **Fonctions spécifiques pour la table patients**
export const savePatient = async (patient: {
  id?: number; // L'ID peut être optionnel, il sera généré si non fourni
  nom: string;
  prenom: string;
  age: number;
  marie: 'oui' | 'non';
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
  ddr: string | undefined;
  dpa: string;
  cpn1: number; 
  rappel: string;
}) => {
  const patients = await getData('patients');
  const updatedPatients = patients ? [...patients, patient] : [patient];
  await storeData('patients', updatedPatients);
};

// Récupérer tous les patients
export const getPatients = async () => {
  return await getData('patients');
};

// **Fonctions spécifiques pour la table antecedents**
export const saveAntecedent = async (antecedent: {
  id?: number; // L'ID est optionnel
  id_patient: number; // L'ID du patient
  age_inferieur_18_ans: number;
  age_superieur_38_ans: number;
  primipare_agee_plus_35_ans: number;
  parite_superieure_5: number;
  dernier_accouchement_moins_2_ans: number;
  bassin_retreci_asymetrique: number;
  ta_sup_14_8: number;
  diabete: number;
  dyspnee: number;
  intervention: number;
  grossesse_gemellaire: number;
  antecedent: number;
  mort_ne: number;
  fausses_couches: number;
  habitude: number;
}) => {
  const antecedents = await getData('antecedents');
  const updatedAntecedents = antecedents ? [...antecedents, antecedent] : [antecedent];
  await storeData('antecedents', updatedAntecedents);
};

// Récupérer tous les antécédents
export const getAntecedents = async () => {
  return await getData('antecedents');
};

// **Fonctions spécifiques pour la table messages**
export const saveMessage = async (message: {
  id?: number; // L'ID est optionnel
  id_patient: number; // L'ID du patient auquel ce message appartient
  envoyer: string;
  message: string;
  date_envoie: string;
}) => {
  const messages = await getData('messages');
  const updatedMessages = messages ? [...messages, message] : [message];
  await storeData('messages', updatedMessages);
};

// Récupérer tous les messages
export const getMessages = async () => {
  return await getData('messages');
};


initializeAdmin();
